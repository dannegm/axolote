'use client';
import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

const ToastHostContext = createContext();

export const useToast = () => {
    return useContext(ToastHostContext);
};

export default function ToastProvider({ children }) {
    const [toastCollection, setToastCollection] = useState([]);

    const showToast = ({ content, onAccept, onCancel }) => {
        const payload = {
            id: nanoid(),
            content,
            onAccept,
            onCancel,
        };

        setToastCollection(collection => [...collection, payload]);
    };

    const handleAccept = id => {
        const payload = toastCollection.find(t => t.id === id);
        payload?.onAccept?.();

        setToastCollection(collection => {
            const newCollection = collection.filter(t => t.id !== id);
            return newCollection;
        });
    };

    const handleCancel = id => {
        const payload = toastCollection.find(t => t.id === id);
        payload?.onCancel?.();

        setToastCollection(collection => {
            const newCollection = collection.filter(t => t.id !== id);
            return newCollection;
        });
    };

    return (
        <ToastHostContext.Provider
            value={{ toastCollection, handleAccept, handleCancel, showToast }}
        >
            {children}
        </ToastHostContext.Provider>
    );
}
