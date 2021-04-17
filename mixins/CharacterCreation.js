import cloneDeep from 'lodash/cloneDeep'

const CharacterCreation = {
	props: {
		character: {
			type: Object,
			required: true,
		}
	},

	data() {
		return {
			editingCharacter: cloneDeep(this.character),
		}
	},
}

export default CharacterCreation
