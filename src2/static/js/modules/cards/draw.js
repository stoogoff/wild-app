
import { selectedCard, deck } from './store.js'
import { overlay } from '/js/utils/overlay.js'

export default {
	data: {
		cards: [],
	},

	async created() {
		await deck.initialise()
	},

	draw(evt, scope) {
		const amount = parseInt(scope.node.getAttribute('data-cards') || 1)
		const cards = deck.draw(amount)

		this.data.cards = [...cards, ...this.data.cards]
	},

	viewCard(evt, scope) {
		console.log('viewCard', scope)
		overlay.show()
	},
}