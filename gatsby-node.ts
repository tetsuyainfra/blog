const fs = require('fs')
// const path = require(`path`)
import path from 'path'
// const os = require(`os`)

// import GithubSlugger from "github-slugger";
import { DateTime } from 'luxon'
import _ from 'lodash'
import type { GatsbyNode, Node } from 'gatsby'

// const { createFilePath } = require(`gatsby-source-filesystem`)

import config from './gatsby-config'
import { DeepNonNullable } from 'utility-types'
// import { startOfMonth } from 'date-fns'
const templateBlogPost = path.resolve(`./src/pages/blog/_blog_post.tsx`)
const templateBlogMonthly = path.resolve(`./src/pages/blog/_blog_monthly.tsx`)

const slug = require('slug')
const yaml = require('js-yaml')

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

// const BlogPageTemplate = path.resolve(`src/templates/template.tsx`)
const slugUrl = (s: string): string => {
  const r = slug(s)
  // console.log(`slugUrl() ${s} -> ${r}`);
  return r
}

//------------------------------------------------------------------------------------------
// Create Node
//------------------------------------------------------------------------------------------
export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  getNode,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  actions,
  reporter,
}) => {
  // console.log(`Node created of type "${node.internal.type}"`);
  const { createNodeField } = actions

  if (node.internal.mediaType === `text/yaml`) {
    const content = await loadNodeContent(node)
    const parsedContent = yaml.load(content)
    reporter.success(
      `import ${node.relativePath}, parsedContent: ${parsedContent}`,
    )

    if (isArray(parsedContent)) {
      reporter.info('parsedContent is Array')
      parsedContent.forEach((obj, i) => {
        transformObject(
          actions,
          createContentDigest,
          node,
          obj,
          createNodeId(`${node.id} [${i}] >>> YAML`),
          getType({ node, object: obj, isArray: true }),
        )
      })
    } else if (isPlainObject(parsedContent)) {
      reporter.info('parsedContent is PlainObject')
      transformObject(
        actions,
        createContentDigest,
        node,
        parsedContent,
        createNodeId(`${node.id} >>> YAML`),
        getType({ node, object: parsedContent, isArray: false }),
      )
    } else {
      reporter.info('parsedContent is NOT Array or PlainObject')
    }
  }

  // if (node.internal.type === `MarkdownRemark`) {
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    // console.log(node.internal.type)
    // console.log("type==Mdx @node", node)

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

function getType({ node, object, isArray }: any) {
  return 'Links'
  // let r
  // if (node.internal.type !== `File`) {
  //   r = _.upperFirst(_.camelCase(`${node.internal.type} Yaml`))
  // } else if (isArray) {
  //   r = _.upperFirst(_.camelCase(`${node.name} Yaml`))
  // } else {
  //   r = _.upperFirst(_.camelCase(`${path.basename(node.dir)} Yaml`))
  // }
  // console.log('getType: ', r)
  // return r
}

function transformObject(
  actions: any,
  createContentDigest: any,
  node: any,
  obj: any,
  id: any,
  type: string,
) {
  const { createNode, createParentChildLink } = actions

  const yamlNode = {
    ...obj,
    id,
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(obj),
      type,
    },
  }
  if (obj.id) {
    yamlNode[`yamlId`] = obj.id
  }
  createNode(yamlNode)
  createParentChildLink({ parent: node, child: yamlNode })
}

//------------------------------------------------------------------------------------------
// Create Page
//------------------------------------------------------------------------------------------
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const queryResult = await graphql<
    DeepNonNullable<Queries.CreateBlogPagesQuery>
  >(`
    query CreateBlogPages {
      allMdx(sort: { fields: { local_date: ASC } }) {
        edges {
          node {
            id
            fields {
              utc_date
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
              slug
              title
            }
            body
            # gatsby-plugin-mdx v4以降に必要
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)
  if (queryResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  createBlogArchive(reporter, createPage, queryResult.data!.allMdx.edges)
  createBlogPost(reporter, createPage, queryResult.data!.allMdx.edges)
}

/**
 * 次のアーカイブURLを作成する
 * blog/archive/[year]/[month]
 */
function createBlogArchive(
  reporter: any,
  createPage: any,
  edges: readonly any[],
) {
  //クエリが成功したら・・・
  const fromLocalDate = (s: string): DateTime => {
    return DateTime.fromJSDate(new Date(s), {
      zone: config!.siteMetadata!.timeZone as string,
    })
  }

  const start_date = edges[0].node.fields.local_date
  const last_date = edges[edges.length - 1].node.fields.local_date
  // 中身はJSTだけどUTCをそのまま使う
  const startMonth = DateTime.fromISO(start_date).startOf('month')
  const lastMonth = DateTime.fromISO(last_date).startOf('month')

  let nowMonth = startMonth
  while (nowMonth < lastMonth) {
    const periodStartDate = nowMonth
    const periodEndDate = nowMonth.plus({ month: 1 })
    const url_path = `/blog/archive/${periodStartDate.toFormat('yyyy/MM')}`
    createPage({
      path: url_path,
      component: templateBlogMonthly,
      context: {
        periodStartDate: periodStartDate.toISO(),
        periodEndDate: periodEndDate.toISO(),
      },
    })
    reporter.success(`create BlogArchivePage ${url_path}`)

    nowMonth = nowMonth.plus({ month: 1 })
  }
}

/**
 *  次の本文記事URLを作成する
 *   /blog/[year]/[month]/[day]/[slug}
 */
function createBlogPost(reporter: any, createPage: any, edges: readonly any[]) {
  edges.map(async ({ node }, index: number) => {
    const previousPostId = index === 0 ? null : edges[index - 1].node.id
    const nextPostId =
      index === edges.length - 1 ? null : edges[index + 1].node.id

    const { url } = node.fields!
    const component = `${templateBlogPost}?__contentFilePath=${node.internal.contentFilePath}`
    createPage({
      path: url!,
      // component: templateBlogPost,
      // gatsby-plugin-mdx v5以降で必要
      component,
      context: {
        id: node.id,
        previousPostId,
        nextPostId,
      },
    })
    reporter.success(`create BlogPostPage ${url}`)
  })
}

//------------------------------------------------------------------------------------------
// PluginOptionSchema
//------------------------------------------------------------------------------------------
// export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({
//   Joi,
// }) => {
//   return Joi.object({
//     pathToEmotionCacheProps: Joi.string()
//       .default(``)
//       .description(
//         `The path to the emotion cache props (See https://emotion.sh/docs/@emotion/cache#createcache).`
//       ),
//   })
// }

// 参考
// - gatsby-plugin-material-ui
//   https://github.com/hupe1980/gatsby-plugin-material-ui/

//------------------------------------------------------------------------------------------
// Utilities
//------------------------------------------------------------------------------------------
// 型付でArrayを判別する
const isArray = <T>(maybeArray: T | readonly T[]): maybeArray is T[] => {
  return Array.isArray(maybeArray)
}

// const isPlainObject = (val: any) =>
//   !!val && typeof val === 'object' && val.constructor === Object

const isPlainObject = <T>(val: T) => {
  return !!val && typeof val === 'object' && val.constructor === Object
}

/// getSlugParams : slug用パラメータを作成する関数
function getSlugParams(node: Node & Record<string, unknown>) {
  const { id } = node
  const { title, date, slug } = node.frontmatter as {
    title: string
    date: string
    slug: string
  }

  // console.log(node)
  // console.log(urlSlug(title))

  // x  Slugが設定されていればそれを使う、無ければ日本語判定して、日本語でなければそれをslug化する
  // -> Slugが設定されていればそれを使う、無ければtitleそのまま
  let _slug
  if (slug) {
    _slug = slugUrl(slug)
  } else {
    // _slug = isJapanes(title) ? String(id) : String(urlSlug(title))
    // _slug = slugUrl(String(title));
    _slug = String(title)
  }

  const timeZone = config.siteMetadata!.timeZone as string
  const timeZoneOpt = { timeZone }
  const local_date = DateTime.fromJSDate(new Date(date), { zone: timeZone })
  const year = local_date.toFormat('yyyy')
  const month = local_date.toFormat('MM')
  const day = local_date.toFormat('dd')
  const year_month = local_date.toFormat('yyyy_MM')

  // console.log({ year, month, day, _slug, })
  return {
    local_date: local_date.toISO(),
    utc_date: local_date.setZone('utc').toISO(),
    year,
    month,
    day,
    year_month,
    slug: _slug,
    url: `/blog/${year}/${month}/${day}/${_slug}`,
  }
}
