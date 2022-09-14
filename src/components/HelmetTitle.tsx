import React from "react";
import { Helmet } from "react-helmet";

const BASE_TITLE = "Poller";

export const title = (subtitles: (string | undefined)[]) =>
  [BASE_TITLE].concat(subtitles.filter(s => s) as string[]).join(" | ");

interface HelmetTitleProps {
  subtitles: (string | undefined)[];
}

export const HelmetTitle = ({ subtitles = [] }: HelmetTitleProps) => (
  <Helmet>
    <title>{ title(subtitles) }</title>
  </Helmet>
);
