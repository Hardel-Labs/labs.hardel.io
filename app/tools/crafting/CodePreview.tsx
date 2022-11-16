'use client';

import CodeBlock from '@components/codeblock/CodeBlock';
import { Recipe } from '@definitions/minecraft';
import { useContext, useMemo, useState } from 'react';
import { makeShapelessRecipes } from '@libs/minecraft/crafting/shapeless';
import { CraftingContext } from '@app/tools/crafting/Context';
import { RecipeType } from '@libs/constant';
import { makeShapedExactRecipes } from '@libs/minecraft/crafting/shapedExact';
import { makeShapedRecipes } from '@libs/minecraft/crafting/shaped';

export default function CodePreview() {
    const { slots, recipeType, exactPattern } = useContext(CraftingContext);
    const [recipe, setRecipe] = useState<Recipe>();

    useMemo(() => {
        const ingredients = slots.filter((slot) => slot.id !== 'crafting:result');
        const result = slots.find((slot) => slot.id === 'crafting:result');

        let recipe: Recipe;
        if (recipeType === RecipeType.SHAPELESS) recipe = makeShapelessRecipes(ingredients, result);
        else if (recipeType === RecipeType.SHAPED && exactPattern) recipe = makeShapedExactRecipes(ingredients, result);
        else recipe = makeShapedRecipes(ingredients, result);

        setRecipe(recipe);
    }, [exactPattern, recipeType, slots]);

    return (
        <>
            <CodeBlock title={'fileName.json'} language={'json'}>
                {JSON.stringify(recipe, null, 4)}
            </CodeBlock>
        </>
    );
}
