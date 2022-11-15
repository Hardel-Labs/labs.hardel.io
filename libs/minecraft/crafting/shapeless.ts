import { MinecraftItemData, SlotData } from '@definitions/minecraft';

/**
 * Transforms ingredients into a shapeless recipe
 * @param {SlotData[]} ingredients
 * @param {MinecraftItemData} result
 * @param result
 */
export const makeShapelessRecipes = (ingredients: SlotData[], result?: SlotData) => {
    const ingredientsItem: Array<{ item: string }> = [];
    for (const ingredient of ingredients) {
        if (ingredient.item) {
            ingredientsItem.push({ item: ingredient.item.id });
        }
    }

    return {
        type: 'minecraft:crafting_shapeless',
        ingredients: ingredientsItem,
        result: {
            item: result?.item?.id,
            count: result?.count || 1
        }
    };
};
