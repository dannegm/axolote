export const isDeleted = item => {
    if (!item?.deleted_at) {
        return false;
    }

    return new Date(item?.deleted_at + 'z') < new Date();
};
