'use client';

import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import Add from '@icons/Common/Add';
import { useContext, useState } from 'react';
import { createRecipe } from '@libs/request/client/project/recipe';
import { CraftingContext } from '@main/generator/crafting/(component)/CraftingContext';
import HardelLoader from '@components/loader/HardelLoader';
import { ToastContext } from '@components/toast/ToastContainer';

export default function CraftingGroupButton() {
    const { slots, recipeType, setSlots, exactPattern } = useContext(CraftingContext);
    const { addPromiseToast } = useContext(ToastContext);
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const addRecipes = () => {
        setLoading(true);
        const promise = createRecipe({ items: slots, name, type: recipeType, exactly: exactPattern, custom: false }, (success) => {
            if (!success) return;

            setSlots([]);
            setName('');
        }).then(() => setLoading(false));

        addPromiseToast(promise, 'Processing...', 'Successfully recipe added', 'Failed to create recipe', `The crafting recipe ${name} has been created successfully.`);
    };

    return (
        <div className={'flex gap-x-4 items-center'}>
            <FormInput type={'text'} placeholder="Craft Name" value={name} onChange={(e) => setName(e.target.value)} />
            {loading ? (
                <HardelLoader className={'w-6 h-6 mr-2'} />
            ) : (
                <WhiteButton className={'flex items-center'} onClick={() => addRecipes()} disabled={name.length <= 0 || slots.length <= 0}>
                    <Add className={'w-6 h-6 fill-black mr-2'} />
                    Add
                </WhiteButton>
            )}
        </div>
    );
}
