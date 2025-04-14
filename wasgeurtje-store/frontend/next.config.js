/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'medusa-public-images.s3.eu-west-1.amazonaws.com',
      'medusa-server-test.s3.amazonaws.com',
      // Add production image domains when available
    ],
  },
  i18n: {
    locales: ['nl', 'de', 'en'],
    defaultLocale: 'nl',
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 