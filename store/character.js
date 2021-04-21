
import cloneDeep from 'lodash/cloneDeep'
import { DEFAULT_CHARACTER, STORAGE_CHARACTERS } from '~/utils/config'

// convert the object in the query to its data and ID
const convert = (query) => ({ ...query.data(), id: query.id })


export const state = () => ({
	characters: [],
})

export const getters = {
	byId: (state) => id => {
		return cloneDeep(state.characters.find(character => character.id === id))
	},
}

export const mutations = {
	set(state, characters) {
		state.characters = characters
	},

	add(state, character) {
		state.characters.push(character)
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
	}
}
