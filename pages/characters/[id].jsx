
import { useState } from 'react'
import { useCharacter } from '~/hooks/character'
import Layout from '~/components/Layout'

const CharacterView = () => {
	const [loading, setLoading] = useState(false)
	const [character] = useCharacter(setLoading)

	return <Layout title={ character.name || 'Unnamed Character' }>
		<section>
			{ character.description ? <p>{ character.description }</p> : null }
			
			</section>
		<section>
			<h3>Attributes</h3>
			<ul>
				{ Object.keys(character.attributes).map(attr => <li><strong>{ attr }:</strong> { character.attributes[attr] }</li>) }
			</ul>
		</section>
		<section>
			<h3>Abilities</h3>
			<ul>
				{ Object.keys(character.abilities).map(attr => <li><strong>{ attr }:</strong> { character.abilities[attr] }</li>) }
			</ul>
		</section>
	</Layout>
}

export default CharacterView