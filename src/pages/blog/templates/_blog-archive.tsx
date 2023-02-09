import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import useSiteMetadata from '../../../components/useSiteMetadata'

type PageContext = {
  periodStartDate: string
  periodEndDate: string
}
type Props = PageProps<Queries.GetAllBlogEntryForPeriodQuery, PageContext>

const BlogArchiveIndex = ({
  data,
  pageContext: { periodEndDate, periodStartDate },
}: Props) => {
  // console.log(data)
  const { nodes: posts } = data.allMarkdownRemark

  function utc2tz(date_string: string) {
    useSiteMetadata()
    const utc_date = parseISO(date_string)
    const s = format(utc_date, 'yyyy/MM/dd HH:mm', { timeZone: 'Asia/Tokyo' })
    return s
  }
  console.log(
    'start',
    periodStartDate,
    parseISO(periodStartDate),
    utc2tz(periodStartDate)
  )
  // console.log(
  //   'end  ',
  //   periodEndDate,
  //   parseISO(periodEndDate),
  //   utc2tz(periodEndDate)
  // )

  return (
    <Layout pageTitle="Blog Archive Index">
      {periodStartDate} - {periodEndDate}
      <h2>Monthly</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={post.fields!.url!}>
                <span>{utc2tz(post.fields!.date!)}</span>
                <span>{post.frontmatter?.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const Head = () => <Seo title="My Blog Posts" />
export default BlogArchiveIndex

export const pageQuery = graphql`
  query GetAllBlogEntryForPeriod($periodStartDate: Date, $periodEndDate: Date) {
    allMarkdownRemark(
      filter: {
        frontmatter: { date: { gte: $periodStartDate, lt: $periodEndDate } }
      }
      sort: { fields: { date: ASC } }
    ) {
      totalCount
      nodes {
        id
        fields {
          date
          url
        }
        frontmatter {
          title
          date
        }
        excerpt
      }
    }
  }
`
