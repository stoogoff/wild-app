
import { cardStore } from './store.js'
import { head, tail } from '/js/utils/list.js'

export default {
	data: {
		card: null
	},

	computed: {
		title() {
			return this.data.card?.title ?? ''
		},
		image() {
			return `/img/cards/${this.data.card?.image ?? ''}`
		},
		keyMeaning() {
			return head(this.data.card?.meanings ?? [])
		},
		otherMeanings() {
			return tail(this.data.card?.meanings ?? []).join(', ')
		},
		keyReversedMeaning() {
			return head(this.data.card?.reversed ?? [])
		},
		otherReversedMeaning() {
			return tail(this.data.card?.reversed ?? []).join(', ')
		},
		isReversed() {
			return this.data.card?.isReversed ?? false
		},
		infoCss() {
			const result = this.data.card?.isReversed === false ? 'card-info active' : 'card-info'
			console.log('infoCss', result, this.data.card?.isReversed)
			return result
		},
		infoReversedCss() {
			const result = this.data.card?.isReversed === true ? 'card-info active' : 'card-info'
			console.log('infoReversedCss', result, this.data.card?.isReversed)
			return result
		},
		imageCss() {
			const result = this.data.card?.isReversed === false ? 'card-front' : 'card-front reversed'
			console.log('imageCss', result, this.data.card?.isReversed)
			return result
		},
	},

	created() {
		cardStore.on('change', () => {
			this.data.card = cardStore.currentCard
			console.log(this.data.card)
			this.emit('change')
		})
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
