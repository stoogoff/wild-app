
import { cardStore } from './store.js'

export default {
	data: {},

	async created() {
		const suit = this.node.getAttribute('data-suit')
		const response = await fetch(`/data/${suit}.json`)
		const data = await response.json()

		this.data.cards = data
	},

	viewCard(evt, scope) {
		// get the card that was clicked
		const cardTitle = scope.node.getAttribute('data-card')
		const selectedCard = this.data.cards.find(card => card.title === cardTitle)

		cardStore.currentCard = { ...selectedCard, isReversed: false }

		// open the overlay
		const overlays = document.getElementsByClassName('overlay')

		Array.from(overlays).forEach(node => {
			node.classList.remove('hidden')
			node.onclick = () => node.classList.add('hidden')
		})
	},
}
