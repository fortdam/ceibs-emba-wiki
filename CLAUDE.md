# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

This repository implements the **LLM Wiki** pattern described in `llm-wiki.md` — a personal knowledge base where the LLM incrementally builds and maintains a persistent wiki from raw sources. The wiki is a structured, interlinked collection of markdown files that compounds over time.

The project has two deliverables that share the same markdown content:
1. **Obsidian vault** — the wiki pages are browsable and editable in Obsidian as-is.
2. **Wiki website** — a polished, publicly deployable wiki site built from the same markdown files.

## Architecture

```
personal_kb/
├── raw/              # Immutable source documents (articles, papers, etc.)
├── wiki/             # LLM-generated markdown pages (the knowledge base)
│   ├── index.md      # Content catalog — read first when answering queries
│   └── log.md        # Append-only chronological record of operations
├── site/             # Quartz v4 static site (config, templates, styles)
│   ├── quartz.config.ts   # Site config (title, theme, colors, plugins)
│   ├── quartz.layout.ts   # Layout components (sidebar, graph, backlinks)
│   ├── quartz/styles/custom.scss  # Custom CSS overrides
│   └── content -> ../wiki  # Symlink to wiki/ (do not break this)
├── llm-wiki.md       # Original idea document
└── CLAUDE.md         # This file — schema and conventions
```

### Three Content Layers (unchanged from the LLM Wiki pattern)

- **Raw sources** (`raw/`) — the LLM reads but never modifies these.
- **The wiki** (`wiki/`) — LLM-generated and LLM-maintained markdown pages.
- **The schema** (this file) — conventions and workflows for the LLM to follow.

### Website Layer (Quartz v4)

The `site/` directory is a [Quartz v4](https://quartz.jzhao.xyz) installation. Quartz is purpose-built for Obsidian vaults and provides out of the box:
- `[[wikilink]]` resolution into working hyperlinks
- Backlinks panel (pages that link to the current page)
- Interactive graph view for exploring connections
- Full-text search
- Link preview popovers on hover
- File explorer sidebar
- Tag pages

Theme: warm serif headers (Playfair Display), clean body text (Inter), earthy color palette (amber/sage). Custom styles in `site/quartz/styles/custom.scss`.

## Dual-Format Compatibility

All wiki content must work in both Obsidian and the website. This constrains how pages are written:

- **Wikilinks**: use `[[Page Name]]` and `[[Page Name|display text]]`. The site must have a plugin/config to resolve these. Do not replace wikilinks with standard markdown links.
- **Front-matter**: YAML front-matter is allowed (Obsidian renders it and most SSGs consume it). Keep it optional — pages must render correctly without it.
- **Images**: use `![[image.png]]` (Obsidian syntax). The site build must handle this. Store images in `wiki/assets/`.
- **Embeds**: `![[Other Page]]` transclusion is Obsidian-specific. Use sparingly; the site may not support it or may need a plugin.
- **Tags**: use `tags:` in front-matter rather than inline `#tag` to avoid ambiguity with markdown headings.
- **Folders**: keep the wiki directory structure flat or shallow. Deep nesting complicates both Obsidian graph view and site URL structure.

## Key Files

- `wiki/index.md` — content catalog of all wiki pages with links and one-line summaries, organized by category. Read this first when answering queries.
- `wiki/log.md` — append-only chronological record of operations. Use prefix format `## [YYYY-MM-DD] operation | Title` for parseability.

## Core Operations

### Ingest
When a new source is added to `raw/`: read it, discuss key takeaways, write a summary page in `wiki/`, update `wiki/index.md`, update relevant entity/concept pages, append to `wiki/log.md`. A single source may touch 10-15 pages.

### Query
Read `wiki/index.md` to find relevant pages, drill into them, synthesize an answer with citations. Good answers should be filed back into the wiki as new pages so explorations compound.

### Lint
Periodically health-check the wiki: find contradictions, stale claims, orphan pages, missing cross-references, concepts mentioned but lacking their own page, data gaps.

### Build Site
```bash
cd site && npx quartz build           # build to site/public/
cd site && npx quartz build --serve   # build + local dev server (http://localhost:8080)
```
`site/content` is a symlink to `wiki/` — Quartz reads directly from the wiki. No copy step needed.

## Conventions

- All wiki pages use `[[wikilink]]` cross-references (Obsidian-compatible; resolved by the site build).
- Log entries use the format `## [YYYY-MM-DD] operation | Title` so they're greppable.
- When updating the wiki, maintain existing cross-references and add new ones where relevant.
- File valuable query answers back into the wiki — don't let synthesis disappear into chat history.
- Never modify wiki markdown to accommodate the site if it would degrade the Obsidian experience. Fix it on the site/build side instead.
