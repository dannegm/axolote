import PostEditorHandler from '../posts/post-editor-handler';
import ImageEditor from '../posts/image-editor';

import Frame from './frame';

export default function PostImage({ q }) {
    return (
        <Frame className='-my-4'>
            <h2 className='text-lg mb-4 text-center mx-auto'>{q}</h2>
            <PostEditorHandler type='image' defaultContext={q}>
                {({ content, setContent }) => (
                    <ImageEditor
                        content={content}
                        setContent={setContent}
                        props={{
                            className: 'w-[260px] h-[180px] -mx-6',
                            classNames: {
                                imageContainer: 'inset-0 translate-x-0 min-w-full',
                                inputDescription: 'bg-white/60 focus:bg-white/90',
                                pickerButton:
                                    '[&_svg]:size-4 px-3 py-2 flex-none w-[160px] mx-auto',
                            },
                            minRows: 2,
                            maxRows: 3,
                        }}
                    />
                )}
            </PostEditorHandler>
        </Frame>
    );
}
