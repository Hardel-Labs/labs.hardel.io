'use client';

import { useMemo, useState } from 'react';
import FormInput from '@components/form/input';
import Select, { Option } from '@components/form/Select';
import FileInput from '@components/form/FileInput';
import WhiteButton from '@components/form/Button/White';
import fetcher from '@libs/request/client/fetcher';
import useSWR from 'swr';
import { Category } from '@prisma/client';
import Image from 'next/image';
import DefaultItem from '@images/design/item_placeholder.webp';
import { createVanillaItem } from '@libs/request/client/items/create';

type Props = {
    onClose: () => void;
};

export default function CreateItem(props: Props) {
    const { data } = useSWR<Category[]>('/api/minecraft/categories/lite', fetcher);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [asset, setAsset] = useState<File>();
    const [tags, setTags] = useState('');
    const [categories, setCategories] = useState<Option[]>([]);

    const displayPreview = useMemo(() => {
        if (asset) {
            return URL.createObjectURL(asset);
        }

        return DefaultItem;
    }, [asset]);

    const options = useMemo(() => {
        const options: Option[] = [];
        data?.forEach((category) => {
            options.push({
                name: category.name,
                shortName: category.name.length > 5 ? category.name.substring(0, 5).trim() + '...' : category.name,
                id: category.id.toString()
            });
        });

        return options;
    }, [data]);

    const sendData = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('id', id);
        formData.append('tags', tags);
        formData.append('categories', JSON.stringify(categories.map((category) => Number(category.id))));
        formData.append('asset', asset!);

        await createVanillaItem(formData, (success) => {
            if (success) {
                setName('');
                setId('');
                setAsset(undefined);
                setTags('');
                setCategories([]);
                props.onClose();
            }
        });
    };

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
                <FormInput type={'text'} placeholder={'ID'} value={id} onChange={(e) => setId(e.target.value)} />
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
                <Select options={options} onChange={setCategories} />
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

            <div className={'flex justify-end w-full'}>
                <WhiteButton onClick={() => sendData()} className={'mt-4'}>
                    Create Item
                </WhiteButton>
            </div>
        </div>
    );
}
