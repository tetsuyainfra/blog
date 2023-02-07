import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }: PageProps<Queries.BlogPagesQuery>) => {
  console.log(data)
  return (
    <Layout pageTitle="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {data.allMdx.nodes.map((node: any) => (
          <article key={node.id}>
            <h2>{node.frontmatter.title}</h2>
            <p>Posted: {node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </article>
        ))}
      </ul>
    </Layout>
  )
}

export const query = graphql`
  query BlogPages {
    allMdx(sort: { frontmatter: { date: DESC } }) {
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
