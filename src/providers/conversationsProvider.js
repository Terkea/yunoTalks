import React from 'react'
import {searchConversation} from "../utils/message";
import {computeKeys, hexToUint8Array, uncompressPrivateKey} from "../utils/e2ee";
import {auth, firestore} from '../config/firebase'
import {AuthContext, searchUserId} from "./authProvider";


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
	const value = {state, dispatch}


	React.useEffect(() => {
		if (account.state.profile.nickname) {
			firestore.collection("conversation")
				.where("parties", "array-contains", account.state.profile.nickname)
				// .get().then(res => console.log(res.id))
				.onSnapshot(async (querySnapshot) => {
					dispatch({
						type: "SET_CONVERSATIONS", payload: {
							conversations: await Promise.all(querySnapshot.docs.map((doc) => {
								return searchUserId(doc.data().parties.pop(account.state.profile.nickname)).then(r => {
									return {
										id: doc.id,
										otherProfile: r,
										data: doc.data()
									}
								})
							}))
						}
					})
				});
		}
	}, [account.state.profile.nickname])

	console.log(state)

	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	)
}

export {ConversationsContext, ConversationsProvider}