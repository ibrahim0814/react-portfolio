/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["drive.google.com"],
    // Serve images as-is. Netlify deploy previews don't run Next.js's
    // /_next/image optimizer, which 404s every next/image; unoptimized
    // serves the static files directly and works on both Netlify and Vercel.
    unoptimized: true,
  },
};

module.exports = nextConfig;
