'use client';

import ActivitiesMonth from '@main/dashboard/activity/ActivitiesMonth';
import ActivityDay from '@main/dashboard/activity/ActivityDay';
import ActivityItem from '@main/dashboard/activity/ActivityItem';
import React from 'react';
import { OutputActivities } from '@definitions/project';

export default function ActivityContainer({ data }: { data: OutputActivities[] }) {
    return (
        <>
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
        </>
    );
}
