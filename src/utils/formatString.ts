export const splitByCapitalLetter = (str: string) => {
    return str
        .split(/(?=[A-Z])/)
        .map((subStr, i) => {
            if (i > 0) return subStr.toLowerCase();
            return subStr;
        })
        .join(" ");
};
