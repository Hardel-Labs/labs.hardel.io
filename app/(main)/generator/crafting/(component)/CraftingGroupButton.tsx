'use client';

import GroupButtonContainer from '@components/form/Button/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/Button/GroupButton/GroupButtonItem';
import { useContext } from 'react';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import Counter from '@components/form/Counter';
import { RecipeType } from '@prisma/client';

export default function CraftingGroupButton() {
    const { setRecipeType, recipeType, setResultCount, resultCount } = useContext(CraftingContext);

    const handleChange = (value: number) => {
        setResultCount(value);
    };

    return (
        <div className={'flex justify-start gap-x-4'}>
            <GroupButtonContainer value={recipeType}>
                <GroupButtonItem id={RecipeType.SHAPELESS} onSelect={() => setRecipeType(RecipeType.SHAPELESS)}>
                    Shapeless
                </GroupButtonItem>
                <GroupButtonItem id={RecipeType.SHAPED} onSelect={() => setRecipeType(RecipeType.SHAPED)}>
                    Shaped
                </GroupButtonItem>
                <GroupButtonItem id={RecipeType.EXACT_SHAPED} onSelect={() => setRecipeType(RecipeType.EXACT_SHAPED)}>
                    Exactly pattern
                </GroupButtonItem>
            </GroupButtonContainer>

            <Counter max={64} min={1} value={resultCount} onChange={handleChange} step={1} />
        </div>
    );
}
