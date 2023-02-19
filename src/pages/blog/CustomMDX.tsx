import React from "react";
import { MDXProvider } from "@mdx-js/react";

const MyH1 = (props: any) => <h1 style={{ color: `tomato` }} {...props} />;
const MyParagraph = (props: any) => (
  <p style={{ fontSize: "18px", lineHeight: 1.6 }} {...props} />
);

const components = {
  h1: MyH1,
  p: MyParagraph,
};

export const CustomMDX = ({ children }: any) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);


export default CustomMDX