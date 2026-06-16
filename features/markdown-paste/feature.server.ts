import { createServerFeature } from "@payloadcms/richtext-lexical";

/**
 * Server registration for the Markdown-paste editor feature. The actual work
 * happens client-side (see ./plugin.tsx); this just wires the client feature
 * into the Lexical editor config. The ClientFeature path must also be present
 * in the admin import map (app/(payload)/admin/importMap.js).
 */
export const MarkdownPasteFeature = createServerFeature({
  feature: {
    ClientFeature: "@/features/markdown-paste/feature.client#MarkdownPasteFeatureClient",
  },
  key: "markdownPaste",
});
