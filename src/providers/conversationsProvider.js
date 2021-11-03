import React from 'react'
import {auth, firestore} from '../config/firebase'


const initialState = {
	conversations: []
}

const conversationsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CONVERSATIONS': {
			return {...state, conversations: action.payload.conversations}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const ConversationsContext = React.createContext({initialState})

const ConversationsProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(conversationsReducer, initialState)
	const value = {state, dispatch}

	return (
		<ConversationsContext.Provider value={value}>
			{children}
		</ConversationsContext.Provider>
	)
}

export {ConversationsContext, ConversationsProvider}