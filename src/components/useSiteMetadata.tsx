import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { DeepNonNullable } from 'utility-types'

const useSiteMetadata = () => {
  const data = useStaticQuery<
    DeepNonNullable<Queries.useSiteMetadataQuery>
  >(graphql`
    query useSiteMetadata {
      site {
        siteMetadata {
          title
          # siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
