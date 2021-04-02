
import { DEFAULT_CHARACTER } from '~/utils/config'


let newCharacter = null

export const createCharacter = () => {
	// TODO pull from database or session or whatever
	if(newCharacter === null) {
		newCharacter = { ...DEFAULT_CHARACTER }
	}

	return newCharacter
}

// TODO save to database
export const saveCharacter = character => newCharacter = character