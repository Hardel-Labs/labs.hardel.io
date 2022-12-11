'use client';

import fetcher from '@libs/request/client/fetcher';
import useSWR from 'swr';
import { Category } from '@prisma/client';
import { assetUploadItem, upsertVanillaItem } from '@libs/request/client/minecraft/item';
import { MinecraftItemData } from '@definitions/minecraft';
import { useRouter } from 'next/navigation';
import BaseCreateItem, { SendData } from '@components/drawer/container/item/BaseCreateItem';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<MinecraftItemData>;
};

export default function AdminCreateItem(props: Props) {
    const { data } = useSWR<Category[]>('/api/minecraft/categories/lite', fetcher);
    const router = useRouter();

    const sendData = async (data: SendData) => {
        const { name, minecraftId, asset, tags, categories } = data;
        await assetUploadItem(minecraftId, asset);
        await upsertVanillaItem(!props.isCreating, name, minecraftId, tags, categories, props.defaultValues?.id).then(() => {
            router.refresh();
            props.onClose();
        });
    };

    const handleDelete = async () => {
        if (props.defaultValues?.id) {
        }
    };

    return (
        <BaseCreateItem
            isCreating={props.isCreating}
            defaultCategory={data}
            onClose={props.onClose}
            onSend={(data) => sendData(data)}
            onDeleted={() => handleDelete()}
        />
    );
}
