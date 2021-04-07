
import { DEFAULT_CHARACTER, COLLECTION_CHARACTERS } from '~/utils/config'

// convert the object in the query to its data and ID
const convert = (query) => ({ ...query.data(), id: query.id })


export const state = () => ({
	characters: [],
})

export const getters = {
	byId: (state) => id => {
		return state.characters.find(character => character.id === id)
	}
}

export const mutations = {
	set(state, characters) {
		state.characters = characters
	},

	add(state, character) {
		state.characters.push(character)
	}
}

export const actions = {
	async create({ commit }) {
		const ref = await this.$fire.firestore.collection(COLLECTION_CHARACTERS).add(DEFAULT_CHARACTER)
		const created = await ref.get()

		const converted = convert(created)

		commit('add', converted)

		return converted
	},

	async fetch({ commit }) {
		let data = []
		const query = await this.$fire.firestore.collection(COLLECTION_CHARACTERS).get()

		query.forEach(doc => data.push(convert(doc)))

		commit('set', data)

		return data
	}
}