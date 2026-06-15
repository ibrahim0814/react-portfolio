import Head from "next/head";
import Link from "next/link";
import { getAllPosts, formatDate, Post } from "../../lib/posts";

type Props = { posts: Post[] };

export default function Blog({ posts }: Props) {
  return (
    <div className="min-h-screen bg-[#242424] text-white">
      <Head>
        <title>{`Blog — Ibrahim Ali (Darugar)`}</title>
        <meta
          name="description"
          content="Writing by Ibrahim Ali (Darugar)."
        />
      </Head>

      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href="/"
          className="text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
        >
          ← Home
        </Link>

        <h1 className="mt-10 text-4xl font-semibold text-gray-300">Blog</h1>

        <ul className="mt-12 space-y-12">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <p className="text-sm uppercase tracking-widest text-gray-500">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-[#f7ab0a]"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-base text-gray-400">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm uppercase tracking-widest text-[#f7ab0a] transition-opacity hover:opacity-80"
                >
                  Read more →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return { props: { posts: getAllPosts() } };
}
