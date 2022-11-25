import HardelLetter from '@icons/logo/HardelLetter';

export default function Loading() {
    return (
        <div className={'h-full w-full flex justify-center items-center'}>
            <div className={'animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold flex justify-between items-center'}>
                <HardelLetter className={'w-32 h-32 fill-zinc-500'} />
            </div>
        </div>
    );
}
