/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://wasgeurtje.nl",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://wasgeurtje.nl/sitemap.xml',
    ],
  },
  exclude: ['/404', '/500'],
  outDir: './public',
} 