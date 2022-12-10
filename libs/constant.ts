import { SlotData } from '@definitions/minecraft';
import { Option } from '@components/form/Select/multiple';
import { RecipeType } from '@prisma/client';

export const recipeTypeToValue = (type: RecipeType): string => {
    switch (type) {
        case RecipeType.SHAPED:
            return 'minecraft:crafting_shaped';
        case RecipeType.EXACT_SHAPED:
            return 'minecraft:crafting_shaped';
        case RecipeType.SHAPELESS:
            return 'minecraft:crafting_shapeless';
        case RecipeType.SMELTING:
            return 'minecraft:smelting';
        case RecipeType.BLASTING:
            return 'minecraft:blasting';
        case RecipeType.SMOKING:
            return 'minecraft:smoking';
        case RecipeType.CAMPFIRE:
            return 'minecraft:campfire_cooking';
        case RecipeType.STONE_CUTTING:
            return 'minecraft:stonecutting';
        case RecipeType.SMITHING:
            return 'minecraft:smithing';
        default:
            return 'minecraft:crafting_shaped';
    }
};

export enum InventoryType {
    SEARCH = 'search',
    VANILLA = 'vanilla',
    CUSTOM = 'modded'
}

export enum RestErrorType {
    MethodNotAllowed = 'MethodNotAllowed',
    NotFound = 'Not Found',
    BadRequest = 'Bad Request',
    BadParameter = 'Bad Parameter',
    InternalServerError = 'Internal Server Error',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden'
}

export const DEFAULT_SLOT_VALUE: SlotData[] = [{ id: 'crafting:result', count: 1 }];

export const AGO_SINCE = [
    {
        name: 'second',
        value: 0,
        suffix: 's'
    },
    {
        name: 'minutes',
        value: 60,
        suffix: 'm'
    },
    {
        name: 'hours',
        value: 60 * 60,
        suffix: 'h'
    },
    {
        name: 'days',
        value: 60 * 60 * 24,
        suffix: 'd'
    },
    {
        name: 'weeks',
        value: 60 * 60 * 24 * 7,
        suffix: 'w'
    },
    {
        name: 'months',
        value: 60 * 60 * 24 * 30,
        suffix: 'mo'
    },
    {
        name: 'years',
        value: 60 * 60 * 24 * 365,
        suffix: 'y'
    }
];

export const VERSION: Option[] = [
    {
        value: '1.19.x',
        name: '1.19.x'
    }
];

export const ROLES = [
    {
        value: 'ADMIN',
        name: 'Admin'
    },
    {
        value: 'USER',
        name: 'User'
    }
];

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
