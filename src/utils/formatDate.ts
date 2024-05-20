export const formatDate = {
    getTomorrowYYYYMMDD(currentDate: Date) {
        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1,
            currentDate.getHours() + 8
        )
            .toISOString()
            .split("T")[0];
    },

    getTomorrow(currentDate: Date) {
        return new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 1
        );
    },

    getDaysLeft(timestamp: number) {
        return Math.floor((timestamp - new Date().getTime()) / 3600000 / 24);
    },
};
