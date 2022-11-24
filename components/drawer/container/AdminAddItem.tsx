'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WhiteButton from '@components/form/Button/White';
import SelectItem from '@components/form/Select/item';
import { connectVanillaItemToCategory } from '@libs/request/client/minecraft/category';

type Props = {
    onClose: () => void;
    categoryId?: number;
};

export default function AdminAddItem(props: Props) {
    const router = useRouter();
    const [itemId, setItemId] = useState<string>();
    const [itemDatabaseId, setItemDatabaseId] = useState<number>();

    const sendData = async () => {
        if (!itemDatabaseId || !props.categoryId) return;

        await connectVanillaItemToCategory(props.categoryId, itemDatabaseId, (success) => {
            if (success) {
                setItemId(undefined);
                router.refresh();
                props.onClose();
            }
        });

        router.refresh();
        props.onClose();
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl mb-0 font-bold">Item</p>
                    <small className="text-sm text-gray-400">The item will be connected to the category.</small>
                </div>
                <SelectItem
                    value={itemId}
                    onChange={(item) => {
                        setItemId(item?.id);
                        setItemDatabaseId(item?.databaseId);
                    }}
                />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                <WhiteButton onClick={() => sendData()}>Add Items</WhiteButton>
            </div>
        </div>
    );
}
