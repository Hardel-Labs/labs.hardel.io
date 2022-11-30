import FastFetcher from '@libs/request/client/fast-fetcher';
import { ProjectCreateData } from '@repositories/Project';
import { ProjectRole } from '@prisma/client';

export const deleteProject = async (projectId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects', 'DELETE').appendMutateUrl('/api/projects/select').appendMutateUrl('/api/projects').setBody({ projectId }).fetching(callback);
};

export const updateProject = async (projectId: string, data: Partial<ProjectCreateData>, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setBody({
            projectId,
            ...data
        })
        .fetching(callback);
};

export const createProject = async <T>(data: Omit<ProjectCreateData, 'asset'>, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects', 'PUT').setBody(data).fetching<T>(callback);
};

export const uploadProjectAsset = async (projectId: string, asset: File, callback?: (success: boolean) => void) => {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('asset', asset);

    return await new FastFetcher('/api/projects/asset', 'POST').appendMutateUrl('/api/projects/select').appendMutateUrl('/api/projects').setFormData(formData).fetching(callback);
};

export const selectProject = async (projectId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/select', 'POST').appendMutateUrl('/api/projects/select').appendMutateUrl('/api/projects').setBody({ projectId }).fetching(callback);
};

export const inviteProjectMember = async (projectId: string, email: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/invite', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId, email })
        .fetching(callback);
};

export const acceptProjectInvite = async (projectId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/accept', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId })
        .fetching(callback);
};

export const leaveProject = async (projectId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/leave', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId })
        .fetching(callback);
};

export const banProjectMember = async (projectId: string, userId: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/ban', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .appendMutateUrl('/api/projects/members')
        .setBody({ projectId, removedUserId: userId })
        .fetching(callback);
};

export const transferProjectOwnership = async (projectId: string, email: string, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/owner', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setBody({ projectId, email })
        .fetching(callback);
};

export const changeUserRole = async (projectId: string, userId: string, role: ProjectRole, callback?: (success: boolean) => void) => {
    return await new FastFetcher('/api/projects/role', 'POST')
        .appendMutateUrl('/api/projects/select')
        .appendMutateUrl('/api/projects')
        .setBody({ projectId, targetUserId: userId, role })
        .fetching(callback);
};
