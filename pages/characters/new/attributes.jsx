
import { useState } from 'react'
import {
	DEFAULT_CHARACTER,
	ATTRIBUTE_MAX,
	ATTRIBUTE_MIN,
	ATTRIBUTE_STARTING_MAX,
	ATTRIBUTES_STARTING,
} from '~/utils/config'

import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import Attribute from '~/components/Attribute'

const Attributes = () => {
	const [character, updateCharacter] = useState(DEFAULT_CHARACTER)
	const attrs = [character.attributes.Control, character.attributes.Strength, character.attributes.Focus, character.attributes.Passion]
	const remaining = ATTRIBUTES_STARTING - attrs.map(n => parseInt(n)).filter(n => !isNaN(n)).reduce((a, c) => a + c, 0)
	const setAttribute = attr => val => updateCharacter({ ...character, attributes: { ...character.attributes, [attr]: val }})

	const notAllValid = attrs.filter(a => a >= ATTRIBUTE_MIN && a <= ATTRIBUTE_MAX).length !== attrs.length

	return <Layout title="3: Attributes">
		<p>There are four Attributes which reflect how strong physically and emotionally you are, and how in control you are both physically and mentally. These Attributes are <strong>Control</strong>, <strong>Focus</strong>, <strong>Passion</strong> and <strong>Strength</strong>. They are rated between { ATTRIBUTE_MIN } and { ATTRIBUTE_MAX}, and you can allocate { ATTRIBUTES_STARTING } points between them. Attributes have a starting maximum value of { ATTRIBUTE_STARTING_MAX }</p>
		<h3 className={ remaining < 0 ? 'text-red-500' : 'text-green-500' }>Points remaining: { remaining }</h3>
		<Attribute
			title="Control"
			value={ character.attributes.Control }
			onChange={ setAttribute('Control') }
		>
			Control is about physical dexterity, coordination, accuracy and control.
		</Attribute>
		<Attribute
			title="Strength"
			value={ character.attributes.Strength }
			onChange={ setAttribute('Strength') }
		>
			Strength is all about physical strength, power, force and endurance.
		</Attribute>
		<Attribute
			title="Focus"
			value={ character.attributes.Focus }
			onChange={ setAttribute('Focus') }
		>
			Focus is all about thinking, mental reasoning, emotional restraint, and concentrating.
		</Attribute>
		<Attribute
			title="Passion"
			value={ character.attributes.Passion }
			onChange={ setAttribute('Passion') }
		>
			Passion is all about determination, mental force, emotional strength and imagination.
		</Attribute>
		<LinkButton href='/characters/new/abilities' disabled={ remaining !== 0 || notAllValid }>Next</LinkButton>
	</Layout>
}

export default Attributes


