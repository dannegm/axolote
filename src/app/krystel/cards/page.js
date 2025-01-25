import Menu from '../components/menu';

export function generateMetadata() {
    return {
        title: 'Krystel - Cards',
    };
}

export default function Cards() {
    return (
        <>
            <Menu />
            <main className='w-full h-screen flex items-center justify-center'>
                <h1 className='font-pacifico text-2xl -mt-32'>Próximamente</h1>
            </main>
        </>
    );
}
