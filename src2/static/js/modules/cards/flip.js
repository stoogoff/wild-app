
import { head, tail } from 'q/utils/list.js'
import { overlay } from '/js/utils/overlay.js'
import { selectedCard } from './store.js'

export default {
	computed: {
		title() {
			return selectedCard.current?.title ?? ''
		},
		image() {
			return selectedCard.current?.imagePath ?? ''
		},
		keyMeaning() {
			return head(selectedCard.current?.meanings ?? [])
		},
		otherMeanings() {
			return tail(selectedCard.current?.meanings ?? []).join(', ')
		},
		keyReversedMeaning() {
			return head(selectedCard.current?.reversed ?? [])
		},
		otherReversedMeaning() {
			return tail(selectedCard.current?.reversed ?? []).join(', ')
		},
		isReversed() {
			return selectedCard.current?.isReversed ?? false
		},
		infoCss() {
			return selectedCard.current?.isReversed ? 'card-info' : 'card-info active'
		},
		infoReversedCss() {
			return selectedCard.current?.isReversed ? 'card-info active' : 'card-info'
		},
		imageCss() {
			return selectedCard.current?.isReversed ? 'card-front reversed' : 'card-front'
		},
	},

	mounted() {
		selectedCard.on('change', () => this.emit('change'))
		overlay.on('hide', () => this.node.firstElementChild.classList.remove('flipped'))
	},

	flipCard(evt, context) {
		context.node.classList.toggle('flipped')
		evt.stopPropagation()
	},

	closeCard(evt, context) {
		overlay.hide()
		evt.stopPropagation()
	}
}
