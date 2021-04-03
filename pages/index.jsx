
import { useState, useEffect } from 'react'

import Head from 'next/head'
import Layout from '~/components/Layout'
import LoadingButton from '~/components/buttons/LoadingButton'


import { firestoreTestCreate, firestoreTestRead } from '~/lib/character'

export default function Home({ allPostsData }) {
	const [content, setContent] = useState([])
	const [loading, setLoading] = useState(false)


	const clickHandler = async () => {
		setLoading(true)
		const result = await firestoreTestCreate()

		setContent([ ...content, result ])
		setLoading(false)
	}

	useEffect(async () => {
		setLoading(true)
		const result = await firestoreTestRead()

		setContent(result)
		setLoading(false)
	}, [])

	return (
		<Layout title="Home">
			<Head>
				<title>Home</title>
			</Head>
			<ul>
				{ content.map(item => <li key={ item.id }>{ item.first } { item.last }</li>)}
			</ul>
			<LoadingButton loading={ loading } onClick={ clickHandler }>Test</LoadingButton>
		</Layout>
	);
}
