
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
	},

	update(state, data) {
		const updating = state.characters.find(({ id }) => id === data.id)

		state.characters = [ ...state.characters.filter(({ id }) => id !== data.id), { ...updating, ...data } ]
	},
}

export const actions = {
	async create({ commit }) {
		/*const ref = await this.$fire.firestore.collection(COLLECTION_CHARACTERS).add(DEFAULT_CHARACTER)
		const created = await ref.get()

		const converted = convert(created)

		commit('add', converted)

		return converted*/
		const character = { ...DEFAULT_CHARACTER, id: parseInt(Math.random()*1000000).toString(16) }

		commit('add', character)

		return character
	},

	async fetch({ commit }) {
		let data = [{ ...DUMMY_CHARACTER }]
		/*const query = await this.$fire.firestore.collection(COLLECTION_CHARACTERS).get()

		query.forEach(doc => data.push(convert(doc)))*/

		commit('set', data)

		return data
	}
}

const DUMMY_CHARACTER = {
	persona: {
		card: null,
		text: '',
	},
	shadow: {
		card: null,
		text: '',
	},
	attributes: {
		Control: 5,
		Strength: 2,
		Focus: 3,
		Passion: 2,
	},
	abilities: {
		Diplomat: 4,
		Guardian: 3,
		Rogue: 2,
		Scholar: 2,
		Visionary: 1,
	},
	aspects: [
		'Silver-tongued public speaker',
		'Weakness for drink',
	],
	name: 'John Smith',
	background: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet mauris et mi blandit hendrerit. Integer vestibulum ex quis efficitur interdum. Pellentesque vehicula sapien eget justo sagittis pellentesque. Vivamus urna nunc, luctus ut elit at, faucibus dictum tellus. Quisque bibendum, diam eget blandit aliquam, ipsum arcu varius augue, et pharetra.',
	image: '',
	id: 'test-id',
}