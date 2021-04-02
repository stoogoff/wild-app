
import { useState } from 'react'
import { createCharacter } from '~/lib/character'
import { ASPECTS_MIN } from '~/utils/config'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import TextInput from '~/components/inputs/TextInput'

const Aspects = () => {
	const [character, updateCharacter] = useState(createCharacter())
	const setAspect = index => value => {
		const aspects = [ ...character.aspects ]

		aspects[index]  = value
		updateCharacter({ ...character, aspects })
	}

	const aspectsSet = character.aspects.filter(aspect => !!aspect).length >= ASPECTS_MIN

	console.log('character=', character)

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
		<LinkButton href="/characters/new/finish" disabled={ !aspectsSet }>Next</LinkButton>
	</Layout>
}

export default Aspects
