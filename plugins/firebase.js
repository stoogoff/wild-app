import firebase from 'firebase/app'
//import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'


//export const realtime = firebase.database()
//export const auth = firebase.auth()
//export const database = firebase.firestore()

let _database
let _storage

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
	_storage = firebase.storage()
}


// helper functions

// convert the object in the query to its data and ID
export const convert = (query) => ({ ...query.data(), id: query.id })

export const database = () => _database
export const storage = () => _storage

// database helper functions
export const helpers = {
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

	save: async (collection, data) => {
		return await _database.collection(collection).doc(data.id).set(data)
	},

	delete: async (collection, id) => {
		await _database.collection(collection).doc(id).delete()
	},
}