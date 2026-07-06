# Build State

Client: Top Art Roofing Ltd
Template version: v1.4.1
Started: 2026-07-06

| phase | name         | status  | gate                      | completed |
|-------|--------------|---------|---------------------------|-----------|
| 0     | intake       | done    | HUMAN: confirm table      | 2026-07-06 |
| 1     | architecture | done    | -                         | 2026-07-06 |
| 2     | design       | done    | HUMAN: approve style prev | 2026-07-06 |
| 3     | content      | done    | -                         | 2026-07-06 |
| 4     | media        | in-progress | HUMAN: fill slots/approve | -     |
| 5     | build        | done    | -                         | 2026-07-06 |
| 6     | qa           | done    | scripts must pass         | 2026-07-06 |
| 7     | deploy       | in-progress | HUMAN: confirm deploy | -         |
| 8     | handoff      | pending | -                         | -         |

status: pending | in-progress | blocked | done
Notes:
- 2026-07-06 Phase 0: done via "proceed anyway" — all facts [unconfirmed], contact facts ship as placeholders until confirmed. Testimonials not yet approved.
- 2026-07-06 Phase 1: done — 3-page architecture in DECISIONS.md.
- 2026-07-06 Phase 2: done — style approved via "continue pipeline".
- 2026-07-06 Phase 3: done — copy in all 3 pages; register premium-direct; placeholders on phone/address/hours/testimonials.
- 2026-07-06 Phase 4: shopping list written (5 image slots, operator path, credits 0). Gate stays open until slots filled via /ingest. Proceeding to Phase 5 with poster placeholders per operator consent.
- 2026-07-06 Phase 7: deploy = Git branch `deployment` (site-only subtree split of site/, files at root), operator connects host. Split f763b53 pushed to origin/deployment; cleanliness-verified (no OS files). Redeploy after any site change: commit main → `git subtree split --prefix site main` → force-push result to refs/heads/deployment (branch name differs from deploy-split.sh default `production`). REMINDER before real traffic: domain still placeholder in sitemap.xml/robots.txt.
- 2026-07-06 Phase 6 DONE. check.py 0 FAIL / 7 WARN (drift WARNs = aria-current + path depth, reviewed benign; 0.92MB home = headroom warning). Visual QA: 4 pages × 360/768/1280 — no h-scroll, landmarks + h1 everywhere; interactive checks passed earlier (nav toggle+Esc, form intercept, FAQ, hero intro→loop chain, gallery reveal, map). Manual review: facts operator-confirmed or paste-sourced with Google link; no invented claims; tel/href consistent. Testimonial placeholder cards replaced by reviews-band (real 4.9/196 stat + Google link); widget slot = HTML comment, wired later with privacy+CSP update in same change.
- 2026-07-06 (later) Operator round 2: facts confirmed → placeholders cleared site-wide; review quotes rejected (live Google widget wanted — placeholder cards remain, the ONE open QA FAIL); forms stay disabled; real assets ingested (hero video pair intro-loop, 6-photo gallery section added, logo wired); map embedded; privacy finalized. check.py: 1 FAIL (testimonial placeholders — awaiting widget choice), 7 benign WARNs. Page 0.92MB/1.0 cap; hero videos 2.16MB/3 cap (post-ingest re-encode CRF26/27 — NOTE: /ingest --force resets them to CRF23 and busts the pair cap; re-apply or fix ingest ladder). Reveal-anim anchor-jump bug fixed in main.js. Phase 4: 9/13 slots in-use; services-01..03 + about-static await storyboard-approved=YES (operator asked to auto-generate; invariant requires their YES per row).
- 2026-07-06 Phase 6 BLOCKED (superseded — see above). Cross-page-anchor false-FAIL fixed in check.py (fragment strip) — upstream to template. Full /visual-qa + manual review scheduled once the last placeholder clears.
- 2026-07-06 Phase 5: 4 pages built (home, services, contact, privacy) vanilla per contracts. A11y: skip links, landmarks, labeled form + aria-live status, native details FAQ, reduced-motion-wrapped animations, keyboard nav toggle w/ Escape — checklist pass; browser-verified at 375/1280 (no h-scroll, nav toggle + form placeholder behavior tested). Perf (no-cdn profile): ~120KB/page at placeholder stage, 3 woff2 fonts (Cinzel600 dropped), all scripts defer, width/height on imgs, .htaccess caching. Security: headers + report-only CSP in .htaccess, honeypot, no CDN deps, no secrets. SEO: unique titles/descriptions, OG tags, RoofingContractor JSON-LD (unconfirmed NAP omitted), sitemap/robots carry [PLACEHOLDER: domain]. og-image regenerate after hero ingest.
