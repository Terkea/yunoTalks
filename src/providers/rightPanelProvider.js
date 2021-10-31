import React from 'react'
import HomePanel from "../components/panels/HomePanel";
import PrivateKey from "../components/panels/PrivateKey";


const RightPanelContext = React.createContext({})
const rightPanelReducer = (state, action) => {
	switch (action.type) {
		case 'SET_PANEL_CONTENT': {
			return {
				content: action.payload.content
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}



const initialState = {content: <PrivateKey/>}
const RightPanelProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(rightPanelReducer, initialState)
	const value = {state, dispatch}

	return (
		<RightPanelContext.Provider value={value}>
			{children}
		</RightPanelContext.Provider>
	)
}

export {RightPanelProvider, RightPanelContext};