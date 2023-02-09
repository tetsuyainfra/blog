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
          # siteUrl
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
