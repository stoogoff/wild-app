
export const ATTRIBUTE_MIN = 1
export const ATTRIBUTE_STARTING_MAX = 5
export const ATTRIBUTE_MAX = 6
export const ATTRIBUTES_STARTING = 12

export const ABILITY_MIN = 1
export const ABILITY_MAX = 6
export const ABILITY_STRONG = 4
export const ABILITY_MID = 3
export const ABILITY_REST = 2
export const ABILITY_WEAK = 1

export const ASPECTS_MIN = 2

export const ABILITY_SPREAD = {
	'ABILITY_STRONG': ABILITY_STRONG,
	'ABILITY_MID': ABILITY_MID,
	'ABILITY_WEAK': ABILITY_WEAK,
}

export const DEFAULT_CHARACTER = {
	persona: {
		card: null,
		text: '',
	},
	shadow: {
		card: null,
		text: '',
	},
	attributes: {
		Control: ATTRIBUTE_MIN,
		Strength: ATTRIBUTE_MIN,
		Focus: ATTRIBUTE_MIN,
		Passion: ATTRIBUTE_MIN,
	},
	abilities: {
		Diplomat: ABILITY_REST,
		Guardian: ABILITY_REST,
		Rogue: ABILITY_REST,
		Scholar: ABILITY_REST,
		Visionary: ABILITY_REST,
	},
	aspects: ['', '', ''],
	name: '',
	background: '',
	image: '',	
}

export const COLLECTION_CHARACTERS = 'characters'
