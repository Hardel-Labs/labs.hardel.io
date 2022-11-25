'use client';

import React, { createContext } from 'react';

type ProjectContextData = {
    projectId: string;
    setProjectId: (id: string) => void;
};

export const ProjectContext = createContext<ProjectContextData>({} as ProjectContextData);
export default function ProjectContextProvider({ children }: { children: React.ReactNode }) {
    const [projectId, setProjectId] = React.useState('');

    return <ProjectContext.Provider value={{ projectId, setProjectId }}>{children}</ProjectContext.Provider>;
}
