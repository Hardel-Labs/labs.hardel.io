import FastFetcher from '@libs/request/client/fast-fetcher';

export const upsertVanillaItem = async (update: boolean, name: string, minecraftId: string, tag: string, arrayCategories: Array<number>, id?: number) => {
    const categories = JSON.stringify(arrayCategories);
    return await new FastFetcher('/api/minecraft/items', 'PUT').setBody({ update, id, name, minecraftId, tag, categories }).fetching();
};

export const deleteVanillaItem = async (id: number) => {
    return await new FastFetcher('/api/minecraft/items', 'DELETE').setBody({ id }).fetching();
};

export const assetUploadItem = async (minecraftId: string, asset: File | undefined) => {
    if (!asset) return;

    const formData = new FormData();
    formData.append('minecraftId', minecraftId);
    formData.append('asset', asset);
    return await new FastFetcher('/api/minecraft/items/asset', 'POST').setFormData(formData).fetching();
};
