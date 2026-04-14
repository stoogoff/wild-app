
import { Emitter } from 'q/utils/emitter.js'

class Overlay extends Emitter {
	#overlay

	constructor(id) {
		super()

		this.#overlay = document.getElementById(id)

		if(this.#overlay) {
			this.#overlay.onclick = () => this.hide()
		}
	}

	show() {
		if(!this.#overlay) return

		this.#overlay.classList.remove('hidden')
		this.emit('show')
	}

	hide() {
		if(!this.#overlay) return

		this.#overlay.classList.add('hidden')
		this.emit('hide')
	}
}

export const overlay = new Overlay('overlay')
