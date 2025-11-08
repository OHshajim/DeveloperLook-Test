import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
    deviceId: string;
    title: string;
    category: "Food" | "Transport" | "Utilities" | "Other";
    amount: number;
    expense_date: Date;
}

const ExpenseSchema: Schema = new Schema(
    {
        deviceId: { type: String, required: true },
        title: { type: String, required: true },
        category: {
            type: String,
            enum: ["Food", "Transport", "Utilities", "Other"],
            default: "Food",
        },
        amount: { type: Number, required: true },
        expense_date: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
