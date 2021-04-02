
import { useState } from 'react'
import { createCharacter } from '~/lib/character'
import { draw } from '~/lib/deck'
import Layout from '~/components/Layout'
import TextInput from '~/components/inputs/TextInput'
import LinkButton from '~/components/buttons/LinkButton'
import Card from '~/components/cards/Card'

const Shadow = () => {
	const [selectedCard, setSelectedCard] = useState(null)
	const [character, updateCharacter] = useState(createCharacter())

	const setShadow = value => updateCharacter({ ...character, shadow: { ...character.shadow, text: value } })
	const drawCard = () => {
		const card = { ...draw(1)[0] }

		setSelectedCard(card)
		updateCharacter({ ...character, persona: { ...character.shadow, card: card.id } })
	}

	console.log('character=', character)

	return <Layout title="2. Shadow" >
		<p>The next card in the WILD Tarot drawn gives you some ideas what is holding you back, or getting in your way. This is your Shadow.</p>
		<p>Use the button to draw some cards to inspire your character and use for your shadow.</p>
		{ selectedCard ? <Card { ...selectedCard } /> : null }
		<LinkButton onClick={ drawCard }>Draw</LinkButton>
		<TextInput label="Shadow" value={ character.shadow.text } onChange={ setShadow } disabled={ selectedCard === null} />
		<hr/>
		<LinkButton href="/characters/new/attributes" disabled={ selectedCard === null }>Next</LinkButton>
	</Layout>
}

export default Shadow