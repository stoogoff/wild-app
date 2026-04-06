
import { cardStore } from './store.js'
import { head, tail } from '/js/utils/list.js'

export default {
	computed: {
		title() {
			return cardStore.currentCard?.title ?? ''
		},
		image() {
			return `/img/cards/${cardStore.currentCard?.image ?? ''}`
		},
		keyMeaning() {
			return head(cardStore.currentCard?.meanings ?? [])
		},
		otherMeanings() {
			return tail(cardStore.currentCard?.meanings ?? []).join(', ')
		},
		keyReversedMeaning() {
			return head(cardStore.currentCard?.reversed ?? [])
		},
		otherReversedMeaning() {
			return tail(cardStore.currentCard?.reversed ?? []).join(', ')
		},
		isReversed() {
			return cardStore.currentCard?.isReversed ?? false
		},
		infoCss() {
			return cardStore.currentCard?.isReversed ? 'card-info' : 'card-info active'
		},
		infoReversedCss() {
			return cardStore.currentCard?.isReversed ? 'card-info active' : 'card-info'
		},
		imageCss() {
			return cardStore.currentCard?.isReversed ? 'card-front reversed' : 'card-front'
		},
	},

	mounted() {
		cardStore.on('change', () => this.emit('change'))
	},

	flipCard(evt, scope) {
		scope.node.classList.toggle('flipped')
		evt.stopPropagation()
	},

	closeCard(evt, scope) {
		scope.scope.node.classList.add('hidden')
		evt.stopPropagation()
	}
}
