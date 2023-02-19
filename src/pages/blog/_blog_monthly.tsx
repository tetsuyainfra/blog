import * as React from "react";
import { graphql, Link } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";

type PageContext = {
  periodStartDate: string;
  periodEndDate: string;
};
type Props = PageProps<Queries.GetAllBlogEntryForPeriodQuery, PageContext>;

const BlogMonthlyIndexPage: React.FC<Props> = ({ data, pageContext }) => {
  console.log("BlogMonthlyIndexPage data", data, pageContext);
  const posts = data.allMdx.nodes;
  return (
    <div>
      <h1>BlogMonthly</h1>
      <ul>
        {posts.map((post) => {
          return (
            <li>
              <h3>
                <Link to={post.fields?.url!}>{post.frontmatter?.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BlogMonthlyIndexPage;

// export const query = graphql`
//   {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `

export const Head: HeadFC = () => (
  <>
    <title>Blog Monthly Index Page</title>
  </>
);

export const pageQuery = graphql`
  query GetAllBlogEntryForPeriod($periodStartDate: Date, $periodEndDate: Date) {
    allMdx(
      filter: {
        fields: { local_date: { gte: $periodStartDate, lt: $periodEndDate } }
      }
      sort: { fields: { local_date: ASC } }
    ) {
      totalCount
      nodes {
        id
        fields {
          year
          month
          local_date
          url
        }
        frontmatter {
          title
          date
        }
        excerpt
      }
    }
  }
`;
