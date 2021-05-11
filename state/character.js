
import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { database } from '~/plugins/firebase'
import { STORAGE_CHARACTERS } from '~/utils/config'

const state = Vue.observable({
	characters: [],
})


export default {
	// TODO the strategy here should be to load all if they're not available and then return the one with the correct ID
	async byId(id) {
		const character = state.characters.find(character => character.id === id)

		if(character) {
			return cloneDeep(character)
		}

		const loaded = await database.get(STORAGE_CHARACTERS, id)

		return cloneDeep(loaded)
	},

	async all() {
		if(state.characters.length > 0) {
			return cloneDeep(state.characters)
		}

		// TODO auth user
		const loaded = await database.list(STORAGE_CHARACTERS)

		state.characters = loaded

		return cloneDeep(loaded)
	}
}
