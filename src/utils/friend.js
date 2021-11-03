import {firestore} from '../config/firebase'
import firebase from "firebase/app";
import {generateInitialisationVector} from "./e2ee";


export const acceptFriendRequest = async (data) => {
	const collection = firestore.collection('profile')
	const doc = collection.doc(data.uid)
	doc.update({friends: firebase.firestore.FieldValue.arrayUnion(data.from)})

	// append the friend list for the other person
	let query = await collection.where('nickname', "==", data.from).get()
	const secondDoc = collection.doc(await query.docs[0].id)
	secondDoc.update({friends: firebase.firestore.FieldValue.arrayUnion(data.to)})

	// create the conversation document
	const iv = generateInitialisationVector();
	await firestore.collection('conversation').add({
		parties: [data.from, data.to],
		initialisationVector: iv,
		conversation: firebase.firestore.FieldValue.arrayUnion(),
	})
	window.location.reload(false);
}

export const unfriend = async (data) => {
	const collection = firestore.collection('profile')
	const doc = collection.doc(data.uid)
	doc.update({friends: firebase.firestore.FieldValue.arrayRemove(data.name)})

	// remove the friend from the list for the other person
	let query = await collection.where('nickname', "==", data.name).get()
	const secondDoc = collection.doc(await query.docs[0].id)
	secondDoc.update({friends: firebase.firestore.FieldValue.arrayRemove(data.myName)})

	firestore.collection('conversation')
		.where('parties', 'array-contains', data.myName).get()
		.then((res) => {
			res.docs.map(i => {
				if (i.data().parties.filter(j => j !== data.myName)[0] === data.name) {
					firestore.collection('conversation').doc(i.id).delete()
				}
			})
		})

	window.location.reload(false);
}