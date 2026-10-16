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

export function scaleIngredient(text: string, multiplier: number): string {
  if (multiplier === 1) return text;
  const match = text.match(/^(\d+(?:\s+\d+\/\d+|[¼½¾⅓⅔⅛⅜⅝⅞]|\.\d+|\/\d+)?|[¼½¾⅓⅔⅛⅜⅝⅞])(\s+.+)$/);
  if (!match || /[\d¼½¾⅓⅔⅛⅜⅝⅞]/.test(match[2])) return text;
  const amount = match[1];
  let value = 0;
  if (amount.includes('/')) {
    const pieces = amount.split(/\s+/);
    const fraction = pieces.at(-1)!.split('/').map(Number);
    if (!fraction[1]) return text;
    value = (pieces.length > 1 ? Number(pieces[0]) : 0) + fraction[0] / fraction[1];
  } else {
    const last = amount.at(-1)!;
    value = fractionValues[last] !== undefined ? (Number(amount.slice(0, -1)) || 0) + fractionValues[last] : Number(amount);
  }
  const scaled = value * multiplier;
  if (!Number.isFinite(scaled) || scaled <= 0) return text;
  const whole = Math.floor(scaled);
  const fractional = scaled - whole;
  const symbol = Object.entries(fractionValues).find(([, number]) => Math.abs(number - fractional) < .005)?.[0];
  const formatted = fractional < .005 ? String(whole) : symbol ? (whole ? String(whole) : '') + symbol : String(Number(scaled.toFixed(2)));
  return formatted + match[2];
}
