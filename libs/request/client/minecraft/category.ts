import FastFetcher from '@libs/request/client/fast-fetcher';
import { SafeNumber } from '@definitions/global';

export const upsertVanillaCategory = async (name: string, asset: string, id?: number, callback?: (success: boolean) => void) => {
    new FastFetcher('/api/minecraft/categories', 'PUT').setBody({ id, name, asset }).fetching(callback);
};

export const deleteVanillaCategory = async (id: number, callback: (success: boolean) => void) => {
    new FastFetcher('/api/minecraft/categories', 'DELETE').setBody({ id }).fetching(callback);
};

export const connectVanillaItemToCategory = async (categoryId: SafeNumber, itemId: SafeNumber, callback: (success: boolean) => void) => {
    new FastFetcher('/api/minecraft/categories/connect', 'POST').setBody({ categoryId, itemId }).fetching(callback);
};
