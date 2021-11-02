import {firestore} from "../config/firebase";
import firebase from "firebase";
import {computeKeys, encrypt, generateInitialisationVector, hexToUint8Array, uncompressPrivateKey} from "./e2ee";
import {searchUserId} from "../providers/authProvider";


export const sendMessage = async (data) => {
	const collection = await firestore.collection('conversation')
	const conversation = await searchConversation({from: data.from, to: data.to})

	const privateKey = localStorage.getItem('key')
	const userProfile = await searchUserId(data.to)
	const publicKey = userProfile.publicKey
	const iv = generateInitialisationVector();

	// reconstruct the keys and generate the shared secret
	const sharedKey = computeKeys(uncompressPrivateKey(privateKey), hexToUint8Array(publicKey))
	// in case there is a conversation already going on in
	// between the two add the message to the array

	if (conversation[0]) {
		// grab the existing IV and use it for encryption
		return collection.doc(conversation[0]).update({
			parties: [data.from, data.to],
			conversation: firebase.firestore.FieldValue.arrayUnion({
				message: encrypt(data.message, sharedKey, hexToUint8Array(conversation[1].initialisationVector)),
				from: data.from,
				to: data.to,
				seen: false,
				timestamp: Date.now()
			}),
		})
	} else {
		return collection.add({
			parties: [data.from, data.to],
			initialisationVector: iv,
			conversation: firebase.firestore.FieldValue.arrayUnion({
				message: encrypt(data.message, sharedKey, hexToUint8Array(iv)),
				from: data.from,
				to: data.to,
				seen: false,
				timestamp: Date.now()
			}),
		})
	}
}

/**
 *
 * @param data - Object.keys = from, to
 * @returns {Promise<[conversationDocumentId, conversationData]>}
 */
export const searchConversation = async (data) => {
	const collection = firestore.collection('conversation')
	const query = await collection.where('parties', 'array-contains', data.from).get()
	let conversationId, conversation;
	query.forEach(el => {
		if (el.data().parties.includes(data.from) && el.data().parties.includes(data.to)) {
			conversationId = el.id
			conversation = el.data()
		}
	})
	return [conversationId, conversation]
}

/**
 *
 * @param data - Object.keys = from, to
 * @returns {Promise<[Object with message structure, initialisationVector as string]>}
 */
export const searchLastMessage = async (data) => {
	const conversation = await searchConversation({from: data.from, to: data.to})
	return [conversation[1].conversation[conversation[1].conversation.length - 1], conversation[1].initialisationVector]
}

