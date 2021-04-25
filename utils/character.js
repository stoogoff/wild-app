
import { KEY_INJURY } from '~/utils/config'

export const getBaseAttribute = (character, attribute) => parseInt(character.attributes[attribute])

export const getCurrentAttribute = (character, attribute) => {
	if(KEY_INJURY in character && attribute in character[KEY_INJURY]) {
		return parseInt(character[KEY_INJURY][attribute])
	}
	else {
		return parseInt(character.attributes[attribute])
	}
}

export const getAbility = (character, ability) => parseInt(character.abilities[ability])

export const getTargetNumber = (character, attribute, ability) => getCurrentAttribute(character, attribute) + getAbility(character, ability)
