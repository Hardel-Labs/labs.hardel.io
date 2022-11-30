'use client';

import React, { useMemo } from 'react';
import FormInput from '@components/form/input';
import useSWR from 'swr';
import fetcher from '@libs/request/client/fetcher';
import HardelLoader from '@components/loader/HardelLoader';
import { MembersData } from '@definitions/project';
import MemberCard from '@main/dashboard/teams/MemberCard';

export default function MemberManager() {
    const { data, error } = useSWR<MembersData>('/api/projects/members', fetcher);
    const [search, setSearch] = React.useState('');

    const display = useMemo(() => {
        if (!data || error) return null;

        return data?.members.filter((member) => member.name.toLowerCase().includes(search.toLowerCase()));
    }, [data, error, search]);

    return (
        <>
            <div className={'mb-8'}>
                <FormInput type={'text'} placeholder="Search a project" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {data && (
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                    {display?.map((member, index) => (
                        <MemberCard key={index} member={member} />
                    ))}
                </div>
            )}

            {!data && (
                <div className={'h-[300px] py-20 w-full flex justify-center items-center'}>
                    <HardelLoader />
                </div>
            )}

            {error && (
                <div className={'flex justify-center'}>
                    <p className={'text-red-400'}>An error occurred</p>
                </div>
            )}
        </>
    );
}
