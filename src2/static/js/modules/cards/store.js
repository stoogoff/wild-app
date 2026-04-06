
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

export const suitStore = new RemoteStore('/data/control.json', 'title')
export const selectedCard = new ObjectStore()
