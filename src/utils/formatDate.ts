export const formatDate = {
    toYyyyMmDd(date: Date) {
        return date.toISOString().split("T")[0];
    },

    getTomorrow(timestamp: number) {
        return new Date(timestamp + 86000 * 1000);
    },

    getDaysLeft(timestamp: number) {
        return Math.floor((timestamp - Date.now()) / 1000 / 86000);
    },
};
