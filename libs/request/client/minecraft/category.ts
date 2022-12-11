import FastFetcher from '@libs/request/client/fast-fetcher';

export const upsertVanillaCategory = async (name: string, asset: string, id?: string) => {
    return await new FastFetcher('/api/minecraft/categories', 'PUT').setBody({ id, name, asset }).fetching();
};

export const deleteVanillaCategory = async (id: string) => {
    return await new FastFetcher('/api/minecraft/categories', 'DELETE').setBody({ id }).fetching();
};

export const connectVanillaItemToCategory = async (categoryId: string, itemId: string) => {
    return await new FastFetcher('/api/minecraft/categories/connect', 'POST').setBody({ categoryId, itemId }).fetching();
};
