import { ActivityType, Ingredient, Item, PrismaClient, Recipes, RecipeType } from '@prisma/client';
import { MinecraftItemData, ReadableRecipeData, SlotData } from '@definitions/minecraft';
import ItemRepository from '@repositories/Items';
import createActivity from '@libs/request/server/project/activity/create';

export type CreateRecipeData = {
    name: string;
    type: RecipeType;
    custom: boolean;
    items: SlotData[];
    projectId: string;
};

type CreateIngredientData = { slot: string; count: number; itemId: number };

type RecipeData = Recipes & {
    items: (Ingredient & { item: Item })[];
};
export default class RecipeRepository {
    constructor(private readonly prisma: PrismaClient['recipes']) {}

    /**
     * Get the recipe by its id
     * @param id
     */
    async findOne(id: string) {
        const response = await this.prisma.findUniqueOrThrow({
            where: {
                id
            },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return this.recipeToReadable(response);
    }

    /**
     * Get all recipes by project id
     * @param projectId
     */
    async findByProject(projectId: string) {
        const response = await this.prisma.findMany({
            where: {
                projectId
            },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return this.recipesToReadable(response);
    }

    /**
     * Create a new recipe
     */
    async create(userId: string, projectId: string, recipe: CreateRecipeData) {
        const response = await this.prisma.create({
            data: {
                projectId: recipe.projectId,
                name: recipe.name,
                type: recipe.type,
                custom: recipe.custom,
                items: {
                    create: this.slotDataToIngredient(recipe.items)
                }
            },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        createActivity(userId, projectId, '%user% created the recipe ' + response.name, ActivityType.CREATE);
        return this.recipeToReadable(response);
    }

    async delete(userId: string, projectId: string, id: string) {
        const response = await this.prisma.delete({
            where: {
                id
            },
            select: {
                name: true
            }
        });

        createActivity(userId, projectId, '%user% deleted the recipe ' + response.name, ActivityType.DELETE);
        return response;
    }

    async update(userId: string, projectId: string, recipeId: string, data: Omit<CreateRecipeData, 'projectId'>) {
        const ingredientData = data.items;
        await this.updateIngredients(userId, projectId, recipeId, ingredientData);
        const response = await this.prisma.update({
            where: {
                id: recipeId
            },
            data: {
                type: data.type,
                custom: data.custom,
                name: data.name
            },
            include: {
                items: {
                    include: {
                        item: true
                    }
                }
            }
        });

        return this.recipeToReadable(response);
    }

    async updateIngredients(userId: string, projectId: string, recipesId: string, ingredients: SlotData[]) {
        await prisma.ingredient.deleteMany({
            where: {
                recipesId
            }
        });

        const ingredientData = this.slotDataToIngredient(ingredients);
        await prisma.ingredient.createMany({
            data: ingredientData.map((ingredient) => ({
                ...ingredient,
                recipesId
            }))
        });

        const recipe = await this.findOne(recipesId);

        createActivity(userId, projectId, '%user% updated the recipe ' + recipe.name, ActivityType.INFO);
    }

    async updateName(userId: string, projectId: string, recipeId: string, name: string) {
        createActivity(userId, projectId, '%user% updated the name of the recipe by' + name, ActivityType.INFO);
        return this.prisma.update({
            where: {
                id: recipeId
            },
            data: {
                name
            }
        });
    }

    /**
     * Convert an array of recipes to readable data
     * @param data
     * @private
     */
    private recipesToReadable(data: RecipeData[]): ReadableRecipeData[] {
        return data.map((recipe) => this.recipeToReadable(recipe));
    }

    /**
     * Convert a recipe to readable data
     * @param data
     * @private
     */
    private recipeToReadable(data: RecipeData): ReadableRecipeData {
        const itemRepo = new ItemRepository(prisma.item);

        const itemToData = (item: Item): MinecraftItemData => {
            return itemRepo.itemToData(item);
        };

        return {
            id: data.id,
            name: data.name,
            type: data.type,
            custom: data.custom,
            projectId: data.projectId,
            createdAt: data.createdAt?.getTime(),
            updatedAt: data.updatedAt?.getTime(),
            items: data.items.map((item) => ({
                slot: item.slot,
                count: item.count,
                id: item.id,
                item: itemToData(item.item)
            }))
        };
    }

    private slotDataToIngredient(slots: SlotData[]): CreateIngredientData[] {
        const ingredients = [] as CreateIngredientData[];
        for (const slot of slots) {
            if (!slot.item) continue;

            ingredients.push({
                slot: slot.id,
                itemId: slot.item.id,
                count: slot.count ?? 1
            });
        }

        return ingredients;
    }
}
