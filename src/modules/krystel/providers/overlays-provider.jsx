import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useQueryState, parseAsBoolean } from 'nuqs';

import { CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

import { cn, match } from '@/modules/core/helpers/utils';
import useWeather from '@/modules/core/hooks/use-weather';
import useSettings from '@/modules/core/hooks/use-settings';

import Portal from '@/modules/core/components/common/portal';
import JsonViewer from '@/modules/core/components/common/json-viewer';
import { Button } from '@/modules/shadcn/ui/button';

import Raining from '@/modules/krystel/components/overlays/raining';
import Snowing from '@/modules/krystel/components/overlays/snowing';
import Thunder from '@/modules/krystel/components/overlays/thunder';
import Balloons from '@/modules/krystel/components/overlays/balloons';

const OverlaysContext = createContext({});

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

    const [allowWeather] = useSettings('weather:allow', false);

    const [isRaining, setIsRaining] = useState(false);
    const [isSnowing, setIsSnowing] = useState(false);
    const [isSleet, setIsSleet] = useState(false);
    const [isThunder, setIsThunder] = useState(false);

    useSetter(setIsRaining, allowWeather && raining);
    useSetter(setIsSnowing, allowWeather && snowing);
    useSetter(setIsSleet, allowWeather && sleet);
    useSetter(setIsThunder, allowWeather && thunder);

    const weatherIcon = match({ raining, snowing, sleet, thunder })
        .with({ raining: true }, () => <CloudRain />)
        .with({ snowing: true }, () => <CloudSnow />)
        .with({ sleet: true }, () => <CloudDrizzle />)
        .with({ thunder: true }, () => <CloudLightning />)
        .otherwise(() => <Sun />)
        .run();

    const weatherIndo = match({ raining, snowing, sleet, thunder })
        .with({ raining: true, thunder: false }, () => ({
            id: 'raining',
            description: 'Lloviendo',
        }))
        .with({ snowing: true, thunder: false }, () => ({ id: 'snowing', description: 'Nevando' }))
        .with({ sleet: true, thunder: false }, () => ({ id: 'sleet', description: 'Granizando' }))
        .with({ raining: true, thunder: true }, () => ({
            id: 'raining_thunder',
            description: 'Lluvia y tormenta',
        }))
        .with({ snowing: true, thunder: true }, () => ({
            id: 'snowing_thunder',
            description: 'Nieve y tormenta',
        }))
        .with({ sleet: true, thunder: true }, () => ({
            id: 'sleet_thunder',
            description: 'Granizo y tormenta',
        }))
        .with({ thunder: true }, () => ({ id: 'thunder', description: 'Relámpagos' }))
        .otherwise(() => ({ id: 'clear', description: 'Despejado' }))
        .run();

    const weather = {
        ...weatherIndo,
        raining,
        snowing,
        sleet,
        thunder,
        icon: weatherIcon,
    };

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
        <OverlaysContext.Provider value={{ weather, toogle, show, hide, summonBalloons }}>
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
