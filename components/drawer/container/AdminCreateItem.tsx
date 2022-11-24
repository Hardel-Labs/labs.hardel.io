'use client';

import { useEffect, useMemo, useState } from 'react';
import FormInput from '@components/form/input';
import Select, { Option } from '@components/form/Select';
import FileInput from '@components/form/FileInput';
import WhiteButton from '@components/form/Button/White';
import fetcher from '@libs/request/client/fetcher';
import useSWR from 'swr';
import { Category } from '@prisma/client';
import Image from 'next/image';
import DefaultItem from '@images/design/item_placeholder.webp';
import RedButton from '@components/form/Button/Red';
import { assetUploadItem, deleteVanillaItem, upsertVanillaItem } from '@libs/request/client/minecraft/item';
import { MinecraftItemData } from '@definitions/minecraft';
import { useRouter } from 'next/navigation';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<MinecraftItemData>;
};

export default function AdminCreateItem(props: Props) {
    const { data } = useSWR<Category[]>('/api/minecraft/categories/lite', fetcher);
    const router = useRouter();
    const [name, setName] = useState('');
    const [minecraftId, setMinecraftId] = useState('');
    const [asset, setAsset] = useState<File>();
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const displayPreview = useMemo(() => {
        return asset ? URL.createObjectURL(asset) : DefaultItem;
    }, [asset]);

    const options: Option[] = useMemo(() => {
        return (
            data?.map((category) => ({
                name: category.name,
                id: category.id.toString(),
                shortName: category.name.length > 5 ? category.name.substring(0, 5).trim() + '...' : category.name
            })) || []
        );
    }, [data]);

    const sendData = async () => {
        const parsedCategories = categories.map((category) => Number(category));
        await assetUploadItem(minecraftId, asset);
        await upsertVanillaItem(!props.isCreating, name, minecraftId, tags, parsedCategories, props.defaultValues?.id, (success) => {
            if (success) {
                setName('');
                setMinecraftId('');
                setAsset(undefined);
                setTags('');
                setCategories([]);
                router.refresh();
                props.onClose();
            }
        });
    };

    const handleDelete = async () => {
        if (props.defaultValues?.id) {
            await deleteVanillaItem(props.defaultValues?.id, (success) => {
                if (success) {
                    router.refresh();
                    props.onClose();
                }
            });
        }
    };

    useEffect(() => {
        const { name, minecraftId, tag, categories } = props.defaultValues || {};
        if (name) {
            setName(name);
        }

        if (minecraftId) {
            setMinecraftId(minecraftId);
        }

        if (tag) {
            setTags(tag);
        }

        if (categories) {
            setCategories(categories.map((category) => category.id.toString()));
        }
    }, [props.defaultValues]);

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Items Name</p>
                    <small className="text-sm text-gray-400">The name of the item displayed only on the website.</small>
                </div>
                <FormInput type={'text'} placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Items ID</p>
                    <small className="text-sm text-gray-400">The ID of the item for minecraft</small>
                </div>
                <FormInput type={'text'} placeholder={'ID'} value={minecraftId} onChange={(e) => setMinecraftId(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4 flex justify-between items-center'}>
                    <div>
                        <p className="text-xl mb-0 font-bold">Items Asset</p>
                        <small className="text-sm text-gray-400">The asset of the item, basically the image</small>
                    </div>
                    <Image src={displayPreview} alt={''} className={'w-8 h-8'} width={100} height={100} />
                </div>
                <FileInput onChange={setAsset} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Items Categories</p>
                    <small className="text-sm text-gray-400">The categories of the item, you can select multiple</small>
                </div>
                <Select options={options} values={categories} onChange={setCategories} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Items Tags</p>
                    <small className="text-sm text-gray-400">The tags of the item, so the nbt data</small>
                </div>
                <FormInput type={'text'} placeholder={'Tags'} value={tags} onChange={(e) => setTags(e.target.value)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                {!props.isCreating && <RedButton onClick={() => handleDelete()}>Delete Item</RedButton>}
                <WhiteButton onClick={() => sendData()}>{props.isCreating ? 'Create Item' : 'Update Item'}</WhiteButton>
            </div>
        </div>
    );
}
