# Recipe photograph placeholder

Antonio requested a cozy patterned placeholder on October 17, 2026.

The built-in image generation tool created the selected textile pattern. It used the existing garlic and strawberry portraits as identity references.

## Assets

- Source: src/assets/recipe-placeholder-pattern.png
- Web image: public/recipe-placeholder.webp
- Social preview: public/social/recipe-placeholder.jpg
- Component: src/components/RecipePlaceholder.astro

The selected design uses upright garlic and inverted strawberry heads on pale gingham. CSS reduces its opacity over the page's cream background.

The site displays the image as a single patterned swatch. It does not depend on seamless edge tiling.

The illustration does not receive the photograph palette filter. It remains decorative and has an empty alt attribute.

A visible text label identifies the missing photograph. Recipe cards also expose this status outside their decorative image link.

## Initial illustrated replacements

- Asopao de Pollo, English and Spanish.
- Mia's Chicken "Nuggets", English and Spanish.
- Shaved Carrots.
- Turkey Patties.

These four dishes account for six language-specific pages. Their existing covers are illustrations, not photographs.

## Original-photograph policy

Antonio requested removal of photographs that are not his on October 17, 2026.

Thirty language-specific pages use images credited to other photographers. Their display and social previews now use the pattern.

The imageOwnership field records those images as third-party. Existing image credits and source files remain as historical records.

Fried Chicken Tender Nuggets, Mia's Vegan Cupcakes, and Patatas y Batatas Bravas have uncredited photographs.

Antonio confirmed all three photographs as his on October 17, 2026.

Fried Chicken Tender Nuggets and Mia's Vegan Cupcakes retain their photographs as covers on three language-specific pages.

Patatas y Batatas Bravas uses the pattern as its cover. Its photograph appears within method step 3 because it shows preparation.

The preparation photograph remains outside the completed-dish image markup and social previews.

Other unverified photographs use the pattern until ownership is confirmed.

Set imageOwnership to original only after confirmation. Missing attribution alone does not establish original ownership.

The original files and migration source records remain unchanged. A displayed photograph must be original and must not be marked as an illustration.

## Structured data

Recipe markup omits image when the displayed cover is a placeholder. A decorative pattern does not satisfy Google's completed-dish image requirement.

Reference: [Google recipe image guidance](https://developers.google.com/search/docs/appearance/structured-data/recipe#recipe).

## Final prompt

Use case: stylized-concept. Create a square decorative picnic-cloth wallpaper for the Cookbook website.
Image 1 and image 2 are identity references for the existing garlic and strawberry portrait icons.
Make pale dusty-rose-and-cream gingham with a subtle woven linen texture. On it, print a small evenly spaced repeating pattern of ONLY TWO MOTIFS: the garlic portrait from image 1 always UPRIGHT, and the strawberry portrait from image 2 always rotated completely UPSIDE DOWN (180 degrees, including its face and green crown). Alternate these two motifs in staggered rows. No inverted garlic anywhere.
Every garlic has a single stem at its TOP and a rounded bulb at its BOTTOM, exactly like image 1. No bottom stem, no double-ended garlic, no fused or mirrored heads. Every strawberry has one leafy crown.
Use quiet faded colored-pencil print in warm cream, dusty berry red, pale lilac and muted sage. Heads are small with generous space between them, around six motifs across the image. The cloth is the main subject; the characters are a subtle decorative pattern.
Flat overhead textile swatch, no folds, no props, no food, no frame, no shadow, no text or watermark. Opaque light-cream background. Do not make new hybrid characters.
