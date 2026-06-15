import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  Post,
} from "../../lib/posts";

type Props = { post: Post };

export default function BlogPost({ post }: Props) {
  return (
    <div className="min-h-screen bg-[#242424] text-white">
      <Head>
        <title>{`${post.title} — Ibrahim Ali (Darugar)`}</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href="/b"
          className="text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
        >
          ← Blog
        </Link>

        <article className="mt-10">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-gray-200">
            {post.title}
          </h1>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-gray-300">
            {post.content.map((block, i) => {
              if (block.type === "p") {
                return <p key={i}>{block.text}</p>;
              }
              return (
                <ol key={i} className="list-decimal space-y-6 pl-6 marker:text-[#f7ab0a]">
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <span className="font-semibold text-white">
                        {item.heading}
                      </span>
                      <p className="mt-2">{item.body}</p>
                    </li>
                  ))}
                </ol>
              );
            })}
          </div>
        </article>

        <div className="mt-16 border-t border-[#333333] pt-8">
          <Link
            href="/b"
            className="text-sm uppercase tracking-widest text-[#f7ab0a] transition-opacity hover:opacity-80"
          >
            ← Back to all posts
          </Link>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPosts().map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};
