# Template Changelog
## v1.4.1 - 2026-07-06 "Adaptive Optimization"
Quality-first within the performance budget, tuned to the hosting plan:
- Priority law (performance rule 0): load/interaction targets are hard
  floors; media quality is maximized WITHIN them.
- Hosting budget profiles via new Overrides "Hosting plan:" field:
  cdn (hostinger-business/cloud: page 1.5MB, hero 2.5/4MB, scrub 10MB)
  vs no-cdn (premium/unknown, fail-safe: 1.0MB, 2/3MB, 8MB + REQUIRED
  Cache-Control headers - block added to security-basics; CDN/cache
  post-deploy checks added to deploy-hostinger).
- /ingest quality ladders: images q90->q82->q75, video CRF 20->23->26,
  scrub 12fps/q80->q70->10fps - each steps down ONLY while over its
  profile budget; report shows kept level + headroom. Pillow fallback
  for images (no cwebp needed); video/scrub/posters need only ffmpeg
  (direct WebP encode).
- check.py page-weight audit: sums each page's real referenced asset
  bytes vs profile caps; FAIL over cap with heaviest-3 named, WARN >80%.
- visual-qa: rendered waste checks (img naturalWidth > 2x displayed,
  below-fold images missing lazy).
- Machine: ffmpeg + Pillow installed - full ingest now runs hands-off.
## v1.4.0 - 2026-07-06 "The Clear Sight Update"
Full-system consistency audit + visual-first debugging:
- Consistency fixes: stale animations.js/hero.js refs (css-only,
  loading-strategy), component-api rule 4 -> shared/main.js (v1.1.0),
  enrichment skips Overrides-answered facts, schema/scaffold sync.
- HOOKS FIXED: python3-based extraction silently failed on Windows ->
  pure-bash extraction, CLAUDE_PROJECT_DIR paths, timeouts, FAIL-CLOSED
  deploy gate; 8 unit tests pass (block/allow/exemption/fail-closed).
- Overrides regrouped under ### sub-headers (Identity/Facts/Conversion/
  Integrations/Media policy/Visual/Stack/Meta) + Audience field added;
  Photos vs Photos-policy disambiguated.
- NEW Phase 2 gate: scripts/generate-style-preview.py renders
  preview/style-preview.html from real tokens (palette, live WCAG
  contrast ratios, type scale, spacing, mock hero) - approve the vibe
  before phases 3-5. Never ships (outside site/, gitignored).
- NEW visual-qa skill (/visual-qa): rendered audit per page at
  360/768/1280 against layout checklist + design rationale + vibe refs;
  wired into /qa as mandatory layer 2; .claude/launch.json preview
  servers added.
- check.py: viewport meta, stylesheet order, img width/height (CLS),
  per-page CSS size + token-bypass warnings.
- Framework acceptance: Stack `framework:` flag (vanilla default,
  react-cdn/tailwind-cdn known, any request honored - never rejected);
  file-structure v2.1.0 Framework exception (CDN+SRI or app/ -> site/).
- OPERATION_MANUAL: full per-phase rundown (does/you/input/outcome) +
  "Last updated" stamp now lint-enforced like the README title.
## v1.3.4 - 2026-07-06 "First-generation accuracy fields"
17 new optional Overrides fields, each with a named consumer:
- Trust facts (copywriting + JSON-LD): Years in business / founded,
  Service area, Certifications / licenses, Price range, Payment
  methods, Emergency / after-hours.
- Conversion steering (site-architecture + seo-technical): Primary
  action (call|book|form|visit|order), Target search terms, Languages.
- Integration IDs (each preempts a QUESTIONS.md stop): Domain,
  Formspree ID, Form notify email, GA4 ID / Plausible domain.
- Media policy (media-generation hard constraints): Photos policy
  (real-only|ai-allowed|mix), People in imagery (yes|no).
- Visual hard constraints (design-direction/tokens): Brand fonts,
  Color mode (light|dark|either), Avoid (visual).
Consumption rules added to copywriting (1.2.0), seo-technical,
site-architecture, media-generation, design-direction, forms,
analytics. Empty values ignored as before.
## v1.3.3 - 2026-07-06
Overrides scaffold: client.md's Overrides section now lists every
available field (contact/hours/services, Pages markup, Links,
Testimonials, Photos, Competitors, Style references, Special requests,
Autonomy, all 7 Stack flags) as ready-to-fill bullet lines with known
values documented in the comment block. Empty values are ignored
everywhere - validator treats an empty flag as unset (no noise), and
the flags-present check now requires a non-empty value.
## v1.3.2 - 2026-07-06
Vibe references are now COMMITTED (gitignore rule removed): operator
works from multiple machines/cloud sessions, so vibe context must
travel with the repo. Deliverable safety unchanged - deploy-split and
/package prove nothing outside site/ ships. Validator adds a SOFT
size nudge for vibe images over 500KB. Docs/schema/client.md wording
updated.
## v1.3.1 - 2026-07-06 "The Vibe Update"
Website vibe as first-class intake:
- client.md gains an optional `## Vibe` section (v2 and v1.1 formats):
  free-text feel description + reference images listed as
  `- vibe/<file>: what to take from it`.
- New drop zone client/assets-intake/vibe/ - GITIGNORED: local-only
  context so Claude understands the aesthetic; never committed, never
  shipped, never copied into site/.
- design-direction 1.2.0: views each vibe image ONCE at Phase 2,
  distills named elements into the DECISIONS.md rationale (the artifact;
  images never re-read - token economy). Vibe outranks playbook
  aesthetics (client.md precedence); playbook conversion must-haves and
  the inspiration-not-duplication rule still apply.
- Validator: SOFT notes for referenced-but-missing vibe images and
  unlisted images on disk; VIBE summary line.
## v1.3.0 - 2026-07-05 "The Shopping List Update"
Streamlined asset creation:
- New contract contracts/asset-slots.md: slot naming grammar, treatment
  vocabulary (loop, intro-loop, scroll-scrub, image, alpha),
  SHOPPING_LIST.md format, MEDIA_LOG mirroring, scrub manifest schema.
- Phase 4 now writes client/assets-intake/slots/SHOPPING_LIST.md - exact
  slot filenames + full copy-paste Higgsfield prompts; operator manual
  generation is the default path (credits 0); paid auto-generation stays
  behind the unchanged approval invariant.
- New /ingest command + scripts/ingest-assets.py: matches slots/ against
  the list, re-encodes video + posters, extracts scroll-scrub frame
  sequences + manifest.json, WebP-converts images (alpha passthrough),
  places outputs per file-structure, ticks the list, updates MEDIA_LOG,
  reports missing/unknown/over-budget. Idempotent.
- hero-media 1.1.0: three new templates - loop-crossfade.js (rAF
  dip-to-black loop), intro-loop.js (intro->loop handoff),
  scrub-player.js (canvas scroll-scrub with progressive frame loading) +
  references/scroll-scrub.md.
- performance: scrub sequence budget (<=10MB, progressive after first
  paint). hero-media flag values extended (loop | intro-loop |
  scroll-scrub). Slot media gitignored; SHOPPING_LIST.md tracked.
- Phase 5 may optionally build with poster placeholders while slots fill.
## v1.2.1 - 2026-07-05
Clean deploy branch: Hostinger auto-deploy now pulls a generated
`production` branch containing ONLY site/ contents at its root.
- New scripts/deploy-split.sh: preconditions (clean tree, site/index.html,
  qa done), `git subtree split --prefix site`, cleanliness check that
  FAILS if any OS path (CLAUDE.md, .claude/, contracts/, state/, scripts/,
  client/, docs/) appears in the split, force-push to production; optional
  commit arg for rollback; graceful no-remote mode.
- deploy-hostinger skill: hPanel points at `production`/public_html (branch
  root IS the site); deploy = run the script; anti-pattern amended to
  "never commit manually to production"; rollback via commit arg;
  first-pull File Manager cleanup checklist item.
- /deploy command routes the Hostinger path through the script.
- pre-deploy-qa-gate hook: matches "deploy-split" too (a `bash
  scripts/deploy-split.sh` command line contains no "git push"); script
  re-checks QA itself.
- OPERATION_MANUAL: Phase 7(c) + deployment rundown diagram
  (main = everything, production = generated site-only, hosting = mirror).
## v1.2.0 - 2026-07-05
Client intake overhaul (paste-based), six changes:
1. client.md v2: Creative / Overrides / Business Profile Paste / Auto;
   every field optional; only blocker = no business name anywhere;
   in-file precedence Overrides > Auto[confirmed] > Auto[unconfirmed]
   (noted in CLAUDE.md ladder level 2).
2. New client-enrichment skill: parses the paste into tagged Auto facts
   ([paste][unconfirmed]), literal-extraction-only, testimonial
   candidates [needs-approval], up to 3 Creative suggestions as HTML
   comments, idempotent regeneration, niche detection → DECISIONS.md.
3. Phase 0 = enrich → validate → ONE confirmation table (Gate 1);
   corrections → Overrides, confirmations → [confirmed]; unconfirmed
   phone/address/hours/prices ship as [PLACEHOLDER] (qa blocks deploy).
4. Validator rewrite: v2 section model, name-only blocker, SOFT notes
   (empty Creative/Paste, missing flags, unparsed paste), v1.1 files
   still validate under old rules, facts summary line.
5. Downstream skills updated: copywriting (Creative primary voice,
   confirmed-facts-only, approved testimonials), design-direction
   (detected niche + Creative mood), site-architecture (Overrides pages
   else playbook), seo-technical (never publish unconfirmed NAP),
   intake-validation (confirmation-table flow).
6. Docs: OPERATION_MANUAL §2/§3/§5/§6 (2-minute setup, Gate 1 table),
   README quick-start, this changelog.
Also: pre-deploy-qa-gate hook gains an OS-maintenance exemption — push
is allowed while no build has started (phase 0 pending); the QA gate
applies unchanged the moment a build is in progress.
## v1.1.0 - 2026-07-03
Change order from the first real test run, six changes:
1. Flags recommend-never-refuse: interpretation principle in CLAUDE.md;
   Stack flags free-text with `placeholder` universal value; unrecognized
   values downgraded BLOCKER->SOFT; placeholder modes in booking, forms,
   email-marketing, analytics; intake writes recommendations to DECISIONS.
2. Pages markup syntax (`page | section / page2 | ...`) documented in
   schema, parsed by validator (malformed = SOFT + corrected reading);
   site-architecture treats it as authoritative, proposes niche must-have
   sections (machine-readable line added to all 5 playbooks).
3. Standalone deliverable: src/+assets/ replaced by site/ (home at root,
   one folder per page, shared/ + assets/ single-sourced); contracts,
   skills, QA script, commands updated; new /package command zipping
   site/ contents to deliverables/ (gitignored).
4. Alpha assets never flattened: PNG explicitly permitted (perf exemption);
   optimize.sh auto-detects alpha and passes PNG through with a printed
   alpha-preservation check.
5. Deploy is a three-way choice at Phase 7 (manual /package, GitHub Pages
   via new reference, Hostinger); manual path ends the workflow at phase 7;
   Phase 8 optional after manual.
6. Token economy: CLAUDE.md section replaced/strengthened; new
   token-economy skill (unverified-savings note included); operator
   practices in OPERATION_MANUAL §11. docs/OPERATION_MANUAL.md created
   (did not previously exist).
## v1.0.0 - 2026-07-02
Initial Agency OS template: constitution CLAUDE.md, 27 skills (tiers A-E),
4 contracts, pipeline commands (/build /qa /deploy /client-edit /handoff
/lint-os), path-scoped rules, 2 enforcement hooks, validation/lint/registry
scripts. Per-client usage: replace client/client.md, run /build.
