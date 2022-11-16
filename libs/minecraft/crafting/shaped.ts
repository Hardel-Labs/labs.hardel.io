import { MinecraftItemData, Recipe, SlotData } from '@definitions/minecraft';
import { makeShapedExactRecipes } from '@libs/minecraft/crafting/shapedExact';

/**
 * Transforms ingredients and result into a shaped recipe
 * @param {SlotData[]} ingredients
 * @param {MinecraftItemData} result
 * @param result
 */
export const makeShapedRecipes = (ingredients: SlotData[], result?: SlotData): Recipe => {
    const shaped: Recipe = { ...makeShapedExactRecipes(ingredients, result) };

    // Remove empty lines from top to bottom when an item is found in the line stop removing
    for (let i = 0; i < shaped.pattern.length; i++) {
        const pattern = shaped.pattern[i];
        if (pattern !== Array(pattern.length + 1).join(' ')) {
            break;
        }

        shaped.pattern.splice(shaped.pattern.indexOf(pattern), 1);
    }

    // Remove empty lines from bottom to top when an item is found in the line stop removing
    for (let i = shaped.pattern.length - 1; i >= 0; i--) {
        const pattern = shaped.pattern[i];
        if (pattern !== Array(pattern.length + 1).join(' ')) {
            break;
        }

        shaped.pattern.splice(shaped.pattern.indexOf(pattern), 1);
    }

    if (shaped.pattern.length === 0) {
        return shaped;
    }

    const rows = shaped.pattern.length;
    const columns = shaped.pattern[0].length;

    // Remove empty columns from left to right when an item is found in the column stop removing
    for (let i = 0; i < columns; i++) {
        let empty = true;
        for (let j = 0; j < rows; j++) {
            if (shaped.pattern[j][i] !== ' ') {
                empty = false;
                break;
            }
        }

        if (empty) {
            for (let j = 0; j < rows; j++) {
                shaped.pattern[j] = shaped.pattern[j].slice(0, i) + shaped.pattern[j].slice(i + 1);
            }
        } else {
            break;
        }
    }

    // Remove empty columns from right to left when an item is found in the column stop removing
    for (let i = columns - 1; i >= 0; i--) {
        let empty = true;
        for (let j = 0; j < rows; j++) {
            if (shaped.pattern[j][i] !== ' ') {
                empty = false;
                break;
            }
        }

        if (empty) {
            for (let j = 0; j < rows; j++) {
                shaped.pattern[j] = shaped.pattern[j].slice(0, i) + shaped.pattern[j].slice(i + 1);
            }
        } else {
            break;
        }
    }

    return shaped;
};
