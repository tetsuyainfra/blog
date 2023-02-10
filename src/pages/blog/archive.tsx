//
// src/pages/blog/archive/index.tsx
//
import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import useSiteMetadata from '../../components/useSiteMetadata'

type Props = PageProps<Queries.GetAllBlogEntryQuery>

const BlogArchiveIndex = ({ data }: Props) => {
  // console.log(data)
  const { nodes: posts } = data.allMarkdownRemark

  // yearの一覧を作成
  const years = Array.from(new Set(posts.map((post) => post?.fields?.year)))
    .filter((item): item is string => typeof item == 'string')
    .sort()

  // 年をキーに取る月一覧を作成
  const year_months: { [key: string]: Set<string> } = {}
  posts.forEach((post) => {
    const year = post?.fields?.year as string
    const month = post?.fields?.month as string
    if (!year_months[year]) {
      year_months[year] = new Set<string>()
    }
    year_months[year].add(month)
  })

  function utc2tz(date_string: string) {
    useSiteMetadata()
    const utc_date = parseISO(date_string)
    const s = format(utc_date, 'yyyy/MM/dd HH:mm', { timeZone: 'Asia/Tokyo' })
    return s
  }

  return (
    <Layout pageTitle="Blog Archive Index">
      <ul>
        {years.map((year, i) => (
          <li key={i}>
            <h3>{year}年</h3>
            <ul>
              {Array.from(year_months[year])
                .sort()
                .map((month, j) => (
                  // <li key={j}>{Number(month)}月の記事一覧</li>

                  <li key={j}>
                    <Link to={`./${year}/${month}`}>
                      {Number(month)}月の記事一覧
                    </Link>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
      {/* <ul>
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
      </ul> */}
    </Layout>
  )
}

export const Head = () => <Seo title="My Blog Posts" />
export default BlogArchiveIndex

export const pageQuery = graphql`
  query GetAllBlogEntry {
    allMarkdownRemark(sort: { fields: { date: ASC } }) {
      totalCount
      nodes {
        id
        fields {
          year
          month
          day
          year_month
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
