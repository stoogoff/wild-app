import Head from 'next/head'
import Layout from '~/components/Layout'

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
