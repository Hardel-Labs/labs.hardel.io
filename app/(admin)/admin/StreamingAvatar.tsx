import { AsyncSessionProps } from '@definitions/next-auth';
import Image from 'next/image';
import Harion from '@images/harion.webp';

export default async function StreamingAvatar(props: AsyncSessionProps) {
    const session = await props.session;

    return <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />;
}
