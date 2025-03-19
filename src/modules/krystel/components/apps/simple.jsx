import Frame from './frame';

export default function Simple({ input = '--' }) {
    return (
        <Frame className='bg-white px-2 py-4 rounded-2xl shadow-md'>
            <h2>Hey</h2>
            <p>{input}</p>
        </Frame>
    );
}
