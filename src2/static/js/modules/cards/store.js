
import { ListStore } from 'q/data/list-store.js'
import { Emitter } from 'q/utils/emitter.js'
import { shuffle } from 'q/utils/list.js'

class ObjectStore extends Emitter {
	#current

	get current() {
		return this.#current
	}

	set current(card) {
		this.#current = card
		this.emit('change', card)
	}
}

class RemoteStore extends ListStore {
	#path
	#initialised = false

	constructor(path, key = 'id') {
		super([], key)

		this.#path = path
	}

	async initialise() {
		if(this.#initialised) return

		const response = await fetch(this.#path)
		const data = await response.json()

		this.addRange(data.map(card => ({ ...card, imagePath: `/img/cards/${card.image}` })))
		this.#initialised = true
	}
}

export const deck = {
	control: new RemoteStore('/data/control.json', 'title'),
	focus: new RemoteStore('/data/focus.json', 'title'),
	strength: new RemoteStore('/data/strength.json', 'title'),
	passion: new RemoteStore('/data/passion.json', 'title'),
	'major-arcana': new RemoteStore('/data/major-arcana.json', 'title'),

	initialise: async () => {
		await Promise.all([
			deck.control.initialise(),
			deck.focus.initialise(),
			deck.strength.initialise(),
			deck.passion.initialise(),
			deck['major-arcana'].initialise(),
		])
	},

	all: () => {
		return [
			...deck.control.all,
			...deck.focus.all,
			...deck.strength.all,
			...deck.passion.all,
			...deck['major-arcana'].all,
		]
	},

	shuffle: () => {
		return shuffle(deck.all()).map(card => ({ ...card, isReversed: Math.random() > 0.6 }))
	},

	draw(amount = 1) {
		let drawn = []
		let shuffled = deck.shuffle()

		do {
			if(shuffled.length === 0) shuffled = deck.shuffle()

			drawn.push(shuffled.pop())

		} while(--amount > 0)

		return drawn
	},

	drawOne() {
		return deck.draw()[0]
	}
}

export const selectedCard = new ObjectStore()
