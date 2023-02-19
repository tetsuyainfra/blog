import * as React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import useSiteMetadata from "../../components/useSiteMetadata";

type DataProps = Queries.BlogPagesQuery
type Props = PageProps<DataProps>

const BlogIndexPage: React.FC<Props> = ({data }) => {
  console.log("BlogIndexPage", data, useSiteMetadata());
  const posts = data.allMdx.nodes
  return (
    <Layout>
      <h1>Blog</h1>
      {posts.map((node: any) => {
        //
        const {
          id,
          excerpt,
          frontmatter: { title },
          fields: { url, local_date },
        } = node
        return (
          <article key={id}>
            <h2>
              <Link to={url}>{title}</Link>
            </h2>
            {/* <p>Posted: {format(parseISO(local_date), timestampFormat)}</p> */}
            <p>{excerpt}</p>
          </article>
        )
      })}
    </Layout>
  );
};

export default BlogIndexPage;

export const query = graphql`
  query BlogPages {
    allMdx(sort: { fields: { local_date: DESC } }) {
      nodes {
        fields {
          url
          local_date
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
        }
        id
        excerpt
      }
    }
  }
`;

export const Head: HeadFC = () => (
  <SEO title="Blog Index Page" />
);
