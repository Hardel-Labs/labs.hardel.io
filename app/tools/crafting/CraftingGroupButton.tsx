'use client';

import GroupButtonContainer from '@components/form/GroupButton/GroupButtonContainer';
import GroupButtonItem from '@components/form/GroupButton/GroupButtonItem';
import { useContext } from 'react';
import { CraftingContext } from '@app/tools/crafting/Context';
import { RecipeType } from '@libs/constant';

export default function CraftingGroupButton() {
    const { setRecipeType, setExactPattern } = useContext(CraftingContext);

    const handle = (recipeType: RecipeType, exactPattern: boolean) => {
        setRecipeType(recipeType);
        setExactPattern(exactPattern);
    };

    return (
        <div className={'flex justify-start mt-4 pl-4'}>
            <GroupButtonContainer>
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPELESS, false)} title={'Shapeless'} defaultChecked={true} />
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPED, false)} title={'Shaped'} />
                <GroupButtonItem onSelect={() => handle(RecipeType.SHAPED, true)} title={'Exactly pattern'} />
            </GroupButtonContainer>
        </div>
    );
}
