import { StaticImageData } from 'next/image';

type MinecraftItemData = {
    id: string;
    name: string;
    image: string | StaticImageData;
    custom?: boolean;
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

type RecipeKey = {
    [key: string]: {
        item: string;
    };
};

type ShapedRecipeLData = {
    key: string;
    item: MinecraftItemData;
    slot: number[];
};

type ShapelessRecipe = {
    type: string;
    ingredients: Array<{ item: string }>;
    result: {
        item?: string;
        count?: number;
    };
};

type ShapedRecipe = {
    type: string;
    pattern: string[];
    key: RecipeKey;
    result: {
        item?: string;
        count?: number;
    };
};

type Recipe = ShapelessRecipe | ShapedRecipe;
