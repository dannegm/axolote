export const randomIndex = (arr = []) => Math.floor(Math.random() * arr.length);
export const randomPick = (arr = []) => arr[Math.floor(Math.random() * arr.length)];

export const randomPickWithMemory = (arr = []) => {
    if (!arr.length) return null;

    let available = [...arr];
    let lastPicked = null;

    return () => {
        if (!available.length) {
            available = [...arr].filter(item => item !== lastPicked);
        }

        const index = Math.floor(Math.random() * available.length);
        lastPicked = available.splice(index, 1)[0];

        return lastPicked;
    };
};

export const pickFromIndex = (arr = [], index = 0) => {
    if (Number.isNaN(index)) {
        return randomPick(arr);
    }

    if (arr[index] === undefined) {
        return randomPick(arr);
    }

    return arr[index];
};

export const sequence = size => Array.from(Array(size), (_, index) => index);
