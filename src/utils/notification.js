import {firestore} from '../config/firebase'


export const createNotification = async (data) => {
	const collection = await firestore.collection('notification')
	data.timestamp = Date.now()
	return collection.add(data)

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