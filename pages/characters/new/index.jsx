
import { createCharacter } from '~/lib/character'
import Layout from '~/components/Layout'
import LinkButton from '~/components/buttons/LinkButton'

const NewCharacter = () => <Layout title="Create New Character">
		<section>
			<ol className="list">
				<li><strong>Persona</strong> &mdash; Define who your character is, determine the basic concept for who they are. Who they are and what they are like.</li>
				<li><strong>Shadow</strong> &mdash; Define what is holding your character back.</li>
				<li><strong>Attributes</strong> &mdash; There are four Attributes which reflect how strong physically and emotionally you are, and how in control you are both physically and mentally.</li>
				<li><strong>Abilities</strong> &mdash; There are five Abilities which reflect the characters talents, skills and training.</li>
				<li><strong>Aspects</strong> &mdash; Choose a handful of Aspects that help to define your characters strengths and weaknesses.</li>
				<li><strong>Finishing Touches</strong> &mdash; Name, description, image.</li>
			</ol>
		</section>
		<LinkButton href="/characters/new/persona" onClick={ createCharacter }>Start</LinkButton>
	</Layout>

export default NewCharacter
