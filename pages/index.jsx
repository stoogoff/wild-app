import Head from 'next/head'
import Link from 'next/link'
import Layout from '~/components/layout'

export default function Home({ allPostsData }) {
	return (
		<Layout title="Home">
			<Head>
				<title>Home</title>
			</Head>
			HELLO
		</Layout>
	);
}
