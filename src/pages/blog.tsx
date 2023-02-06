import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const BlogPage = ({ data }: PageProps<Queries.BlogPagesQuery>) => {
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {data.allMarkdownRemark.nodes.map((node: any) => (
          <li key={node.id}>
            {node.frontmatter.date} / {node.frontmatter.title}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query BlogPages {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
        }
        id
        excerpt
      }
    }
  }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage
