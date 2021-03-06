import React from "react";


const ModalContext = React.createContext({});

const modalReducer = (state, action) => {
	switch (action.type) {
		case 'REMOVE_MODAL': {
			return {...state, isOpen: false}
		}
		case 'SET_CONTENT': {
			return {
				isOpen: true,
				content: action.payload.content,
				title: action.payload.title
			}
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

const initialState = {isOpen: false, content: '<p>add content</p>'}

const ModalProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(modalReducer, initialState);
	const value = {state, dispatch}
	return (
		<ModalContext.Provider value={value}>
			{children}
		</ModalContext.Provider>
	);
};

export {ModalContext, ModalProvider};
