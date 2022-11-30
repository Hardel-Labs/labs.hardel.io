'use client';

import { signIn } from 'next-auth/react';
import RainbowButton from '@components/form/Button/Rainbow';

export default function LoginButton() {
    return <RainbowButton onClick={() => signIn()}>Log in</RainbowButton>;
}
