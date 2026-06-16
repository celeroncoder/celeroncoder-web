import { CodeBlock } from "@payloadcms/richtext-lexical";

/**
 * Payload's premade CodeBlock stores the fence language in a `select` field
 * whose validation only accepts values from a fixed preset list. That means a
 * pasted/typed fence with an unlisted token — ```tree, ```text, an empty
 * language, etc. — fails with "The following fields are invalid: language".
 *
 * Since this is a developer blog where code fences can carry any language tag,
 * we relax the `language` field to accept any string. The value still
 * round-trips and renders as `language-<token>` on the frontend.
 */
export function codeBlock() {
  const block = CodeBlock();
  for (const field of block.fields) {
    if ("name" in field && field.name === "language") {
      (field as { validate?: () => true }).validate = () => true;
    }
  }
  return block;
}
