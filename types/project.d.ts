import { MinecraftItemData } from '@definitions/minecraft';
import { Activity, ProjectRole, User } from '@prisma/client';

type ReadableProjectData = {
    id: string;
    name: string;
    description: string;
    version: string;
    namespace: string;
    asset: string;
    items: MinecraftItemData[];
    recipes: any[];
    activities: any[];
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
    isInvited: boolean;
};

export type ReadableProject = Omit<ReadableProjectData, 'users'> & {
    users: PersonalProjectData[];
};

type MemberData = {
    id: string;
    email: string;
    name: string;
    image: string;
    role: ProjectRole;
    joinedAt: number;
    isInvited: boolean;
};

export type MembersData = {
    members: MemberData[];
    self: PersonalProjectData;
    projectId: string;
};

type ReadableActivityData = Activity & { createdBy: User | null };

export type OutputActivities = {
    month: number;
    year: number;
    data: [
        {
            day: number;
            activities: ReadableActivityData[];
        }
    ];
};
