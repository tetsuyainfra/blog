import * as React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import useSiteMetadata from '../../components/useSiteMetadata'
import { format } from 'date-fns-tz'
import { parseISO } from 'date-fns'

const BlogPage = ({ data }: PageProps<Queries.BlogPagesQuery>) => {
  console.log(data)
  const { timestampFormat, timeZone } = useSiteMetadata()

  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMarkdownRemark.nodes.map((node: any) => {
        //
        const {
          id,
          excerpt,
          frontmatter: { title },
          fields: { url, local_date },
        } = node
        return (
          <article key={id}>
            <h2>
              <Link to={url}>{title}</Link>
            </h2>
            <p>Posted: {format(parseISO(local_date), timestampFormat)}</p>
            <p>{excerpt}</p>
          </article>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query BlogPages {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        fields {
          url
          local_date
        }
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
