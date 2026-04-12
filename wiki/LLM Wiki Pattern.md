---
title: LLM Wiki Pattern
tags:
  - concept
  - meta
---

# LLM Wiki Pattern

A pattern for building personal knowledge bases where the LLM incrementally builds and maintains a persistent wiki, rather than re-deriving knowledge from raw sources on every query.

## Core Insight

Most LLM-and-documents workflows (RAG, ChatGPT uploads, NotebookLM) rediscover knowledge from scratch on every question. Nothing accumulates. The LLM Wiki pattern is different: the LLM **compiles** knowledge into a structured wiki once, then **maintains** it as new sources arrive.

The wiki is a persistent, compounding artifact. Cross-references are already there. Contradictions have been flagged. Synthesis reflects everything read so far.

## Three Layers

1. **Raw sources** — immutable source documents. The LLM reads but never modifies these.
2. **The wiki** — LLM-generated markdown pages: summaries, entity pages, concept pages, comparisons, synthesis.
3. **The schema** — a configuration document (like CLAUDE.md) that defines conventions and workflows.

## Operations

- **Ingest** — process a new source: extract key information, write a summary, update entity/concept pages, maintain cross-references.
- **Query** — answer questions using the wiki. Good answers get filed back as new pages.
- **Lint** — health-check for contradictions, stale claims, orphan pages, missing cross-references.

## Why It Works

Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass. The wiki stays maintained because the cost of maintenance is near zero.

The human curates sources, directs analysis, and asks good questions. The LLM does everything else.

## Related Ideas

The pattern is related to Vannevar Bush's **Memex** (1945) — a personal knowledge store with associative trails between documents. Bush's vision was closer to this than to what the web became: private, actively curated, connections between documents as valuable as the documents themselves.

See also: [[Index]]
