
import { useState } from 'react'
import { useCharacter } from '~/hooks/character'
import { draw } from '~/lib/deck'
import Layout from '~/components/Layout'
import TextInput from '~/components/inputs/TextInput'
import LinkButton from '~/components/buttons/LinkButton'
import Card from '~/components/cards/Card'
import Stepper from '~/components/buttons/Stepper'

const Shadow = () => {
	// boilerplate
	const [loading, setLoading] = useState(false)
	const [character, updateCharacter] = useCharacter(setLoading)

	// page specific
	const [selectedCard, setSelectedCard] = useState(null)

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
		<Stepper
			character={ character }
			next={ `/characters/${character.id}/attributes` }
			previous={ `/characters/${character.id}/persona` }
			disabled={ character.shadow.text === '' }
		/>
	</Layout>
}

export default Shadow