export type MinecraftItemData = {
    id: number;
    minecraftId: string;
    name: string;
    image: string;
    custom?: boolean;
    tag?: any;
    categories?: Omit<MinecraftCategoryData, 'items' | 'asset'>[];
};

export type MinecraftCategoryData = {
    id: number;
    name: string;
    asset: string;
    items: Array<MinecraftItemData>;
};

export type SlotData = {
    id: string;
    item?: MinecraftItemData;
    count?: number;
};

export type RecipeKey = {
    [key: string]: {
        item: string;
    };
};

export type ShapedRecipeLData = {
    key: string;
    item: MinecraftItemData;
    slot: number[];
};

export type ShapelessRecipe = {
    type: string;
    ingredients: Array<{ item: string }>;
    result: {
        item?: string;
        count?: number;
    };
};

export type ShapedRecipe = {
    type: string;
    pattern: string[];
    key: RecipeKey;
    result: {
        item?: string;
        count?: number;
    };
};

export type Recipe = ShapelessRecipe | ShapedRecipe;

type ReadableRecipeData = {
    id: string;
    name: string;
    type: string;
    exactlyPlaced: boolean;
    custom: boolean;
    projectId: string;
    items: ReadableIngredientData[];
    createdAt?: number;
    updatedAt?: number;
};

type ReadableIngredientData = {
    id: number;
    slot: string;
    count: number;
    item: MinecraftItemData;
};
