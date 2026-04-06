
import { selectedCard, deck } from './store.js'
import { overlay } from '/js/utils/overlay.js'

export default {
	data: {
		suit: null,
	},

	async created() {
		this.data.suit = this.node.getAttribute('data-suit')

		await deck[this.data.suit].initialise()
	},

	viewCard(evt, scope) {
		const cardTitle = scope.node.getAttribute('data-card')
		const card = deck[this.data.suit].all.find(card => card.title === cardTitle)

		selectedCard.current = { ...card, isReversed: false }

		overlay.show()
	},
}
