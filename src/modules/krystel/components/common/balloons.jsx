'use client';

import { useEffect, useRef, useState } from 'react';
import useSound from 'use-sound';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';

import { random } from '@/modules/core/helpers/numbers';
import { randomPick, sequence } from '@/modules/core/helpers/arrays';

import { confettiExplosion } from '@/modules/krystel/helpers/particles';
import useEasterEggs from '@/modules/krystel/hooks/use-easter-eggs';

const balloonDimension = 15;
const defaultColors = ['#e1e110', '#1717c8', '#561394', '#11ca11', '#dc5f25', '#d01a1a'];

const getViewportPercentage = event => ({
    x: (event.clientX / window.innerWidth) * 100,
    y: (event.clientY / window.innerHeight) * 100,
});

const l = left => {
    return `${left}vw`;
};

const addSubtractRange = ({ direction, left, ranges = [-5, 5] }) => {
    if (left < 50 && direction === 'right') {
        return left - random(...ranges);
    }

    return left + random(...ranges);
};

const balloonsUpAnimation = ({ left, ranges }) => {
    const anim = keyframes`
        0%{
            top: 100vh;
            left: ${l(left)};
        }
        20%{
            top: ${`${random(70, 90)}vh`};
            left: ${l(addSubtractRange({ direction: 'left', left, ranges }))};
        }
        40%{
            top: ${`${random(50, 70)}vh`};
            left: ${l(addSubtractRange({ direction: 'left', left, ranges }))};
        }
        60%{
            top: ${`${random(30, 50)}vh`};
            left: ${l(addSubtractRange({ direction: 'left', left, ranges }))};
        }
        80%{
            top: ${`${random(10, 30)}vh`};
            left: ${l(addSubtractRange({ direction: 'left', left, ranges }))};
        }
        100%{
            top: ${`${random(-30, -50)}vh`};
            left: ${l(addSubtractRange({ direction: 'left', left, ranges }))};
        }
    `;

    return anim;
};

const StyledBalloon = styled.div`
    // Position
    position: fixed;
    z-index: 10000;
    left: ${props => l(props.animate.left)};
    bottom: calc(-1 * ${`${balloonDimension}vmax`});

    // Box
    display: ${props => (props.show === 'yes' ? 'block' : 'none')};
    width: ${`${balloonDimension}vmax`};
    height: ${`${balloonDimension}vmax`};

    // Styles
    background-color: ${props => rgba(props.color, 0.75)};
    backdrop-filter: blur(5px) saturate(5%);
    border-radius: 100% 100% 15% 100%;
    box-shadow: 8px 2px 40px 2px rgb(0 0 0 / 40%),
        16px 3px 40px 40px ${props => rgba(props.color, 0.15)};

    // Modifiers
    transform: rotateZ(45deg);
    transform-origin: 0 0;
    filter: blur(1px);
    pointer-events: none;

    // Anims
    transition: all 0.15s ease;
    animation: ${props => balloonsUpAnimation(props.animate)} ease-in-out
        ${props => (props.animate.loop ? 'infinite' : '1')};
    animation-duration: ${props => `${props.animate.duration}s`};
    animation-delay: ${props => `${props.animate.delay}s`};
    animation-play-state: running;

    &::before {
        content: '';
        position: absolute;
        left: 15%;
        top: 45%;
        width: 10%;
        height: 25%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0.1) 100%
        );
        border-radius: 100%;
        filter: blur(4px);
    }

    &::after {
        content: '';
        position: absolute;
        left: 90%;
        top: 94%;
        width: 13%;
        height: 5%;
        background-color: inherit;
        border-radius: 22%;
        transform: rotateZ(-45deg);
    }

    .string {
        position: absolute;
        top: calc(${`${balloonDimension}vmax`} - 6px);
        left: calc(${`${balloonDimension}vmax`} - 8px);
        width: 4px;
        height: calc(${`${balloonDimension}vmax`} * 0.6);
        background-color: #e6d625;
        box-shadow: 8px 2px 30px 2px rgb(0 0 0 / 40%);
        border-radius: 50%/100px 100px 0 0;
        transform: rotateZ(-45deg);
        transform-origin: top center;
    }

    .trigger {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        pointer-events: auto;
    }
`;

const Balloon = ({ colors = defaultColors, loop, onPop }) => {
    const [show, setShow] = useState(true);
    const [playBalloonpop] = useSound('/sounds/balloonpop.mp3');
    const [playGlitter] = useSound('/sounds/glitter.mp3');

    const color = randomPick(colors);
    const left = random(20, 80);
    const delay = random(0, 5);
    const duration = 5 + random(1, 5);

    const popBalloon = event => {
        playGlitter();
        playBalloonpop();

        const balloonPosition = getViewportPercentage(event);
        confettiExplosion(balloonPosition);

        setShow(false);

        event.balloon = {
            color,
            position: balloonPosition,
        };

        onPop?.(event);
    };

    return (
        <StyledBalloon
            color={color}
            show={show ? 'yes' : 'no'}
            animate={{ left, delay, duration, loop }}
        >
            <div className='trigger' onClick={popBalloon} />
            <div className='string' />
        </StyledBalloon>
    );
};

const Balloons = ({ count, loop, onPop, onPopAll }) => {
    const popCount = useRef(0);
    const canHandlePopAll = useRef(true);
    const $interval = useRef();

    const { discover } = useEasterEggs();

    const handlePop = event => {
        onPop?.(event);
        popCount.current = popCount.current + 1;
    };
    const handlePopAll = () => {
        onPopAll?.();
        discover('balloons');
        canHandlePopAll.current = false;
        clearInterval($interval);
    };

    useEffect(() => {
        $interval.current = setInterval(() => {
            if (popCount.current >= count && canHandlePopAll.current) {
                handlePopAll?.();
            }
        }, 100);
    }, []);

    return sequence(count).map(id => (
        <Balloon key={`balloon-${id}`} loop={loop} onPop={handlePop} />
    ));
};

export default Balloons;
