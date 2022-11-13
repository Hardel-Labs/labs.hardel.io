import Image, { StaticImageData } from 'next/image';
import { CSSProperties } from 'react';

type Props = {
    image: string | StaticImageData;
};

const styles: CSSProperties = {};

export default function MinecraftSlot(props: Props) {
    return (
        <span className={'bg-black relative block border border-gray-700 rounded align-middle w-14 h-14 p-[4px]'} style={styles}>
            <Image alt={''} src={props.image} height={64} width={64} className={'w-full h-full cursor-move pixelated align-middle'} />
        </span>
    );
}
