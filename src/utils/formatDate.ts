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
};
