import { ActivityType, PrismaClient } from '@prisma/client';
import { OutputActivities } from '@definitions/project';

export default class ActivityRepository {
    constructor(private readonly prisma: PrismaClient['activity']) {}

    async create(projectId: string, userId: string, message: string, action: ActivityType, asset?: string) {
        return await this.prisma.create({
            data: { message, userId, projectId, action, asset }
        });
    }

    async getAll(projectId: string) {
        const data = await this.prisma.findMany({
            where: { projectId },
            orderBy: { createdAt: 'desc' },
            include: {
                createdBy: true
            }
        });

        return data.reduce((acc: OutputActivities[], current) => {
            const month = current.createdAt.getMonth();
            const year = current.createdAt.getFullYear();
            const day = current.createdAt.getDate();
            const index = acc.findIndex((item) => item.month === month && item.year === year);

            if (index === -1) acc.push({ month, year, data: [{ day, activities: [current] }] });
            else {
                const dayIndex = acc[index].data.findIndex((item) => item.day === day);
                if (dayIndex === -1) acc[index].data.push({ day, activities: [current] });
                else acc[index].data[dayIndex].activities.push(current);
            }

            return acc;
        }, []);
    }
}
