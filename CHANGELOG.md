# Changelog

## Unreleased

- Add the shared coding standards (antoniwan/ai `shared/standards` v1): `.editorconfig`, LF line endings, Prettier, ESLint correctness rules, and no unused locals or parameters. CI now fails on unformatted code or a lint error.

- Count each call to action in Stats as a `cta` click event with a `label`: Browse recipes, the recipe filters and Clear filters, kitchen mode, Print, the multipliers, Copy ingredients, Reset checklist, the language link, and the footer links. One that leaves the site also carries `to` and `url` instead of a second `outbound` event. Tasteless lists every label beside the site's views, so the unused ones can go.

- Count visits in Stats, the self-hosted Umami shared with antoniwan.online, next to Vercel Web Analytics: no cookies, no stored IP addresses, Do Not Track respected. Clicks to other sites are recorded as an `outbound` event. It loads only when the build has `PUBLIC_UMAMI_HOST` and `PUBLIC_UMAMI_WEBSITE_ID`.

- Add a photo rulebook with reasons and practice drills, a keep, edit, or retake scorecard, recipe writing rules, and a photo and layout audit.

- Add Vercel Web Analytics to every page.

- Let readers collapse quantity controls while keeping the selected multiplier visible.
- Collapse quantity controls when kitchen mode starts.
- Use a pearl-white paper texture and remove decorative borders and panel backgrounds.
- Clarify the homepage note about fun, curiosity, creative direction, and personal expression.

- Add a recipe-specific photography checklist for all 28 dishes, with 26 missing covers and two optional cover refreshes.

- Move the Patatas y Batatas Bravas preparation photograph into method step 3 and use the pattern as its cover.

- Restrict recipe photographs to confirmed original images; use placeholders for third-party and unverified images, including social previews.

- Replace illustrated recipe covers with a shared picnic-cloth placeholder until actual photographs are available.
- Keep decorative placeholders out of Recipe image markup and expose photo availability in recipe JSON.

- Add a personal homepage note about curiosity, creative freedom, and the pleasure of making things.

- Simplify the homepage label and replace footer attribution with an aside while retaining authorship in metadata.

- Apply a reversible warm, muted palette treatment to recipe cards and covers without changing mascot colors or original assets.

- Compact the recipe toolbar and give quantity controls a dedicated panel.
- Add half-batches, custom multipliers, original-amount comparisons, and ingredient copying.
- Scale ranges, optional amounts, and explicit equivalents while flagging ambiguous numeric lines for review.
- Preserve the original recipe data and include the active multiplier when printing scaled ingredients.

- Document the recipe photography direction, capture workflow, and 28-dish completion checklist.

- Replace decorative asterisks and wordmark punctuation with garlic and strawberry icons.
- Add the angry garlic to caution and missing-result states.
- Add named, linkable method steps and structured equipment.
- Add recipe gallery, breadcrumb, and site identity structured data.
- Expose supported recipe yields, total durations, categories, and regional tags.
- Test structured data and document the source of each added recipe fact.

## 0.1.0 — 2026-10-16

- Establish the Astro cookbook and its public recipe collection.
- Preserve published recipe bodies, image credits, and translation relationships.
- Add browsing, search, kitchen controls, printing, and machine-readable recipes.
- Introduce garlic and strawberry companion mascots.
