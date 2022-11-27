import FastFetcher from '@libs/request/client/fast-fetcher';
import { ProjectCreateData } from '@repositories/Project';

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
