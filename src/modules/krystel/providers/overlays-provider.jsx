import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useQueryState, parseAsBoolean } from 'nuqs';

import useWeather from '@/modules/core/hooks/use-weather';
import JsonViewer from '@/modules/core/components/common/json-viewer';
import { Button } from '@/modules/shadcn/ui/button';

import Raining from '@/modules/krystel/components/overlays/raining';
import Snowing from '@/modules/krystel/components/overlays/snowing';
import Thunder from '@/modules/krystel/components/overlays/thunder';
import Balloons from '@/modules/krystel/components/overlays/balloons';

const OverlaysContext = createContext();

export const useOverlays = () => {
    return useContext(OverlaysContext);
};

const useSetter = (setter, value) => {
    useEffect(() => {
        setter(value);
    }, [setter, value]);
};

const defaultIntensity = {
    snow: {
        snowflakeCount: 220,
        speed: [0.5, 2.5],
        wind: [-0.5, 0.5],
        radius: [1.5, 3.5],
        fog: 0.45,
    },
    rain: {
        numDrops: 500,
        fog: 0.45,
        volume: 0.25,
    },
};

export default function OverlaysProvider({ allowRoutes = [], children }) {
    const [debug] = useQueryState('debug-overlay', parseAsBoolean.withDefault(false));
    const [location] = useLocation();
    const { raining, snowing, sleet, thunder, intensity, data } = useWeather();

    const $balloons = useRef();

    const [isRaining, setIsRaining] = useState(false);
    const [isSnowing, setIsSnowing] = useState(false);
    const [isSleet, setIsSleet] = useState(false);
    const [isThunder, setIsThunder] = useState(false);

    useSetter(setIsRaining, raining);
    useSetter(setIsSnowing, snowing);
    useSetter(setIsSleet, sleet);
    useSetter(setIsThunder, thunder);

    const actions = {
        raining: setIsRaining,
        snowing: setIsSnowing,
        sleet: setIsSleet,
        thunder: setIsThunder,
    };

    const toogle = layer => {
        actions[layer]?.(state => !state);
    };

    const show = layer => {
        actions[layer]?.(true);
    };

    const hide = layer => {
        actions[layer]?.(false);
    };

    const summonBalloons = () => {
        $balloons.current?.summonBalloons?.();
    };

    return (
        <OverlaysContext.Provider value={{ toogle, show, hide, summonBalloons }}>
            {debug && (
                <div className='fixed bottom-16 left-4 w-auto z-max flex flex-col gap-2'>
                    <JsonViewer
                        name='weather'
                        data={{ isRaining, isSnowing, isSleet, isThunder, intensity }}
                        expanded
                    />
                    <JsonViewer name='weather::data' data={data} />
                    <div className='flex flex-row gap-2'>
                        <Button onClick={() => toogle('raining')}>Toggle Raining</Button>
                        <Button onClick={() => toogle('snowing')}>Toggle Snowing</Button>
                        <Button onClick={() => summonBalloons()}>Summon Balloons</Button>
                    </div>
                </div>
            )}

            {allowRoutes.includes(location) && (
                <div data-layer='overlays' className='fixed inset-0 z-10 pointer-events-none'>
                    <Balloons ref={$balloons} />
                    <Raining show={isRaining} intensity={intensity || defaultIntensity} />
                    <Snowing
                        show={isSnowing}
                        intensity={intensity || defaultIntensity}
                        color='#ffffff'
                    />
                    <Snowing
                        show={isSleet}
                        intensity={intensity || defaultIntensity}
                        color='#00d3f2'
                    />
                    <Thunder show={isThunder} />
                </div>
            )}

            {children}
        </OverlaysContext.Provider>
    );
}
