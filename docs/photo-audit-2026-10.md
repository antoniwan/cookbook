# Photo and layout audit

For Antonio. Snapshot as of October 24, 2026. Measurements come from a local build of `main` at 1440 px and 390 px viewport widths.

This audit explains why the [photo rulebook](photo-rulebook.md) asks for what it asks. Numbers will drift as the CSS changes. Re-measure before relying on them.

## What the site does with a cover photograph

One image file feeds four placements. Each placement crops it from the centre with `object-fit: cover`.

| Placement | Shape on screen | Size on screen | Source |
| --- | --- | --- | --- |
| Recipe card, desktop grid (4 across) | 4:3 | about 314 × 235 CSS px | `.card-image` in `src/styles/global.css` |
| Recipe card, phone | 4:3 | about 350 × 233 CSS px | same |
| Recipe cover, desktop | about 2.1:1 | 1160 × 550 CSS px (capped by `max-height: 550px`) | `.recipe-hero > img` |
| Recipe cover, phone | about 1.9:1 | about 350 × 186 CSS px | `width={1280} height={680}` in `src/pages/recipes/[slug].astro` |
| Social preview and Recipe JSON-LD | 1.91:1 | 1200 × 630 px file | `public/social/` |
| Process photo inside a method step | the file's own shape | up to 780 px wide | `.recipe-prose img` |

The wide cover is the binding constraint. A 4:3 landscape photo loses about 18 % at the top and 18 % at the bottom on desktop. A 3:4 portrait photo loses about 64 % of its height.

The card is the size that most visitors see first. At 314 px wide, fine detail disappears. The shape and colour of the dish must carry the image.

## Findings

### 1. Both live covers are portrait, and the wide cover crops them hard

Fried Chicken Tender Nuggets and Mia's Vegan Cupcakes are 3024 × 4032 phone photographs held vertically.

On the desktop recipe page, the fried chicken cover shows a band through the middle of the tenders. The plate edge and most of the corn are cut away. It still reads as fried chicken, but the composition the photographer made is gone.

Rule that follows: shoot covers in landscape. See [Frame for the site](photo-rulebook.md#1-frame-for-the-site).

### 2. Twenty-six of 28 cards use the same placeholder

The grid currently relies on titles alone. As photographs arrive, the grid will be where inconsistency shows first, because 12 or more covers sit side by side.

Rule that follows: grade every candidate for consistency with the reference set, not only on its own. See criterion R in the [scorecard](photo-scorecard.md).

### 3. The EN / ES badge covers the bottom-right corner of translated cards

The badge sits 10 px from the bottom-right corner on every recipe that has a translation. Do not place the defining detail of a dish in that corner.

### 4. A shared filter changes every photograph on the site

`--recipe-photo-filter` applies `sepia(.16) saturate(.78) contrast(.95) brightness(1.03)` to cards, covers, and process photographs.

It mutes a mixed collection, which is its purpose. It also adds warmth. A photo that is already warm or orange, like the fried chicken, turns muddy brown under it.

Rule that follows: grade and edit the unfiltered file, keep whites neutral, and do not raise saturation to fight the filter. Turn the filter off once the reference set is published, as the [photography plan](recipe-photography.md#temporary-palette-treatment) already intends.

### 5. Placeholder covers and photo covers have different heights

The placeholder cover is 190 to 320 px tall. A photo cover can be up to 550 px tall. Pages will change height as photos arrive. This is expected, not a defect.

### 6. The process photo has no shape constraint

The Patatas y Batatas Bravas preparation photo fills the 780 px text column at its own 3:2 shape. A portrait process photo would fill most of a phone screen and push the next step out of view.

Rule that follows: process photos are landscape too.

### 7. Alt text and image facts need a check

- Fried Chicken Tender Nuggets: `imageAlt` says three tenders. The photo appears to show four, two of them overlapping on the left. Confirm and correct both language pages.
- Mia's Vegan Cupcakes: the photo shows 24 cupcakes, a double batch. The alt text says so correctly. The recipe yields 12. That is acceptable, but a retake should show the recipe as written.

### 8. Grading the existing photos

The two covers and the process photo are graded as worked examples in the [scorecard](photo-scorecard.md#worked-examples). Both covers pass every gate and grade RETAKE. They can stay live until the retakes exist.

## Recipe text

The 40 pages share one clear structure: an introduction, then Ingredients, Equipment, Method, and Notes. Method steps are short, start with a verb, and give cues such as "until it shines". This is the strongest part of the collection.

Inconsistencies worth fixing as each recipe is next edited:

- Units vary. Cupcakes give cups with grams in parentheses, brownies give grams first, and most savoury recipes give volume only.
- Fractions vary. Most pages use ½ and ¾. The brownies use 1.5 and 0.75.
- Temperatures vary. Two pages give °F and °C. The rest give °F only.
- Descriptions follow a formula, but only some state the yield.
- Spanish pages use the tú imperative ("Seca el pollo"). Keep that consistent. Changing to usted would be a whole-collection decision.

The [recipe writing rules](recipe-writing.md) set one house style for each of these.
