import { randomPick } from '@/modules/core/helpers/arrays';
import { cn } from '@/modules/core/helpers/utils';
import { memo } from 'react';

const colorsKeys = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'white',
];

export const Tapes = {
    CROSS_FULL: 'CROSS_FULL',
    CROSS_A: 'CROSS_A',
    CROSS_B: 'CROSS_B',
    CROSS_TOP: 'CROSS_TOP',
    TOP: 'TOP',
    TOP_SMALL: 'TOP_SMALL',
};

function PaperNote({ className, color, tape, children }) {
    const shadowSizes = ['1px', '2px', '3px'];
    const shadowSize = randomPick(shadowSizes);

    const colorKey = color || randomPick(colorsKeys);
    const paperColor = `var(--color-${colorKey}-100)`;
    const paperColorDark = `var(--color-${colorKey}-200)`;

    const tapeVariant = tape || randomPick(Object.keys(Tapes));

    return (
        <div
            data-layer='paper'
            style={{
                '--tape-color': '#dbd8be',
                '--tape-edge-color': '#b7b49d',
                '--paper-shadow': `${shadowSize} ${shadowSize} 2px ${paperColorDark}`,
                '--paper-color': paperColor,
                '--paper-color-dark': paperColorDark,
            }}
            className={cn(
                'relative flex flex-col flex-center gap-2 min-w-[200px] max-w-[280px] px-4 py-6',
                'font-caveat text-pink-800 text-base text-center leading-4 shadow-md',
                'bg-(--paper-color) bg-linear-to-br/srgb from-(--paper-color-dark) to-30% to-transparent',
                'after:absolute after:inset-0 after:mix-blend-screen after:opacity-50 after:bg-linear-to-b after:from-transparent after:via-[50%] after:via-(--paper-color-dark) after:to-[51%] after:to-transparent',
                'before:absolute before:inset-0 before:mix-blend-overlay before:opacity-50 before:bg-linear-to-r before:from-transparent before:via-[50%] before:via-(--paper-color-dark) before:to-[51%] before:to-transparent',
                className,
            )}
        >
            {tapeVariant === Tapes.TOP && (
                <div
                    data-layer='tape-top'
                    className={cn(
                        'absolute h-4 -top-1.5 w-[105%] pointer-events-none',
                        'bg-(--tape-color) opacity-50',
                        'border-x border-dotted border-x-(--tape-edge-color) ',
                    )}
                />
            )}
            {tapeVariant === Tapes.TOP_SMALL && (
                <div
                    data-layer='tape-top'
                    className={cn(
                        'absolute h-4 -top-1.5 left-1/2 transform -translate-x-1/2 w-16  pointer-events-none',
                        'bg-(--tape-color) opacity-50',
                        'border-x border-dotted border-x-(--tape-edge-color) ',
                    )}
                />
            )}

            {(tapeVariant === Tapes.CROSS_A || tapeVariant === Tapes.CROSS_FULL) && (
                <div
                    data-layer='tape-crossing'
                    data-variant='a'
                    className={cn(
                        'absolute inset-0 pointer-events-none',
                        'top-0',
                        'after:w-12 after:h-4 after:absolute after:bg-(--tape-color) after:opacity-50 after:border-x after:border-dashed after:border-x-(--tape-edge-color)',
                        'after:origin-center after:-left-4 after:top-0 after:-rotate-45',
                        'before:w-12 before:h-4 before:absolute before:bg-(--tape-color) before:opacity-50 before:border-x before:border-dashed before:border-x-(--tape-edge-color)',
                        'before:origin-center before:-right-4 before:bottom-0 before:-rotate-45',
                    )}
                />
            )}
            {(tapeVariant === Tapes.CROSS_B || tapeVariant === Tapes.CROSS_FULL) && (
                <div
                    data-layer='tape-crossing'
                    data-variant='b'
                    className={cn(
                        'absolute inset-0 pointer-events-none',
                        'top-0',
                        'after:w-12 after:h-4 after:absolute after:bg-(--tape-color) after:opacity-50 after:border-x after:border-dashed after:border-x-(--tape-edge-color)',
                        'after:origin-center after:-right-4 after:top-0 after:rotate-45',
                        'before:w-12 before:h-4 before:absolute before:bg-(--tape-color) before:opacity-50 before:border-x before:border-dashed before:border-x-(--tape-edge-color)',
                        'before:origin-center before:-left-4 before:bottom-0 before:rotate-45',
                    )}
                />
            )}
            {tapeVariant === Tapes.CROSS_TOP && (
                <>
                    <div
                        data-layer='tape-crossing'
                        data-variant='a'
                        className={cn(
                            'absolute inset-0 pointer-events-none',
                            'top-0',
                            'after:w-12 after:h-4 after:absolute after:bg-(--tape-color) after:opacity-50 after:border-x after:border-dashed after:border-x-(--tape-edge-color)',
                            'after:origin-center after:-left-4 after:top-0 after:-rotate-45',
                        )}
                    />
                    <div
                        data-layer='tape-crossing'
                        data-variant='b'
                        className={cn(
                            'absolute inset-0 pointer-events-none',
                            'top-0',
                            'after:w-12 after:h-4 after:absolute after:bg-(--tape-color) after:opacity-50 after:border-x after:border-dashed after:border-x-(--tape-edge-color)',
                            'after:origin-center after:-right-4 after:top-0 after:rotate-45',
                        )}
                    />
                </>
            )}
            {children}
        </div>
    );
}

export default memo(PaperNote);
