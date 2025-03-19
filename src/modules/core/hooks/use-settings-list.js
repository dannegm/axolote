import { useState, useEffect } from 'react';

export default function useSettingsList(defaultSettings) {
    const [settings, setSettings] = useState(() => {
        if (typeof window === 'undefined') return defaultSettings;
        const storedSettings = { ...defaultSettings };

        Object.keys(defaultSettings).forEach(key => {
            try {
                const storedValue = localStorage.getItem(key);
                if (storedValue !== null) storedSettings[key] = JSON.parse(storedValue);
            } catch {}
        });

        return storedSettings;
    });

    const update = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));

            const bc = new BroadcastChannel('settings');
            bc.postMessage({ key, value });
            bc.close();

            setSettings(prev => ({ ...prev, [key]: value }));
        } catch {}
    };

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const bc = new BroadcastChannel('settings');

        const handleStorageChange = event => {
            if (event.key && event.key in defaultSettings) {
                try {
                    setSettings(prev => ({
                        ...prev,
                        [event.key]: event.newValue
                            ? JSON.parse(event.newValue)
                            : defaultSettings[event.key],
                    }));
                } catch {}
            }
        };

        const handleBroadcast = event => {
            if (event.data.key in defaultSettings) {
                setSettings(prev => ({ ...prev, [event.data.key]: event.data.value }));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        bc.addEventListener('message', handleBroadcast);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            bc.removeEventListener('message', handleBroadcast);
            bc.close();
        };
    }, [defaultSettings]);

    return { settings, update };
}
