import React from 'react';
import ActivitiesMonth from '@main/dashboard/activity/ActivitiesMonth';
import ActivityDay from '@main/dashboard/activity/ActivityDay';
import ActivityItem from '@main/dashboard/activity/ActivityItem';
import { getAllActivities } from '@libs/request/server/project/activity/get';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '@session';
import { OutputActivities } from '@definitions/project';
import Slash from '@icons/Slash';
import Checked from '@icons/mark/Checked';
import Unchecked from '@icons/mark/Unchecked';
import Info from '@icons/mark/Info';

const getData = async (id?: string) => {
    if (!id) throw new Error('No id provided');

    const response = await getAllActivities(id);
    if (!response.request.success) throw new Error("Couldn't get data");
    return response.data as OutputActivities[];
};

export default async function ActivityPage() {
    const session = await unstable_getServerSession(authOptions);
    const data = await getData(session?.project?.id);

    return (
        <section className={'min-height-view flex flex-col border-b-gold border-b-8 border-solid'}>
            <div className={'py-10 px-[150px] w-full'}>
                <div className={'flex gap-x-4'}>
                    <h1 className={'text-4xl font-bold text-gold'}>Dashboard</h1>
                    <Slash />
                    <span className={'text-4xl font-bold text-zinc-200'}>Activity</span>
                </div>
                <hr className={'mb'} />
                <div className={'8 flex justify-between items-center'}>
                    <div className={'bold text-xl text-zinc-400'}>Legend</div>
                    <div className={'flex gap-x-4'}>
                        <div className={'flex gap-x-2 items-center'}>
                            <Checked className={'w-4 h-4 fill-green-500'} />
                            <span>New feature</span>
                        </div>
                        <Slash />
                        <div className={'flex gap-x-2 items-center'}>
                            <Unchecked className={'w-4 h-4 fill-red-500'} />
                            <span>Removed feature</span>
                        </div>
                        <Slash />
                        <div className={'flex gap-x-2 items-center'}>
                            <Info className={'w-4 h-4 fill-blue-500'} />
                            <span>Changed feature or information</span>
                        </div>
                    </div>
                </div>
                <hr className={'mb-8'} />
                {data.map((element, index) => (
                    <ActivitiesMonth key={index} month={element.month} years={element.year}>
                        {element.data.map((month, index) => (
                            <ActivityDay key={index} day={month.day}>
                                {month.activities.map((activity, index) => (
                                    <ActivityItem key={index} data={activity}>
                                        {activity.message}
                                    </ActivityItem>
                                ))}
                            </ActivityDay>
                        ))}
                    </ActivitiesMonth>
                ))}
            </div>
        </section>
    );
}
