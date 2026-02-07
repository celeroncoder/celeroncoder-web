import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-ME-IN-PRODUCTION",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
