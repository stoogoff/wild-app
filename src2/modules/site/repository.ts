
import suits from '../../static/data/suits.json' with { type: 'json' }
import control from '../../static/data/control.json' with { type: 'json' }
import focus from '../../static/data/focus.json' with { type: 'json' }
import passion from '../../static/data/passion.json' with { type: 'json' }
import strength from '../../static/data/strength.json' with { type: 'json' }
import major from '../../static/data/major-arcana.json' with { type: 'json' }

export class CardRepository {
	constructor() {}

	getSuits() {
		return suits
	}

	getSuit(id: string) {
		return suits.find(suit => suit.id === id)
	}

	getCards(id: string) {
		switch(id) {
			case 'control': return control
			case 'focus': return focus
			case 'passion': return passion
			case 'strength': return strength
			case 'major-arcana': return major
		}
	}
}
