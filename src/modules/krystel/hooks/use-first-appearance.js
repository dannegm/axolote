import { useEffect, useState } from 'react';

export default function useFirstAppearance(id) {
    const [isFirstAppearance, setIsFirstAppearance] = useState(false);

    useEffect(() => {
        const appearedItems = JSON.parse(localStorage.getItem('appearedItems')) || [];

        if (appearedItems.includes(id)) {
            setIsFirstAppearance(false);
        } else {
            appearedItems.push(id);
            localStorage.setItem('appearedItems', JSON.stringify(appearedItems));
            setIsFirstAppearance(true);
        }
    }, [id]);

    return isFirstAppearance;
}
