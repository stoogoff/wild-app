
import firebase from 'firebase/app'
//import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if(!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

//export const realtime = firebase.database()
//export const storage = firebase.storage()
//export const auth = firebase.auth()
export const database = firebase.firestore()


// helper functions

// convert the object in the query to its data and ID
export const convert = (query) => ({ ...query.data(), id: query.id })

// create an object in the supplied collection and return it
export const create = async (collection, data) => {
	const ref = await database.collection(collection).add(data)
	const created = await ref.get()

	return convert(created)
}

export const get = async (collection, id) => {
	const ref = await database.collection(collection).doc(id)
	const retrieved = await ref.get()

	return convert(retrieved)
}

export const list = async (collection) => {
	let data = []
	const query = await database.collection(collection).get()

	query.forEach(doc => data.push(convert(doc)))

  return data
}
