import Head from 'next/head';
import Link from 'next/link';
import Layout from '~/components/layout';
import { getSortedPostsData } from '~/lib/posts';

export default function Home({ allPostsData }) {
  return (
    <Layout title="Home">
      <main>
        <h1>
          Index
        </h1>
        <p>Link to <Link href="posts/first-post">First Post</Link></p>

      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link  href={`/posts/${id}`}><a className="items-center justify-center w-9 h-9 rounded-md text-gray-400 border border-gray-300 py-2 px-3">{title}</a></Link>
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      </main>


    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}