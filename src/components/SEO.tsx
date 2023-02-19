import * as React from "react";
import styled from "@emotion/styled";
import { Link, useStaticQuery, graphql } from "gatsby";

import useSiteMetadata from "./useSiteMetadata";
import { Toolbar, AppBar, Typography } from "@mui/material";

type Props = {
  title?: string;
  fullTitle?: string;
  children?: React.ReactNode;
};
const SEO: React.FC<Props> = ({ title, fullTitle, children }) => {
  const { title: defaultTitle, titleFormat: defaultTitleFormat } =
    useSiteMetadata();

  let title_ = null;
  if (fullTitle) {
    title_ = fullTitle;
  } else {
    title_ = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }
  return (
    <>
      <title>{title_}</title>
      {children}
    </>
  );
};

export default SEO;
