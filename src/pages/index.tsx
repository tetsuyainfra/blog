import * as React from 'react'
import { HeadFC, Link, PageProps } from 'gatsby'
import Layout from '../components/Layout'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <ul>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/link">Link</Link>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
