module.exports = {
  siteMetadata: {
    title: `Open Monetization Wallet`,
    description: `Tools for managing a vanity Web Monetization wallet`,
    author: `@signalnerve`,
    version: process.env && process.env.OMW_VERSION ? process.env.OMW_VERSION : 'development'
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `open-monetization-wallet`,
        short_name: `omw`,
        start_url: `/admin`,
        background_color: `#22543D`,
        theme_color: `#22543D`,
        display: `minimal-ui`,
        icon: `static/logo.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
