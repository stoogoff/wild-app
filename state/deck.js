
import Vue from 'vue'
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
	//...major,
].map(card => ({ ...card, id: card.title.toLowerCase().replace(/\s+/g, '-'), isReversed: false }))

const getShuffledDeck = () => shuffle(DECK).map(card => ({ ...card, isReversed: Math.random() > 0.6 }))


const state = Vue.observable({
	cards: DECK,
	shuffled: getShuffledDeck(),
})


// getters
export const getCardById = id => state.cards.find(card => card.id === id)

export const getSuit = suit => state.cards.filter(card => card.suit.toLowerCase().replace(' ', '-') === suit)

// actions
export const drawCards = (amount = 1) => {
	let drawn = []
	let shuffled = [ ...state.shuffled ]

	do {
		if(shuffled.length === 0) shuffled = [ ...getShuffledDeck() ]

		drawn.push(shuffled.pop())

	} while(--amount > 0)

	state.shuffled = shuffled

	return drawn
}

export const drawOne = () => {
	return drawCards()[0]
}
