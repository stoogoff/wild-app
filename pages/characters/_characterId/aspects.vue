
import { useState } from 'react'
import { useGetCharacterById } from '~/hooks/character'
import { ASPECTS_MIN } from '~/utils/config'
import Layout from '~/components/Layout'
import TextInput from '~/components/inputs/TextInput'
import Stepper from '~/components/buttons/Stepper'

const Aspects = () => {
	// boilerplate
	const [loading, setLoading] = useState(false)
	const [character, updateCharacter] = useGetCharacterById(setLoading)

	if(loading) return <div>Loading</div>

	// page specific
	const setAspect = index => value => {
		const aspects = [ ...character.aspects ]

		aspects[index]  = value
		updateCharacter({ ...character, aspects })
	}

	console.log('character=', character)
	const aspectsSet = character.aspects ? character.aspects.filter(aspect => !!aspect).length >= ASPECTS_MIN : false


	return <Layout title="5: Aspects">
		<p>Choose a handful of Aspects that help to define your characters strengths and weaknesses. Aspects are simple phrases that, if applicable to a situation, make the task easier or harder. Characters usually start with two or three.</p>
		<p>Some example aspects:</p>
		<ul className="list">
			<li>Devilishly Handsome</li>
			<li>Quick Tempered</li>
			<li>Overly Cautious</li>
			<li>Stickler for Detail</li>
			<li>Superstitious</li>
			<li>Addictive Personality</li>
			<li>Likes a Drink</li>
			<li>Afraid of Spiders</li>
			<li>Hates Guns</li>
			<li>Can’t Drive</li>
			<li>Allergic to Dogs</li>
		</ul>
		<div>
			{ character.aspects.map((aspect, idx) => <TextInput label="Aspect" value={ aspect } onChange={ setAspect(idx) } />) }
		</div>
		<Stepper
			character={ character }
			next={ `/characters/${character.id}/finish` }
			previous={ `/characters/${character.id}/abilities` }
			disabled={ !aspectsSet }
		/>
	</Layout>
}

export default Aspects
