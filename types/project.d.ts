import { MinecraftItemData } from '@definitions/minecraft';
import { ProjectRole } from '@prisma/client';

type ReadableProjectData = {
    id: string;
    name: string;
    description: string;
    version: string;
    namespace: string;
    asset: string;
    items: MinecraftItemData[];
    recipes: any[];
    notifications: any[];
    createdAt?: number;
    updatedAt?: number | null;
    users: {
        userId: string;
        role: ProjectRole;
        joinedAt: number;
    }[];
};

export type ReadablePersonalProjectData = ReadableProjectData & PersonalProjectData;

export type PersonalProjectData = {
    joinedAt?: number;
    role: ProjectRole;
    isSelected: boolean;
    userId: string;
};

export type ReadableProject = Omit<ReadableProjectData, 'users'> & {
    users: PersonalProjectData[];
};
