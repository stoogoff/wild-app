
export const ATTRIBUTE_MIN = 1
export const ATTRIBUTE_MAX = 5
export const ATTRIBUTES_STARTING = 12

export const ABILITY_MIN = 1
export const ABILITY_MAX = 6

export const DEFAULT_CHARACTER = {
	persona: '',
	shadow: '',
	attributes: {
		Control: ATTRIBUTE_MIN,
		Strength: ATTRIBUTE_MIN,
		Focus: ATTRIBUTE_MIN,
		Passion: ATTRIBUTE_MIN,
	},
	abilities: {
		Diplomat: ABILITY_MIN,
		Guardian: ABILITY_MIN,
		Rogue: ABILITY_MIN,
		Scholar: ABILITY_MIN,
		Visionary: ABILITY_MIN,
	},
	aspects: [],
	name: '',
	background: '',
	image: '',	
}