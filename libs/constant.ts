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
        name: 'minutes',
        value: 60
    },
    {
        name: 'hours',
        value: 60 * 60
    },
    {
        name: 'days',
        value: 60 * 60 * 24
    },
    {
        name: 'weeks',
        value: 60 * 60 * 24 * 7
    },
    {
        name: 'months',
        value: 60 * 60 * 24 * 30
    },
    {
        name: 'years',
        value: 60 * 60 * 24 * 365
    }
];

export const VERSION: Option[] = [
    {
        id: '1.19.x',
        name: '1.19.x'
    }
];
