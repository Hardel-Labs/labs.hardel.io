'use client';

import React, { createContext } from 'react';

type SearchProjectContextData = {
    search: string;
    setSearch: (value: string) => void;
};

export const SearchProjectContext = createContext<SearchProjectContextData>({} as SearchProjectContextData);

export default function SearchContext({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = React.useState('');

    return <SearchProjectContext.Provider value={{ search, setSearch }}>{children}</SearchProjectContext.Provider>;
}
