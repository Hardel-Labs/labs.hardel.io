import { SlotData } from '@definitions/minecraft';

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
