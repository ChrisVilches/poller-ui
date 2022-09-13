import React from "react";
import { Helmet } from "react-helmet";

const BASE_TITLE = "Poller";

export const title = (subtitles: string[]) => [BASE_TITLE].concat(subtitles).join(" | ");

interface HelmetTitleProps {
  subtitles: string[];
}

export const HelmetTitle = ({ subtitles = [] }: HelmetTitleProps) => (
  <Helmet>
    <title>{ title(subtitles) }</title>
  </Helmet>
);
