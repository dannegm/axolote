export const randomPick = (arr = []) => arr[Math.floor(Math.random() * arr.length)];
export const randomIndex = (arr = []) => Math.floor(Math.random() * arr.length);

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
