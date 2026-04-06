
import { selectedCard } from './store.js'
import { head, tail } from '/js/utils/list.js'
import { overlay } from '/js/utils/overlay.js'

export default {
	computed: {
		title() {
			return selectedCard.current?.title ?? ''
		},
		image() {
			return `/img/cards/${selectedCard.current?.image ?? ''}`
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

	flipCard(evt, scope) {
		scope.node.classList.toggle('flipped')
		evt.stopPropagation()
	},

	closeCard(evt, scope) {
		overlay.hide()
		evt.stopPropagation()
	}
}
