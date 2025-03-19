import PostEditorHandler from '../posts/post-editor-handler';
import SimpleEditor from '../posts/simple-editor';
import Frame from './frame';

export default function PostSimple({ q, _p }) {
    return (
        <Frame className='-mx-4'>
            <h2 className='text-lg mb-4'>{q}</h2>
            <PostEditorHandler type='post' defaultContext={q}>
                {({ content, setContent }) => (
                    <SimpleEditor
                        content={content}
                        setContent={setContent}
                        props={{
                            placeholder: _p,
                            className: 'bg-white/90',
                            maxRows: 6,
                        }}
                    />
                )}
            </PostEditorHandler>
        </Frame>
    );
}
