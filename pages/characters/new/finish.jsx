
import { useState } from 'react'
import {
	DEFAULT_CHARACTER,
} from '~/utils/config'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import TextInput from '~/components/inputs/TextInput'
import TextArea from '~/components/inputs/TextArea'

const Finish = () => {
	const [character, updateCharacter] = useState(DEFAULT_CHARACTER)

	const setValue = attr => value => updateCharacter({ ...character, [attr]: value })

	return <Layout title="6. Finishing Touches">
		<p>By now, you’ll have filled in the character sheet with Attributes, Abilities and Aspects. All that remains are the finishing touches. While some of these are not immediately important, they make them a more complete person. Give them a name, a bit of a background if you have one in mind, and what you imagine they look like.</p>
		<TextInput label="Name" value={ character.name } onChange={ setValue('name') } />
		<TextArea label="Background" value={ character.background } onChange={ setValue('background') } />
		<LinkButton>Finish</LinkButton>
	</Layout>
}

export default Finish
