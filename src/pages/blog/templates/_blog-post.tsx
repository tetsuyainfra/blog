import * as React from 'react'
import { graphql, PageProps, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import useSiteMetadata from '../../../components/useSiteMetadata'

import { DeepNonNullable } from 'utility-types'

const BlogPost = ({
  data,
}: PageProps<DeepNonNullable<Queries.BlogPostByIdQuery>>) => {
  let { title } = useSiteMetadata()
  // useStaticQuery()

  // const { previous, next, site, markdownRemark: post } = data
  // const { site, markdownRemark: post } = data
  const { site, next, previous, markdownRemark: post } = data

  console.log(next, previous)
  return (
    <Layout pageTitle={title}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post!.frontmatter!.title}</h1>
          <p>{post!.frontmatter!.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post!.html! }}
          itemProp="articleBody"
        />
        <hr />
        <footer>{/* <Bio /> */}</footer>
      </article>{' '}
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.url} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields!.url!} rel="next">
                {next.frontmatter!.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPost

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        # description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        url
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        url
      }
      frontmatter {
        title
      }
    }
  }
`
