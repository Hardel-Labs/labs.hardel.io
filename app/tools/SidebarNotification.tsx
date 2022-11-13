import NotificationToast from '@components/NotificationToast';
import Harion from '@images/Harion.png';
import Hardel from '@images/logo.png';
import WhiteButton from '@components/form/White';

export default function SidebarNotification() {
    return (
        <>
            <WhiteButton className={'w-full mb-1'}>Close all notification</WhiteButton>
            <hr />
            <div className={'flex flex-col gap-y-2 overflow-y-auto'}>
                <NotificationToast title={'Nex Items'} description={'A new items as been created'} picture={Harion} project={Hardel} />
                <NotificationToast title={'Nex Items'} description={'A new items as been created'} picture={Harion} project={Hardel} />
                <NotificationToast title={'Nex Items'} description={'A new items as been created'} picture={Harion} project={Hardel} />
            </div>
        </>
    );
}
