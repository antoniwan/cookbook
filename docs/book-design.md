# The open book

Antonio asked for the open-book redesign on November 18, 2026. Four directions were compared. He chose the layout of "Compañeros" without anything that looks like a game, with the ingredient drawings from "Herbario" and the full-screen spreads from "Folio".

## The look

The site is the book. The screen is an open spread from edge to edge: graph paper everywhere, the gutter down the middle, and a little shade at each outer edge. The header and footer are the running head and foot of the two pages: the wordmark on the left page, the navigation and links on the right. Each page has its folio (page number) at the foot. Below 900px the book closes to one page at a time.

- Home: the left page holds the title, search and filters and stays put while the recipes scroll on the right page. A second spread closes the book with the project note.
- Recipe: the breadcrumb, photo, quantities (collapsed until opened), the ingredient checklist and the scaling caution on the left page; the group tag, a large title, the introduction, facts, tools, method, a taped Notes card and More recipes on the right.
- A to Z, About and 404 are spreads too.

- Graph paper: the page background is a 24px grid over the paper grain.
- Type: Bricolage Grotesque for titles, Newsreader for reading, Caveat only for notes the companions leave, Bodoni Moda italic only in the screensaver. They load from Google Fonts in `src/layouts/Base.astro`.
- Photos sit on white cards with a soft lift. The recipe cover gets a flat tan offset, like a print on a page.
- Chips and buttons are outlined pills.
- No pixel art, pixel fonts, or sprites. The site should never feel like a game.

The look lives in `src/styles/book.css`, which loads after `global.css`. Layout, behaviour, and print rules stay in `global.css`.

## Ingredient drawings

`src/components/IngredientIcons.astro` holds one set of line drawings on a 64-unit square. `src/lib/ingredient-icons.ts` picks the drawing for an ingredient line. Rules run in order and the first match wins, so put specific phrases ("garlic powder", "buttermilk") before the words they contain. Lines with no match get an empty slot, so the checklist stays aligned.

To add a drawing: add a `<symbol id="ing-name">`, add `name` to `INGREDIENT_ICONS`, add a rule, and add a case to `tests/ingredient-icons.test.ts`. As of this change, about four in five ingredient lines get a drawing.

## The companions' notes

The garlic and strawberry stay as drawn (see `docs/mascots.md`). Notes are handwritten sticky notes:

- Home page: a fixed note about sofrito.
- Recipe page: the strawberry keeps your place. Its note changes to "Step 3 of 7" when you tap a step. The recipe's own Notes section is a taped card under the method.

## Tap the step you're on

On a recipe page, tapping a method step marks it until you tap it again or tap another step. Linking to `#step-3` marks that step too.

## The screensaver

`src/components/IdleBook.astro`, on the home page only. After 60 seconds with no pointer, key, wheel, or touch input, a cover spread fades in, then one spread for each recipe with a confirmed original photograph, every 8 seconds. The photos are in a `<template>`, so they download only when the screensaver starts.

Any key, tap, or pointer movement of more than 24px closes it, and the tap that closes it does not open what is underneath. "Open the recipe" goes to that recipe. Reduced motion turns off the slow zoom.

Add `?idle=off` to the home page address to turn it off, or `?idle=now` to show it at once.
