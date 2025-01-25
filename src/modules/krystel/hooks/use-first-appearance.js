import { useEffect, useState } from 'react';

export default function useFirstAppearance(id) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);

    useEffect(() => {
        const appearedItems = JSON.parse(localStorage.getItem('appearedItems')) || [];

        if (appearedItems.map(i => `${i}`).includes(`${id}`)) {
            setIsFirstAppearance(false);
        } else {
            appearedItems.push(`${id}`);
            localStorage.setItem('appearedItems', JSON.stringify(appearedItems));
            setIsFirstAppearance(true);
        }
    }, [id]);

    return isFirstAppearance;
}

export function useFirstAppearanceAnom(id) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(true);

    useEffect(() => {
        const appearedItems = JSON.parse(localStorage.getItem('appearedItems')) || [];

        if (appearedItems.map(i => `${i}`).includes(`${id}`)) {
            setIsFirstAppearance(false);
        }
    }, [id]);

    return isFirstAppearance;
}
