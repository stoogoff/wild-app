
import { useState } from 'react'
import { useCharacter } from '~/hooks/character'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import TextInput from '~/components/inputs/TextInput'
import TextArea from '~/components/inputs/TextArea'
import Stepper from '~/components/buttons/Stepper'

const Finish = () => {
	// boilerplate
	const [loading, setLoading] = useState(false)
	const [character, updateCharacter] = useCharacter(setLoading)

	// page specific
	const setValue = attr => value => updateCharacter({ ...character, [attr]: value })

	console.log('character=', character)

	return <Layout title="6. Finishing Touches">
		<p>By now, you’ll have filled in the character sheet with Attributes, Abilities and Aspects. All that remains are the finishing touches. While some of these are not immediately important, they make them a more complete person. Give them a name, a bit of a background if you have one in mind, and what you imagine they look like.</p>
		<TextInput label="Name" value={ character.name } onChange={ setValue('name') } />
		<TextArea label="Background" value={ character.background } onChange={ setValue('background') } />
		<Stepper
			character={ character }
			next={ `/characters` }
			previous={ `/characters/${character.id}/aspects` }
			disabled={ !character.name }
		/>
	</Layout>
}

export default Finish
