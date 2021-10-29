import React from 'react'


const initialState = {
	keyword: {}
}

const searchReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_KEYWORD':
			return {...state, keyword: action.payload.keyword}
		default: {
			throw new Error(`Unhandled action type ${action.type}`)
		}
	}
}

const SearchChatsContext = React.createContext({})

const SearchChatsProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(searchReducer, initialState)
	const value = {state, dispatch}

	return (
		<SearchChatsContext.Provider value={value}>
			{children}
		</SearchChatsContext.Provider>
	)
}

export {SearchChatsContext, SearchChatsProvider}