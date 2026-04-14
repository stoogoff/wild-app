
import { overlay } from '/js/utils/overlay.js'
import { selectedCard, deck } from './store.js'

export default {
	computed: {
		title() {
			return selectedCard.current?.title ?? ''
		},
		image() {
			return selectedCard.current?.imagePath ?? ''
		},
		imageCss() {
			return selectedCard.current?.isReversed ? 'reversed' : ''
		},
	},

	async created() {
		await deck.initialise()

		this.drawCard()
	},

	drawCard(evt, context) {
		selectedCard.current = deck.drawOne()

		this.emit('change')

		if(evt) evt.stopPropagation()
	},

	viewCard(evt, context) {
		overlay.show()
	},
}
