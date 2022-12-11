'use client';

import { useEffect, useMemo, useState } from 'react';
import FormInput from '@components/form/input';
import SelectMultiple, { Option } from '@components/form/Select/multiple';
import FileInput from '@components/form/FileInput';
import WhiteButton from '@components/form/Button/White';
import { Category } from '@prisma/client';
import Image from 'next/image';
import DefaultItem from '@images/design/item_placeholder.webp';
import RedButton from '@components/form/Button/Red';
import { MinecraftItemData } from '@definitions/minecraft';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<MinecraftItemData>;
    defaultCategory?: Category[];
    onSend?: (item: SendData) => void;
    onDeleted?: (id: string) => void;
};

export type SendData = {
    id?: string;
    name: string;
    minecraftId: string;
    asset: File;
    tags: string;
    categories: number[];
};

export default function BaseCreateItem(props: Props) {
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
            props.defaultCategory?.map((category) => ({
                name: category.name,
                value: category.id.toString(),
                shortName: category.name.length > 5 ? category.name.substring(0, 5).trim() + '...' : category.name
            })) || []
        );
    }, [props.defaultCategory]);

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

    const handleSend = () => {
        const parsedCategories = categories.map((category) => Number(category));
        if (!asset) {
            return;
        }

        const sendData: SendData = {
            id: props.defaultValues?.id,
            name,
            minecraftId,
            asset,
            tags,
            categories: parsedCategories
        };

        props.onSend?.(sendData);
    };

    const handleDelete = () => {
        if (!props.defaultValues?.id) {
            return;
        }

        props.onDeleted?.(props.defaultValues?.id);
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Name</p>
                    <small className="text-sm text-gray-400">The name of the item displayed only on the website.</small>
                </div>
                <FormInput type={'text'} placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">ID</p>
                    <small className="text-sm text-gray-400">The ID of the item for minecraft</small>
                </div>
                <FormInput type={'text'} placeholder={'ID'} value={minecraftId} onChange={(e) => setMinecraftId(e.target.value)} />
                <hr />
            </div>
            <div>
                <div className={'mb-4 flex justify-between items-center'}>
                    <div>
                        <p className="text-xl mb-0 font-bold">Asset</p>
                        <small className="text-sm text-gray-400">The asset of the item, basically the image</small>
                    </div>
                    <Image src={displayPreview} alt={''} className={'w-8 h-8'} width={100} height={100} />
                </div>
                <FileInput onChange={setAsset} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Categories</p>
                    <small className="text-sm text-gray-400">The categories of the item, you can select multiple</small>
                </div>
                <SelectMultiple options={options} values={categories} onChange={setCategories} />
                <hr />
            </div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Tags</p>
                    <small className="text-sm text-gray-400">The tags of the item, so the nbt data</small>
                </div>
                <FormInput type={'text'} placeholder={'Tags'} value={tags} onChange={(e) => setTags(e.target.value)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                {!props.isCreating && <RedButton onClick={() => handleDelete()}>Delete Item</RedButton>}
                <WhiteButton onClick={() => handleSend()}>{props.isCreating ? 'Create Item' : 'Update Item'}</WhiteButton>
            </div>
        </div>
    );
}
