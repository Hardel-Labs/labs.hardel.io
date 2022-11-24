import FastFetcher from '@libs/request/client/fast-fetcher';

export const upsertVanillaItem = async (
    update: boolean,
    name: string,
    minecraftId: string,
    tag: string,
    arrayCategories: Array<number>,
    id?: number,
    callback?: (success: boolean) => void
) => {
    const categories = JSON.stringify(arrayCategories);
    new FastFetcher('/api/minecraft/items', 'PUT').setBody({ update, id, name, minecraftId, tag, categories }).fetching(callback);
};

export const deleteVanillaItem = async (id: string, callback: (success: boolean) => void) => {
    new FastFetcher('/api/minecraft/items', 'DELETE').setBody({ id }).fetching(callback);
};

export const assetUploadItem = async (minecraftId: string, asset: File | undefined, callback?: (success: boolean) => void) => {
    if (!asset) return;

    const formData = new FormData();
    formData.append('minecraftId', minecraftId);
    formData.append('asset', asset);
    new FastFetcher('/api/minecraft/items/asset', 'POST').setFormData(formData).fetching(callback);
};
