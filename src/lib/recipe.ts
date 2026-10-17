export const SITE = 'https://cookbook.antoniwan.online';
export const GROUPS = ['All recipes', 'Mains', 'Sides & staples', 'Baking & breakfast', 'Drinks'] as const;

export interface RecipeParts {
  introduction: string;
  ingredients: string[];
  equipment: string[];
  method: string[];
  notes: string[];
}

export function recipeParts(markdown: string): RecipeParts {
  const sections = new Map<string, string>();
  let current = 'Introduction';
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^## (.+)\s*$/);
    if (heading) current = heading[1].trim();
    else sections.set(current, (sections.get(current) ?? '') + line + '\n');
  }
  const list = (name: string, ordered = false) => (sections.get(name) ?? '')
    .split(ordered ? /^\d+\.\s+/m : /^[-*]\s+/m)
    .map(item => item.trim()).filter(Boolean);
  return {
    introduction: (sections.get('Introduction') ?? '').trim(),
    ingredients: list('Ingredients'),
    equipment: list('Equipment'),
    method: list('Method', true),
    notes: list('Notes'),
  };
}

export function recipeGroup(id: string): (typeof GROUPS)[number] {
  if (/coquito/.test(id)) return 'Drinks';
  if (/pancake|pastel-de-banana|banana-oat|brownie|cupcake/.test(id)) return 'Baking & breakfast';
  if (/sofrito|bravas|carrot|brocoli|guacamole|arepas|habichuelas/.test(id)) return 'Sides & staples';
  return 'Mains';
}

export function isPublished(data: { draft?: boolean; published?: boolean; pubDate: Date }, now = new Date()): boolean {
  return !data.draft && data.published !== false && data.pubDate <= now;
}

export function plainText(value: string): string {
  return value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/\s+/g, ' ').trim();
}

export function safeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

const fractionValues: Record<string, number> = { '¼': .25, '½': .5, '¾': .75, '⅓': 1 / 3, '⅔': 2 / 3, '⅛': .125, '⅜': .375, '⅝': .625, '⅞': .875 };
const amountPattern = '(?:\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|\\d+(?:[.,]\\d+)?[¼½¾⅓⅔⅛⅜⅝⅞]?|[¼½¾⅓⅔⅛⅜⅝⅞])';
const rangePattern = `${amountPattern}(?:\\s*(?:to|a|–|—|-)\\s*${amountPattern})?`;
const ingredientAmount = new RegExp(`^((?:\\((?:optional|opcional)\\)\\s*)?(?:(?:about|approximately|aproximadamente)\\s+)?)(` + rangePattern + ')(\\s+.+)$', 'i');
const conversionUnit = '(?:g|kg|mg|ml|l|oz|lb|lbs|cups?|tazas?|tbsp|tsp|tablespoons?|teaspoons?|cucharadas?|cucharaditas?|sticks?)';
const conversionPattern = new RegExp(`^${rangePattern}\\s+${conversionUnit}(?:\\s*\\/\\s*${rangePattern}\\s+${conversionUnit})*$`, 'i');

function amountValue(amount: string): number {
  if (amount.includes('/')) {
    const pieces = amount.split(/\s+/);
    const [numerator, denominator] = pieces.at(-1)!.split('/').map(Number);
    return denominator ? (pieces.length > 1 ? Number(pieces[0]) : 0) + numerator / denominator : NaN;
  }
  const last = amount.at(-1)!;
  return fractionValues[last] !== undefined ? (Number(amount.slice(0, -1)) || 0) + fractionValues[last] : Number(amount.replace(',', '.'));
}

function scaledAmount(amount: string, multiplier: number): string {
  const scaled = amountValue(amount) * multiplier;
  if (!Number.isFinite(scaled) || scaled <= 0) return amount;
  const whole = Math.floor(scaled);
  const fractional = scaled - whole;
  const symbol = Object.entries(fractionValues).find(([, value]) => Math.abs(value - fractional) < .000001)?.[0];
  return fractional === 0 ? String(whole) : symbol ? (whole ? String(whole) : '') + symbol : String(Number(scaled.toPrecision(6)));
}

function scaleRange(amount: string, multiplier: number): string {
  return amount.replace(new RegExp(amountPattern, 'g'), value => scaledAmount(value, multiplier));
}

export function scaleIngredient(text: string, multiplier: number): string {
  if (multiplier === 1 || !Number.isFinite(multiplier) || multiplier <= 0) return text;
  const match = text.match(ingredientAmount);
  if (!match || /^\s+(?:inches?|inch|cm|mm|pulgadas?|minutes?|minutos?|°|%)/i.test(match[3])) return text;
  if (new RegExp(`(?:\\bor\\b|\\bo\\b|\\+)\\s*${amountPattern}`, 'i').test(match[3])) return text;
  const unparsed = match[3].replace(/\([^()]*\)/g, '')
    .replace(new RegExp(`${rangePattern}\\s*-?\\s*(?:inches?|inch|cm|mm|pulgadas?)\\b`, 'gi'), '')
    .replace(new RegExp(`${rangePattern}\\s+(?:oz|ounces?|g|grams?|lb|pounds?)\\s+each\\b`, 'gi'), '');
  if (/[\d¼½¾⅓⅔⅛⅜⅝⅞]/.test(unparsed)) return text;
  if (new RegExp(`^\\s+${conversionUnit}\\b`, 'i').test(match[3]) && [...match[3].matchAll(/\(([^()]*)\)/g)].some(([, contents]) => /[\d¼½¾⅓⅔⅛⅜⅝⅞]/.test(contents) && !conversionPattern.test(contents) && !contents.includes('%'))) return text;
  const remainder = new RegExp(`^\\s+${conversionUnit}\\b`, 'i').test(match[3]) ? match[3].replace(/\(([^()]*)\)/g, (parentheses, contents: string) => {
    if (!conversionPattern.test(contents)) return parentheses;
    return '(' + contents.replace(new RegExp(`(${rangePattern})(\\s+${conversionUnit})(?=\\s*\\/|$)`, 'gi'), (_match, amount: string, unit: string) => scaleRange(amount, multiplier) + unit) + ')';
  }) : match[3];
  return match[1] + scaleRange(match[2], multiplier) + remainder;
}
