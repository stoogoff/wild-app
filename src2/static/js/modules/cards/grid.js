
import { overlay } from '/js/utils/overlay.js'
import { selectedCard, deck } from './store.js'

export default {
	data: {
		suit: null,
	},

	async created() {
		this.data.suit = this.node.getAttribute('data-suit')

		await deck[this.data.suit].initialise()
	},

	viewCard(evt, context) {
		const cardTitle = context.node.getAttribute('data-card')
		const card = deck[this.data.suit].all.find(card => card.title === cardTitle)

		selectedCard.current = { ...card, isReversed: false }

		overlay.show()
	},
}
