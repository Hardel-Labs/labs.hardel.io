import { PrismaClient, User, UserData } from '@prisma/client';

export default class UserDataRepository {
    constructor(private readonly prisma: PrismaClient['userData']) {}

    async create(userId: string) {
        return await this.prisma.create({
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
    }

    async getByUserId(userId: string): Promise<UserData> {
        return await this.prisma.findUniqueOrThrow({
            where: { userId }
        });
    }

    async getAllPersonalData(userId: string): Promise<UserData & Partial<User>> {
        return await this.prisma.findUniqueOrThrow({
            where: { userId },
            include: {
                user: {
                    select: {
                        email: true,
                        id: true,
                        image: true,
                        name: true
                    }
                }
            }
        });
    }
}
