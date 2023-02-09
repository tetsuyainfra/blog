import type { GatsbyConfig } from 'gatsby'
import remarkGfm from 'remark-gfm'

const wrapESMPlugin = (name: string) =>
  function wrapESM(opts: any) {
    return async (...args: any) => {
      const mod = await import(name)
      const plugin = mod.default(opts)
      return plugin(...args)
    }
  }

const config: GatsbyConfig = {
  siteMetadata: {
    title: `tetsuyainfra 日々是好日`,
    description: 'tetsuyainfraの隠れ家',
    siteUrl: `https://tetsuyainfra.github.io/`,
    dateFormat: 'yyyy/MM/dd',
    timestampFormat: 'yyyy-MM-dd HH:mm',
    timeZone: 'Asia/Tokyo',
    // -- additional
    titleTemplate: '%s | tetsuyainfra.github.io',
    author: {
      name: `tetsuyainfra`,
      summary: `live in japan`,
    },
    social: {
      twitter: `tetsuyainfra`,
      github: `tetsuyainfra`,
    },
    siteSections: [
      {
        title: 'Blog',
        url: '/blog',
        icon: 'MenuBookOutlined',
      },
      {
        title: 'Post',
        url: '/post',
        icon: 'NoteOutlined',
      },
      {
        title: 'Link',
        url: '/link',
        icon: 'CloudOutlined',
      },
      {
        title: 'About',
        url: '/about',
        icon: 'InfoOutlined',
      },
    ],
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    //
    // source
    //
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blog`,
        path: `${__dirname}/contents/blog`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          // {
          //   resolve: `gatsby-remark-responsive-iframe`,
          //   options: {
          //     wrapperStyle: `margin-bottom: 1.0725rem`,
          //   },
          // },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    //
    // transformer
    //
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // RSS Feed?
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => {
    //           return allMarkdownRemark.nodes.map((node) => {
    //             return Object.assign({}, node.frontmatter, {
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ 'content:encoded': node.html }],
    //             })
    //           })
    //         },
    //         query: `{
    //           allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    //             nodes {
    //               excerpt
    //               html
    //               fields {
    //                 slug
    //               }
    //               frontmatter {
    //                 title
    //                 date
    //               }
    //             }
    //           }
    //         }`,
    //         output: '/rss.xml',
    //         title: 'Gatsby Starter Blog RSS Feed',
    //       },
    //     ],
    //   },
    // },
    // Manifest
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Gatsby Starter Blog`,
    //     short_name: `Gatsby`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     // This will impact how browsers show your PWA/website
    //     // https://css-tricks.com/meta-theme-color-and-trickery/
    //     // theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
  ],
}

export default config
