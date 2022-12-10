import { ReadableRecipeData } from '@definitions/minecraft';
import { RecipeType } from '@prisma/client';

const grid = 3;
export const randomPlacement = (data: ReadableRecipeData): ReadableRecipeData => {
    let newData = { ...data };
    const { type, items } = newData;

    switch (type) {
        case RecipeType.SHAPELESS: {
            const placement: Array<string> = Array.from({ length: 9 }, (_, index) => `crafting:${index}`);
            for (const item of items) {
                if (item.slot === 'crafting:result') continue;

                const randomIndex = Math.floor(Math.random() * placement.length);
                item.slot = placement[randomIndex];
                placement.splice(randomIndex, 1);
            }
            break;
        }
        case RecipeType.SHAPED: {
            const itemsPositions = items.filter((item) => item.slot !== 'crafting:result').map((item) => parseInt(item.slot.split(':')[1]));
            const { length, height } = getLengthAndHeight(itemsPositions, grid);
            const possiblePositions = possibilities(length, height, grid);
            const randomPositions = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
            const firstItemPosition = itemsPositions[0];
            const x = firstItemPosition % grid;
            const y = Math.floor(firstItemPosition / grid);
            const diffX = x - (randomPositions[0] % grid);
            const diffY = y - Math.floor(randomPositions[0] / grid);

            for (const item of items) {
                if (item.slot === 'crafting:result') continue;
                const position = parseInt(item.slot.split(':')[1]);
                const newX = position % grid;
                const newY = Math.floor(position / grid);

                item.slot = `crafting:${newX - diffX + (newY - diffY) * grid}`;
            }

            break;
        }
    }

    return newData;
};

const getLengthAndHeight = (elements: number[], x: number): { length: number; height: number } => {
    elements.sort((a, b) => a - b);
    const length = Math.ceil((elements[elements.length - 1] + 1) / x);
    const height = (elements[elements.length - 1] + 1) % x === 0 ? x : (elements[elements.length - 1] + 1) % x;

    return { length, height };
};

const possibilities = (length: number, height: number, x: number): number[][] => {
    const craftingSlots: number[][] = Array.from({ length: x }, (_, i) => Array.from({ length: x }, (_, j) => j + x * i));
    const craftSize = [length, height];
    const possibilities: number[][] = [];

    for (let i: number = 0; i < craftingSlots.length - craftSize[0] + 1; i++) {
        for (let j: number = 0; j < craftingSlots[i].length - craftSize[1] + 1; j++) {
            const validPosition = craftingSlots.slice(i, i + craftSize[0]).map((a) => a.slice(j, j + craftSize[1]));
            possibilities.push(validPosition.flat());
        }
    }

    return possibilities;
};
