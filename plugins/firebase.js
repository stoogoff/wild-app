import firebase from 'firebase/app'
//import 'firebase/database'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


//export const realtime = firebase.database()
//export const auth = firebase.auth()
//export const database = firebase.firestore()

let _database
let _storage
let _auth

export default ({ env }) => {
	const firebaseConfig = {
		apiKey: env.apiKey,
		authDomain: env.authDomain,
		projectId: env.projectId,
		storageBucket: env.storageBucket,
		messagingSenderId: env.messagingSenderId,
		appId: env.appId,
	}

	if(!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig)
	}

	_database = firebase.firestore()
	_storage = firebase.storage()
	_auth = firebase.auth()
}

// firebase object getters
export const database = () => _database
export const storage = () => _storage
export const auth = () => _auth
