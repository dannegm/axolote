import { randomIndex, randomPick } from '@/helpers/arrays';

export const icons = [
    'Candy',
    'Cake',
    'Gift',
    'PartyPopper',
    'Snowflake',
    'Clover',
    'Cookie',
    'Cat',
    'Flower',
    'Gem',
    'Lollipop',
    'MoonStar',
    'Origami',
    'Sparkles',
];

const borderPatterns = [
    'https://cdn.pixabay.com/photo/2020/03/12/13/05/blue-4925033_1280.png',
    'https://cdn.pixabay.com/photo/2017/02/15/20/33/floral-2069810_1280.png',
    'https://cdn.pixabay.com/photo/2021/11/22/10/14/floral-6816295_1280.png',
    'https://cdn.pixabay.com/photo/2023/08/07/13/40/flowers-8175044_1280.png',
    'https://cdn.pixabay.com/photo/2021/07/16/20/24/pattern-6471790_1280.png',
    'https://cdn.pixabay.com/photo/2024/04/13/14/10/ai-generated-8693988_1280.png',
    'https://cdn.pixabay.com/photo/2016/11/01/14/39/memphis-1788465_1280.png',
    'https://cdn.pixabay.com/photo/2016/03/31/21/28/background-1296439_1280.png',
    'https://cdn.pixabay.com/photo/2020/11/16/01/40/flowers-5747688_1280.png',
    'https://cdn.pixabay.com/photo/2021/11/13/00/37/background-6790308_1280.png',
    'https://cdn.pixabay.com/photo/2022/03/21/13/44/background-7083247_1280.png',
    'https://cdn.pixabay.com/photo/2022/03/09/05/50/hearts-7057067_1280.png',
    'https://cdn.pixabay.com/photo/2016/04/01/09/03/floral-1299131_1280.png',
    'https://cdn.pixabay.com/photo/2021/11/19/15/21/christmas-6809681_1280.png',
    'https://cdn.pixabay.com/photo/2023/05/10/13/27/orange-flowers-7984018_1280.png',
];

const bgPatterns = [
    'https://cdn.pixabay.com/photo/2019/05/05/21/42/doodle-4181783_1280.png',
    'https://cdn.pixabay.com/photo/2016/06/24/15/48/pattern-1477380_1280.png',
    'https://cdn.pixabay.com/photo/2021/08/25/12/29/nature-6573288_1280.png',

    'https://cdn.pixabay.com/photo/2023/03/11/01/22/pattern-7843452_1280.png',
    'https://cdn.pixabay.com/photo/2020/11/17/02/57/leaves-5751200_1280.png',
    'https://cdn.pixabay.com/photo/2022/01/08/14/18/flowers-6924088_1280.png',
    'https://cdn.pixabay.com/photo/2023/04/09/14/06/balloon-7911607_1280.png',
];

const colorSchemes = [
    'bg-pink-100 text-pink-800',
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-teal-100 text-teal-800',
    'bg-indigo-100 text-indigo-800',
    'bg-cyan-100 text-cyan-800',
    'bg-rose-100 text-rose-800',
    'bg-amber-100 text-amber-800',
    'bg-lime-100 text-lime-800',
    'bg-emerald-100 text-emerald-800',
    'bg-sky-100 text-sky-800',
    'bg-fuchsia-100 text-fuchsia-800',
    'bg-violet-100 text-violet-800',
    'bg-orange-100 text-orange-800',
    'bg-neutral-100 text-neutral-800',
    'bg-zinc-100 text-zinc-800',
    'bg-gray-100 text-gray-800',
    'bg-slate-100 text-slate-800',
];

const quotes = [
    'Perdón por ser tan cursi a veces (casi siempre).',
    'Esta es la única forma que encontré de decirte casi todo lo que pienso.',
    'Ojalá no te fastidies de esto antes de que puedas leerlo todo.',
    'Sólo disfruta de todo lo que te doy sin decirme ni deberme nada.',
    'Sé que probablemente ya estés fastidiada de tanta cursilería.',
    'Recordé que alguna vez me digiste que los tulipanes blancos eran tus favoritos.',
    'Aún no descarto la posibilidad de algún día ir a Japón contigo 😔.',
    'Quisiera estar ahí para poder felicitarte con un abrazo.',
    'No te lo he había dicho pero cada que escucho "Die With a Smile" sólo puedo pensar en ti.',
    'Me gustaría que el poder vernos se repita más seguido este nuevo año :).',
    'No te preocupes, vendré a dejarte más pensamientos por aquí de vez en cuando.',
    'Ojalá pudiera estar cerca para poder celebrar contigo.',
    'Quizá sea el único celebrándote a ti y no el año nuevo.',
    'Me encantaría que cada vez que sonríes, el mundo entero se detenga para admirarte.',
    'A veces, la vida necesita un recordatorio de lo increíble que eres.',
    'A veces siento que no te digo lo suficiente lo importante que eres para mí.',
    'Lo único que quiero para ti es que disfrutes de la vida, que encuentres razones para sonreír todos los días.',
    'Me gusta pensar que te hago sentir mejor, aunque sea solo por un momento. Ojalá fuera siempre.',
    'Tienes tanto potencial, tanta luz dentro de ti, y solo quiero que encuentres la forma de brillar aún más.',
    'Me gustaría que pudieras ver lo increíble que eres, porque a veces no te das cuenta de lo mucho que vales.',
    'Sabía que te mataba la curiosidad por saber qué era este sitio.',
    'Algunsa frases fueron generadas por IA, es que no podía resumir en pocas palabras todo lo que quería decirte.',
    'Espero esta sorpresa te haya sacado una sonrisa.',
    'Cada que entres aquí, encontrarás algo nuevo :).',
    'No preguntes, sólo gózalo 7u7.',
    'Lo divertido de esto es que no tienes que leerlo todo de una vez, puedes leer sólo una frase al día.',
    '¿Ya intentaste picar en «Another»?',
    'Esta pequeña app es otra forma de tenerme cerca.',
    'Si picas muchas veces el botón de like, será como si me invocaras.',
];

//

export const getRandomSettings = () => {
    return [
        /* quote */ randomIndex(quotes),
        /* icon */ randomIndex(icons),
        /* border */ randomIndex(borderPatterns),
        /* bg */ randomIndex(bgPatterns),
        /* scheme */ randomIndex(colorSchemes),
    ].join('');
};

export const quoteFromSettings = settings => {
    const decodedSettings = settings.split('');
    return {
        settings,
        quote: quotes[decodedSettings[0]],
        icon: icons[decodedSettings[1]],
        border: `url(${borderPatterns[decodedSettings[2]]})`,
        bg: `url(${bgPatterns[decodedSettings[3]]})`,
        scheme: colorSchemes[decodedSettings[4]],
    };
};

export const getRandomQuote = () => {
    const code = getRandomSettings();
    return quoteFromSettings(code);
};
