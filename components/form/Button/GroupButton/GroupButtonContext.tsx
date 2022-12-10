import React, { createContext } from 'react';

type GroupButtonContextData = {
    currentElement: string;
    setCurrentElement: (id: string) => void;
    domElement: HTMLElement | undefined;
    setDomElement: (element: HTMLElement) => void;
};

export const GroupButtonContext = createContext<GroupButtonContextData>({} as GroupButtonContextData);

export default function GroupButtonProvider({ children }: { children: React.ReactNode }) {
    const [currentElement, setCurrentElement] = React.useState<string>('');
    const [domElement, setDomElement] = React.useState<HTMLElement>();

    return (
        <GroupButtonContext.Provider
            value={{
                currentElement,
                setCurrentElement,
                domElement,
                setDomElement
            }}
        >
            {children}
        </GroupButtonContext.Provider>
    );
}
