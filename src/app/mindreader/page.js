import MindReader from './mind-reader';

export function generateMetadata() {
    return {
        title: 'Mind Reader',
    };
}

export default function Posts() {
    return (
        <main className='w-full min-h-screen pb-8 bg-gray-100'>
            <MindReader />
        </main>
    );
}
