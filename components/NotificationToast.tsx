import Image, { StaticImageData } from 'next/image';
import Close from '@icons/Close';

type Props = {
    picture: string | StaticImageData;
    project: string | StaticImageData;
    title: string;
    description: string;
};

export default function NotificationToast(props: Props) {
    return (
        <div id="toast-notification" className="p-4 w-full max-w-xs rounded-lg shadow bg-gray-800 text-gray-300" role="alert">
            <div className="flex items-center mb-3">
                <span className="mb-1 text-sm font-semibold text-white">New notification</span>
                <button type="button" className="ml-auto bg-gray-800 text-gray-300 hover:text-white rounded-lg p-1.5 hover:bg-gray-900 h-8 w-8">
                    <div className={'w-full h-full flex justify-between items-center'}>
                        <Close className="fill-white" />
                    </div>
                </button>
            </div>
            <div className="flex items-center">
                <div className="inline-block relative shrink-0">
                    <Image className="w-12 h-12 rounded-full" src={props.picture} alt="" />
                    <span className="inline-flex absolute -right-1 -bottom-1 justify-center items-center w-6 h-6">
                        <Image src={props.project} alt={''} width={64} height={64} className={'rounded-full border-white border border-2'} />
                    </span>
                </div>
                <div className="ml-3 text-sm font-normal">
                    <div className="text-sm font-semibold text-white">{props.title}</div>
                    <div className="text-sm font-normal">{props.description}</div>
                    <span className="text-xs font-medium text-blue-500">a few seconds ago</span>
                </div>
            </div>
        </div>
    );
}
