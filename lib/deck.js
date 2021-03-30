
import shuffle from 'lodash/shuffle'
import control from '~/public/data/control.json'
import focus from '~/public/data/focus.json'
import passion from '~/public/data/passion.json'

const DECK = [ ...passion, ...control, ...focus ].map(card => ({ ...card, id: card.title.toLowerCase().replace(/\s+/g, '-') }))

export const getSortedDeck = () => DECK

// TODO this needs to be able to invert the cards
export const getShuffledDeck = () => shuffle(DECK)

export const getCardIds = () => DECK.map(card => (
	{
		params: {
			id: card.id,
		},
	}
))

export const getSuit = (suit) => DECK.filter(card => card.suit.toLowerCase() === suit)

export const getCard = (id) => DECK.find(card => card.id === id)
