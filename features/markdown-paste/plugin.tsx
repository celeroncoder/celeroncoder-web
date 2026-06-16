"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEditorConfigContext, getEnabledNodes } from "@payloadcms/richtext-lexical/client";
import { $convertFromMarkdownString } from "@lexical/markdown";
import {
  $generateNodesFromSerializedNodes,
  $insertGeneratedNodes,
} from "@lexical/clipboard";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  PASTE_COMMAND,
  createEditor,
} from "lexical";

/**
 * Heuristic: does this plain-text blob look like Markdown worth converting?
 * We only hijack the paste when we're fairly confident, so pasting ordinary
 * prose or code into an inline-code/code block keeps working as before.
 */
function looksLikeMarkdown(text: string): boolean {
  const blockSyntax =
    /(^|\n)\s{0,3}(#{1,6}\s|[-*+]\s+\S|\d+\.\s+\S|>\s|```|---\s*$|\|.*\|)/.test(text);
  const inlineSyntax =
    /\*\*[^*\n]+\*\*|__[^_\n]+__|(^|\s)\*[^*\n]+\*|\[[^\]\n]+\]\([^)\n]+\)|`[^`\n]+`/.test(text);
  return blockSyntax || inlineSyntax;
}

/**
 * Lets authors paste raw Markdown into the Lexical editor and have it become
 * real rich text. Lexical's default paste treats Markdown as plain text, so
 * `## Heading`, `**bold**`, lists, links, etc. all lose their formatting.
 *
 * We convert the Markdown in a throwaway editor (the importer clears its target
 * root, so it can't run against the live document), then transfer the result
 * across as serialized Lexical nodes and insert them at the cursor. Using the
 * serialized-node path (rather than an HTML round-trip) preserves custom nodes
 * such as the Payload code block, which don't survive HTML re-parsing.
 */
export function MarkdownPastePlugin() {
  const [editor] = useLexicalComposerContext();
  const { editorConfig } = useEditorConfigContext();

  useEffect(() => {
    const transformers = editorConfig?.features?.markdownTransformers;
    if (!transformers?.length) return;

    return editor.registerCommand<ClipboardEvent>(
      PASTE_COMMAND,
      (event) => {
        const clipboard = event.clipboardData;
        if (!clipboard) return false;

        // Real rich-text pastes (web pages, docs) already carry formatting via
        // text/html — leave those to Lexical's default handler.
        if (clipboard.getData("text/html")) return false;

        const text = clipboard.getData("text/plain");
        if (!text || !looksLikeMarkdown(text)) return false;

        // Convert Markdown -> nodes in a detached editor so we don't wipe the
        // live document (the importer clears its target root).
        const scratch = createEditor({
          nodes: getEnabledNodes({ editorConfig }),
          onError: (err) => {
            // eslint-disable-next-line no-console
            console.error("[markdown-paste] conversion error:", err);
          },
        });

        scratch.update(
          () => {
            $convertFromMarkdownString(text, transformers);
          },
          { discrete: true },
        );

        const serializedNodes = scratch.getEditorState().toJSON().root.children;
        if (!serializedNodes?.length) return false;

        event.preventDefault();

        editor.update(() => {
          const selection = $getSelection();
          // Rebuild the nodes inside the live editor (uses each node's
          // importJSON, so the code block and other custom nodes survive).
          const nodes = $generateNodesFromSerializedNodes(serializedNodes);

          if ($isRangeSelection(selection)) {
            $insertGeneratedNodes(editor, nodes, selection);
          } else {
            const root = $getRoot();
            root.clear();
            root.append(...nodes);
            root.selectEnd();
          }
        });

        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );
  }, [editor, editorConfig]);

  return null;
}
