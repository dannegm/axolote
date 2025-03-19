import { useState, useEffect } from 'react';

const reasonsList = [
    { id: 'r:1', description: 'Porque tu compañía es tan cálida cuando estoy a tu lado.' },
    { id: 'r:2', description: 'Porque aún sigo sintiendo nervios cuando estoy a punto de verte.' },
    { id: 'r:3', description: 'Porque siempre provocas en mí una gran ternura.' },
    {
        id: 'r:4',
        description: 'Porque fue por ti que aprendí lo que se siente estar vivo nuevamente.',
    },
    {
        id: 'r:5',
        description: 'Porque no existe ni un segundo en mi mente en el que deje de pensarte.',
    },
    { id: 'r:6', description: 'Porque te has convertido en mi mundo entero.' },
    { id: 'r:7', description: 'Por esa mirada que me mata y me da vida al mismo tiempo.' },
    {
        id: 'r:8',
        description:
            'Porque me encanta verte tan pensativa, sumergida en tu propio mundo de ideas.',
    },
    { id: 'r:9', description: 'Por toda la bondad que siempre llevas dentro de ti.' },
    { id: 'r:10', description: 'Porque siempre me emociona poder hacer planes juntos.' },
    {
        id: 'r:11',
        description:
            'Porque eres lo primero en lo que pienso al despertar cada mañana (o a cualquier hora que despierte haha).',
    },
    { id: 'r:12', description: 'Por lo entregada que eres a ti misma.' },
    {
        id: 'r:13',
        description:
            'Porque aún cuando decidiste alejarte de mí, me sigues buscando para compartirme tu día a día.',
    },
    { id: 'r:14', description: 'Porque yo sé que me piensas tanto como yo te pienso a ti.' },
    {
        id: 'r:15',
        description: 'Por esa mancha en tu rostro que brilla con el sol cuando no te maquillas.',
    },
    {
        id: 'r:16',
        description: 'Por lo increíblemente tierna que te ves cuando cierras tus ojitos.',
    },
    {
        id: 'r:17',
        description:
            'Por todas las ambiciones que tienes y que yo sé que luchas día a día por conseguir, a pesar de lo complicado que puede ser.',
    },
    { id: 'r:18', description: 'Por tu exquisito gusto por todo lo aesthetic.' },
    { id: 'r:19', description: 'Por ese lado artístico que te caracteriza.' },
    { id: 'r:20', description: 'Por poder compartir juntos la pasión por el buen cine.' },
    {
        id: 'r:21',
        description: 'Porque no conozco otra persona en este mundo tan bella como lo eres tú.',
    },
    { id: 'r:22', description: 'Por toda la confianza que desde siempre has depositado en mí.' },
    { id: 'r:23', description: 'Porque simplemente hablar contigo me alegra el resto del día.' },
    { id: 'r:24', description: 'Porque vuelvo a enamorarme de ti cada que te escucho reír.' },
    {
        id: 'r:25',
        description:
            'Porque aunque lo intentemos, sabes que no podemos estar lejos el uno del otro.',
    },
    { id: 'r:26', description: 'Porque mis días son más tristes cuando no estás tú.' },
    {
        id: 'r:27',
        description:
            'Porque podría estarte escuchando hablar por horas, fascinado con todo lo que tienes que decir.',
    },
    { id: 'r:28', description: 'Porque eres muy cozy haha.' },
    { id: 'r:29', description: 'Porque me hielo cada que dices mi nombre.' },
    {
        id: 'r:30',
        description: 'Porque eres tan desesperada que no te tienes ni paciencia a ti misma.',
    },
    {
        id: 'r:31',
        description: 'Por ese carácter e imponencia tan fuerte que llevas siempre por fuera.',
    },
    {
        id: 'r:32',
        description:
            'Pero también porque me has permitido conocer esa fragilidad y ternura que llevas dentro.',
    },
    { id: 'r:33', description: 'Por lo impulsiva que eres.' },
    { id: 'r:34', description: 'Por toda tu locura.' },
    { id: 'r:35', description: 'Por toda tu cordura.' },
    { id: 'r:36', description: 'Por todos tus defectos.' },
    {
        id: 'r:37',
        description: 'Porque esa impulsividad y esa locura me arrastraron hasta enamorarme de ti.',
    },
    { id: 'r:38', description: 'Porque es imposible no amar hasta el más mínimo cabello tuyo.' },
    { id: 'r:39', description: 'Por todos los recuerdos que hemos construido juntos.' },
    {
        id: 'r:40',
        description: 'Por todos los momentos que aún quisiera poder vivir algún día contigo.',
    },
    { id: 'r:41', description: 'Porque tú también has aprendido a aceptar mis defectos.' },
    { id: 'r:42', description: 'Porque sigo aprendiendo muchas cosas cada día gracias a ti.' },
    { id: 'r:43', description: 'Por toda la locura que tú provocas en mí.' },
    { id: 'r:44', description: 'Porque también me ayudas a mantenerme cuerdo.' },
    { id: 'r:45', description: 'Porque me has cambiado en maneras que ni siquiera sabes.' },
    {
        id: 'r:46',
        description:
            'Porque eres la única que me haría arriesgar la vida en medio de una guerrilla solo por la ilusión de poder verte.',
    },
    {
        id: 'r:47',
        description: 'Porque sabes que me has hecho hacer cosas que parecían imposibles, posibles.',
    },
    { id: 'r:48', description: 'Porque eres un motor que me mantiene funcionando.' },
    {
        id: 'r:49',
        description: 'Porque me haces descubrir cosas de mí que ni yo mismo sabía de mí.',
    },
    {
        id: 'r:50',
        description:
            'Porque es tan sencillo haber encontrado ya 50 cosas que amo de ti y aún me quedan muchas más por decir.',
    },
    { id: 'r:51', description: 'Porque contigo puedo ser yo mismo.' },
    { id: 'r:52', description: 'Porque me gustaría tenerte aquí a mi lado ahora mismo.' },
    { id: 'r:53', description: 'Porque cuando imagino mi futuro, tú estás en él.' },
    { id: 'r:54', description: 'Por todas las cosas que he soñado contigo.' },
    {
        id: 'r:55',
        description:
            'Porque el sueño que una vez tuve de poder verte en persona por fin lo hemos cumplido.',
    },
    {
        id: 'r:56',
        description:
            'Porque cuando te conocí, lejos de decepcionarme, pude maravillarme más con todo lo que eres tú.',
    },
    { id: 'r:57', description: 'Porque sigo buscando excusas para poder verte.' },
    {
        id: 'r:58',
        description:
            'Porque 7 horas de viaje son insignificantes cuando sé que me estás esperando allá.',
    },
    {
        id: 'r:59',
        description:
            'Por esa explosión que siento en el corazón cuando puedo volver a verte de nuevo.',
    },
    {
        id: 'r:60',
        description: 'Porque siempre estoy contando los días para poder volver a verte.',
    },
    { id: 'r:61', description: 'Porque escuchar tu voz de nuevo me da mil años de vida.' },
    { id: 'r:62', description: 'Porque puedo perderme en tu mirada tan fácilmente.' },
    { id: 'r:63', description: 'Porque puedo quedar hipnotizado viendo tus labios solamente.' },
    { id: 'r:64', description: 'Porque quedo sedado con el aroma de tu cabello.' },
    { id: 'r:65', description: 'Por todas las fotos tuyas que siempre me mandas.' },
    { id: 'r:66', description: 'Porque tu mente es tan atractiva como tu físico.' },
    { id: 'r:67', description: 'Porque hasta tus manías me parecen interesantes.' },
    {
        id: 'r:68',
        description:
            'Porque tu mente es un laberinto en el que quisiera perderme y no salir nunca.',
    },
    {
        id: 'r:69',
        description:
            'Por todas esas veces que me he descubierto a mí mismo pensando en ti sin darme cuenta.',
    },
    { id: 'r:70', description: 'Por todos los suspiros que me provocas.' },
    {
        id: 'r:71',
        description: 'Porque eres la única persona con la que podría hablar de cualquier cosa.',
    },
    { id: 'r:72', description: 'Porque amo el caos de nuestras mentes juntas.' },
    {
        id: 'r:73',
        description: 'Porque incluso en los momentos más simples, sigues siendo extraordinaria.',
    },
    { id: 'r:74', description: 'Porque eres mi caos favorito.' },
    { id: 'r:75', description: 'Porque ya no quiero conocer a nadie más que no seas tú.' },
    {
        id: 'r:76',
        description:
            'Porque te elegiría una y mil veces. Y si no existieras, seguro te inventaría.',
    },
    { id: 'r:77', description: 'Porque simplemente no puedo explicar por qué me gustas tanto.' },
    { id: 'r:78', description: 'Porque eres tan hermosa.' },
    { id: 'r:79', description: 'Porque tu piel es tan perfecta.' },
    { id: 'r:80', description: 'Porque he memorizado cada uno de tus lunares.' },
    {
        id: 'r:81',
        description: 'Porque quisiera seguir explorando tu cuerpo en busca de más lunares.',
    },
    {
        id: 'r:82',
        description: 'Porque un pequeño roce con tu piel se siente como la mejor de las caricias.',
    },
    { id: 'r:83', description: 'Porque a veces cuando hablas sólo quisiera callarte con un beso.' },
    { id: 'r:84', description: 'Porque la sola idea de pensar en tus labios me enloquece tanto.' },
    {
        id: 'r:85',
        description: 'Porque quisiera tenerte en mis brazos ahora mismo y nunca poder soltarte.',
    },
    {
        id: 'r:86',
        description: 'Porque me gusta el calor que irradia tu cuerpo cuando estás tan cerca mío.',
    },
    {
        id: 'r:87',
        description:
            'Porque me gustaría poder conocer esa Krystel tierna, amorosa y coqueta de la que siempre me hablas.',
    },
    { id: 'r:88', description: 'Porque deseo tanto que te convirtieras en mi día a día.' },
    { id: 'r:89', description: 'Porque simplemente te deseo tanto.' },
    { id: 'r:90', description: 'Porque tú eres la mayor de mis pasiones.' },
    { id: 'r:91', description: 'Porque tienes un cuerpo tan increíble.' },
    { id: 'r:92', description: 'Porque extraño tanto el poder estar contigo.' },
    {
        id: 'r:93',
        description: 'Porque a veces sólo necesito tenerte desnuda en mis brazos una última vez.',
    },
    {
        id: 'r:94',
        description:
            'Porque contigo no solamente es sexo, es aire, es amor, son ganas de vivir, son ganas de detener el tiempo.',
    },
    {
        id: 'r:95',
        description: 'Porque si fuera el fin del mundo, sólo quisiera poder estar contigo.',
    },
    { id: 'r:96', description: 'Porque eres mi fortaleza y mi debilidad a la vez.' },
    {
        id: 'r:97',
        description:
            'Porque eres la única persona que podría hacerme escribir una lista de 100 razones.',
    },
    { id: 'r:98', description: 'Porque podrían ser mil razones más.' },
    {
        id: 'r:99',
        description: 'Porque a veces ni yo mismo puedo explicarme del por qué te amo tanto.',
    },
    {
        id: 'r:100',
        description: 'Porque sí, porque a veces ni siquiera hacen falta explicaciones.',
    },
];

export default function useReasonsLove() {
    const [reasons, setReasons] = useState([]);
    const channel = new BroadcastChannel('reasons:channel');

    const loadReasons = () => {
        setReasons(
            reasonsList.map(item => ({
                ...item,
                discovered: localStorage.getItem(`reasons:${item.id}`) === 'true',
            })),
        );
    };

    const discover = id => {
        const key = `reasons:${id}`;
        if (localStorage.getItem(key) !== 'true') {
            localStorage.setItem(key, 'true');
            loadReasons();
            channel.postMessage({ type: 'update' });
        }

        const res = reasonsList.find(reason => reason.id === id) || null;
        return res;
    };

    const clearReasons = () => {
        reasonsList.forEach(item => localStorage.removeItem(`reasons:${item.id}`));
        loadReasons();
        channel.postMessage({ type: 'update' });
    };

    const getStats = () => {
        const total = reasonsList.length;
        const discovered = reasons.filter(r => r.discovered).length;
        const remaining = total - discovered;
        const allDiscovered = remaining === 0;

        return { total, discovered, remaining, allDiscovered };
    };

    useEffect(() => {
        loadReasons();

        const handleMessage = event => {
            if (event.data.type === 'update') {
                loadReasons();
            }
        };

        channel.addEventListener('message', handleMessage);
        return () => channel.removeEventListener('message', handleMessage);
    }, []);

    return { reasons, discover, clearReasons, getStats };
}
