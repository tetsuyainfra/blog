import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import { Interface } from 'readline'

// type BlogPostProps = {
//   data: PageProps<Queries.BlogPostQuery>
//   children: React.ReactNode
// }

const BlogPost = ({ data, children }) => {
  console.log(data)
  const { title, date } = data.mdx.frontmatter;
  if (!title && !date) { return <div></div>; }

  return (
    <Layout pageTitle={title}>
      <p>{date}</p>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($id: String) {
    mdx(id: {eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
)

export default BlogPost
