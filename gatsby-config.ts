import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `tetsuyainfra 日々是好日`,
    siteUrl: `https://tetsuyainfra.github.io/`,
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
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `blog`,
        path: `${__dirname}/contents/blog`,
      },
    },
    //
    // transformer
    //
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.md`, `.mdx`], //変更する行
        mdxOptions: {
          // remarkPlugins: [
          //   require(`remark-gfm`),
          //   // To pass options, use a 2-element array with the
          //   // configuration in an object in the second element
          //   // [require(`remark-external-links`), { target: false }],
          // ],
          // // Footnotes mode (default: true)
          // footnotes: true,
          // // GitHub Flavored Markdown mode (default: true)
          // gfm: true,
          // // Add your gatsby-remark-* plugins here
          // plugins: [],
          // // Enable JS for https://github.com/jonschlinkert/gray-matter#optionsengines (default: false)
          // // It's not advised to set this to "true" and this option will likely be removed in the future
          // // jsFrontmatterEngine: false,
          // //
          // excerpt_separator: `<!-- endexcerpt  -->`,
        }, // mdxOptions
      }, // options
    },
  ],
}

export default config
