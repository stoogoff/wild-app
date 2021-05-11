
import cloneDeep from 'lodash/cloneDeep'
import { DEFAULT_CHARACTER, STORAGE_CHARACTERS, KEY_INJURY } from '~/utils/config'

// convert the object in the query to its data and ID
const convert = (query) => ({ ...query.data(), id: query.id })


export const state = () => ({
	characters: [],
})

export const getters = {
	byId: (state) => /*async*/ id => {
		const character = state.characters.find(character => character.id === id)

		//if(character) {
			return cloneDeep(character)
		/*}

		const loaded = await this.$fire.firestore.collection(STORAGE_CHARACTERS).doc(id).get()

		return cloneDeep(convert(loaded))*/
	},
}

export const mutations = {
	set(state, characters) {
		state.characters = characters
	},

	add(state, character) {
		state.characters.push(character)
	},

	remove(state, toRemove) {
		state.characters = [ ...state.characters.filter(({ id }) => id !== toRemove) ]
	},

	update(state, data) {
		state.characters = [ ...state.characters.filter(({ id }) => id !== data.id), cloneDeep(data) ]
	},
}

export const actions = {
	async save({ commit }, data) {
		commit('update', data)
		await this.$fire.firestore.collection(STORAGE_CHARACTERS).doc(data.id).set(data)
	},

	async create({ commit, rootState }) {
		const userId = rootState.auth.user.uid
		const ref = await this.$fire.firestore.collection(STORAGE_CHARACTERS).add({ ...DEFAULT_CHARACTER, userId })
		const created = await ref.get()

		const converted = convert(created)

		commit('add', converted)

		return converted
	},

	async fetch({ commit, rootState }) {
		let data = []
		const userId = rootState.auth.user.uid
		const query = await this.$fire.firestore.collection(STORAGE_CHARACTERS).where('userId', '==', userId).get()

		query.forEach(doc => data.push(convert(doc)))

		commit('set', data)

		return data
	},

	async delete({ commit }, id) {
		await this.$fire.firestore.collection(STORAGE_CHARACTERS).doc(id).delete()
		commit('remove', id)
	},

	async push({ dispatch }, { character, attribute }) {
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

		await dispatch('save', character)
	},
}
