'use client';
import PostEditorHandler from '../posts/post-editor-handler';
import FeelingsEditor from '../posts/feelings-editor';

import Frame from './frame';

export default function PostMood({ q }) {
    return (
        <Frame className='-mx-4'>
            <h2 className='text-lg mb-4'>{q}</h2>
            <PostEditorHandler type='feeling' defaultContext={q}>
                {({ content, setContent }) => (
                    <FeelingsEditor
                        content={content}
                        setContent={setContent}
                        className='bg-white/40 p-2 rounded-2xl shadow-lg'
                        classNames={{
                            container: 'grid-cols-3!',
                        }}
                        props={{
                            feelingsCount: 5,
                        }}
                    />
                )}
            </PostEditorHandler>
        </Frame>
    );
}
