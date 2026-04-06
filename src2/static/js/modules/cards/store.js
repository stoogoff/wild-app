
import { Emitter } from 'https://cdn.we-evolve.co.uk/js/q/v1.0.0/utils/emitter.js'
import { ListStore } from 'https://cdn.we-evolve.co.uk/js/q/v1.0.0/data/list-store.js'

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

		this.addRange(data)
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

	random: () => {
		const cards = deck.all()

		return cards[Math.floor(Math.random() * cards.length)]
	}

}

export const selectedCard = new ObjectStore()
