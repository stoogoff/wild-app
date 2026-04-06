
import { selectedCard, deck } from './store.js'
import { overlay } from '/js/utils/overlay.js'

export default {
	computed: {
		title() {
			return selectedCard.current?.title ?? ''
		},
		image() {
			return `/img/cards/${selectedCard.current?.image ?? ''}`
		},
		imageCss() {
			return selectedCard.current?.isReversed ? 'reversed' : ''
		},
	},

	async created() {
		await deck.initialise()

		this.drawCard()
	},

	drawCard(evt) {
		const card = deck.random()

		selectedCard.current = { ...card, isReversed: Math.random() > 0.6 }

		this.emit('change')

		evt.stopPropagation()
	},

	viewCard(evt, scope) {
		overlay.show()
	},
}
