import React, { Suspense } from 'react';
import { ReadableRecipeData } from '@definitions/minecraft';
import { getRecipesFromProject } from '@libs/request/server/project/recipe/get';
import { getSession } from '@libs/session';
import ArrowBack from '@icons/Common/ArrowBack';
import Link from 'next/link';
import SearchContext from '@components/context/SearchContext';
import SearchRecipeBar from '@main/generator/crafting/recipe/SearchBar';
import CraftingManager from '@main/generator/crafting/recipe/Manager';
import SkeletonCraftingTableGUI from '@components/minecraft/gui/crafting/Loading';
import { notFound } from 'next/navigation';

async function getData(id: string | undefined) {
    if (!id) throw new Error('No project ID provided');

    const recipes = await getRecipesFromProject(id);
    if (!recipes.request.success) {
        throw new Error('Failed to get categories');
    }

    return recipes.data as ReadableRecipeData[];
}

export default async function Page() {
    const session = await getSession();
    if (!session) notFound();

    const data = getData(session?.project?.id);

    return (
        <SearchContext>
            <div className={'p-10'}>
                <SearchRecipeBar />
                <hr />
                <div className={'grid grid-cols-craft gap-8'}>
                    <Suspense fallback={Array(9).fill(<SkeletonCraftingTableGUI />)}>
                        {/* @ts-ignore */}
                        <CraftingManager request={data} />
                    </Suspense>
                </div>
            </div>

            <Link href={'/generator/crafting'}>
                <div
                    className={
                        'fixed z-20 bottom-8 right-8 w-16 h-16 rainbow-border rounded-full hover:scale-90 transition ease-in-out duration-200 cursor-pointer'
                    }
                >
                    <div className={'flex justify-center items-center p-4'}>
                        <ArrowBack className={'w-full h-full fill-white'} />
                    </div>
                </div>
            </Link>
        </SearchContext>
    );
}
