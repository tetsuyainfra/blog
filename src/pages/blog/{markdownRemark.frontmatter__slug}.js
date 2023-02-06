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
  return (
    <Layout pageTitle={data.markdownRemark.title}>
      <p>{data.markdownRemark.frontmatter.date}</p>
      {/* {data.markdownRemark.htmlAst} */}
      <div dangerouslySetInnerHTML={{
        __html
          : data.markdownRemark.html
      }} />
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($id: String) {
    markdownRemark(id: {eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      html
      htmlAst
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
)

export default BlogPost
