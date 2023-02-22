import * as React from 'react'
import { graphql, HeadFC, Link, PageProps } from 'gatsby'
import Layout from '../../components/Layout'
import useAllLinks from '../../components/useAllLinks'
import styled from '@emotion/styled'
import Grid from '@mui/material/Grid'
import { Container } from '@mui/material'

const LinkCard = styled.div`
  & > h2 {
    margin: 0;
    margin-top: 0.5em;
  }
  & > ul {
    margin: 0;
    margin-top: 0.5em;
    padding-left: 1.5em;
  }
  & > ul li {
    margin: 0;
  }
`

const LinksPage: React.FC<PageProps> = () => {
  const data = useAllLinks()
  console.log(data)
  return (
    <Layout>
      <Container>
        <Grid container spacing={1}>
          {data.map(({ node }, i) => (
            <Grid key={i} item xs={6} md={2}>
              <LinkCard key={i}>
                <h2>
                  {node.weight}:{node.category}
                </h2>
                <ul>
                  {node.list.map(({ name, url }, j) => (
                    <li key={j}>
                      <a href={url}>{name}</a>
                    </li>
                  ))}
                </ul>
              </LinkCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default LinksPage
export const Head: HeadFC = () => <title>Links</title>
