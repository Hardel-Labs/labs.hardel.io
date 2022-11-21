import FastFetcher from '@libs/request/client/fast-fetcher';

export const createVanillaItem = async (item: FormData, callback: (success: boolean) => void) => {
    new FastFetcher('/api/minecraft/items/create', 'POST').appendMutateUrl('/api/minecraft/items').setFormData(item).fetching(callback);
};
