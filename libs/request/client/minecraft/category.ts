import FastFetcher from '@libs/request/client/fast-fetcher';
import { SafeNumber } from '@definitions/global';

export const upsertVanillaCategory = async (name: string, asset: string, id?: number) => {
    return await new FastFetcher('/api/minecraft/categories', 'PUT').setBody({ id, name, asset }).fetching();
};

export const deleteVanillaCategory = async (id: number) => {
    return await new FastFetcher('/api/minecraft/categories', 'DELETE').setBody({ id }).fetching();
};

export const connectVanillaItemToCategory = async (categoryId: SafeNumber, itemId: SafeNumber) => {
    return await new FastFetcher('/api/minecraft/categories/connect', 'POST').setBody({ categoryId, itemId }).fetching();
};
