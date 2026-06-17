// Lists post slugs so the OG image generator knows what to render.
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "../../lib/posts";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getAllPosts().map((p) => p.slug));
}
