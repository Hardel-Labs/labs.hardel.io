import React from 'react';
import { ToastProps, ToastStatus } from '@components/toast/ToastContainer';
import Checked from '@icons/mark/Checked';
import Cross from '@icons/Common/Cross';
import Warning from '@icons/Common/Warning';
import Info from '@icons/mark/Info';

type Props = {
    data: ToastProps;
    onClosed: (id: number) => void;
};

const getStatusIcon = (status: ToastStatus) => {
    switch (status) {
        case ToastStatus.SUCCESS:
            return <Checked className={'w-10 h-10 fill-green-800 border bg-black border-green-800 rounded-full'} />;
        case ToastStatus.ERROR:
            return <Cross className={'w-10 h-10 fill-red-700 border bg-black border-red-800 rounded-full'} />;
        case ToastStatus.WARNING:
            return <Warning className={'w-10 h-10 fill-yellow-600 border bg-black border-yellow-800 rounded-full'} />;
        case ToastStatus.INFO:
            return <Info className={'w-10 h-10 fill-blue-700 border bg-black border-blue-800 rounded-full'} />;
    }
};

export default class Toast extends React.PureComponent<Props> {
    ref = React.createRef<HTMLDivElement>();
    state = {
        width: 100,
        translateX: 100,
        height: 0
    };

    handleClose = () => {
        this.setState({ height: 0, translateX: 100 });
        setTimeout(() => this.props.onClosed(this.props.data.id), 300);
    };

    componentDidMount() {
        this.setState({ width: 0, translateX: 0 });

        if (this.ref.current) {
            this.setState({ height: this.ref.current.offsetHeight });
        }

        setTimeout(this.handleClose, 5000);
    }

    render() {
        const { width, translateX, height } = this.state;

        return (
            <div className="relative w-max transition-[height] duration-300" style={{ height }}>
                <div
                    ref={this.ref}
                    className="bg-black/70 absolute bottom-0 right-0 backdrop-blur rounded-lg shadow-lg overflow-hidden rounded-md max-w-sm hover:scale-95 transition-[translate] transition-bounce duration-300 cursor-pointer w-max"
                    style={{ translate: `${translateX}%` }}
                    onClick={this.handleClose}
                >
                    <div className="flex gap-x-4 items-center p-4">
                        <div className="flex-shrink-0">{getStatusIcon(this.props.data.status)}</div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex justify-between">
                                <div className="text-zinc-100 font-bold text-lg">{this.props.data.title}</div>
                                <Cross className="w-4 h-4 fill-white hover:fill-gold transition ease-in-out cursor-pointer" />
                            </div>
                            <div className="text-zinc-500 text-sm">{this.props.data.children}</div>
                        </div>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full">
                        <div
                            className="h-full bg-white ease-linear transition-[width]"
                            style={{
                                width: `${width}%`,
                                transitionDuration: '5000ms'
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
