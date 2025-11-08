export interface Expense {
    _id?: string;
    title: string;
    category: string;
    amount: number;
    expense_date: string;
    deviceId?: string;
}
