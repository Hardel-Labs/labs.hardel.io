import ActivityContainer from '@main/dashboard/activity/ActivityContainer';
import { AsyncSessionProps } from '@definitions/next-auth';
import { getAllActivities } from '@libs/request/server/project/activity/get';
import { OutputActivities } from '@definitions/project';

const getData = async (id?: string) => {
    if (!id) throw new Error('No id provided');

    const response = await getAllActivities(id);
    if (!response.request.success) throw new Error("Couldn't get data");
    return response.data as OutputActivities[];
};

export default async function ActivityManager(props: AsyncSessionProps) {
    const session = await props.session;
    const data = await getData(session?.project?.id);

    return <ActivityContainer data={data} />;
}
