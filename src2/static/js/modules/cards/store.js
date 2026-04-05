
import { Emitter } from 'https://cdn.we-evolve.co.uk/js/q/utils/emitter.js'

class CardStore extends Emitter {
	#currentCard

	get currentCard() {
		return this.#currentCard
	}

	set currentCard(card) {
		this.#currentCard = card
		this.emit('change', card)
	}
}

export const cardStore = new CardStore()