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
} from 'next/font/google';

import { cn } from '@/modules/core/helpers/utils';

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

const fontClasses = [
    pacifico.variable,
    delius.variable,
    roboto.variable,
    noto.variable,
    playwrite.variable,
    oswald.variable,
    playfair.variable,
    lora.variable,
    quicksand.variable,
    bebasNeue.variable,
    macondo.variable,
    dosis.variable,
    dancingScript.variable,
    anton.variable,
    jersey10.variable,
];

const classNames = /* css */ `
.font-pacifico { font-family: var(--font-pacifico); }
.font-delius { font-family: var(--font-delius); }
.font-roboto { font-family: var(--font-roboto); }
.font-noto { font-family: var(--font-noto); }
.font-playwrite { font-family: var(--font-playwrite); }
.font-oswald { font-family: var(--font-oswald); }
.font-playfair { font-family: var(--font-playfair); }
.font-lora { font-family: var(--font-lora); }
.font-quicksand { font-family: var(--font-quicksand); }
.font-bebasNeue { font-family: var(--font-bebasNeue); }
.font-macondo { font-family: var(--font-macondo); }
.font-dosis { font-family: var(--font-dosis); }
.font-dancingScript { font-family: var(--font-dancingScript); }
.font-anton { font-family: var(--font-anton); }
.font-jersey10 { font-family: var(--font-jersey10); }
`;

export default function Fonts({ children }) {
    return (
        <>
            <style>{classNames}</style>
            <div id='fonts' className={cn(...fontClasses, 'antialiased')}>
                {children}
            </div>
        </>
    );
}
