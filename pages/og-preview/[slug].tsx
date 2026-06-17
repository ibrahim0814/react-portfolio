// Dev/build-only helper page. Renders the 1200x630 share card for a post so it
// can be screenshotted into /public/og/<slug>.png by `npm run gen:og`.
// Not linked from anywhere; safe to leave deployed.

import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getPostBySlug, formatDate, Post } from "../../lib/posts";
import OgCard from "../../components/OgCard";

type Props = { post: Post };

export default function OgPreview({ post }: Props) {
  return (
    <div style={{ margin: 0, width: 1200, height: 630, overflow: "hidden" }}>
      <OgCard
        seed={post.slug}
        title={post.title}
        eyebrow={formatDate(post.date)}
        subtitle="By Ibrahim Ali"
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  if (!post) return { notFound: true };
  return { props: { post } };
};
