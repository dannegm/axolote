'use client';
import {
    Pacifico,
    Delius,
    Roboto,
    Noto_Sans,
    Playwrite_MX,
    Oswald,
    Playfair_Display,
    Lora,
    Quicksand,
    Bebas_Neue,
    Macondo,
    Dosis,
    Dancing_Script,
    Anton,
    Jersey_10,
    Boogaloo,
    Micro_5,
} from 'next/font/google';

import { cn } from '@/modules/core/helpers/utils';
import { useEffect } from 'react';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'], variable: '--font-pacifico' });
const delius = Delius({ weight: '400', subsets: ['latin'], variable: '--font-delius' });
const roboto = Roboto({ weight: '400', subsets: ['latin'], variable: '--font-roboto' });
const noto = Noto_Sans({ weight: '400', subsets: ['latin'], variable: '--font-noto' });
const playwrite = Playwrite_MX({ subsets: ['latin'], variable: '--font-playwrite' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebasNeue' });
const macondo = Macondo({ weight: '400', subsets: ['latin'], variable: '--font-macondo' });
const dosis = Dosis({ subsets: ['latin'], variable: '--font-dosis' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-dancingScript' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const jersey10 = Jersey_10({ weight: '400', subsets: ['latin'], variable: '--font-jersey10' });
const boogaloo = Boogaloo({ weight: '400', subsets: ['latin'], variable: '--font-boogaloo' });
const micro5 = Micro_5({ weight: '400', subsets: ['latin'], variable: '--font-micro5' });

export const fonts = {
    pacifico: pacifico.variable,
    delius: delius.variable,
    roboto: roboto.variable,
    noto: noto.variable,
    playwrite: playwrite.variable,
    oswald: oswald.variable,
    playfair: playfair.variable,
    lora: lora.variable,
    quicksand: quicksand.variable,
    bebasNeue: bebasNeue.variable,
    macondo: macondo.variable,
    dosis: dosis.variable,
    dancingScript: dancingScript.variable,
    anton: anton.variable,
    jersey10: jersey10.variable,
    boogaloo: boogaloo.variable,
    micro5: micro5.variable,
};

const classNames = /* css */ `
.font-pacifico { font-family: var(--font-pacifico); }
.font-delius { font-family: var(--font-delius); }
.font-roboto { font-family: var(--font-roboto); }
.font-noto { font-family: var(--font-noto); }
.font-playwrite { font-family: var(--font-playwrite); }
.font-oswald { font-family: var(--font-oswald); }
.font-playfair { font-family: var(--font-playfair); }
.font-lora { font-family: var(--font-lora); }
.font-quicksand { font-family: var(--font-quicksand); font-size: 0.9em; }
.font-bebasNeue { font-family: var(--font-bebasNeue); }
.font-macondo { font-family: var(--font-macondo); }
.font-dosis { font-family: var(--font-dosis); }
.font-dancingScript { font-family: var(--font-dancingScript); font-size: 1.1em; }
.font-anton { font-family: var(--font-anton); font-size: 0.9em; }
.font-jersey10 { font-family: var(--font-jersey10); font-size: 1.2em; }
.font-boogaloo { font-family: var(--font-boogaloo); }
.font-micro5 { font-family: var(--font-micro5); }
`;

export default function Fonts({ children }) {
    useEffect(() => {
        const stylesContent = `<style>${classNames}</style>`;
        document.body.insertAdjacentHTML('afterbegin', stylesContent);

        const classList = cn(...Object.values(fonts), 'antialiased').split(' ');
        document.body.classList.add(...classList);

        return () => {
            document.body.classList.remove(...classList);
        };
    }, []);
    return <>{children}</>;
}
