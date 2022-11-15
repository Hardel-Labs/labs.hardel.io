'use client';

import React, { createContext } from 'react';
import { MinecraftItemData } from '@definitions/minecraft';

type ProjectContextData = {
    projectId: string;
    hoveredItem: MinecraftItemData | undefined;
    setHoveredItem: (item: MinecraftItemData | undefined) => void;
    setProjectId: (id: string) => void;
};

export const ProjectContext = createContext<ProjectContextData>({} as ProjectContextData);
export default function ProjectContextProvider({ children }: { children: React.ReactNode }) {
    const [projectId, setProjectId] = React.useState('');
    const [hoveredItem, setHoveredItem] = React.useState<MinecraftItemData>();

    return <ProjectContext.Provider value={{ projectId, hoveredItem, setHoveredItem, setProjectId }}>{children}</ProjectContext.Provider>;
}
