'use client';

import SettingsLinks from '@main/dashboard/settings/SettingsLinks';
import React from 'react';
import { Session } from 'next-auth';
import { ProjectRole } from '@prisma/client';

type Props = {
    session: Session | null;
};

export default function Navigation(props: Props) {
    return (
        <>
            <SettingsLinks href={'/dashboard/settings'}>General</SettingsLinks>
            <SettingsLinks href={'/dashboard/settings/members'}>Members</SettingsLinks>
            <SettingsLinks href={'/dashboard/settings/about'}>About</SettingsLinks>
            {props.session?.project?.role === ProjectRole.OWNER && <SettingsLinks href={'/dashboard/settings/advanced'}>Advanced</SettingsLinks>}
        </>
    );
}
