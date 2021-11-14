
import { character, user } from '~/state'

export default {
	async validate({ params }) {
		const loggedInUser = user.getLoggedInUser()
		const ch = await character.byId(params.characterId)
// during refresh the loggedInUser doesn't load
console.log(loggedInUser)
console.log(ch)
		return ch.userId === loggedInUser.uid
	}
}
