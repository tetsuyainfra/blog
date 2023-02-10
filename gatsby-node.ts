import type { GatsbyNode } from 'gatsby'

const path = require(`path`)
const urlSlug = require(`url-slug`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const {
  formatISO,
  parseISO,
  startOfMonth,
  endOfMonth,
  addMonths,
  isBefore,
  getMonth,
  getYear,
} = require('date-fns')
import {
  format,
  OptionsWithTZ,
  utcToZonedTime,
  zonedTimeToUtc,
} from 'date-fns-tz'

import config from './gatsby-config'
import { DeepNonNullable } from 'utility-types'
import { time } from 'console'
// Define the template for blog post
const blogPost = path.resolve(`./src/pages/blog/templates/_blog-post.tsx`)
const blogMonthly = path.resolve(`./src/pages/blog/templates/_blog-monthly.tsx`)

//------------------------------------------------------------------------------
// 変数定義
//------------------------------------------------------------------------------
const POST_FIELDS = [
  'utc_date',
  'local_date',
  'year',
  'month',
  'day',
  'year_month',
  'slug',
  'url',
] as const
type TypeOfPostFields = typeof POST_FIELDS[number]

// スラグパラメータを作成する
// function getSlugParams(node: any): {
//   date: Date
//   year: string
//   month: string
//   day: string
//   year_month: string
//   slug: string
//   url: string
// } {
function getSlugParams(node: any) {
  const { id } = node
  const { title, date, slug } = node.frontmatter

  // console.log(node)
  // console.log(urlSlug(title))

  // x  Slugが設定されていればそれを使う、無ければ日本語判定して、日本語でなければそれをslug化する
  // -> Slugが設定されていればそれを使う、無ければtitleそのまま
  let _slug
  if (slug) {
    _slug = urlSlug(slug)
  } else {
    // _slug = isJapanes(title) ? String(id) : String(urlSlug(title))
    _slug = String(title)
  }

  const timeZone = config.siteMetadata!.timeZone as string
  const timeZoneOpt = { timeZone }
  // const local_date = new Date(date)
  const date_as_utc = parseISO(date)
  // const zoned_date = zonedTimeToUtc(local_date)
  const local_date = zonedTimeToUtc(date_as_utc, timeZone)
  const year = format(local_date, 'yyyy', timeZoneOpt)
  const month = format(local_date, 'MM', timeZoneOpt)
  const day = format(local_date, 'dd', timeZoneOpt)
  const year_month = format(local_date, 'yyyy/MM', timeZoneOpt)

  // console.log({ year, month, day, _slug, })
  return {
    utc_date: date_as_utc,
    local_date: format(local_date, 'yyyy-MM-dd HH:mm:ssXXX', timeZoneOpt),
    year,
    month,
    day,
    year_month,
    slug: _slug,
    url: `/blog/${year}/${month}/${day}/${_slug}`,
  }
}

//------------------------------------------------------------------------------------------
// Create Node
//------------------------------------------------------------------------------------------
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  getNode,
  actions,
  reporter,
}) => {
  // console.log(`Node created of type "${node.internal.type}"`)
  const { createNodeField } = actions

  // if(node.internal.mediaType === `text/yaml`){
  //   reporter.log(`${node.internal.mediaType}, ${node.name}`)
  // }

  if (node.internal.type === `MarkdownRemark`) {
    // console.log(node.internal.type)
    // console.log(createFilePath({ node, getNode, basePath: `contents / blogs` }))
    const slugs = getSlugParams(node)
    // create Field
    POST_FIELDS.forEach((field: TypeOfPostFields) => {
      createNodeField({
        node,
        name: field,
        value: slugs[field],
      })
    })
  }
}
//------------------------------------------------------------------------------------------
// Create Page
//------------------------------------------------------------------------------------------
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions

  const queryBlogPages = await graphql<
    DeepNonNullable<Queries.CreaetBlogPagesQuery>
  >(`
    query CreaetBlogPages {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }) {
        edges {
          node {
            id
            fields {
              local_date
              year
              month
              day
              year_month
              slug
              url
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `).then((result) => {
    //クエリが成功したら・・・
    const { edges } = result.data!.allMarkdownRemark

    // 次のアーカイブURLを作成する
    // blog/archive/[year]/[month]
    // const utc_date = edges[0].node.frontmatter.date
    // const local_date = edges[0].node.fields.local_date
    // console.log(utc_date, local_date)
    const start_date = edges[0].node.fields.local_date
    const last_date = edges[edges.length - 1].node.fields.local_date
    // 中身はJSTだけどUTCをそのまま使う
    const startMonth = startOfMonth(new Date(start_date))
    const nextLastMonth = startOfMonth(addMonths(new Date(last_date), +1))
    let nowMonth = startMonth
    while (isBefore(nowMonth, nextLastMonth)) {
      const periodStartDate = nowMonth
      const periodEndDate = addMonths(nowMonth, 1)
      const url_path = `/blog/archive/${format(nowMonth, 'yyyy/MM')}`
      createPage({
        path: url_path,
        component: blogMonthly,
        context: {
          periodStartDate: periodStartDate.toISOString(),
          periodEndDate: periodEndDate.toISOString(),
        },
      })

      nowMonth = addMonths(nowMonth, +1)
    }

    // 次の本文記事URLを作成する
    // /blog/[year]/[month]/[day]/[slug}
    edges.forEach(({ node }, index) => {
      const previousPostId = index === 0 ? null : edges[index - 1].node.id
      const nextPostId =
        index === edges.length - 1 ? null : edges[index + 1].node.id

      const { url } = node.fields!
      createPage({
        path: url!,
        component: blogPost,
        context: {
          id: node.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }) // then

  return queryBlogPages
}

/*
const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions
  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}
export { createPages }
*/
