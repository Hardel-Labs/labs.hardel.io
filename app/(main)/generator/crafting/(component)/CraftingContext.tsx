'use client';

import React, { createContext, useMemo, useState } from 'react';
import { MinecraftItemData, ReadableIngredientData, SlotData } from '@definitions/minecraft';
import { DEFAULT_SLOT_VALUE } from '@libs/constant';
import { RecipeType } from '@prisma/client';

type CraftingContextData = {
    slots: SlotData[];
    setSlots: (slots: SlotData[]) => void;
    recipeType: RecipeType;
    setRecipeType: (recipeType: RecipeType) => void;
    resultCount: number;
    setResultCount: (count: number) => void;
    selectedItem: MinecraftItemData | undefined;
    setSelectedItem: (item: MinecraftItemData | undefined) => void;
    editingId?: string;
    setEditingId: (editingId?: string) => void;
    craftName: string;
    setCraftName: (name: string) => void;
    setSlotItem: (slotId: string, item: MinecraftItemData | undefined) => void;
    setSlotFromIngredients: (ingredients: ReadableIngredientData[]) => void;
};

export const CraftingContext = createContext<CraftingContextData>({} as CraftingContextData);
export default function CraftingContextProvider(props: { children: React.ReactNode }) {
    const [slots, setSlots] = React.useState<SlotData[]>(DEFAULT_SLOT_VALUE);
    const [recipeType, setRecipeType] = React.useState<RecipeType>(RecipeType.SHAPELESS);
    const [selectedItem, setSelectedItem] = React.useState<MinecraftItemData | undefined>(undefined);
    const [editingId, setEditingId] = React.useState<string>();
    const [craftName, setCraftName] = useState<string>('');

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

    const setSlotFromIngredients = (ingredients: ReadableIngredientData[]) => {
        const newSlots: SlotData[] = ingredients.map((ingredient) => {
            return {
                id: ingredient.slot,
                item: ingredient.item,
                count: ingredient.count
            };
        });

        setSlots(newSlots);
    };

    const setResultCount = (count: number) => {
        setSlots((slots) => slots.map((slot) => (slot.id === 'crafting:result' ? { ...slot, count } : slot)));
    };

    const resultCount = useMemo(() => {
        return slots.find((slot) => slot.id === 'crafting:result')?.count ?? 1;
    }, [slots]);

    return (
        <CraftingContext.Provider
            value={{
                slots,
                setSlots,
                recipeType,
                setRecipeType,
                resultCount,
                setResultCount,
                selectedItem,
                setSelectedItem,
                editingId,
                setEditingId,
                craftName,
                setCraftName,
                setSlotItem,
                setSlotFromIngredients
            }}
        >
            {props.children}
        </CraftingContext.Provider>
    );
}
