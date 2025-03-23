import { cn } from '@/modules/core/helpers/utils';
import { randomPick } from '@/modules/core/helpers/arrays';
import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';

import { useOverlays } from '@/modules/krystel/providers/overlays-provider';

const colors = [
    'text-red-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500',
    'text-purple-500',
];

export const BalloonsTextSimple = ({ children }) => {
    return (
        <span className={cn('font-boogaloo font-extrabold text-[1.15rem]')}>
            {children.split('').map((letter, index) => (
                <span key={`balloon-letter-${letter}-${index}`} className={cn(randomPick(colors))}>
                    {letter}
                </span>
            ))}
        </span>
    );
};

export default function BalloonsText({ children }) {
    const { summonBalloons } = useOverlays();

    const quote = useQuote();

    const postBalloons = usePostAction({
        action: 'balloons',
        settings: quote.settings,
    });

    const handleClick = ev => {
        ev.preventDefault();
        summonBalloons();
        postBalloons();
    };

    return (
        <div
            className='relative inline-flex items-center justify-center cursor-pointer active:scale-95'
            onClick={handleClick}
        >
            <span
                className={cn(
                    'absolute z-10 mx-auto flex w-fit box-content',
                    'text-white blur-xs scale-110',
                    'font-boogaloo font-extrabold text-center text-[1.2em]',
                    'select-none',
                )}
                data-html2canvas-ignore
            >
                {children}
            </span>

            <span
                className={cn(
                    'relative z-40 top-0 w-fit h-auto flex justify-center items-center',
                    'font-boogaloo font-extrabold text-center text-[1.2em]',
                    'select-auto',
                )}
            >
                {children.split('').map((letter, index) => (
                    <span
                        key={`balloon-letter-${letter}-${index}`}
                        className={cn(randomPick(colors))}
                    >
                        {letter}
                    </span>
                ))}
            </span>
        </div>
    );
}
