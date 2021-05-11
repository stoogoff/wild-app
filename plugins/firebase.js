import firebase from 'firebase/app'
//import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'


//export const realtime = firebase.database()
//export const storage = firebase.storage()
//export const auth = firebase.auth()
//export const database = firebase.firestore()

let _database

export default ({ env }) => {
	const firebaseConfig = {
		apiKey: env.FIREBASE_API_KEY,
		authDomain: env.FIREBASE_AUTH_DOMAIN,
		projectId: env.FIREBASE_PROJECT_ID,
		storageBucket: env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
		appId: env.FIREBASE_APP_ID,
	}

	if(!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig)
	}

	_database = firebase.firestore()
}


// helper functions

// convert the object in the query to its data and ID
export const convert = (query) => ({ ...query.data(), id: query.id })

// create an object in the supplied collection and return it

export const database = {
	create: async (collection, data) => {
		const ref = await _database.collection(collection).add(data)
		const created = await ref.get()

		return convert(created)
	},

	get: async (collection, id) => {
		const ref = await _database.collection(collection).doc(id)
		const retrieved = await ref.get()

		return convert(retrieved)
	},

	list: async (collection) => {
		let data = []
		const query = await _database.collection(collection).get()

		query.forEach(doc => data.push(convert(doc)))

	  return data
	},

	save: async (collection, character) => {
		return await _database.collection(collection).doc(character.id).set(character)
	},
}