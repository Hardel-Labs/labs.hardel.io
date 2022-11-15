import { StaticImageData } from 'next/image';

type MinecraftItemData = {
    id: string;
    name: string;
    image: string | StaticImageData;
    custom?: boolean;
    damage?: number;
    tag?: any;
};

type MinecraftCategoryData = {
    id: string;
    image: string | StaticImageData;
    name: string;
    items: Array<MinecraftItemData>;
};

type SlotData = {
    id: string;
    item?: MinecraftItemData;
    count?: number;
};

type ShapelessRecipe = {
    type: string;
    ingredients: Array<{ item: string }>;
    result: {
        item?: string;
        count?: number;
    };
};
