import type { Expense } from "../types/expense";
import api from "./axios";

export const createExpense = async (expense: Expense) => {
    const response = await api.post("/expenses", expense);
    return response.data;
};

export const getExpenses = async () => {
    const response = await api.get("/expenses");
    return response.data;
};

export const updateExpenses = async (id:string, expense:Expense) => {
    const response = await api.put(`/expenses/${id}`,expense);
    return response.data;
};

export const deleteExpenses = async (id:string) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
};
