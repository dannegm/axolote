import Menu from '../components/menu';

export function generateMetadata() {
    return {
        title: 'Krystel - Posts',
    };
}

export default function Posts() {
    return (
        <>
            <Menu />
            <main className='w-full h-screen flex items-center justify-center'>
            <h1 className='font-pacifico text-2xl -mt-32'>Próximamente</h1>
            </main>
        </>
    );
}
