import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { DeepNonNullable } from 'utility-types'

const useAllLinks = () => {
  type TypeOfQuery = DeepNonNullable<Queries.useAllLinksQuery>

  const data = useStaticQuery<TypeOfQuery>(graphql`
    query useAllLinks {
      allLinks(sort: { weight: ASC }) {
        edges {
          node {
            list {
              url
              name
            }
            category
            weight
          }
        }
      }
    }
  `)

  return data.allLinks.edges
}

export default useAllLinks
