import React from 'react'
import {auth, firestore} from '../config/firebase'
import {generateKeys} from "../utils/e2ee";

/* REDUCER */
const initialState = {
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

/* ACTIONS */
export const login = (email, password) => {
	auth.signInWithEmailAndPassword(email, password).then(() => {
		// set up the localstorage
	}).catch(e => {
		console.log(e);
		return e;
	})
}

export const register = (email, password, nickname) => {
	auth.createUserWithEmailAndPassword(email, password).then((res) => {
		// generate keys
		let keys = generateKeys();
		localStorage.setItem('key', keys.ecdh.getPrivateKey().toString('hex'))


		let data = {nickname, publicKey: keys.buffer.toString('hex')}
		// create profile
		firestore.collection(`profile`)
			.doc(res.user.uid)
			.set(data)
			.then(r => console.log(r))
			.catch(e => console.log(e))
	}).catch(e => {
		console.log(e)
		return e;
	})
}

export const signOut = () => {
	localStorage.removeItem('user')
	auth.signOut().catch(e => {
		console.log(e)
		return e;
	})
}

export const recoverPassword = (email) => {
	auth.sendPasswordResetEmail(email).catch(e => {
		console.log(e)
		return e
	})
}

export const updatePassword = (email, oldPassword, newPassword) => {
	auth.currentUser?.updatePassword(newPassword).catch(e => {
		console.log(e)
		return e
	})
}

export const updateAccount = (object) => {
	// TODO: update email???
}

export const updateProfile = (object) => {
	// TODO: update only the new data and if the object has valid values
	firestore.collection(`profile`)
		.doc(auth.currentUser?.uid)
		.set(object)
		.then(r => console.log(r))
		.catch(e => console.log(e))
}

export const getProfile = async (uuid) => {
	const collectionInstance = firestore.collection('profile').doc(uuid)
	const doc = await collectionInstance.get()
	return doc.data()
}

/* COMPONENT */

const AuthContext = React.createContext({})

const AuthProvider = ({children}) => {
	const [state, dispatch] = React.useReducer(authReducer, initialState)
	const value = {state, dispatch}


	React.useEffect(() => {
		// hotfix for the firebase.onAuthStateChanged flickering
		if (localStorage.getItem('user')) {
			// fetch the profile
			// set context data
			let user = JSON.parse(localStorage.getItem('user'))
			getProfile(user.account.uid).then((profile) => {
				dispatch({type: 'LOGIN', payload: {account: user.account, profile}})
			})
		} else {
			auth.onAuthStateChanged(user => {
				if (auth.currentUser) {
					// fetch the profile
					getProfile(auth.currentUser.uid).then((profile) => {
						// set localstorage
						localStorage.setItem('user', JSON.stringify({
							account: auth.currentUser,
							profile: profile,
							errors: [],
						}))

						// set context data
						dispatch({
							type: 'LOGIN',
							payload: {account: auth.currentUser, profile: profile}
						})
					})

				} else {
					// get rid of the localstorage
					dispatch({type: 'LOGOUT'})
					signOut();
				}
			});
		}
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export {AuthContext, AuthProvider}