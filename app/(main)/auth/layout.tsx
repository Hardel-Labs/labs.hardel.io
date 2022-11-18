import React from 'react';

// This file patch a bug on deployment
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
