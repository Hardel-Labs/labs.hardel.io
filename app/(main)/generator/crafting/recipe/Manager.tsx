import React from 'react';
import { ReadableRecipeData } from '@definitions/minecraft';
import RecipeGrid from '@main/generator/crafting/recipe/Grid';

type Props = {
    request: Promise<ReadableRecipeData[]>;
};

export default async function CraftingManager({ request }: Props) {
    const data = await request;

    return <RecipeGrid data={data} />;
}
