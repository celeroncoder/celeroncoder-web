# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- **Blog reading sidebar** — a sticky table of contents that scroll-spies the
  current section as you read, with smooth-scroll anchor links to every heading.
  Hierarchy is conveyed through indentation and dimming: `h2` headings are
  prominent, `h3`+ are smaller and muted. A minimal "see all" back link sits at
  the top. The sidebar is shown on `xl`+ screens; below that the back link falls
  back to the top of the article.
  (`components/blog/toc-sidebar.tsx`, `lib/blog-toc.ts`)
- **Heading anchors** — post headings render stable, de-duplicated `id`s, so the
  table of contents and `#fragment` deep links resolve to the correct section.
- **Markdown paste in the post editor** — pasting raw Markdown into the Lexical
  editor now converts to rich text (headings, lists, bold, links, code, …)
  instead of being dropped to plain text. Conversion runs through the editor's
  own Markdown transformers in a detached editor, then inserts the result at the
  cursor as serialized nodes — preserving existing content and custom nodes such
  as code blocks. (`features/markdown-paste/`)
- **Fenced code blocks** — enabled Payload's `CodeBlock`, so ` ``` ` fences work
  via the toolbar, Markdown typing, and Markdown paste. The language field
  accepts any token (e.g. ` ```tree `), not just the preset list.
  (`features/code-block.ts`)
- **Code syntax highlighting** — code blocks render on the public blog with
  highlight.js (github-dark theme), falling back to language auto-detection when
  a fence has no language tag.

### Changed

- Typography is now lowercase site-wide (`text-transform: lowercase`).

### Dependencies

- Added `lexical`, `@lexical/markdown`, `@lexical/react`, `@lexical/clipboard`,
  and `@lexical/html` (all `0.35.0`, matching the Payload-bundled version), plus
  `highlight.js`.
