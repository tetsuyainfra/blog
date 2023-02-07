import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { Interface } from 'readline'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// type BlogPostProps = {
//   data: PageProps<Queries.BlogPostQuery>
//   children: React.ReactNode
// }

const BlogPost = ({ data, children }) => {
  console.log(data)
  const { title, date } = data.mdx.frontmatter;
  const image = getImage(data.mdx.frontmatter.hero_image)

  return (
    <Layout pageTitle={title}>
      <p>{date}</p>
      <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_url}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <p>{data.tableOfContents}</p>
      {children}
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: {eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        hero_image_alt
        hero_image_credit_url
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      tableOfContents
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

export default BlogPost
