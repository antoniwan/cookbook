// Matches an ingredient line to one of the drawings in IngredientIcons.astro.
// Rules run in order and the first match wins, so specific phrases
// ("garlic powder", "buttermilk") come before the words they contain.

export const INGREDIENT_ICONS = [
  'aji',
  'avocado',
  'beans',
  'butter',
  'chicken',
  'chocolate',
  'cilantro',
  'cinnamon',
  'egg',
  'flour',
  'garlic',
  'honey',
  'lemon',
  'milk',
  'oil',
  'onion',
  'pepper',
  'potato',
  'recao',
  'rice',
  'salt',
  'spice',
  'sugar',
  'tomato',
] as const;

export type IngredientIcon = (typeof INGREDIENT_ICONS)[number];

const RULES: [IngredientIcon, RegExp][] = [
  [
    'spice',
    /garlic powder|onion powder|pepper flakes|baking (powder|soda)|polvo de hornear|bicarbonato|vanill|vainilla|sazon|adobo|paprika|pimenton|cumin|comino|oregano|nutmeg|nuez moscada|seasoning|sazonador|cayenne/,
  ],
  ['aji', /\baji(es)?\b/],
  ['tomato', /tomat/],
  ['recao', /recao|culantro|sofrito/],
  ['cilantro', /cilantro/],
  ['garlic', /garlic|\bajos?\b/],
  ['onion', /onion|cebolla|shallot|scallion/],
  ['pepper', /bell pepper|green pepper|red pepper|cubanelle|pimiento|jalapen|chile|chili/],
  ['milk', /buttermilk|milk|leche|cream|crema|yogurt/],
  ['oil', /\boil\b|aceite/],
  ['butter', /butter|mantequilla/],
  ['egg', /\beggs?\b|huevos?/],
  ['flour', /flour|harina|\boats?\b|avena|cornmeal|maicena|cornstarch/],
  ['sugar', /sugar|azucar/],
  ['honey', /honey|\bmiel\b|maple|syrup|sirope/],
  ['lemon', /lemon|\blimes?\b|limon/],
  ['chocolate', /chocolate|cocoa|cacao/],
  ['cinnamon', /cinnamon|canela/],
  ['rice', /\brice\b|arroz/],
  ['beans', /beans|habichuelas|gandules|frijoles|pigeon peas|garbanzo|chickpea/],
  ['potato', /potato|\bpapas?\b|patatas?|batatas?/],
  ['avocado', /avocado|aguacate/],
  ['chicken', /chicken|pollo|turkey|pavo|drumstick|muslo/],
  ['salt', /\bsalt\b|\bsal\b/],
  ['spice', /pepper|pimienta/],
];

export function ingredientIcon(text: string): IngredientIcon | undefined {
  const line = text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  return RULES.find(([, pattern]) => pattern.test(line))?.[0];
}
