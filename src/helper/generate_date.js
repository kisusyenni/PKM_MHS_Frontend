export function getToday() {
    const date = new Date();
    return date.toJSON().slice(0, 10);
}

export function getLaterMonths(month) {
    const date = new Date();
    date.setMonth(date.getMonth() + month);
    return date.toJSON().slice(0, 10);
}

export function getPriorMonths(month) {
    const date = new Date();
    date.setMonth(date.getMonth() - month);
    return date.toJSON().slice(0, 10);
}

export function getPriorYears(year) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - year);
    return date.toJSON().slice(0, 10);
}
