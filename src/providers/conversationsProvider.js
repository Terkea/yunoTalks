import React from 'react'
import {computeKeys, hexToUint8Array, uncompressPrivateKey} from "../utils/e2ee";
import {firestore} from '../config/firebase'
import {AuthContext, searchUserId} from "./authProvider";
import {SearchChatsContext} from "./searchChatsProvider";


const initialState = {
	conversations: []
}

const conversationsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CONVERSATIONS': {
			return {...state, conversations: action.payload.conversations}
		}
		case 'ADD_CONVERSATION': {
			return {...state, conversations: [...state.conversations, action.payload.conversations]}
		}
		case 'SEARCH_CONVERSATION': {
			return {
				...state, conversations: [...state.conversations
					.filter(i => i.otherProfile.nickname.toLowerCase().includes(action.payload.keyword.toLowerCase()))
				]
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

// ACTIONS
const getSharedKey = async (publicKey) => {
	if (localStorage.getItem('key')) {
		const privateKey = localStorage.getItem('key');
		return await computeKeys(uncompressPrivateKey(privateKey), hexToUint8Array(publicKey))
	}
}


const ConversationsContext = React.createContext({initialState})

const ConversationsProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(conversationsReducer, initialState)
	const account = React.useContext(AuthContext)
	const searchContext = React.useContext(SearchChatsContext)
	const value = {state, dispatch}


	React.useEffect(() => {
		if (account.state.profile.nickname) {
			const fetchConversations = () => {
				firestore.collection("conversation")
					.where("parties", "array-contains", account.state.profile.nickname)
					.onSnapshot(async (querySnapshot) => {
						dispatch({
							type: "SET_CONVERSATIONS", payload: {
								conversations: await Promise.all(querySnapshot.docs.map((doc) => {
									return searchUserId(doc.data().parties.pop(account.state.profile.nickname))
										.then(r => {
											const privateKey = localStorage.getItem('key')
											let sharedKey;
											try {
												sharedKey = computeKeys(uncompressPrivateKey(privateKey), hexToUint8Array(r.publicKey))
											} catch (e) {
												sharedKey = ""
											}
											return {
												id: doc.id,
												otherProfile: r,
												sharedKey,
												data: doc.data()
											}
										})
								}))
							}
						})
					});
			}

			try {
				if (typeof searchContext.state.keyword.length === 'undefined' || searchContext.state.keyword.replaceAll(" ", "").length === 0) {
					fetchConversations()
				}
			} catch (e) {

			}
		}


	}, [account.state.profile.nickname, searchContext.state.keyword])


	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	)
}

export {ConversationsContext, ConversationsProvider}