'use client';

import React, { ReactNode } from 'react';
import GroupButtonProvider from '@components/form/Button/GroupButton/GroupButtonContext';
import GroupButtonManager from '@components/form/Button/GroupButton/GroupButtonManager';

export type GroupButtonProps = {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    onSelect?: (value: string) => void;
    defaultValue?: string;
};

export default function GroupButtonContainer(props: GroupButtonProps) {
    return (
        <GroupButtonProvider>
            <GroupButtonManager {...props}>{props.children}</GroupButtonManager>
        </GroupButtonProvider>
    );
}
