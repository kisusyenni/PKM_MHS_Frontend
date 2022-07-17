export function getToday() {
    const date = new Date();
    return date.toJSON().slice(0, 10);
}

export function getLaterDays(day) {
    const date = new Date();
    date.setDate(date.getDate() + day);
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

export function localeDate(date) {
    const convertedDate = new Date(date);
    return Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(convertedDate);
}
