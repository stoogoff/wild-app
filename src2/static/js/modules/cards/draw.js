
import { overlay } from '/js/utils/overlay.js'
import { selectedCard, deck } from './store.js'

export default {
	data: {
		cards: [],
	},

	computed: {
		canRemoveAll() {
			return this.data.cards.length > 0
		},
	},

	async created() {
		await deck.initialise()
	},

	draw(evt, context) {
		const amount = parseInt(context.node.getAttribute('data-cards') || 1)
		const cards = deck.draw(amount)

		this.data.cards = [...cards, ...this.data.cards]
	},

	viewCard(evt, context) {
		selectedCard.current = context.scope.data
		overlay.show()
	},

	removeAll() {
		this.data.cards = []
	},
}
