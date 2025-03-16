'use client';
import { useState, useEffect } from 'react';

const reasonsList = [
    { id: 'r:1', description: 'Porque cuando está cerca, todo se siente más fácil.' },
    { id: 'r:2', description: 'Porque su risa tiene el efecto de un buen café en la mañana.' },
    { id: 'r:3', description: 'Porque cuando habla, realmente quiero escucharla.' },
    { id: 'r:4', description: 'Porque aunque no diga nada, su presencia llena el espacio.' },
    { id: 'r:5', description: 'Porque con ella no necesito fingir ser alguien más.' },
    { id: 'r:6', description: 'Porque su existencia hace que los días sean menos grises.' },
    { id: 'r:7', description: 'Porque simplemente verla me cambia el humor.' },
    { id: 'r:8', description: 'Porque es alguien que no se encuentra dos veces en la vida.' },
    { id: 'r:9', description: 'Porque su forma de ver el mundo me hace querer verlo igual.' },
    { id: 'r:10', description: 'Porque a su lado, hasta los silencios son cómodos.' },
    { id: 'r:11', description: 'Porque me hace querer ser mejor.' },
    { id: 'r:12', description: 'Porque cuando la miro, a veces me falta el aire.' },
    { id: 'r:13', description: 'Porque me ha demostrado que la conexión real existe.' },
    { id: 'r:14', description: 'Porque aunque no esté cerca, de alguna forma sigue presente.' },
    { id: 'r:15', description: 'Porque suena cursi, pero su esencia es un imán para mí.' },
    { id: 'r:16', description: 'Porque sabe cómo hablarme y cuándo callar.' },
    { id: 'r:17', description: 'Porque me deja verla tal y como es, sin máscaras.' },
    {
        id: 'r:18',
        description: 'Porque sus defectos no opacan sus virtudes, las hacen más reales.',
    },
    { id: 'r:19', description: 'Porque en mis recuerdos más felices, ella está ahí.' },
    {
        id: 'r:20',
        description: 'Porque cuando pienso en el futuro, inevitablemente la imagino en él.',
    },
    { id: 'r:21', description: 'Porque su voz es un refugio.' },
    { id: 'r:22', description: 'Porque cuando sonríe de verdad, el mundo se pausa un segundo.' },
    { id: 'r:23', description: 'Porque sus ojos dicen más de lo que ella misma se permite decir.' },
    { id: 'r:24', description: 'Porque hasta en sus enojos tiene un encanto que no entiendo.' },
    {
        id: 'r:25',
        description: 'Porque me gusta cómo se mueve, como si cada paso tuviera intención.',
    },
    { id: 'r:26', description: 'Porque su inteligencia es tan atractiva como su sonrisa.' },
    {
        id: 'r:27',
        description: 'Porque cuando me reta, me dan más ganas de ganar… o de perder ante ella.',
    },
    { id: 'r:28', description: 'Porque hasta sus manías me parecen interesantes.' },
    { id: 'r:29', description: 'Porque me descubro a mí mismo pensando en ella sin darme cuenta.' },
    { id: 'r:30', description: 'Porque es la única persona con la que nunca me canso de hablar.' },
    { id: 'r:31', description: 'Porque no se deja vencer fácil.' },
    { id: 'r:32', description: 'Porque su mente es un laberinto en el que me perdería con gusto.' },
    { id: 'r:33', description: 'Porque no cualquiera tiene la fuerza que ella tiene.' },
    { id: 'r:34', description: 'Porque si algo se propone, tarde o temprano lo consigue.' },
    {
        id: 'r:35',
        description: 'Porque su forma de pensar me hace cuestionar mis propias creencias.',
    },
    {
        id: 'r:36',
        description: 'Porque no se conforma con lo que la vida le da, siempre quiere más.',
    },
    {
        id: 'r:37',
        description: 'Porque me demuestra que se puede ser fuerte sin perder la ternura.',
    },
    { id: 'r:38', description: 'Porque sabe lo que vale y no deja que nadie la haga dudarlo.' },
    {
        id: 'r:39',
        description: 'Porque tiene un carácter que se respeta, pero no impone con miedo.',
    },
    { id: 'r:40', description: 'Porque no necesita atención, pero cuando la tiene, la aprovecha.' },
    { id: 'r:41', description: 'Porque su piel debe sentirse como la mejor de las caricias.' },
    {
        id: 'r:42',
        description: 'Porque hay algo en su manera de mirarme que despierta todo en mí.',
    },
    { id: 'r:43', description: 'Porque cuando está cerca, la distancia es una tortura.' },
    { id: 'r:44', description: 'Porque sus labios parecen tener todas las respuestas.' },
    {
        id: 'r:45',
        description: 'Porque su presencia tiene el poder de hacerme olvidar cualquier otra cosa.',
    },
    {
        id: 'r:46',
        description: 'Porque cuando me toca, aunque sea por accidente, se queda el recuerdo.',
    },
    {
        id: 'r:47',
        description: 'Porque la idea de tenerla entre mis brazos es demasiado perfecta.',
    },
    { id: 'r:48', description: 'Porque a veces la deseo incluso cuando no está presente.' },
    {
        id: 'r:49',
        description: 'Porque cuando habla, hay momentos en que solo quiero callarla con un beso.',
    },
    {
        id: 'r:50',
        description: 'Porque nunca había sentido algo tan físico y tan emocional a la vez.',
    },
    { id: 'r:51', description: 'Porque sin ella, algo me falta.' },
    {
        id: 'r:52',
        description: 'Porque es la única persona con la que puedo hablar de cualquier cosa.',
    },
    { id: 'r:53', description: 'Porque su ausencia pesa más de lo que quiero admitir.' },
    { id: 'r:54', description: 'Porque cuando tengo un mal día, su voz lo mejora todo.' },
    { id: 'r:55', description: 'Porque me hace sentir entendido sin siquiera intentarlo.' },
    { id: 'r:56', description: 'Porque sin ella, mi mundo sería un poco más aburrido.' },
    { id: 'r:57', description: 'Porque la vida sin alguien como ella no tiene el mismo brillo.' },
    { id: 'r:58', description: 'Porque es mi equilibrio, incluso cuando no lo sabe.' },
    {
        id: 'r:59',
        description: 'Porque cuando estoy con ella, todo lo demás parece importar menos.',
    },
    { id: 'r:60', description: 'Porque es una de las pocas personas que realmente me importan.' },
    { id: 'r:61', description: 'Porque con ella los días malos se vuelven soportables.' },
    { id: 'r:62', description: 'Porque cuando se ríe de verdad, no hay mejor sonido.' },
    { id: 'r:63', description: 'Porque me gusta sorprenderla y verla reaccionar.' },
    {
        id: 'r:64',
        description: 'Porque me hace sentir que, aunque el mundo sea un desastre, todo está bien.',
    },
    {
        id: 'r:65',
        description: 'Porque su presencia es como una canción favorita que nunca cansa.',
    },
    { id: 'r:66', description: 'Porque hablar con ella es una de mis cosas favoritas en la vida.' },
    { id: 'r:67', description: 'Porque cuando se divierte, parece una niña otra vez.' },
    { id: 'r:68', description: 'Porque en sus ojos siempre hay una chispa de algo especial.' },
    { id: 'r:69', description: 'Porque su felicidad, de alguna forma, se vuelve mía también.' },
    { id: 'r:70', description: 'Porque no hay nadie como ella.' },
    { id: 'r:71', description: 'Porque su esencia no se puede replicar.' },
    {
        id: 'r:72',
        description: 'Porque no hay otra persona que me haga sentir lo que ella me hace sentir.',
    },
    { id: 'r:73', description: 'Porque me ha cambiado de maneras que ni ella sabe.' },
    { id: 'r:74', description: 'Porque es de esas personas que solo aparecen una vez en la vida.' },
    { id: 'r:75', description: 'Porque tiene algo que nadie más tiene.' },
    { id: 'r:76', description: 'Porque aunque intente explicarlo, no hay suficientes palabras.' },
    {
        id: 'r:77',
        description: 'Porque incluso en sus momentos más simples, sigue siendo extraordinaria.',
    },
    { id: 'r:78', description: 'Porque es un misterio que nunca quiero dejar de descubrir.' },
    { id: 'r:79', description: 'Porque su mera existencia es un regalo.' },
    {
        id: 'r:80',
        description:
            'Porque si tuviera que elegir a alguien para quedarme en cualquier escenario de la vida, sería ella.',
    },
    { id: 'r:81', description: 'Porque no hay un solo día en que no piense en ella.' },
    { id: 'r:82', description: 'Porque cada vez que la veo, es como si la viera por primera vez.' },
    { id: 'r:83', description: 'Porque cuando me habla, el mundo se reduce a su voz.' },
    { id: 'r:84', description: 'Porque la quiero sin razón y con todas las razones a la vez.' },
    { id: 'r:85', description: 'Porque su nombre resuena en mi mente más de lo que debería.' },
    { id: 'r:86', description: 'Porque su forma de ser es un imán para mi corazón.' },
    { id: 'r:87', description: 'Porque no importa cuántas veces la vea, siempre quiero más.' },
    {
        id: 'r:88',
        description: 'Porque a veces ni entiendo por qué me gusta tanto, pero me gusta.',
    },
    {
        id: 'r:89',
        description:
            'Porque su existencia es una prueba de que la belleza y la inteligencia pueden ir de la mano.',
    },
    { id: 'r:90', description: 'Porque es lo más cercano a la perfección que conozco.' },
    { id: 'r:91', description: 'Porque ningún otro nombre suena igual.' },
    { id: 'r:92', description: 'Porque ningún otro rostro me deja sin palabras como el suyo.' },
    { id: 'r:93', description: 'Porque su energía es única.' },
    { id: 'r:94', description: 'Porque no quiero conocer a nadie más que pueda reemplazarla.' },
    {
        id: 'r:95',
        description: 'Porque incluso con todos sus defectos, sigue siendo perfecta para mí.',
    },
    {
        id: 'r:96',
        description:
            'Porque es la única persona que podría hacerme escribir una lista de 100 razones.',
    },
    { id: 'r:97', description: 'Porque me hace sentir vivo.' },
    { id: 'r:98', description: 'Porque es mi caos favorito.' },
    { id: 'r:99', description: 'Porque si tuviera que empezar de cero, la volvería a elegir.' },
    { id: 'r:100', description: 'Porque sí' },
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
