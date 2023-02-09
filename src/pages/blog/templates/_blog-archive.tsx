import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import useSiteMetadata from '../../../components/useSiteMetadata'

type BlogArchiveIndexProps = {
  data: PageProps<Queries.BlogPostBySlugQuery>
  pageContext: {
    periodStartDate: string
    periodEndDate: string
  }
}
const BlogArchiveIndex: React.FC<BlogArchiveIndexProps> = ({
  data,
  pageContext,
}) => {
  return
  ;<Layout seo={<SEO title="Blog" />}>
    <ul>
      {years.map((year, i) => (
        <div key={i}>
          {year}年
          <ul>
            {Array.from(year_months[year])
              .sort()
              .map((month, j) => (
                <li key={j}>
                  <Link to={`./${year}/${month}`}>
                    {Number(month)}月の記事一覧
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </ul>
  </Layout>
}
const BlogPost: React.FC<BlogPostProps> = ({ data }) => {
  let { title } = useSiteMetadata()
  // useStaticQuery()
  return (
    <Layout pageTitle={title}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          {/* <h1 itemProp="headline">{post.frontmatter.title}</h1> */}
          {/* <p>{post.frontmatter.date}</p> */}
        </header>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
        <hr />
        <footer>{/* <Bio /> */}</footer>
      </article>
    </Layout>
  )
}

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPost

export const GetAllBlogEntryForArchiveQuery = graphql`
  query GetAllBlogEntryForArchive {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          fields {
            year
            month
            day
            year_month
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
  }
`
