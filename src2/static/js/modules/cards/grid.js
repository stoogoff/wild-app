
import { selectedCard, suitStore } from './store.js'
import { overlay } from '/js/utils/overlay.js'

export default {
	async created() {
		await suitStore.initialise()
	},

	viewCard(evt, scope) {
		// get the card that was clicked
		const cardTitle = scope.node.getAttribute('data-card')
		const card = suitStore.all.find(card => card.title === cardTitle)

		selectedCard.current = { ...card, isReversed: false }

		overlay.show()
	},
}
