'use client';
import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { removeItemById, updateItemById } from '../helpers/arrays';
import useDebouncedCallback from '../hooks/use-debounced-callback';

const ToastHostContext = createContext();

export const useToast = () => {
    return useContext(ToastHostContext);
};

const ANIMATION_DURATION = 300;

export default function ToastProvider({ children }) {
    const [toastCollection, setToastCollection] = useState([]);

    const hideToast = id => {
        setToastCollection(collection => updateItemById(collection, id, 'hidden', true));

        setTimeout(() => {
            setToastCollection(collection => removeItemById(collection, id));
        }, ANIMATION_DURATION);
    };

    const showToast = useDebouncedCallback(
        ({
            content,
            onAccept = undefined,
            onCancel = undefined,
            duration = 3000,
            persist = false,
        }) => {
            const payload = {
                id: nanoid(),
                content,
                duration,
                persist,
                onAccept,
                onCancel,
                hidden: false,
            };

            setToastCollection(collection => [...collection, payload]);

            if (!persist) {
                setTimeout(() => {
                    hideToast(payload.id);
                }, duration);
            }
        },
        200,
    );

    const handleAccept = id => {
        const payload = toastCollection.find(t => t.id === id);
        payload?.onAccept?.();
        hideToast(id);
    };

    const handleCancel = id => {
        const payload = toastCollection.find(t => t.id === id);
        payload?.onCancel?.();
        hideToast(id);
    };

    return (
        <ToastHostContext.Provider
            value={{ toastCollection, handleAccept, handleCancel, showToast }}
        >
            {children}
        </ToastHostContext.Provider>
    );
}
