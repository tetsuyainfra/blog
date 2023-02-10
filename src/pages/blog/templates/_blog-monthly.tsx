import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { parseISO } from 'date-fns'
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'
import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import useSiteMetadata from '../../../components/useSiteMetadata'

type PageContext = {
  periodStartDate: string
  periodEndDate: string
}
type Props = PageProps<Queries.GetAllBlogEntryForPeriodQuery, PageContext>

const BlogArchiveMonthlyIndex = ({
  data,
  pageContext: { periodEndDate, periodStartDate },
}: Props) => {
  // console.log(data)
  const { nodes: posts } = data.allMarkdownRemark

  function utc2tz(date_string: string) {
    useSiteMetadata()
    const utc_date = parseISO(date_string)
    const { timestampFormat } = useSiteMetadata()
    const s = format(utc_date, timestampFormat, { timeZone: 'Asia/Tokyo' })
    return s
  }
  // console.log(
  //   'start',
  //   periodStartDate,
  //   parseISO(periodStartDate),
  //   utc2tz(periodStartDate)
  // )
  // console.log(
  //   'end  ',
  //   periodEndDate,
  //   parseISO(periodEndDate),
  //   utc2tz(periodEndDate)
  // )
  const utcDate = new Date(periodStartDate)
  // console.log('utcDate', utcDate)
  const zonedDate = zonedTimeToUtc(utcDate, useSiteMetadata().timeZone)
  // console.log('zonedDate', zonedDate)
  const year = zonedDate.getFullYear()
  const month = zonedDate.getMonth() + 1 // 0から始まる
  console.log(year, month)

  return (
    <Layout pageTitle="Blog Archive Index">
      {/* {periodStartDate} - {periodEndDate} */}
      <h2>
        {year}年{month}月の記事一覧
      </h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={post.fields!.url!}>
                <span>{utc2tz(post.fields!.date!)}</span>{' '}
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
export default BlogArchiveMonthlyIndex

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
          year
          month
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
