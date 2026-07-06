# Agency OS — Constitution

This repository is a reusable website-build template. One client = one clone of
this repo. The ONLY file that changes per client is `client/client.md`.
A "build" means: transform `client/client.md` into a complete, deployed,
custom-coded website (HTML/CSS/JS) following the pipeline below.

## How to work in this repo

- Start or resume any build with the `/build` command. It reads
  `state/BUILD_STATE.md` and continues from the current phase.
- All expertise lives in skills (`.claude/skills/`). Trust skill descriptions
  to load what the task needs. Do not preload skills speculatively.
- All shared interfaces live in `contracts/`. Skills obey contracts.
- All mutable project state lives in `state/`. Never store state in this file.

## Precedence ladder (conflict resolution — highest wins)

1. Explicit user instruction in the current session
2. `client/client.md` (the client is the spec). Within it: Overrides
   (owner-typed) > Auto [confirmed] > Auto [unconfirmed] — unconfirmed
   facts may drive drafts but ship as [PLACEHOLDER] until confirmed
   (client.schema.md).
3. `state/DECISIONS.md` (previously resolved ambiguities)
4. Hard invariants below (these beat client.md ONLY for the enumerated items)
5. `contracts/*` (interface law between skills)
6. Skill bodies (`.claude/skills/*/SKILL.md`)
7. Skill reference files
8. General knowledge

Tie-breaker within a level: more specific beats more general. If two
same-level sources genuinely conflict: do NOT silently pick — log the
conflict to `state/QUESTIONS.md` and take the reversible option.

## Hard invariants

- NEVER trigger paid media generation (Higgsfield or any paid API) without an
  approved storyboard recorded in `state/MEDIA_LOG.md`. No exceptions, even if
  the client says "generate whatever you want."
- NEVER deploy without a passing QA gate (`/qa` completed, recorded in
  `state/BUILD_STATE.md`).
- NEVER invent client facts (hours, prices, addresses, testimonials, claims).
  Missing facts go to `state/QUESTIONS.md` as questions; use clearly marked
  `[PLACEHOLDER: ...]` text in the meantime.
- NEVER commit secrets, API keys, or credentials to the repo.
- NEVER remove or rename files under `contracts/` during a build.

## Interpretation principle (soft — sits below the invariants)

client.md content is never "invalid." Unrecognized values are intent to
interpret: recommend an approach, log it in `state/DECISIONS.md` as
claude-proposed, and proceed. Only structurally MISSING required sections
block Phase 0.

## Token economy (always on)

- Never re-read a file already in context unless it changed. Grep/glob to
  locate before reading; read line-ranges, not whole files, for files
  over 200 lines.
- Never print file contents, diffs, or code into chat that were written
  to disk; report paths + one-line summaries only.
- One skill body at a time: load a skill only at the phase that needs it;
  never preload; never re-read a skill already loaded this session.
- Prefer running scripts over reasoning through checklists in prose.
- Prefer targeted edits over rewrites.
- Phase reports: max 5 lines. No recaps of prior phases.
- Batch related small edits into single operations; no exploratory
  reading "to understand the codebase" — the OS map is in this file.

## Map

- `client/client.md` — the spec. `client/client.schema.md` — required fields.
- `contracts/` — design-tokens, file-structure, component-api, media-log.
- `state/` — BUILD_STATE.md, DECISIONS.md, QUESTIONS.md, MEDIA_LOG.md.
- `site/` — the standalone website deliverable (pages, shared/, assets/)
  per contracts/file-structure.md. The OS never leaks into site/.
- `scripts/` — repo utilities (validate, lint, registry). Run, don't read.
- `UPDATE_LOG.md` (repo root) — operator's private notes. NEVER read it.
