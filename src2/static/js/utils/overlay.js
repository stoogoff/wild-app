
import { Emitter } from 'https://cdn.we-evolve.co.uk/js/q/v1.0.0/utils/emitter.js'

class Overlay extends Emitter {
	#overlay

	constructor(id) {
		super()

		this.#overlay = document.getElementById(id)
		this.#overlay.onclick = () => this.hide()
	}

	show() {
		this.#overlay.classList.remove('hidden')
		this.emit('show')
	}

	hide() {
		this.#overlay.classList.add('hidden')
		this.emit('hide')
	}
}

export const overlay = new Overlay('overlay')
