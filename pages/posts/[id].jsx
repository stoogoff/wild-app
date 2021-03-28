
import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
	return <Layout>
		<Head>
			<title>{ postData.title }</title>
		</Head>
		<h1>{postData.title}</h1>
		{postData.id}
		<br />
		<Date dateString={ postData.date } />
		<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		<Link
			href="/"
			className="items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300"
			>Back 2</Link>
	</Layout>;
}

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
