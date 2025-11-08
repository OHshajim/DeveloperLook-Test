import { DollarSign, Receipt, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import type { Expense } from "../types/expense";

interface SummaryCardsProps {
    expenses: Expense[];
}

export function SummaryCards({ expenses }: SummaryCardsProps) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const expenseCount = expenses.length;

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).sort(
        ([, a], [, b]) => b - a
    )[0];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Expenses
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${totalExpenses.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Across all categories
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Entries
                    </CardTitle>
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{expenseCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Expense records
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Top Category
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {topCategory ? topCategory[0] : "N/A"}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {topCategory
                            ? `$${topCategory[1].toFixed(2)}`
                            : "No expenses yet"}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
