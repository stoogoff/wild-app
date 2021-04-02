
import Head from 'next/head'
import Image from 'next/image'

import { getContentIds, getContent } from '~/lib/content'
import { getSuit } from '~/lib/deck'
import Layout from '~/components/Layout'
import Card from '~/components/Card'

const Suit = ({ suit, cards }) => (
	<Layout title={ suit.title }>
		<h1 className="p-2 text-center">{ suit.title }</h1>
		<div dangerouslySetInnerHTML={{ __html: suit.contentHtml }} />
		<hr />
		{ cards.map(card => <Card key={ card.id } { ...card } />)}
	</Layout>
)

export default Suit;

export const getStaticPaths = () => (
	{
		paths: getContentIds('suit'),
		fallback: false
	}
)

export const getStaticProps = async ({ params }) => (
	{
		props: {
			suit: await getContent(params.id),
			cards: getSuit(params.id),
		},
	}
)
