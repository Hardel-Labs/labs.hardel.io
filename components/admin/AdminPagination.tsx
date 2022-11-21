'use client';

import React, { useCallback, useMemo } from 'react';
import { RingLoader } from 'react-spinners';
import Pagination from '@components/form/Pagination';
import FormInput from '@components/form/input';
import AdminCreateButton from '@components/form/Button/Admin';

type Props = {
    data: any[] | undefined;
    filterBy: string;
    title?: string;
    children: (data: any) => React.ReactNode;
    onAdd?: () => void;
};

export default function AdminPagination(props: Props) {
    const [elementsPerPage, setElementsPerPage] = React.useState<number>(10);
    const [page, setPage] = React.useState<number>(1);
    const [search, setSearch] = React.useState<string>('');

    const filterData = useMemo(() => {
        if (search === '') {
            return props.data?.sort((a, b) => a[props.filterBy].localeCompare(b[props.filterBy]));
        }

        return props.data?.filter((element: any) => element[props.filterBy].toLowerCase().includes(search.toLowerCase()));
    }, [props.data, props.filterBy, search]);

    const handleElementsPerPage = useCallback((newElementsPerPage: number) => {
        if (newElementsPerPage < 1 || isNaN(newElementsPerPage)) {
            setElementsPerPage(1);
            return;
        }

        setElementsPerPage(newElementsPerPage);
    }, []);

    return (
        <div>
            <hr />
            <h2 className={'pb-5'} style={{ fontSize: 30 }}>
                {props?.title ?? 'Pagination :'}
            </h2>
            <div className={'flex justify-between'}>
                <div>
                    <div className={'flex justify-start mb-5'}>
                        <Pagination numberData={props.data?.length ?? 0} numberElementPerPage={elementsPerPage} siblingPage={2} onChange={setPage} />
                    </div>
                    <div>
                        <FormInput type={'text'} placeholder={'1'} defaultValue={elementsPerPage} onChange={(e) => handleElementsPerPage(Number(e.target.value))} />
                    </div>
                </div>
                <div>
                    <div className={'flex justify-end mb-5'}>
                        <AdminCreateButton onClick={() => props.onAdd?.()}>Create</AdminCreateButton>
                    </div>
                    <div>
                        <FormInput type={'text'} placeholder={'Search'} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <hr />
            <div>
                {filterData === undefined && (
                    <>
                        <h2>Data loading...</h2>
                        <hr />
                        <RingLoader color={'#fff'} />
                    </>
                )}
                {filterData?.length === 0 && (
                    <>
                        <h2>Database empty or data not found...</h2>
                        <hr />
                    </>
                )}
            </div>
            {filterData && filterData.length >= 0 && <div>{props.children(filterData.slice((page - 1) * elementsPerPage, page * elementsPerPage))}</div>}
        </div>
    );
}
