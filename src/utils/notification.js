import {firestore} from '../config/firebase'


export const createNotification = async (data) => {
	const collection = await firestore.collection('notification')
	data.timestamp = Date.now()
	return collection.add(data)
}

export const updateNotification = async (data) => {
	const collection = await firestore.collection('notification')
	const notification = await collection.doc(data.docId)
	switch (data.type) {
		case 'markAsSeen': {
			return notification.set({seen: true}, {merge: true})
		}
		case 'acceptFriendRequest': {
			return notification.set({seen: true, response: 'Accept'}, {merge: true})
		}
		case 'declineFriendRequest': {
			return notification.set({seen: true, response: 'Decline'}, {merge: true})
		}

		default:
			throw new Error(`Unhandled action type: ${data.type}`)
	}
}

export const searchNotification = async (data) => {
	const collection = await firestore.collection('notification')
	switch (data.type) {
		case 'friendRequest':
			const query = await collection.where('from', "==", data.from).where('to', "==", data.to).get()
			try {
				return await query.docs[0].data()
			} catch (e) {
				// in case theres no profile with that unique nickname dont return anything
				// console.log(e)
				return undefined
			}
		default: {
			throw new Error(`Unhandled search type: ${data.type}`)
		}
	}
}