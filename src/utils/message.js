import {firestore} from "../config/firebase";
import firebase from "firebase";

export const sendMessage = async (data) => {
	const collection = await firestore.collection('conversation')
	const conversation = await searchConversation({from: data.from, to: data.to})

	// in case there is a conversation already going on in
	// between the two add the message to the array
	if (conversation[0]) {
		return collection.doc(conversation[0]).update({
			parties: [data.from, data.to],
			conversation: firebase.firestore.FieldValue.arrayUnion({
				message: data.message,
				from: data.from,
				to: data.to,
				seen: false,
				timestamp: Date.now()
			}),
		})
	} else {
		return collection.add({
			parties: [data.from, data.to],
			conversation: firebase.firestore.FieldValue.arrayUnion({
				message: data.message,
				from: data.from,
				to: data.to,
				seen: false,
				timestamp: Date.now()
			}),
		})
	}
}

export const searchConversation = async (data) => {
	const collection = firestore.collection('conversation')
	const query = await collection.where('parties', 'array-contains', data.from).get()
	let conversationId, conversation;
	query.forEach(el => {
		if (el.data().parties.includes(data.from) && el.data().parties.includes(data.to)) {
			// console.log('found it', el.id)
			conversationId = el.id
			conversation = el.data()
		}
	})
	return [conversationId, conversation]
}