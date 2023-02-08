import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import useSiteMetadata from '../../../components/useSiteMetadata'

type BlogPostProps = {
  data: PageProps<Queries.BlogPostBySlugQuery>
}

const BlogPost: React.FC<BlogPostProps> = ({ data: { post } }) => {
  let siteTitle = useSiteMetadata()
  // useStaticQuery()
  return (
    <Layout title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>{/* <Bio /> */}</footer>
      </article>
    </Layout>
  )
}

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPost

export const pageQuery = graphql`
  query BlogPostBySlug(
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        # description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
