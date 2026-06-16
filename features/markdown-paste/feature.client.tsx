"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { MarkdownPastePlugin } from "./plugin";

export const MarkdownPasteFeatureClient = createClientFeature({
  plugins: [
    {
      Component: MarkdownPastePlugin,
      position: "normal",
    },
  ],
});
