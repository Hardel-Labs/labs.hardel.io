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
    createdAt?: Date;
    updatedAt?: Date | null;
};

export type ReadablePersonalProjectData = ReadableProjectData & PersonalProjectData;

export type PersonalProjectData = {
    joinedAt?: Date;
    role: ProjectRole;
    isSelected: boolean;
    userId: string;
};

export type ReadableProject = ReadableProjectData & {
    users: PersonalProjectData[];
};
