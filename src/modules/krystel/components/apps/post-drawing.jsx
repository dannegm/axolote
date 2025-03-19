import PostEditorHandler from '../posts/post-editor-handler';
import DrawingEditor from '../posts/drawing-editor';

import Frame from './frame';

export default function PostDrawing({ q }) {
    return (
        <Frame className='flex flex-col justify-center gap-4 px-4 h-[432px] overflow-hidden'>
            <h1 className='font-pacifico text-2xl'>Krystel,</h1>
            <PostEditorHandler type='drawing' defaultContext={q}>
                {({ content, setContent, setSettings }) => (
                    <div className='flex flex-col gap-4 -mb-1'>
                        <h2 className='text-base line-clamp-2 leading-4'>{q}</h2>
                        <DrawingEditor
                            content={content}
                            setContent={setContent}
                            setSettings={setSettings}
                            props={{
                                className: 'flex-none h-[270px]',
                            }}
                        />
                    </div>
                )}
            </PostEditorHandler>
            <h3 className='font-pacifico text-base -mb-12'>Drawing time.</h3>
        </Frame>
    );
}
