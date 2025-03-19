import ResponsiveBox from '@/modules/core/components/common/responsive-box';
import Frame from './frame';

export default function Breakpoint() {
    return (
        <Frame fullwidth>
            <ResponsiveBox
                className='flex-center gap-1 w-full p-4 bg-black text-white text-center shadow-lg text-sm font-bold'
                defaultBreakpointName='mobile'
                breakpoints={{
                    desktop: 300,
                }}
            >
                {({ breakpoint, size }) => (
                    <>
                        <span className='block'>{breakpoint}</span>
                        <span className='block'>{`${size}px`}</span>
                    </>
                )}
            </ResponsiveBox>
        </Frame>
    );
}
