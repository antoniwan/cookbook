# Recipe photography plan

For Antonio. Agreed direction: October 16, 2026.

## Goal

Build a consistent photograph collection for all 28 dishes. Use the same photographs for each recipe's English and Spanish pages.

Use the [recipe shot list](recipe-shot-list.md) for recipe-specific covers, details, and optional process photographs.

Twenty-six dishes currently need completed-dish covers. The two existing original covers can remain; their replacements are optional.

Use warm, honest family-kitchen photography. Let the garlic and strawberry characters provide the whimsy outside the photographs.

Standardize the light, framing, and editing. Preserve each dish's appearance and the character of our kitchen.

Only confirmed original photographs appear on the site. Other recipe images use the picnic-cloth placeholder until original photographs are ready.

## Temporary palette treatment

Recipe cards and recipe covers share a subtle CSS filter. It reduces saturation, softens contrast, and adds slight warmth.

The filter does not affect mascots, logos, text, or image credits. It does not overwrite image files.

Downloaded originals and social preview images retain their original colors. The treatment affects only images rendered within the site.

The shared --recipe-photo-filter variable is in src/styles/global.css. Set it to none when the replacement photographs no longer need this treatment.

This treatment reduces palette differences. It does not correct inconsistent lighting, composition, or subject matter.

## Missing photographs

Illustrated, third-party, and unverified covers use a shared picnic-cloth placeholder. Existing source files remain in the repository as historical assets.

The placeholder uses pale gingham, upright garlic heads, and inverted strawberry heads. A visible label identifies the missing recipe photograph.

The imageOwnership field records original, third-party, or unverified ownership. Its default is unverified.

A missing credit does not establish ownership. Display a photograph only after Antonio confirms that it is an original photograph.

On October 17, 2026, Antonio confirmed the photographs for Fried Chicken Tender Nuggets, Mia's Vegan Cupcakes, and Patatas y Batatas Bravas.

The Patatas y Batatas Bravas photograph shows preparation, not the completed dish. It appears within method step 3, not as a cover.

Keep preparation photographs within the relevant method step. Use completed-dish photographs for covers and Recipe image markup.

The frontmatter field imageKind identifies illustrations. Set imageKind to illustration to use the placeholder instead of that cover.

If heroImage is absent or cannot be resolved, the page also uses the placeholder.

After an original photograph is confirmed, set imageKind to photo and imageOwnership to original.

Update heroImage, imageAlt, attribution, and the social image. Do not apply an old external license to the replacement photograph.

Update both language pages together. Recipe JSON exposes hasPhoto and imageOwnership so other consumers can identify unavailable photographs.

The decorative pattern is not a completed-dish image. Recipe structured data omits image until a photograph is available.

## Visual direction

The [photo rulebook](photo-rulebook.md) expands this table with reasons and practice drills. Grade every candidate with the [photo scorecard](photo-scorecard.md) before publication.

| Element | Direction |
| --- | --- |
| Light | Soft window light from the side. Warm, but not yellow. No direct flash. |
| Background | Cream ceramics, natural wood, or neutral linen. Use a small, repeatable selection. |
| Color | Natural food colors. Gentle contrast. No heavy filters or excessive saturation. |
| Framing | Make the dish the main subject. Leave enough space for square and landscape crops. |
| Angle | Overhead for rice, soups, and skillets. Use approximately 45 degrees when height or layers matter. |
| Styling | Real portions, visible texture, and normal imperfections. Family plates and cookware are welcome. |
| Accuracy | Show the actual recipe. Do not add garnish or ingredients that the recipe does not contain. |
| Branding | No text, logo, mascot, or watermark inside the food image. |

Do not use generated food photographs as evidence of our cooking. Keep any future illustrations clearly distinct from actual photographs.

## First session: establish the reference set

1. Photograph Arroz con Pollo as the main-dish reference.
2. Photograph Brown Butter Gourmet Brownies as the baking reference.
3. Photograph Coquito de Moni as the drink reference.
4. Review all three images together in the recipe grid.
5. Confirm the lighting, color, framing, and crop before photographing the remaining dishes.

These are reference dishes, not a required cooking order. Substitute a dish from the same category if necessary.

## Before each cooking session

1. Read the current recipe.
2. Identify the finished presentation and any useful process photographs.
3. Choose a place with soft window light.
4. Turn off nearby artificial lights if they create a different color cast.
5. Clean the phone or camera lens.
6. Select a plate, bowl, or glass from the reference set.
7. Clear unrelated objects from the frame.

A phone and window light are enough to start. New equipment is not a prerequisite.

## Capture checklist for each dish

1. Photograph the completed dish before serving.
2. Capture a wider landscape composition with space around the food. Hold the phone horizontally: the wide recipe cover crops a portrait photo to about a third of its height.
3. Capture a closer view that shows texture or the inside of the dish.
4. Capture a second angle if the first angle hides important details.
5. Check sharpness and exposure before eating or clearing the plate.
6. Record any recipe corrections separately from the photography work.

Process photographs are optional. Photograph a step when it explains dough consistency, browning, shaping, or another useful visual cue.

For sofrito, photograph the finished paste and frozen cubes. Ingredients alone do not show the completed recipe.

For bread, brownies, and cupcakes, include a cut or opened portion when it reveals useful texture.

For drinks, show the prepared drink in a glass. A bottle can appear as supporting context.

## Image preparation

1. Keep the full-resolution original in the personal photo library or an approved life-file location.
2. Select one finished-dish image for the recipe cover.
3. Match its warmth, exposure, and contrast to the approved references.
4. Prepare a 4:3 crop for recipe cards.
5. Prepare a square crop and a 16:9 crop for other placements and structured data.
6. Check each crop independently for clipped food and empty space.
7. Export only the selected web assets for the public repository.

Use the camera's full-resolution capture setting. A master image at least 2400 pixels wide is a useful target, not a reason to reject a good photograph.

Use recipe-based filenames, such as arroz-con-pollo-4x3.avif. Use the same filename stem across its crops.

Google recommends completed-dish images and high-resolution 4:3, 1:1, and 16:9 variants.

Reference: [Google recipe image guidance](https://developers.google.com/search/docs/appearance/structured-data/recipe#recipe).

## Add the photographs to Cookbook

Warning: the GitHub repository is public. Check images for location metadata, private details, and people before publication.

1. Add selected web images to the existing src/assets/images/ collection.
2. Update the recipe's heroImage reference.
3. Write accurate imageAlt text for the new photograph.
4. Replace the previous image credit with the new photograph's actual attribution.
5. Remove any previous source URL or license that does not apply to the new photograph.
6. Update both language pages when the recipe has a translation.
7. Update the matching public/social/ image used by social previews and Recipe structured data.
8. Connect additional crop URLs to structured data when those variants are implemented.
9. Check the recipe card, recipe page, social image, and mobile crop.
10. Run the project's release checks before publishing.

The current site does not automatically create and connect all three crop variants. That integration is a separate implementation step.

Keep the original migration source records in docs/migration.json. Do not overwrite historical attribution with the new photograph's details.

Do not assign a public reuse license to original photographs without choosing that license explicitly.

## Completion tracker

Check a dish only after its new photograph is published and verified. This is a photography checklist, not a second recipe catalogue.

- [ ] [Arepas de Calabaza](../src/content/recipes/arepas-de-calabaza.md)
- [ ] [Arroz con Gandules](../src/content/recipes/arroz-con-gandules-en.md)
- [ ] [Arroz con Pollo](../src/content/recipes/arroz-con-pollo-en.md)
- [ ] [Asopao de Pollo](../src/content/recipes/asopao-de-pollo-en.md)
- [ ] [Banana Oat Bread](../src/content/recipes/banana-oat-bread.md)
- [ ] [Brocoli Con Sabor](../src/content/recipes/brocoli-con-sabor-en.md)
- [ ] [Brown Butter Gourmet Brownies](../src/content/recipes/brown-butter-gourmet-brownies.md)
- [ ] [Cast Iron Flank Steak](../src/content/recipes/cast-iron-flank-steak.md)
- [ ] [Chilean Sea Bass](../src/content/recipes/chilean-sea-bass.md)
- [ ] [Coquito de Moni](../src/content/recipes/coquito-de-moni-en.md)
- [ ] [Easy Breakfast Guacamole Toast](../src/content/recipes/easy-breakfast-guacamole-toast.md)
- [ ] [Egg-Free Pancakes for Mia Luna](../src/content/recipes/pancakes-sin-huevo-para-mia-luna-en.md)
- [ ] [Fried Chicken Tender Nuggets](../src/content/recipes/fried-chicken-tender-nuggets-en.md)
- [ ] [Habichuelas Guisadas](../src/content/recipes/habichuelas-guisadas-en.md)
- [ ] [Lamb Loin Chops al Vino con Vegetales](../src/content/recipes/lamb-loin-chops-al-vino-con-vegetales-en.md)
- [ ] [Lemon-Pepper Chicken Thighs](../src/content/recipes/lemon-pepper-chicken.md)
- [ ] [Mia's Chicken "Nuggets"](../src/content/recipes/mias-chicken-nuggets-en.md)
- [ ] [Mia's Cinnamon Pancakes](../src/content/recipes/mias-cinnamon-pancakes.md)
- [ ] [Mia's Vegan Cupcakes](../src/content/recipes/mias-vegan-cupcakes.md)
- [ ] [Pastel de Banana](../src/content/recipes/pastel-de-banana-en.md)
- [ ] [Patatas Bravas](../src/content/recipes/patatas-bravas.md)
- [ ] [Patatas y Batatas Bravas](../src/content/recipes/patatas-y-batatas-bravas.md)
- [ ] [Perfect Crispy Oven Drumsticks](../src/content/recipes/perfect-crispy-oven-drumsticks.md)
- [ ] [Shaved Carrots](../src/content/recipes/shaved-carrots.md)
- [ ] [Simple Baked Chicken Breasts](../src/content/recipes/simple-baked-chicken-breasts.md)
- [ ] [Sofrito](../src/content/recipes/sofrito-en.md)
- [ ] [Truffle Cacio e Pepe Fettuccine with Seared Chicken](../src/content/recipes/fettuccine-with-seared-chicken.md)
- [ ] [Turkey Patties](../src/content/recipes/turkey-patties.md)

Add a checklist entry when a new dish enters the project. Replace photographs gradually as we cook; no single large session is required.
