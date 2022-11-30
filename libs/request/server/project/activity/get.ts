import { RestRequest } from '@definitions/api';
import RestHelper from '@libs/request/server/form-checker';
import prisma from '@libs/prisma';
import { RestErrorType } from '@libs/constant';
import ActivityRepository from '@repositories/ActivityRepository';
import { OutputActivities } from '@definitions/project';

const getAllActivities = async (id: string): Promise<RestRequest<OutputActivities[]>> => {
    try {
        const data = await new ActivityRepository(prisma.activity).getAll(id);
        return new RestHelper().setData(data).getResponse();
    } catch (error) {
        return new RestHelper().addError(RestErrorType.InternalServerError, 'An error occurred while fetching activities.').getResponse();
    }
};
export { getAllActivities };
