import React from 'react'


const initialState = {
	isLoggedIn: false,
	account: {},
	profile: {},
	errors: [],
}

const authReducer = (state, action) => {
	switch (action.type) {
		case 'REGISTER':
			return {...state, account: action.payload.account, profile: action.payload.profile}
		case 'LOGIN':
			return {...state, account: action.payload.account, profile: action.payload.profile}
		case 'UPDATE_PROFILE':
			return {...state, profile: action.payload.profile}
		case 'UPDATE_ACCOUNT':
			return {...state, account: action.payload.account}
		case 'LOGOUT':
			return {...state, account: {}, profile: {}}
		case 'ERROR':
			return {...state, errors: action.payload.errors}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}

}

const AuthContext = React.createContext({})

const AuthProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(authReducer, initialState)
	const value = {state, dispatch}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export {AuthContext, AuthProvider}