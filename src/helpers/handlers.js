export const createCookieMemoryHandler = cookieStore => {
    const MEMORY_COOKIE_NAME = 'random_index_memory';

    return {
        getMemory: () => {
            console.log('Cookie Store:', cookieStore);
            const memory = cookieStore.get(MEMORY_COOKIE_NAME);
            console.log('Handler Memory:', memory);
            return memory ? JSON.parse(memory) : [];
        },
        updateMemory: newMemory => {
            console.log('Update Memory:', newMemory);
            cookieStore.set(MEMORY_COOKIE_NAME, JSON.stringify(newMemory), {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                httpOnly: false,
                priority: 'high',
            });
        },
    };
};

export const createLocalStorageMemoryHandler = () => {
    const MEMORY_KEY = 'random_index_memory';
    return {
        getMemory: () => {
            const memory = localStorage.getItem(MEMORY_KEY);
            return memory ? JSON.parse(memory) : [];
        },
        updateMemory: newMemory => {
            localStorage.setItem(MEMORY_KEY, JSON.stringify(newMemory));
        },
    };
};

export const createSimpleMemoryHandler = () => {
    let memory = [];

    return {
        getMemory: () => {
            return memory;
        },
        updateMemory: newMemory => {
            memory = newMemory;
        },
    };
};
