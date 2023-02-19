import * as React from "react";
import { graphql, Link } from "gatsby";
import useSiteMetadata from "../../components/useSiteMetadata";


import { DeepNonNullable } from "utility-types";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

type DataProps = DeepNonNullable<Queries.BlogPostByIdQuery>;
type Props = PageProps<DataProps>;

export const BlogPost: React.FC<Props> = ({ data, pageContext, children}) => {
  // console.log("BlogPost", data)
  // console.log("BlogPost", pageContext)
  // console.log("BlogPost", children)
  // console.log("BlogPost", useSiteMetadata());

  const {
    mdx: {
      frontmatter: { title },
      tableOfContents,
    },
    previous,
    next,
  } = data;

  return (
    <Layout>
      <h1>{title}</h1>
      <div></div>
      <div>{children}</div>
      <div>
        <div>
          {previous ? (
            <Link to={previous.fields.url}>{previous.frontmatter.title}</Link>
          ) : null}
        </div>
        <div>
          {next ? (
            <Link to={next.fields.url}>{next.frontmatter.title}</Link>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;

export const Head: HeadFC<DataProps> = ({data}) => {
  const title = data.mdx.frontmatter.title
  return  <SEO title={`${title}`} />
};

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        # description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        url
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        url
      }
      frontmatter {
        title
      }
    }
  }
`;
