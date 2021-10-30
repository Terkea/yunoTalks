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
	return auth.signInWithEmailAndPassword(email, password).then(() => {
		// set up the localstorage
	})
}

export const register = (email, password, nickname) => {
	return auth.createUserWithEmailAndPassword(email, password).then((res) => {
		// generate keys
		let keys = generateKeys();
		localStorage.setItem('key', keys.ecdh.getPrivateKey().toString('hex'))


		let data = {friends: [], nickname, publicKey: keys.buffer.toString('hex')}
		// create profile
		firestore.collection(`profile`)
			.doc(res.user.uid)
			.set(data)
			.then(r => console.log(r))
			.catch(e => console.log(e))
	})
}

export const signOut = () => {
	localStorage.removeItem('user')
	return auth.signOut()
}

// search user by nickname and return the user data
export const searchUserId = async (id) => {
	const collection = await firestore.collection('profile')
	let query = await collection.where('nickname', "==", id).get()

	try {
		return await query.docs[0].data()
	} catch (e) {
		// in case theres no profile with that unique nickname dont return anything
		// console.log(e)
		return undefined
	}
}

export const recoverPassword = (email) => {
	return auth.sendPasswordResetEmail(email)
}

export const updateAccount = (object) => {
	// TODO: update email???
}

export const updateProfile = (object) => {
	// TODO: update only the new data and if the object has valid values
	return firestore.collection(`profile`)
		.doc(auth.currentUser?.uid)
		.set(object, {merge: true})
		.then(r => console.log(r))
}

export const getProfile = async (uuid) => {
	const collection = firestore.collection('profile').doc(uuid)
	const doc = await collection.get()
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
			// set context data
			let user = JSON.parse(localStorage.getItem('user'))
			// fetch the profile
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
					signOut();
					dispatch({type: 'LOGOUT'})
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