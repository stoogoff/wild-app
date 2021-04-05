
import { useState, useEffect} from 'react'
import Link from 'next/link'
import Layout from '~/components/Layout'
import Button from '~/components/buttons/Button'
import { allCharacters } from '~/lib/character'

const Characters = () => {
	const [characters, setCharacters] = useState([])

	useEffect(async () => {
		const result = await allCharacters()

		setCharacters(result)
	}, [])

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
		<Button href='/characters/new'>New Character</Button>
	</Layout>
}

export default Characters
