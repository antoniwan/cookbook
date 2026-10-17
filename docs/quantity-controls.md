# Quantity controls

The recipe toolbar contains compact ingredient, equipment, and method links. Kitchen mode and printing remain secondary actions.

The Quantities panel appears above the recipe. Select its heading to collapse or expand the controls.

The collapsed heading shows the current multiplier. Collapsing the panel preserves quantities and checklist selections.

Kitchen mode collapses the panel. You can open it again while kitchen mode remains active.

## Use the controls

1. Choose a preset multiplier, or enter a custom multiplier from 0.25 to 20.
2. Select Apply after entering a custom multiplier.
3. Select Show original amounts to compare changed ingredient lines with their source amounts.
4. Review any line marked As written: review.
5. Select Copy ingredients to copy the current amounts.
6. Select 1× to restore the original ingredient text.

Changing quantities does not clear the ingredient checklist. Reset checklist clears checks without changing the multiplier.

The copy action includes the recipe title, multiplier, ingredients, and a review reminder. It identifies ambiguous numeric lines that remain unchanged.

If clipboard access fails, the page displays a manual-copy instruction.

## Scaling rules

Simple amounts, fractions, ranges, optional amounts, and explicit equivalent measures can scale.

For example, half of 1½ cups (210 g) becomes ¾ cups (105 g). This scales an existing equivalence; it does not calculate a new conversion.

Dimensions, percentages, individual package sizes, and per-item weights remain unchanged.

Alternative amounts and compound measures remain unchanged when their interpretation is ambiguous. Unmeasured ingredients also remain unchanged.

Parts remain the authored ratio unit. The controls do not convert parts into cups or grams.

The original recipe yield remains the published reference. The multiplier does not assert a new serving count.

## Cooking and printing

Warning: scaling ingredient quantities does not scale cooking times, temperatures, or pan capacity.

The method text remains unchanged, including any quantities within its instructions. Review those quantities against the scaled ingredient list before cooking.

Fractional eggs require a cooking decision. The controls do not round them to whole eggs.

Printing uses the current ingredient amounts. A visible multiplier notice accompanies a scaled recipe.

Print styling hides the toolbar, quantity controls, original-amount comparisons, and decorative step links.

The canonical Recipe structured data, JSON, and Markdown remain the original recipe. Local quantity changes do not rewrite public recipe data.

Without JavaScript, the original recipe remains readable and the quantity panel stays hidden.
