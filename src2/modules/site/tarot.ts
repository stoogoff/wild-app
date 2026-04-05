
import { Context, Router, View } from '@oak/oak'
import { route, Controller, PageModel } from '../../mvc/index.ts'
import { CardRepository } from './repository.ts'

export class TarotController extends Controller {
	constructor(view: View, private readonly repository: CardRepository) {
		super(view)
	}

	@route('/tarot')
	async index() {
		const suits = this.repository.getSuits()

		return await this.render('tarot/index', new PageModel({
			title: 'Tarot | ',
		}, suits))
	}

	@route('/tarot/:suit')
	async suit() {
		const name = this.context?.params.suit
		const suit = this.repository.getSuit(name)
		const cards = this.repository.getCards(name)

		return await this.render('tarot/suit', new PageModel({
			title: `${suit.title} | `,
		}, {
			suit,
			cards,
		}))
	}
}
