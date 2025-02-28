import { useQueryState, parseAsBoolean } from 'nuqs';
import RandomPicture from '@/modules/core/components/common/randim-picture';

import PostEditor from '@/modules/krystel/components/posts/post-editor';
import FancySeparator from '@/modules/krystel/components/common/fancy-separator';

import PostItem from './post-item';

const emptyPictures = [
    '/gifs/confused-travolta.gif',
    '/gifs/empty-book.gif',
    '/gifs/empty-sheet.gif',
    '/gifs/good-morning-jake.gif',
    '/gifs/lonely-milhouse.gif',
    '/gifs/tumbleweeds.gif',
];

export default function PostsList({ data = [] }) {
    const [uwu] = useQueryState('uwu', parseAsBoolean.withDefault(false));

    return (
        <main className='px-4 md:p-0 max-w-[640px] w-full md:w-3/4 lg:w-4/6 xl:w-1/2 mx-auto border-t-8 border-gray-300'>
            <div className='flex flex-col gap-2 text-center my-6'>
                {!uwu ? (
                    <h1 className='font-pacifico text-3xl text-center text-indigo-950'>Krystel,</h1>
                ) : (
                    <figure className='flex-center -mt-4 text-center'>
                        <img className='h-24' src='/krystel-uwu.png' alt='Krystel' />
                    </figure>
                )}
                <p className='font-noto text-center text-sm text-slate-500 mx-8'>
                    Si tienes algo que compartirme, este es el lugar adecuado.
                </p>
            </div>

            <div>
                <PostEditor />
            </div>

            <FancySeparator className='mt-10' />

            <div className='grid grid-flow-row pb-16'>
                {!data.length && (
                    <div className='flex flex-col flex-center gap-8 px-6 py-4'>
                        <h2 className='font-pacifico text-lg'>Aún no has publicado nada</h2>
                        <div className='px-10'>
                            <div className='flex-1 block mx-auto w-full sm:w-[400px]'>
                                <RandomPicture
                                    className='block w-[400px] rounded-2xl shadow-xs'
                                    pictures={emptyPictures}
                                />
                            </div>
                        </div>
                        <p className='font-noto text-center text-sm text-slate-800'>
                            Podrías intentar compartiendo cualquier cosa que tengas en mente, o
                            alguna foto divertida; podrías recomendarme alguna peli o una canción
                            :D.
                        </p>
                    </div>
                )}

                {Boolean(data.length) &&
                    data?.map(item => <PostItem key={`post-item-${item.id}`} item={item} />)}
            </div>
        </main>
    );
}
