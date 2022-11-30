import { SlotData } from '@definitions/minecraft';
import { Option } from '@components/form/Select/multiple';

export enum RecipeType {
    SHAPED = 'minecraft:crafting_shaped',
    SHAPELESS = 'minecraft:crafting_shapeless',
    SMELTING = 'minecraft:smelting',
    BLASTING = 'minecraft:blasting',
    SMOKING = 'minecraft:smoking',
    CAMPFIRE = 'minecraft:campfire_cooking',
    STONE_CUTTING = 'minecraft:stonecutting',
    SMITHING = 'minecraft:smithing'
}

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
