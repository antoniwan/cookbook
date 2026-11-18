// Splits a recipe's rendered HTML at its section headings, so a page can lay
// the sections out on different pages of the book. The HTML comes from the
// same Markdown render as everything else; this only cuts it into pieces.

export interface RecipeSections {
  introduction: string;
  ingredients: string;
  equipment: string;
  method: string;
  notes: string;
  other: string;
}

const KNOWN = ['ingredients', 'equipment', 'method', 'notes'] as const;

export function recipeSections(html: string): RecipeSections {
  const sections: RecipeSections = {
    introduction: '',
    ingredients: '',
    equipment: '',
    method: '',
    notes: '',
    other: '',
  };
  const parts = html.split(/(?=<h2\b)/);
  for (const part of parts) {
    const id = part.match(/^<h2\b[^>]*\bid="([^"]+)"/)?.[1];
    if (!part.startsWith('<h2')) sections.introduction += part;
    else if (id && (KNOWN as readonly string[]).includes(id))
      sections[id as (typeof KNOWN)[number]] += part;
    else sections.other += part;
  }
  return sections;
}
