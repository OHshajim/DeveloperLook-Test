import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import type { Expense } from "../types/expense";

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

const categoryColors: Record<string, string> = {
    Food: "bg-orange-400 text-white",
    Transport: "bg-cyan-400 text-white",
    Utilities: "bg-emerald-400 text-white",
    Other: "bg-gray-400 text-white",
};

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
    if (expenses.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                </CardHeader>
                <CardContent className="flex h-[300px] items-center justify-center">
                    <p className="text-muted-foreground">
                        No expenses yet. Add your first expense!
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell className="font-medium">
                                    {format(
                                        new Date(expense.expense_date),
                                        "MMM dd, yyyy"
                                    )}
                                </TableCell>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            categoryColors[expense.category]
                                        }
                                    >
                                        {expense.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    ${expense.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => onEdit(expense)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => onDelete(expense._id|| "")}
                                        >
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
