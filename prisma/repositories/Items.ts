import { Category, Item, PrismaClient } from '@prisma/client';
import { MinecraftItemData } from '@definitions/minecraft';
import { RequiredBy, SafeNumber } from '@definitions/global';

export type ItemWithCategories = Item & { categories?: Category[] };
export type ItemCreateData = Omit<Item, 'id'> & { categories?: { connect: { id: string }[] } };
export type ItemUpsertData = RequiredBy<Partial<Item & { categories: string[] }>, 'name' | 'asset' | 'minecraftId'>;

export default class ItemRepository {
    constructor(private readonly prisma: PrismaClient['item']) {}

    async findAll(categories?: boolean) {
        return await this.prisma.findMany({
            include: { categories: categories }
        });
    }

    async findPaginated(limit?: SafeNumber, page?: SafeNumber, categories?: boolean) {
        return await this.prisma.findMany({
            include: { categories: categories },
            take: limit ? Number(limit) : undefined,
            skip: page && limit ? (Number(page) + 1) * Number(limit) : 0
        });
    }

    async findOne(id: string, categories?: boolean) {
        return await this.prisma.findUnique({
            where: {
                id
            },
            include: { categories: categories }
        });
    }

    async count() {
        return await this.prisma.count();
    }

    async create(data: ItemCreateData) {
        return await this.prisma.create({
            data
        });
    }

    async update(id: string, data: Partial<Item>) {
        return await this.prisma.update({
            where: {
                id
            },
            data
        });
    }

    async updateOrInsert(data: ItemUpsertData) {
        if (data.id) {
            return await this.prisma.update({
                where: {
                    id: data.id
                },
                data: {
                    ...data,
                    categories: {
                        set: data.categories?.map((id) => {
                            return { id };
                        })
                    }
                }
            });
        } else {
            return await this.prisma.create({
                data: {
                    ...data,
                    categories: {
                        connect: data.categories?.map((id) => {
                            return { id };
                        })
                    }
                }
            });
        }
    }

    async delete(id: string) {
        return await this.prisma.delete({
            where: {
                id
            }
        });
    }

    async deleteAll() {
        return await this.prisma.deleteMany();
    }

    itemsToData(items: ItemWithCategories[]): MinecraftItemData[] {
        return items.map((item) => {
            return this.itemToData(item);
        });
    }

    itemToData(item: ItemWithCategories): MinecraftItemData {
        return {
            id: item.id,
            minecraftId: item.minecraftId,
            name: item.name,
            image: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${item.asset}`,
            custom: item.custom,
            tag: item.tag,
            categories:
                item?.categories?.map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                        minecraftId: category.categoryId,
                        asset: `${process.env.ASSET_PREFIX}/minecraft/items/vanilla/${category.asset}`
                    };
                }) ?? []
        };
    }
}
