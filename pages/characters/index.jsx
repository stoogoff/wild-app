
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'

const Characters = () => {
	return <Layout title="Characters">
		<p>Some blurb about creating a character.</p>
		<section>
			<LinkButton href='/characters/new'>New Character</LinkButton>
		</section>
	</Layout>
}

export default Characters

/*

Persona (card)
Shadow (card)
Attributes (Focus, etc, pick a number)
Abilities (Guardian etc, pick a number)
Aspects



*/