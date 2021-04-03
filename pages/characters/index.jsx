
import { useState, useEffect} from 'react'
import Link from 'next/link'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'
import { allCharacters } from '~/lib/character'

const Characters = () => {
	const [characters, setCharacters] = useState([])

	useEffect(async () => {
		const result = await allCharacters()

		setCharacters(result)
	})

	return <Layout title="Characters">
		<p>Some blurb about creating a character.</p>
		<section>
			<ol>
				{ characters.map(character => <li key={ character.id }>
					<Link href={ `/characters/${character.id}` }>
						<a className="text-blue-600 underline">{ character.name || `Unnamed character (${character.id})` }</a>
					</Link>
				</li>) }
			</ol>
		</section>
		<LinkButton href='/characters/new'>New Character</LinkButton>
	</Layout>
}

export default Characters
