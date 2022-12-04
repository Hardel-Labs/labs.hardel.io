'use client';
import FormInput from '@components/form/input';
import React from 'react';
import { SearchProjectContext } from '@main/dashboard/SearchContext';

export default function SearchProject() {
    const { search, setSearch } = React.useContext(SearchProjectContext);

    return <FormInput type={'text'} placeholder="Search a project" value={search} onChange={(e) => setSearch(e.target.value)} />;
}
