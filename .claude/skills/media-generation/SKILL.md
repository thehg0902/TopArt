---
name: media-generation
description: Plan site media as a slot-named shopping list (operator
  generates in Higgsfield manually) or storyboard for paid auto-generation
  behind the human approval gate - all logged to MEDIA_LOG.md. Use in
  pipeline Phase 4 or whenever new media is needed. Not for
  optimizing/ingesting files (image-optimization, /ingest) or hero
  playback code (hero-media).
metadata: {version: 1.1.0, category: media, tier: C}
---
# Media Generation

## Purpose
Consistent, on-direction media at controlled credit cost, with a hard
human gate before any credit is spent.

## Inputs
Design direction imagery style (DECISIONS.md), client.md Photos section
(what exists vs what's needed), contracts/media-log.md.

## Outputs
client/assets-intake/slots/SHOPPING_LIST.md (the operator's worksheet)
+ mirrored rows (id = slot filename, status=planned) in state/MEDIA_LOG.md.
Assets arrive via /ingest (operator path) or, after human approval,
paid generation.

## Rules
1. HARD INVARIANT (CLAUDE.md): no paid generation without a MEDIA_LOG row
   whose storyboard-approved column the HUMAN set to YES. Claude never
   writes YES in that column. Ever.
2. Shopping list first: for each needed asset write one
   SHOPPING_LIST.md block per contracts/asset-slots.md - exact slot
   filename, treatment, spec (duration/aspect/constraints), and the FULL
   copy-paste generation prompt - plus a mirrored MEDIA_LOG row
   (id = slot filename, status=planned, model = operator until the
   human opts into auto-generation). Present the list, then STOP.
2a. Default path is OPERATOR-GENERATED (credits 0, model=operator): the
   human generates in Higgsfield themselves, saves files under the exact
   slot names, runs /ingest. Paid auto-generation happens only when the
   human explicitly opts in AND has set storyboard-approved=YES per row
   (rule 1). Intro-loop pairs: write both slots; the loop's prompt must
   reference matching its intro's final frame.
3. Real client photos beat generated media - generate only what intake
   says is missing. Never generate fake team members, fake premises
   interiors presented as real, or fake review/before-after imagery.
   Overrides "Photos policy" (real-only | ai-allowed | mix) and "People
   in imagery" (yes | no) are hard constraints on the shopping list:
   real-only = no generation slots at all, only client-photo
   optimization; no people = no faces in any prompt.
4. Prompt consistency: one style block (from references/image-prompts.md,
   built from the design direction) reused verbatim across all prompts
   for the site.
5. Video for hero per hero-media constraints (duration/weight targets
   inform the generation settings - see references/video-prompts.md).
6. After generation (either path): files land in
   client/assets-intake/slots/ under their slot names; /ingest converts,
   places them under site/assets/, ticks the list, and flips MEDIA_LOG
   rows to in-use. Paid generations additionally record actual credits.
7. Budget per references/credit-budgeting.md; nearing the per-site cap ->
   stop and ask.

## References
- references/image-prompts.md, video-prompts.md, credit-budgeting.md

## Anti-patterns
- "Client said generate whatever" as gate bypass (invariant holds);
  regenerating on taste without logging the rejected row.

## Changelog
- 1.1.0 shopping-list workflow: slot-named worksheet, operator-generated
  default path, /ingest handoff (v1.3.0)
- 1.0.0 initial (encodes the storyboard-approval workflow)
