
import { useState } from 'react'
import { createCharacter, saveCharacter } from '~/lib/character'
import { draw } from '~/lib/deck'
import Layout from '~/components/Layout'
import TextInput from '~/components/inputs/TextInput'
import LinkButton from '~/components/buttons/LinkButton'
import CardGrid from '~/components/cards/CardGrid'

const Persona = () => {
	const [cards, setCards] = useState([])
	const [selectedCard, setSelectedCard] = useState(null)
	const [character, updateCharacter] = useState(createCharacter())

	const setPersona = value => updateCharacter({ ...character, persona: { ...character.persona, text: value } })
	const drawCards = () => setCards([ ...draw(5) ])
	const toggleSelectedCard = card => {
		if(selectedCard && selectedCard.id === card.id) {
			setSelectedCard(null)
			updateCharacter({ ...character, persona: { ...character.persona, card: null } })
		}
		else {
			setSelectedCard(card)
			updateCharacter({ ...character, persona: { ...character.persona, card: card.id } })
		}
	}

	console.log('character=', character)

	return <Layout title="1. Persona" >
		<p>Define who your character is, determine the basic concept for who they are. Who they are and what they are like. This involves choosing a card from the WILD Tarot deck that best signifies your character.</p>
		<p>Use the button to draw some cards to inspire your character and use for your persona.</p>
		<CardGrid cards={ cards } selected={ selectedCard } toggleSelected={ toggleSelectedCard } />
		<LinkButton onClick={ drawCards }>Draw</LinkButton>
		<TextInput label="Persona" value={ character.persona.text } onChange={ setPersona } disabled={ selectedCard === null} />
		<hr/>
		<LinkButton href="/characters/new/shadow" onClick={ () => saveCharacter(character) } disabled={ selectedCard === null || character.persona === '' }>Next</LinkButton>
	</Layout>
}

export default Persona