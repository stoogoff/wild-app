
import Link from 'next/link'

import { getAllContent } from '~/lib/content'
import Layout from '~/components/Layout'

const Suits = ({ suits }) => {
	return <Layout title="Cards">
		{ suits.map(suit => <h2 key={ suit.id }><Link href={ `tarot/${suit.id}` }>{ suit.title }</Link></h2>) }
	</Layout>;
}

export default Suits;

export const getStaticProps = () => (
	{
		props: {
			suits: getAllContent('suit')
		}
	}
)