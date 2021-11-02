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
				.onSnapshot((querySnapshot) => {
					querySnapshot.forEach(async (doc) => {
						const data = doc.data()
						const otherProfile = await searchUserId(doc.data().parties.pop(account.state.profile.nickname));
						data.sharedKey = await getSharedKey(otherProfile.publicKey)
						data.avatar = await otherProfile.avatar || ""
						data.nickname = await otherProfile.nickname
						dispatch({type: "ADD_CONVERSATION", payload: {conversations: {id: doc.id, data: data}}})
					});

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