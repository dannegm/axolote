export const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];
export const randomIndex = arr => Math.floor(Math.random() * arr.length);

export const pickFromIndex = (arr, index) => {
    if (Number.isNaN(index)) {
        return randomPick(arr);
    }

    if (arr[index] === undefined) {
        return randomPick(arr);
    }

    return arr[index];
};
