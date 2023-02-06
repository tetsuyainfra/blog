import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import useSiteMetadata from './useSiteMetadata'

const Seo: React.FC<{ title: String }> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <title>
      {title} | {useSiteMetadata().title}
    </title>
  )
}

export default Seo
