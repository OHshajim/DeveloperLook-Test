import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Legend,
    Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface Expense {
    category: string;
    amount: number;
}

interface ExpenseChartProps {
    expenses: Expense[];
}

const COLORS = {
    Food: "var(--color-orange-400)",
    Transport: "var(--color-cyan-400)",
    Utilities: "var(--color-emerald-400)",
    Other: "var(--color-gray-400)",
};

export function ExpenseChart({ expenses }: ExpenseChartProps) {
    const categoryTotals = expenses.reduce((acc, expense) => {
        const existing = acc.find((item) => item.category === expense.category);
        if (existing) {
            existing.amount += expense.amount;
        } else {
            acc.push({ category: expense.category, amount: expense.amount });
        }
        return acc;
    }, [] as { category: string; amount: number }[]);

    const chartData = categoryTotals.map((item) => ({
        name: item.category,
        value: item.amount,
    }));

    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent className="flex h-[300px] items-center justify-center">
                    <p className="text-muted-foreground">
                        No expenses to display
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} ${(percent as number * 100).toFixed(0)}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        COLORS[
                                            entry.name as keyof typeof COLORS
                                        ]
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) =>
                                `$${value.toFixed(2)}`
                            }
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
