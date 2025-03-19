import { useRef } from 'react';
import { Application, extend } from '@pixi/react';
import { Container } from 'pixi.js';

import Bird from './bird';
import Pipes from './pipes';
import BgCity from './bg-city';
import Floor from './floor';

extend({ Container });

const GameController = () => {
    return (
        <pixiContainer>
            <BgCity />
            <Pipes translate={100} separation={96} />
            <Bird />
            <Floor />
        </pixiContainer>
    );
};

export default function Game() {
    const $container = useRef();

    return (
        <div ref={$container} className='playground relative'>
            <div
                data-layer='overlay'
                className='absolute inset-0 flex-center text-[2rem] font-micro5'
            >
                <span className='text-yellow-300 text-[1.5em] drop-shadow-lg -mt-32 [text-shadow:_2px_2px_0px_rgba(0,0,0,0.75)]'>
                    Flappy Bird
                </span>
            </div>
            <Application resizeTo={$container} background='#87CEEB'>
                <GameController />
            </Application>
        </div>
    );
}
