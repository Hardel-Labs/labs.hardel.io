'use client';

import CodeBlock from '@components/codeblock/CodeBlock';
import { ShapelessRecipe } from '@definitions/minecraft';
import { useContext, useMemo, useState } from 'react';
import { makeShapelessRecipes } from '@libs/minecraft/crafting/shapeless';
import { CraftingContext } from '@app/tools/crafting/Context';

export default function CodePreview() {
    const { slots } = useContext(CraftingContext);
    const [recipe, setRecipe] = useState<ShapelessRecipe>();

    useMemo(() => {
        const ingredients = slots.filter((slot) => slot.id !== 'crafting:result');
        const result = slots.find((slot) => slot.id === 'crafting:result');
        const shapelessRecipes = makeShapelessRecipes(ingredients, result);

        setRecipe(shapelessRecipes);
    }, [slots]);

    return (
        <>
            <CodeBlock title={'fileName.json'} language={'json'}>
                {JSON.stringify(recipe, null, 4)}
            </CodeBlock>
        </>
    );
}
