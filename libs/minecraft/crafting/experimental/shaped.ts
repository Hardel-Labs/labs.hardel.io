import { Recipe, SlotData } from '@definitions/minecraft';
import { makeShapedExactRecipes } from '@libs/minecraft/crafting/shapedExact';

/**
 * Transforms ingredients and result into a shaped recipe
 * @param {SlotData[]} ingredients
 * @param {MinecraftItemData} result
 * @param result
 */
export const makeShapedRecipes = (ingredients: SlotData[], result?: SlotData): Recipe => {
    const shaped: Recipe = { ...makeShapedExactRecipes(ingredients, result) };

    if (shaped.pattern.length === 0 || shaped.pattern.find((patternLine) => patternLine.length !== shaped.pattern[0].length) !== undefined) {
        throw Error;
    }

    // Remove left/right empty columns
    let startColIndex = shaped.pattern[0].length - 1;
    let endColIndex = 0;
    shaped.pattern.forEach((patternLine) => {
        const trimedLine = patternLine.trim();
        if (trimedLine.length === 0) return;

        const trimmedLineStartIndex = patternLine.indexOf(trimedLine);
        startColIndex = Math.min(startColIndex, trimmedLineStartIndex);
        endColIndex = Math.max(endColIndex, trimmedLineStartIndex + trimedLine.length - 1);
    });
    shaped.pattern = shaped.pattern.map((patternLine) => patternLine.slice(startColIndex, endColIndex + 1));

    // Remove top/bottom empty lines
    const startLineIndex = shaped.pattern.findIndex((patternLine) => patternLine.trim().length > 0);
    const endLineIndex =
        shaped.pattern.length -
        1 -
        shaped.pattern
            .slice()
            .reverse()
            .findIndex((patternLine) => patternLine.trim().length > 0);
    shaped.pattern = shaped.pattern.slice(startLineIndex, endLineIndex - startLineIndex + 1);

    return shaped;
};
