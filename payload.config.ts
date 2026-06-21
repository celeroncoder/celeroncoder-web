import { buildConfig } from "payload";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import { MarkdownPasteFeature } from "./features/markdown-paste/feature.server";
import { codeBlock } from "./features/code-block";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Posts } from "./collections/Posts";
import { Media } from "./collections/Media";
import { Tags } from "./collections/Tags";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Posts, Media, Tags],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      // Fenced code blocks (``` ) — toolbar, markdown typing, and markdown paste.
      // codeBlock() relaxes the language field so any fence token is accepted.
      BlocksFeature({ blocks: [codeBlock()] }),
      MarkdownPasteFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_ADDRESS || "onboarding@resend.dev",
    defaultFromName: process.env.RESEND_FROM_NAME || "celeroncoder",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  sharp,
});
