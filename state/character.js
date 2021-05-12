
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { database, convert } from '~/plugins/firebase'
import { DEFAULT_CHARACTER, STORAGE_CHARACTERS, KEY_INJURY } from '~/utils/config'

const state = Vue.observable({
	characters: [],
	fetched: false,
})

// TODO auth user id
const fetch = async () => {
	if(state.fetched) {
		return
	}

	let data = []
	const userId = 'DLYotwA9jRfDO225cCHJwAnX9413'//TODO rootState.auth.user.uid
	const query = await database.query(STORAGE_CHARACTERS).where('userId', '==', userId).get()

	query.forEach(doc => data.push(convert(doc)))

	state.characters = data
	state.fetched = true
}

export default {
	async byId(id) {
		await fetch()

		const character = state.characters.find(character => character.id === id)

		return cloneDeep(character)
	},

	async all() {
		await fetch()

		return cloneDeep(state.characters)
	},

	async create() {
		const userId = 'DLYotwA9jRfDO225cCHJwAnX9413'//TODO rootState.auth.user.uid
		const character = await database.create(STORAGE_CHARACTERS, { ...DEFAULT_CHARACTER, userId })

		state.characters = [ ...state.characters, character]

		return character
	},

	async save(data) {
		await database.save(STORAGE_CHARACTERS, data)

		state.characters = [ ...state.characters.filter(character => character.id !== data.id), data ]
	},

	async delete(id) {
		await database.delete(STORAGE_CHARACTERS, id)

		state.characters = state.characters.filter(character => character.id !== id)
	},

	async push({ character, attribute }) {
		if(!(KEY_INJURY in character)) {
			character[KEY_INJURY] = {}
		}

		if(!(attribute in character[KEY_INJURY])) {
			character[KEY_INJURY][attribute] = character.attributes[attribute]
		}

		if(character[KEY_INJURY][attribute] === 0) {
			throw `Attribute at zero ${attribute}`
		}

		character[KEY_INJURY][attribute] = character[KEY_INJURY][attribute] - 1

		await this.save(character)
	},
}
