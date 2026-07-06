# Decisions Log
<!-- Resolved ambiguities. Once logged here, a decision outranks skills
     and contracts (precedence level 3). Format:
     YYYY-MM-DD | topic | decision | decided-by (human/claude) | why -->
2026-07-06 | niche | Detected niche: roofing contractor (residential + commercial), from GBP category line | claude-proposed | feeds niche-playbook selection in Phase 2
2026-07-06 | gate-1 | Operator said "proceed anyway": all 10 Auto facts stay [unconfirmed] and drive drafting; phone/address/hours render as [PLACEHOLDER] until confirmed | human | operator choice at Gate 1
2026-07-06 | testimonials | Google-review testimonial candidates NOT yet approved — build testimonial section with [PLACEHOLDER] quotes until operator approves | claude | enrichment rule 3: reviews enter the site only on operator approval
2026-07-06 | vibe | Operator vibe: premium black + white + gold, slick, no-BS, straight to the point, quality first. Never say: "cheap" | human | typed into client.md Vibe/Creative
2026-07-06 | architecture | 3-page site (below); primary conversion action = call (phone visible in header, quote form secondary); nav: Home / Services / Contact + header phone | claude-proposed | no Pages/Primary-action override; 3 services < 5 so one Services page; contact page required (physical address); Creative empty so no About page — why-us folds into Home; playbook: hvac (closest trade-services match to roofing)

## Architecture (Phase 1) — Top Art Roofing Ltd

**Home — site/index.html** — purpose: convert visitors to a call or quote request.
Sections: hero (phone visible, call CTA) | services (3 cards: shingles, aluminum gutters, flat roofing) | about (why-us: quality-first, fair pricing, professional crew — from review language) | testimonials ([PLACEHOLDER] until operator approves review quotes) | cta (call + quote) | footer

**Services — site/services/index.html** — purpose: detail each service line for search intent (shingle roofing / aluminum gutters / flat roofing, residential + commercial).
Sections: hero (compact) | services (one detail block per service, anchors: #shingles #gutters #flat-roof) | faq (roofing buyer questions) | cta | footer

**Contact — site/contact/index.html** — purpose: capture the lead.
Sections: hero (compact) | contact (phone, address, hours [PLACEHOLDER until confirmed], quote form slot, map slot per maps-gbp) | footer

Playbook must-haves (hvac): hero+phone ✓ services ✓ about ✓ testimonials ✓ contact+form ✓ cta ✓

## Design rationale (Phase 2) — direction: "Precision Monochrome"

1. Direction: architectural monochrome — warm off-white canvas, near-black ink, restrained gold accent; premium, slick, zero clutter (Vibe outranks hvac playbook's blue palette; playbook conversion rules stay).
2. Vibe ref (002f7014…png), named elements: line-art roof-pitch mark in black+gold; wide-tracked thin display caps ("TOP ART"); gold hairline rules flanking small-caps labels; letter-spaced micro-caps tagline with gold left border; charcoal roofline photography with warm gold under-eave light on off-white sky.
3. Brand copy found in ref: tagline "Precision above. Beauty beyond." — usable verbatim.
4. Color intent: light base (off-white #faf9f7-ish), charcoal-black text/surfaces, single gold accent (muted metallic, not yellow); dark charcoal sections (CTA band, footer) supply the "black" presence.
5. Type pairing intent: elegant wide-tracked serif caps for display (Cinzel/Marcellus family) + neutral grotesque sans for body/UI (Inter/Jost family) — final call in design-tokens.
6. Imagery style: photo-real architectural editorial — crisp modern rooflines, charcoal shingles, warm wood/gold light, no stocky people shots.
7. Distinctive element (the ONE): the roof-pitch diagonal — thin black+gold hairline rules used as heading underlines and section dividers, echoing the logo mark.
8. Layout personality: generous whitespace, strict grid, straight-to-the-point sections; no decorative clutter (no-BS).
9. Motion level: subtle, css-only (proposed — Stack flag empty); fade/rise reveals only, playbook forbids animation-heavy.
10. Negative constraints: never say/look "cheap"; no bright yellow-gold, no busy patterns.

2026-07-06 | design-direction | "Precision Monochrome" per rationale above; hvac playbook palette overridden by client Vibe; animation proposed css-only subtle | claude-proposed | Vibe = precedence level 2
2026-07-06 | style-gate | Style preview approved via "continue pipeline" | human | Phase 2 gate
2026-07-06 | phase-5-early | Proceed into Phase 5 with poster placeholders while media slots are filled; /ingest swaps later | human ("continue pipeline" after option offered) | pipeline Phase 4 optional path
2026-07-06 | stack-flags | All flags empty → proposed: framework=vanilla, animation=css-only, 3d=no, forms=placeholder (no Formspree ID yet), booking=none, email-marketing=none, analytics=none (GA4 addable in retainer), hero-media=static premium image hero with slot | claude-proposed | validation: flags default to propose
2026-07-06 | copy-register | Hero candidates: (A) brand-premium "Precision above. Beauty beyond." (from client's own brand board) vs (B) no-BS direct "Markham roofing, done right the first time." Picked A; register = premium-direct: brand lines short/elevated, body copy plain and factual | claude-proposed | tagline is client-owned copy; matches Vibe "premium, slick, no BS"
2026-07-06 | tel-links | tel: hrefs carry the paste phone (+14169308939) so links are testable; VISIBLE text is [PLACEHOLDER] — QA scans visible text, ship stays blocked until confirmed | claude-proposed | placeholder rule targets rendered text; broken hrefs would fail QA for the wrong reason
2026-07-06 | legal-page | Added privacy/ page (4th page) — quote form collects name/phone/message, so a policy is required; footer-linked, noindex until finalized | claude-proposed | legal-pages skill; not in Phase 1 map
2026-07-06 | qa-script-fix | check.py link checker: strip #fragment before resolving path (cross-page anchor links like services/#shingles false-failed) | claude | checker bug; fix should be upstreamed to the template repo
2026-07-06 | facts-confirmed | Operator confirmed phone/address/hours; placeholders replaced site-wide; hours rendered "Open until 10 p.m." (per-day granularity still open) | human | operator reply
2026-07-06 | testimonials-v2 | Review quotes REJECTED for static use; operator wants a live Google-reviews integration. Section shows real 4.9/196 stat + Google link + [PLACEHOLDER] cards until a widget is chosen (third-party embed decision pending) | human | operator reply
2026-07-06 | forms-disabled | Formspree disabled for now; form UI stays with placeholder intercept; privacy policy names no provider | human | operator reply
2026-07-06 | hero-video | Operator hero1/hero2 videos wired as intro-loop treatment (hero1 16:9 intro plays once → crossfade → hero2 loops); posters from ingest; reduced-motion gets poster | claude-proposed | two 5s non-seamless clips map cleanly onto the intro-loop template
2026-07-06 | gallery-added | "Our recent work" gallery section (6 real job photos) added to home between about and testimonials | human | operator instruction; updates Phase 1 architecture
2026-07-06 | logo-in-use | logo.png (alpha, trimmed + resized to 583×320) replaces header text logotype; footer keeps text (black logo invisible on dark); slot original untouched | claude-proposed | operator said "logo.png as the logo"; weight cut 236KB→112KB
2026-07-06 | deploy-branch | Production branch named `deployment` per operator (deploy-split.sh defaults to `production`); same split+verify+force-push flow, run manually with the custom name | human | operator instruction
2026-07-06 | video-pair-budget | ingest ladder budgets videos per-file (3MB each) but check.py caps per-page total; intro-loop pair needed manual post-ingest re-encode (intro CRF26 1.3MB, loop CRF27 0.9MB). Any /ingest --force on the hero slots re-inflates them — re-apply. Upstream candidate: pair-aware ladder in ingest-assets.py | claude | template gap found on first intro-loop client
