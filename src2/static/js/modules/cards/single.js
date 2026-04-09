
import { selectedCard, deck } from './store.js'
import { overlay } from '/js/utils/overlay.js'

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

	drawCard(evt) {
		selectedCard.current = deck.drawOne()

		this.emit('change')

		if(evt) evt.stopPropagation()
	},

	viewCard(evt, scope) {
		overlay.show()
	},
}
