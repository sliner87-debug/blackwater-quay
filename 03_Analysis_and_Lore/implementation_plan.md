# Implementation Plan — Novel Line-by-Line Review & V2 Rewrite

This plan outlines the systematic review and line-by-line prose elevation of the 22-chapter master manuscript (*Blackwater Quay / Sablehook Master Novel*, ~108,500 words) using Gemini 3.6 Flash High prose enhancements, followed by creating and compiling Version 2 of the novel (`Chapter01-v2.md` through `Chapter22-v2.md` and `Sablehook_Master_Novel_v2.md`).

---

## User Direction & Style Guide

- **Chapter Formatting**: Seamless novel flow with `***` scene break markers (eliminating internal section subheadings).
- **Tone & Aesthetic**: Heavy **GrimDark Visceral Horror and Gore**. Heightened focus on bone-crafting, marrow magic decay, blood, visceral impact, body horror, cold tactical brutalism, atmospheric dread, and raw dark-fantasy intensity.
- **Preservation**: Core narrative structure, character identities (Banki/Sable, Mara, Pimwick, etc.), and lore remain intact while the prose is elevated line-by-line.

---

## Proposed Changes

The novel will be reviewed and rewritten chapter by chapter into `-v2` files, then compiled into `Sablehook_Master_Novel_v2.md`.

### Core Prose Enhancement Focus Areas
1. **Visceral GrimDark & Body Horror**: Enhance the tactile descriptions of marrow-runes, flesh-weaving, decay, blood, bone-splinters, cold iron, and physical trauma.
2. **Atmospheric Dread & Environment**: Enrich sensory depth (mud, rot, winter scrub, stagnant canals, subterranean cold).
3. **Character Monologue & Tactical Brutalism**: Deepen Banki's ruthless fey calculations and Mara's sharp survivor discipline.
4. **Dialogue & Rhythm**: Sharpen subtext and replace flat phrasing with visceral, rhythmic prose flow.

---

### Files

##### [NEW] [Chapter01-v2.md](file:///h:/Antigravity/Novel/Chapter01-v2.md) to [NEW] [Chapter22-v2.md](file:///h:/Antigravity/Novel/Chapter22-v2.md)
##### [NEW] [compile_v2.js](file:///h:/Antigravity/Novel/compile_v2.js)
##### [NEW] [Sablehook_Master_Novel_v2.md](file:///h:/Antigravity/Novel/Sablehook_Master_Novel_v2.md)

---

## Subagent Parallel Execution Plan

We will spawn 6 specialized parallel subagents:
- **Subagent 1**: Chapters 01 to 04
- **Subagent 2**: Chapters 05 to 08
- **Subagent 3**: Chapters 09 to 12
- **Subagent 4**: Chapters 13 to 16
- **Subagent 5**: Chapters 17 to 19
- **Subagent 6**: Chapters 20 to 22

Each subagent will read the source chapter line by line, rewrite it into `-v2` format adopting the GrimDark Visceral Horror style, using `***` scene breaks, and save to disk.

---

## Verification Plan

1. Check that all `Chapter01-v2.md` .. `Chapter22-v2.md` exist and are populated.
2. Run `compile_v2.js` to compile `Sablehook_Master_Novel_v2.md`.
3. Verify total word count and line metrics.
4. Create `walkthrough.md` summarizing the changes and highlighting sample GrimDark passages.
