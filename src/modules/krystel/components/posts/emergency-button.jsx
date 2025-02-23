'use client';
import { useState } from 'react';
import useSound from 'use-sound';
import { Siren } from 'lucide-react';

import { cn } from '@/modules/core/helpers/utils';
import { useToast } from '@/modules/core/providers/toast-provider';
import usePanicButton from '../../hooks/use-panic-button';

export default function EmergencyButton({ triggerCreate }) {
    const { showToast } = useToast();
    const [emergency, setEmegency] = useState(false);
    const [playBeep] = useSound('/sounds/smooth-beep.mp3');

    const panicButton = usePanicButton();

    const handleClick = () => {
        showToast({
            content: 'Notificación enviada 🚨',
            duration: 10_000,
            onAccept: () => null,
        });

        panicButton('Krystel, botón de pánico 🚨');

        setEmegency(true);
        triggerCreate();
        playBeep();
    };

    return (
        <div
            className={cn(
                'flex flex-row gap-6 bg-pink-100 border border-red-300 rounded-lg p-4 transition-all duration-500 select-none',
                {
                    'bg-red-600 text-white': emergency,
                },
            )}
        >
            <div className='flex-1 flex flex-col justify-center items-end'>
                <h2 className='font-noto font-bold text-right'>Botón de pánico</h2>
                <p className='font-noto text-sm text-right'>Click en caso de emergencia</p>
            </div>
            <div className='flex-none flex-center mr-[10%] sm:mr-[20%] md:mr-[25%] lg:mr-[30%] xl:mr-[35%]'>
                <button className='cursor-pointer outline-none' onClick={handleClick}>
                    <div className='w-[83px] h-[83px] bg-red-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center'>
                        <div className='absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]'></div>
                        <label className='group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-red-600 to-red-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#fa6060,inset_0px_-4px_0px_#8a1e1e,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(250,96,96,0.5),inset_0px_-4px_2px_rgba(235,37,37,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center'>
                            <div className='felx flex-center text-white w-8 group-active:w-[31px] fill-red-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)] [&_svg]:pointer-events-none [&_svg]:size-7 [&_svg]:shrink-0'>
                                <Siren />
                            </div>
                        </label>
                    </div>
                </button>
            </div>
        </div>
    );
}
