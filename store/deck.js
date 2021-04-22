
import shuffle from 'lodash/shuffle'
import control from '~/static/data/control.json'
import focus from '~/static/data/focus.json'
import passion from '~/static/data/passion.json'
import strength from '~/static/data/strength.json'
import major from '~/static/data/major-arcana.json'

const DECK = [
	...passion,
	...control,
	...focus,
	...strength,
	...major,
].map(card => ({ ...card, id: card.title.toLowerCase().replace(/\s+/g, '-') }))

const getShuffledDeck = () => shuffle(DECK)


export const state = () => ({
	cards: DECK,
	shuffled: getShuffledDeck(),
})

export const getters = {
	getCard: (state) => id => state.cards.find(card => card.id === id),

	getSuit: (state) => suit => state.cards.filter(card => card.suit.toLowerCase().replace(' ', '-') === suit),
}

export const mutations = {
	setShuffled(state, shuffled) {
		state.shuffled = shuffled
	}
}

export const actions = {
	draw: ({ commit, state }, amount = 1) => {
		let drawn = []
		let shuffled = [ ...state.shuffled ]

		do {
			if(shuffled.length === 0) shuffled = [ ...getShuffledDeck() ]

			drawn.push(shuffled.pop())

		} while(--amount > 0)

		commit('setShuffled', shuffled)

		return drawn
	}
}





/*let shuffledDeck = []

export const getSortedDeck = () => DECK


export const getCardIds = () => DECK.map(card => (
	{
		params: {
			id: card.id,
		},
	}
))

export const getSuit = (suit) => DECK.filter(card => card.suit.toLowerCase() === suit)

export const getCard = (id) => DECK.find(card => card.id === id)

export const draw = (amount = 1) => {
	let drawn = []

	do {
		if(shuffledDeck.length === 0) shuffledDeck = getShuffledDeck()

		drawn.push(shuffledDeck.pop())

	} while(--amount > 0)

	return drawn
}
*/