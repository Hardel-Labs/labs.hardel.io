'use client';

import { ReadablePersonalProjectData } from '@definitions/project';
import React, { useMemo } from 'react';
import ProjectCard from '@main/dashboard/ProjectCard';
import { SearchProjectContext } from '@main/dashboard/SearchContext';

type Props = {
    data: ReadablePersonalProjectData[];
};

export default function CardContainer({ data }: Props) {
    const { search } = React.useContext(SearchProjectContext);
    const display = useMemo(() => {
        return data?.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));
    }, [data, search]);

    return <>{data && display?.map((project, index) => <ProjectCard key={index} project={project} />)}</>;
}
