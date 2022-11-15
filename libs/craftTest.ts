import Stone from '@images/placeholder/Stone.webp';
import Oak from '@images/placeholder/Oak_Planks.webp';
import Jungle from '@images/placeholder/Jungle_Planks_JE3_BE2.webp';
import { MinecraftCategoryData } from '@definitions/minecraft';

export const categories: MinecraftCategoryData[] = [
    {
        id: 'minecraft:tools',
        image: Stone,
        name: 'stone',
        items: [
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' }
        ]
    },
    {
        id: 'minecraft:blocks',
        image: Oak,
        name: 'wood',
        items: [
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' }
        ]
    },
    {
        id: 'minecraft:test',
        image: Jungle,
        name: 'bedrock',
        items: [
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' }
        ]
    },
    {
        id: 'minecraft:stone',
        image: Stone,
        name: 'stone',
        items: [
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' },
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' },
            { id: 'minecraft:stone', image: Stone, name: 'stone' },
            { id: 'minecraft:wood', image: Oak, name: 'wood' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' },
            { id: 'minecraft:bedrock', image: Jungle, name: 'bedrock' }
        ]
    }
];
