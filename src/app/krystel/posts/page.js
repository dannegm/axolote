import Menu from '../components/menu';

export function generateMetadata() {
    return {
        title: 'Krystel - Posts',
    };
}

export default function Posts() {
    return (
        <main>
            <Menu />
            <h1>Posts</h1>
        </main>
    );
}
