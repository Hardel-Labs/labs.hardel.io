'use client';

import { ReadableRecipeData } from '@definitions/minecraft';
import React, { useMemo } from 'react';
import { SearchProjectContext } from '@components/context/SearchContext';
import CraftingTableGUI from '@components/minecraft/gui/crafting/Readable';

type Props = {
    data: ReadableRecipeData[];
};

export default function RecipeGrid({ data }: Props) {
    const { search } = React.useContext(SearchProjectContext);
    const display = useMemo(() => {
        return data?.filter((recipe) => recipe.name.toLowerCase().includes(search.toLowerCase())).reverse();
    }, [data, search]);

    return (
        <>
            {display.map((recipe, index) => (
                <div className={'hover:scale-95 transition ease-in-out duration-200 cursor-pointer'} key={index}>
                    <CraftingTableGUI title={recipe.name} data={recipe} />
                </div>
            ))}
        </>
    );
}
