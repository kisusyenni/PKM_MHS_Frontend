function epoch(date) {
    return Date.parse(date);
}

const dateToday = new Date();
const timestamp = epoch(dateToday);

export const salesRefNumber = `SA/INV/${timestamp}`;
export const purchaseRefNumber = `PU/INV/${timestamp}`;
export const expenseRefNumber = timestamp;
export const stockOpnameNumber = `SOP/${timestamp}`;
