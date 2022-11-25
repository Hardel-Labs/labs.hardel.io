'use client';

import GroupButtonContainer from '@components/form/Button/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/Button/GroupButton/GroupButtonItem';
import { useContext, useState } from 'react';
import { CraftingContext } from '@main/tools/crafting/(component)/CraftingContext';
import { RecipeType } from '@libs/constant';
import Counter from '@components/form/Counter';

export default function CraftingGroupButton() {
    const { setRecipeType, setExactPattern, setResultCount } = useContext(CraftingContext);
    const [count, setCount] = useState(20);

    const handleChange = (value: number) => {
        setCount(value);
        setResultCount(value);
    };

    const handle = (recipeType: RecipeType, exactPattern: boolean) => {
        setRecipeType(recipeType);
        setExactPattern(exactPattern);
    };

    return (
        <div className={'flex justify-start mt-4 pl-4 gap-x-4'}>
            <GroupButtonContainer>
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPELESS, false)} title={'Shapeless'} defaultChecked={true} />
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPED, false)} title={'Shaped'} />
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPED, true)} title={'Exactly pattern'} />
            </GroupButtonContainer>

            <Counter max={64} min={1} value={count} onChange={handleChange} step={1} />
        </div>
    );
}
