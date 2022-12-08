'use client';

import React, { createContext, useMemo } from 'react';
import { MinecraftItemData, SlotData } from '@definitions/minecraft';
import { DEFAULT_SLOT_VALUE, RecipeType } from '@libs/constant';

type CraftingContextData = {
    slots: SlotData[];
    setSlotItem: (slotId: string, item: MinecraftItemData | undefined) => void;
    recipeType: RecipeType;
    setRecipeType: (recipeType: RecipeType) => void;
    exactPattern: boolean;
    setExactPattern: (exactPattern: boolean) => void;
    setResultCount: (count: number) => void;
    resultCount: number;
    setSlots: (slots: SlotData[]) => void;
    selectedItem: MinecraftItemData | undefined;
    setSelectedItem: (item: MinecraftItemData | undefined) => void;
};

export const CraftingContext = createContext<CraftingContextData>({} as CraftingContextData);
export default function CraftingContextProvider(props: { children: React.ReactNode }) {
    const [slots, setSlots] = React.useState<SlotData[]>(DEFAULT_SLOT_VALUE);
    const [exactPattern, setExactPattern] = React.useState<boolean>(false);
    const [recipeType, setRecipeType] = React.useState<RecipeType>(RecipeType.SHAPED);
    const [selectedItem, setSelectedItem] = React.useState<MinecraftItemData | undefined>(undefined);

    const setSlotItem = (slotId: string, item: MinecraftItemData | undefined) => {
        const slot = slots.find((slot) => slot.id === slotId);
        if (slot) {
            if (!item) {
                slot.item = item;
            } else if (slot.item) {
                slot.item = { ...slot.item, ...item };
            } else {
                slot.item = item;
            }
        } else {
            slots.push({ id: slotId, item });
        }

        setSlots([...slots]);
    };

    const setResultCount = (count: number) => {
        setSlots((slots) => slots.map((slot) => (slot.id === 'crafting:result' ? { ...slot, count } : slot)));
    };

    const resultCount = useMemo(() => {
        return slots.find((slot) => slot.id === 'crafting:result')?.count ?? 1;
    }, [slots]);

    return (
        <CraftingContext.Provider
            value={{ slots, setSlotItem, recipeType, setRecipeType, exactPattern, setExactPattern, setResultCount, resultCount, setSlots, selectedItem, setSelectedItem }}
        >
            {props.children}
        </CraftingContext.Provider>
    );
}
