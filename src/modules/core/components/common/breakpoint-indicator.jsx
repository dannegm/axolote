export default function BreakpointIndicator({ position = 'bottom-right' }) {
    const positions = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'center-top': 'top-4 left-1/2 transform -translate-x-1/2',
        'center-bottom': 'bottom-4 left-1/2 transform -translate-x-1/2',
        'center-left': 'left-4 top-1/2 transform -translate-y-1/2',
        'center-right': 'right-4 top-1/2 transform -translate-y-1/2',
    };

    return (
        <div
            className={`fixed ${
                positions[position] || positions['bottom-right']
            } bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold`}
        >
            <span className='block sm:hidden'>XS</span>
            <span className='hidden sm:block md:hidden'>SM</span>
            <span className='hidden md:block lg:hidden'>MD</span>
            <span className='hidden lg:block xl:hidden'>LG</span>
            <span className='hidden xl:block 2xl:hidden'>XL</span>
            <span className='hidden 2xl:block'>2XL</span>
        </div>
    );
}
