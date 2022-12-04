import React from 'react';
import { redirect } from 'next/navigation';
import { getProjectByUserId } from '@libs/request/server/project/get';
import { ReadablePersonalProjectData } from '@definitions/project';
import CardContainer from '@main/dashboard/CardCotnainer';
import { AsyncSessionProps } from '@definitions/next-auth';

const getData = async (id?: string) => {
    if (!id) redirect('/');

    const response = await getProjectByUserId(id);
    if (!response.request.success) throw new Error('Failed to get data');
    return response.data as ReadablePersonalProjectData[];
};

export default async function ProjectManager(props: AsyncSessionProps) {
    const session = await props.session;
    const data = await getData(session?.id);

    return <CardContainer data={data} />;
}
