interface MarkdownNode {
  type: string;
  depth?: number;
  ordered?: boolean;
  value?: string;
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, string> };
}

export default function recipeStepAnchors() {
  return {
    name: 'cookbook-step-anchors',
    before(
      tree: MarkdownNode,
      context: {
        setProperty(
          node: MarkdownNode,
          key: 'data',
          value: NonNullable<MarkdownNode['data']>,
        ): void;
      },
    ) {
      let inMethod = false;
      let position = 0;
      for (const node of tree.children ?? []) {
        if (node.type === 'heading' && node.depth === 2)
          inMethod = node.children?.map((child) => child.value ?? '').join('') === 'Method';
        if (!inMethod || node.type !== 'list' || !node.ordered) continue;
        for (const item of node.children ?? []) {
          position++;
          context.setProperty(item, 'data', {
            ...item.data,
            hProperties: { ...item.data?.hProperties, id: `step-${position}` },
          });
        }
      }
    },
  };
}
