# Contract: Asset Slots  (v1.0.0)

The interface between media planning (media-generation), the operator's
manual generation workflow, ingestion (scripts/ingest-assets.py via
/ingest), and playback code (hero-media). One folder, one list, exact
filenames.

## The drop zone

`client/assets-intake/slots/` — the operator saves every incoming asset
here, named EXACTLY as the shopping list says. Nothing else goes here.
Slot media files are gitignored (heavy originals); SHOPPING_LIST.md is
tracked.

## Slot naming grammar

`<section>-<treatment>[-NN].<ext>`   (kebab-case, per file-structure rules)

- `hero-loop.mp4`          hero section, looping video
- `hero-intro.mp4` + `hero-loop.mp4`   intro+loop pair (both required)
- `hero-scrub.mp4`         hero section, scroll-scrub source video
- `about-loop.mp4`         any section can take a treatment
- `gallery-01.jpg`         numbered stills
- `logo.png`               reserved name; alpha rules apply

## Treatments (the vocabulary)

| treatment | source | ingest output | player template (hero-media) |
|---|---|---|---|
| loop | one mp4 | re-encoded mp4 + poster webp -> site/assets/video/ | loop-crossfade.js (rAF dip-to-black; use native loop attr only for footage designed seamless) |
| intro-loop | two mp4s (-intro, -loop) | both re-encoded + poster from intro first frame | intro-loop.js (intro once, rAF crossfade to loop) |
| scroll-scrub | one mp4 | frame sequence + manifest.json -> site/assets/images/scrub/<slot>/ | scrub-player.js (canvas) |
| static / image | jpg/png | webp (+srcset variants) -> site/assets/images/ | plain <img> |
| alpha | png with transparency | PNG passthrough, never flattened | plain <img> |

## SHOPPING_LIST.md format

Lives at `client/assets-intake/slots/SHOPPING_LIST.md`. Written by
media-generation in Phase 4. One block per slot:

    ## <exact-filename>        [ ] filled
    treatment: <treatment> - <duration/aspect/other spec>
    <one line of intent/constraints>
    PROMPT ->
    <full copy-paste generation prompt, multi-line allowed>

/ingest flips `[ ]` to `[x]` when the slot is processed. The list is a
worksheet; state/MEDIA_LOG.md remains the ledger of record.

## MEDIA_LOG mirroring

Every shopping-list slot gets a MEDIA_LOG row at Phase 4 with
`id = slot filename`, `status = planned`. Operator-provided files:
`model = operator`, `credits = 0` — the paid-generation approval
invariant is untouched (it gates PAID generation only). /ingest sets
`file` to the final site/assets path and `status = in-use`.

## Scrub manifest.json (written by ingest, read by scrub-player.js)

    {"slot": "hero-scrub", "frames": 120, "fps": 12,
     "width": 1440, "height": 810, "pattern": "frame-%04d.webp"}

Lives next to its frames: `site/assets/images/scrub/<slot>/manifest.json`.
frame numbering starts at 0001. Frame 0001 doubles as the poster/
reduced-motion fallback.

## Rules

1. The shopping list is the single source of slot names. /ingest matches
   by exact filename; unexpected files are reported, never guessed at.
2. Filenames are law: renaming a slot after Phase 4 requires updating
   SHOPPING_LIST.md + MEDIA_LOG row + any wired template in the same
   change.
3. Ingest is idempotent: re-running processes only unfilled or changed
   slots; it never re-encodes an already-processed unchanged file.
4. Every ingest output lands per contracts/file-structure.md; nothing
   is ever served from client/assets-intake/.
5. Weight budgets (performance skill) are enforced at ingest time:
   over-budget outputs are flagged in the ingest report, not silently
   shipped.
