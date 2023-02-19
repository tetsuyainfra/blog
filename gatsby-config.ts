import type { GatsbyConfig } from 'gatsby'
import { title } from 'process'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `tetsuyainfraの隠れ家`,
    titleFormat: `| tetsuyainfra.github.io`,
    siteUrl: `https://tetsuyainfra.github.io`,
    timeZone: `Asia/Tokyo`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-bundle-stats',
      options: {
        compare: true,
        outDir: '../artifacts',
        stats: {
          context: './src',
        },
      },
    },
    'gatsby-plugin-emotion',
    // "gatsby-plugin-google-gtag",
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './contents/blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'links',
        path: './contents/links',
        ignore: [`**/\.*`],
      },
    },
  ],
}

export default config
