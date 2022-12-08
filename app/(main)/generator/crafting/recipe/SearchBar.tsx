'use client';

import React from 'react';
import FormInput from '@components/form/input';
import { SearchProjectContext } from '@components/context/SearchContext';
import Switch from '@components/form/Switch';
import WhiteButton from '@components/form/Button/White';
import { useRouter } from 'next/navigation';

export default function SearchRecipeBar() {
    const { search, setSearch } = React.useContext(SearchProjectContext);
    const [checked, setChecked] = React.useState(true);
    const router = useRouter();

    return (
        <div className={'flex justify-between items-center mb-8'}>
            <div className={'flex gap-x-4'}>
                <WhiteButton onClick={() => router.refresh()}>Refresh</WhiteButton>
                <FormInput type="text" placeholder="Search an recipes" className={'w-full max-w-[500px]'} value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Switch onClick={() => setChecked(!checked)} checked={checked} label={'Animation'} />
        </div>
    );
}
