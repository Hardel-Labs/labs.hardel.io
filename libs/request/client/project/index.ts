import FastFetcher from '@libs/request/client/fast-fetcher';
import { ProjectCreateData } from '@repositories/Project';

export const deleteProject = async (projectId: string, callback?: (success: boolean) => void) => {
    new FastFetcher('/api/project', 'DELETE').setBody({ projectId }).fetching(callback);
};

export const updateProject = async (projectId: string, data: Partial<ProjectCreateData>, callback?: (success: boolean) => void) => {
    new FastFetcher('/api/project', 'POST').setBody(data).fetching(callback);
};

export const createProject = async (data: ProjectCreateData, callback?: (success: boolean) => void) => {
    new FastFetcher('/api/project', 'PUT').setBody(data).fetching(callback);
};

export const uploadProjectAsset = async (projectId: string, asset: File, callback?: (success: boolean) => void) => {
    new FastFetcher('/api/project/asset', 'POST').setBody({ projectId, asset }).fetching(callback);
};
