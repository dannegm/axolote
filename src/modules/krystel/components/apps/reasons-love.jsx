'use client';
import { useEffect } from 'react';

import { cn } from '@/modules/core/helpers/utils';
import { useToast } from '@/modules/core/providers/toast-provider';
import useHasElapsedTime, { ElapsedTime } from '@/modules/core/hooks/use-has-elapsed-time';
import useLocalStorage from '@/modules/core/hooks/use-local-storage';
import { useQuote } from '@/modules/krystel/providers/quote-provider';
import usePostAction from '@/modules/krystel/hooks/use-post-action';
import useReasonsLove from '@/modules/krystel/hooks/use-reasons-love';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

import Frame from './frame';
import Button from '../common/button';
import RandomWord from '../common/random-word';
import PaperNote from '../common/paper-note';

const COOLDOWN_TIME = 60 * 1000;

export default function ReasonsLove() {
    const { discover, getStats, clearReasons } = useReasonsLove();
    const { total } = getStats();

    const [started, setStarted] = useLocalStorage('reasons:started', false);
    const [finished, setFinished] = useLocalStorage('reasons:finished', false);
    const [currentReason, setCurrentReason] = useLocalStorage('reasons:current', 0);

    const cooldown = useHasElapsedTime('reasons:cooldown', COOLDOWN_TIME);
    const { discover: discoverSecret } = useEasterEggs();

    const { showToast } = useToast();
    const quote = useQuote();

    const startedAction = usePostAction({
        action: 'Start Discovering Reasons',
        settings: quote?.settings,
    });
    const finishedAction = usePostAction({
        action: 'All Reasons Discovered',
        settings: quote?.settings,
    });

    const discoverAction = usePostAction({
        action: `Reason ${currentReason + 1}`,
        settings: quote?.settings,
    });

    const handleStart = () => {
        setStarted(true);
        setFinished(false);
        setCurrentReason(1);
        startedAction();
    };

    const handleReset = () => {
        setStarted(false);
        setFinished(false);
        setCurrentReason(0);
        clearReasons();
    };

    useEffect(() => {
        if (started && currentReason <= total && cooldown === ElapsedTime.PASSED) {
            setCurrentReason(+currentReason + 1);
            discoverAction();
        }

        if (started && !finished && cooldown === ElapsedTime.WAITING) {
            discoverSecret('reasons_hacked');
            showToast({
                content: 'Espera poquito para la siguiente',
            });
        }
    }, [cooldown]);

    useEffect(() => {
        if (currentReason > total) {
            setFinished(true);
            discoverSecret('reasons_all');
            finishedAction();
        }
    }, [currentReason, total]);

    return (
        <Frame className='max-h-auto flex flex-col flex-center gap-4'>
            <p className='text-pretty text-base'>
                <span className='font-mono font-bold text-rose-500'>#100Reasons</span>
            </p>

            {!started && (
                <div className='flex flex-col flex-center gap-2' data-step='first'>
                    <p className='text-sm'>
                        Cada que encuentres esta tarjeta también encontrarás una de las{' '}
                        <span className='text-purple-600 font-bold italic'>100 razones</span> por
                        las que
                    </p>
                    <p className='flex flex-row gap-1 text-xs'>
                        <RandomWord
                            words={[
                                'te quiero',
                                'me gustas',
                                'te amo',
                                'me encantas',
                                'te admiro',
                                'te deseo',
                                'te extraño',
                                'te necesito',
                            ]}
                        />
                        <RandomWord
                            words={[
                                'tanto',
                                'demasiado',
                                'infinitamente',
                                'a montones',
                                'por siempre',
                                'sin mesuras',
                                'sin importar nada',
                            ]}
                        />
                    </p>
                    <Button
                        className={cn('block w-fit text-sm px-4 py-2 mt-4')}
                        onClick={handleStart}
                    >
                        Estoy lista ✨
                    </Button>
                </div>
            )}

            {started && !finished && (
                <div className='flex flex-col flex-center gap-2' data-step='reason'>
                    <PaperNote>
                        <p className='text-lg font-bold'>
                            Razón <span>#{currentReason}</span>
                        </p>
                        <p className='text-lg leading-4'>
                            {discover(`r:${currentReason}`)?.description}
                        </p>
                    </PaperNote>
                </div>
            )}

            {finished && (
                <div className='flex flex-col flex-center gap-2' data-step='finish'>
                    <p className='text-base'>Ahora sabes el por qué de lo mucho que te quiero.</p>
                    <p className='text-sm'>
                        Si quieres volver a leerlas una por una solamente pica el botón de abajo o
                        busca la tarjeta con la lista completa.
                    </p>
                    <Button
                        className={cn('block w-fit text-sm px-4 py-2 mt-4')}
                        onClick={handleReset}
                    >
                        Comenzar de nuevo ✨
                    </Button>
                </div>
            )}
        </Frame>
    );
}
