import prisma from '@libs/prisma';
import RestHelper from '@libs/request/server/form-checker';
import { RestErrorType } from '@libs/constant';
import ActivityRepository from '@repositories/ActivityRepository';
import { ActivityType } from '@prisma/client';

const createActivity = (userId: string, projectId: string, message: string, action: ActivityType = ActivityType.INFO, asset?: string) => {
    try {
        (async () => await new ActivityRepository(prisma.activity).create(projectId, userId, message, action, asset))();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'The project is not create').getResponse();
    }
};

export default createActivity;
