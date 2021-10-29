import {firestore} from '../config/firebase'
import firebase from "firebase/app";


export const acceptFriendRequest = async (data) => {
	const collection =  firestore.collection('profile')
	const doc = collection.doc(data.uid)
	doc.update({friends: firebase.firestore.FieldValue.arrayUnion(data.from)})

	// append the friend list for the other person
	let query = await collection.where('nickname', "==", data.from).get()
	const secondDoc = collection.doc(await query.docs[0].id)
	secondDoc.update({friends: firebase.firestore.FieldValue.arrayUnion(data.to)})
}
