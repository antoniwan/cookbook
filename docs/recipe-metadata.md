# Recipe metadata

## Evidence policy

Use published recipe text or an existing explicit regional tag as evidence. Do not infer durations from individual method steps.

Keep unknown values absent. Do not invent preparation times, serving counts, nutrition, reviews, or ratings.

Show recipe facts in HTML and include them in JSON and Recipe structured data.

## Current facts

| Recipe | Added fact | Published evidence |
| --- | --- | --- |
| Arepas de Calabaza | 2 arepas; approximately 55 minutes total | Introduction: "Two arepas, about 55 minutes." |
| Brocoli Con Sabor, both languages | 1 serving; approximately 15 minutes total | Introduction: "About 15 minutes. One serving." Spanish text states the same facts. |
| Easy Breakfast Guacamole Toast | 1 serving; approximately 10 minutes total | Introduction: "About 10 minutes. One serving." |
| Coquito de Moni, both languages | 4 to 5 large bottles | Introduction states this yield in both languages. |
| Sofrito, both languages | Approximately 2½ cups, approximately 20 cubes | Notes state these amounts in both languages. |
| Mia's Vegan Cupcakes | 12 cupcakes | Description states "Twelve cupcakes." Introduction confirms the yield. |
| Patatas y Batatas Bravas | 2 adults and a toddler | Introduction states this household yield. Do not convert it into equal adult servings. |

The existing visible recipe group supplies recipeCategory. The existing puerto-rico tag supplies Puerto Rican recipeCuisine.

Do not infer another cuisine from a dish name or an ingredient.

Four language-specific pages have a stated total duration. Ten pages have a stated yield.

No recipe states both a complete preparation duration and a complete cooking duration. Those fields remain absent.

The 18-minute cupcake baking step is not its total duration. Sofrito's active preparation time excludes overnight freezing.

## Schema references

- [Google recipe structured data](https://developers.google.com/search/docs/appearance/structured-data/recipe)
- [Google breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google site names](https://developers.google.com/search/docs/appearance/site-names)

Use totalTime when only a complete total is known. Supply prepTime and cookTime together.

## Google verification

Use Google's Rich Results Test on deployed URLs. Confirm sitemap submission and crawl eligibility in Search Console.

An automated build check is not a Google indexing confirmation. A successful live test does not guarantee indexing or rich-result placement.
