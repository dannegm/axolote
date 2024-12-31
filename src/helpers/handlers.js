export const createCookieMemoryHandler = cookieStore => {
    const MEMORY_COOKIE_NAME = 'random_index_memory';

    return {
        getMemory: () => {
            const memory = cookieStore.get(MEMORY_COOKIE_NAME)?.value;
            return memory ? JSON.parse(memory) : [];
        },
        updateMemory: newMemory => {
            cookieStore.set(MEMORY_COOKIE_NAME, JSON.stringify(newMemory), {
                maxAge: 2592000, // 30 days
                httpOnly: false,
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
