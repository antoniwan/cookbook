# Recipe writing rules

For Antonio. Adopted October 24, 2026.

These rules describe how a Cookbook recipe is written. Most of them record what the collection already does well. A few set one house style where pages currently differ; see the [audit](photo-audit-2026-10.md#recipe-text).

Apply them to new recipes now. Bring an existing page into line when you next edit it. No bulk rewrite is required.

## Who the reader is

The reader is cooking, often with wet or messy hands, glancing at a phone propped on the counter. Kitchen mode enlarges the text for this reader.

Every rule below serves that reader. Short lines are easy to find again. A cue such as "until it shines" is easier to act on than a number alone.

## File and frontmatter

1. One file per language. English pages of a translated recipe end in `-en`. Give both files the same `translationGroup`.
2. Write `title` as the family calls the dish. Keep Spanish names in Spanish on both pages.
3. Write `description` in this order: main ingredients, the defining method or vessel, then time, temperature, or yield when the recipe states them. Two sentences at most.
4. Set `recipeYield`, `totalTime`, `prepTime`, and `cookTime` only from facts the recipe states. Follow the [evidence policy](recipe-metadata.md#evidence-policy). Never estimate them.
5. Leave photo fields alone until a photograph passes the [scorecard](photo-scorecard.md). Then set `heroImage`, `imageKind: photo`, `imageOwnership: original`, and `imageAlt` together on both language pages.

## Alt text

Alt text describes the photograph, not the recipe.

1. Name what is visible: the food, the count when it is small, and the vessel. Example: "Four fried chicken tenders and a cob of corn on a black-and-white patterned plate".
2. Count accurately. A wrong count is a factual error on the page.
3. Do not start with "Image of" or "Photo of". Screen readers already announce an image.
4. Write it in the page's language.

## Body structure

1. Open with one or two sentences that say what the dish is and what makes it work. Restate a stated time or yield here; this sentence is the evidence for the metadata.
2. Use exactly these headings, in English, in this order: `## Ingredients`, `## Equipment`, `## Method`, `## Notes`. The parser in `src/lib/recipe.ts` reads them by name on both language pages. `## Notes` may be omitted when there is nothing to say.
3. Group long ingredient lists with a short lead-in line, such as "The chicken:" and "The caldero:". Groups follow the order of cooking.

## Ingredients

1. List ingredients in the order the method uses them.
2. Write each line as amount, unit, ingredient, then preparation after a comma. Example: "1 mashed garlic clove" or "2 cups rice, rinsed".
3. Use ½, ¼, ¾, and ⅓, not 1.5 or 0.75. Use "to" for ranges: "1½ to 2 lb".
4. For baking, give weight in grams with volume in parentheses: "210 g (1½ cups) all-purpose flour". Weight is what makes a cake repeat. For savoury cooking, volume alone is fine.
5. Write an alternative with its own amount: "1 teaspoon sazón, or ½ teaspoon salt". The quantity scaler leaves an alternative without its own amount unscaled. See the [quantity controls guide](quantity-controls.md).
6. Mark optional ingredients with "(optional)" at the end of the line.
7. Name a brand only when the brand changes the result.

## Equipment

List only what the cook must find before starting. Name the real vessel: caldero, cast iron skillet, 8×8 pan. Equipment shows up in photographs, so these names also tell the photographer what belongs in the frame.

## Method

1. One numbered step per stage of cooking, not per action. A stage ends when the cook can look away.
2. Start each step with a verb, or with the heat setting when heat is the first thing to change: "Achiote oil over medium heat."
3. Make the first sentence of each step a complete instruction. It becomes the step's name in search results and its link anchor.
4. Give heat, time, and a cue the cook can see, hear, or smell. "Bake about 18 minutes, until the top bounces back." The time tells the cook when to look. The cue tells them when to stop.
5. Give time as a range when it varies.
6. Write temperatures as °F with °C in parentheses: "350°F (175°C)".
7. Put warnings in the step where they apply: "Do not uncover."
8. A process photograph goes inside the step it explains, with its own alt text. It shows a cue, not decoration.

## Notes

Use Notes for what a cook needs once the method works: substitutions, make-ahead, storage time, scaling, sodium, and a portion set aside for a baby or toddler. One fact per bullet.

## Voice

**English.** Plain, short, imperative. Write how you would talk to someone standing next to you. Skip adjectives that do not change an action.

**Spanish.** Puerto Rican Spanish. The existing pages use the tú imperative ("Seca el pollo", "No destapes"). Keep it. Use the kitchen's own words: caldero, habichuelas, gandules, pegao, sofrito. An English term stays in English when that is how the kitchen says it, such as baking powder or cast iron.

**Both languages.** The two pages state the same facts: the same amounts, the same number of steps, the same times and cues. Update them in the same commit.

## Do not

- Invent times, yields, servings, nutrition, ratings, or reviews.
- Copy text from another publication.
- Commit private notes, local paths, or note-app links. `tests/recipes.test.ts` checks for some of these.

## Recipe checklist

Run this before a recipe is published or edited. Every line must pass.

- [ ] Both language files exist with the same `translationGroup`, or the recipe is single-language on purpose.
- [ ] `description` follows ingredients, method, then stated facts.
- [ ] Every metadata value has published evidence in the text.
- [ ] Headings are Ingredients, Equipment, Method, Notes, in English.
- [ ] Ingredients follow the order of use, use fraction characters, and give each alternative its own amount.
- [ ] Baking recipes give grams.
- [ ] Every method step starts with a complete instruction and has a time, a cue, or both.
- [ ] Both languages state the same facts.
- [ ] Alt text, if present, matches the photograph, including counts.
- [ ] `pnpm test`, `pnpm check`, and `pnpm build` pass.
