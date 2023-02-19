import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { DeepNonNullable } from 'utility-types'

const useSiteMetadata = () => {
  type TypeOfUseSiteMetadata = DeepNonNullable<Queries.useSiteMetadataQuery>

  const data = useStaticQuery<TypeOfUseSiteMetadata>(graphql`
    query useSiteMetadata {
      site {
        siteMetadata {
          title
          titleFormat
          description
          siteUrl
          timeZone
          # dateFormat
          # timestampFormat
          # siteSections {
          #   title
          #   url
          #   icon
          # }
          # author {
          #   name
          #   summary
          # }
          # titleTemplate
          # social {
          #   twitter
          #   github
          # }
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata