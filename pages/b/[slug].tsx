import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import BlogHeader from "../../components/BlogHeader";
import { SITE_URL, ogImage } from "../../lib/site";
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
        <title>{post.title}</title>
        <meta property="og:site_name" content="Ibrahim Ali" />
        <meta name="description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`${SITE_URL}/b/${post.slug}`} />
        <meta property="og:image" content={ogImage(post.slug)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={ogImage(post.slug)} />
      </Head>

      <main className="mx-auto max-w-2xl px-6 py-20">
        <Link
          href="/b"
          className="text-sm uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
        >
          ← Blog
        </Link>

        <BlogHeader
          seed={post.slug}
          title={post.title}
          ratio={16 / 6}
          className="mt-10 overflow-hidden rounded-2xl ring-1 ring-white/5"
        />

        <article className="mt-10">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-gray-200">
            {post.title}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-widest text-gray-500">
            By Ibrahim Ali
          </p>

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
