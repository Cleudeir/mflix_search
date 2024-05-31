/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org", "cdn.dribbble.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movie/category/em-alta",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
