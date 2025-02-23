'use client';
import { useState } from 'react';

export default function PostEditorHandler({ children }) {
    const [content, setContent] = useState();

    const handleCreate = () => {
        alert(content);
    };

    return (
        <div>
            <div>{children({ content, setContent })}</div>
            <div>
                <button onClick={handleCreate}>Crear</button>
            </div>
        </div>
    );
}
