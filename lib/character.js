
import { database, convert, create, get, list } from './firebase'
import { DEFAULT_CHARACTER, COLLECTION_CHARACTERS } from '~/utils/config'

export const createCharacter = async () => await create(COLLECTION_CHARACTERS, DEFAULT_CHARACTER)

export const getCharacter = async id => await get(COLLECTION_CHARACTERS, id)

export const saveCharacter = async character => await database.collection(COLLECTION_CHARACTERS).doc(character.id).set(character)

export const allCharacters = async () => await list(COLLECTION_CHARACTERS)


// DELME
export const firestoreTestCreate = async () => {
	const ref = await database.collection("users").add({
		first: "Ada2",
		last: "Lovelace",
		born: 1815
	})

	const created = await ref.get()

	return convert(created)
}

export const firestoreTestRead = async () => {
	let data = []

	const query = await database.collection('users').get()

	query.forEach(doc => data.push(convert(doc)))

  return data
}