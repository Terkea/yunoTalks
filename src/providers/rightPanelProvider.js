import React from 'react'
import HomePanel from "../components/panels/HomePanel";
import PrivateKey from "../components/panels/PrivateKey";


const RightPanelContext = React.createContext({})
const rightPanelReducer = (state, action) => {
	switch (action.type) {
		case 'SET_PANEL_CONTENT': {
			// in case the private key cant be found prevent the user from browsing around
			// if (!localStorage.getItem('key')) {
			// 	return {
			// 		content: <PrivateKey/>
			// 	}
			// }
			return {
				content: action.payload.content
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}


const initialState = {content: <HomePanel/>}
const RightPanelProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(rightPanelReducer, initialState)
	const value = {state, dispatch}


	React.useEffect(() => {
		if (!localStorage.getItem('key')) {
			dispatch({type: 'SET_PANEL_CONTENT', payload: {content: <PrivateKey/>}})
		}
	}, [localStorage.getItem('key')])

	return (
		<RightPanelContext.Provider value={value}>
			{children}
		</RightPanelContext.Provider>
	)
}

export {RightPanelProvider, RightPanelContext};