
import { useState } from 'react'
import { DEFAULT_CHARACTER, ATTRIBUTE_MIN, ATTRIBUTE_MAX, ATTRIBUTES_STARTING } from '~/utils/config'

import Layout from '~/components/layout'
import Button from '~/components/button'
import Attribute from '~/components/attribute'

const Attributes = () => {
	const [character, updateCharacter] = useState(DEFAULT_CHARACTER)
	const attrs = [character.attributes.Control, character.attributes.Strength, character.attributes.Focus, character.attributes.Passion]
	const remaining = ATTRIBUTES_STARTING - attrs.map(n => parseInt(n)).filter(n => !isNaN(n)).reduce((a, c) => a + c, 0)
	const setAttribute = attr => val => updateCharacter({ ...character, attributes: { ...character.attributes, [attr]: val }})

	const notAllValid = attrs.filter(a => a >= ATTRIBUTE_MIN && a <= ATTRIBUTE_MAX).length !== attrs.length

	return <Layout title="3: Attributes">
		<p>The character has four Attributes - <strong>Control</strong>, <strong>Focus</strong>, <strong>Passion</strong> and <strong>Strength</strong> which are rated between { ATTRIBUTE_MIN } and { ATTRIBUTE_MAX}.</p>
		<h3 className={ remaining < 0 ? 'text-red-500' : 'text-green-500' }>Points remaining: { remaining }</h3>
		<Attribute
			onChange={ setAttribute('Control') }
			value={ character.attributes.Control }
			title="Control">
			Control is about physical dexterity, coordination, accuracy and control.
		</Attribute>
		<Attribute
			onChange={ setAttribute('Strength') }
			value={ character.attributes.Strength }
			title="Strength">
			Strength is all about physical strength, power, force and endurance.
		</Attribute>
		<Attribute
			onChange={ setAttribute('Focus') }
			value={ character.attributes.Focus }
			title="Focus">
			Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.
		</Attribute>
		<Attribute
			onChange={ setAttribute('Passion') }
			value={ character.attributes.Passion }
			title="Passion">
			Passion is all about determination, mental force, emotional strength and imagination.
		</Attribute>
		<Button href='/characters/new/abilities' disabled={ remaining !== 0 || notAllValid }>Next</Button>
	</Layout>
}

export default Attributes


