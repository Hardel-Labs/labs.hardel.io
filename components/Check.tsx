import CheckMark from '@icons/CheckMark';

export default function Check(props: { children: React.ReactNode }) {
    return (
        <div className={'flex items-center gap-x-4'}>
            <div className={'h-6 w-6'}>
                <CheckMark className={'fill-green-700 h-6 w-6'} />
            </div>
            <span className={'text-start'}>{props.children}</span>
        </div>
    );
}
