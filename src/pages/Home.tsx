import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { ExpenseForm } from "../components/ExpenseForm";
import { toast } from "sonner";
import { createExpense, deleteExpenses, getExpenses, updateExpenses } from "../api/expenseApi";
import type { Expense } from "../types/expense";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseChart } from "../components/ExpenseChart";
import { SummaryCards } from "../components/SummaryCards";
import { ExpenseFilters } from "../components/ExpenseFilters";
import { BudgetSettings } from "../components/BudgetSettings";
import { BudgetProgress } from "../components/BudgetProgress";
import { getBudget, setBudget } from "../api/budget";

const Home = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | any>(null);
    const [budgetAmount, setBudgetAmount] = useState<number>(getBudget());
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (err) {
            toast.error("Failed to fetch expenses");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleEdit = (expense: Expense) => {
        setEditingExpense(expense);
        setFormOpen(true);
    };
    const handleDelete = async(id: string) => {
        await deleteExpenses(id);
        fetchExpenses();
        toast.success("Expense deleted successfully!");
    };

    const handleFormSubmit = async (data: Expense|any) => {
        try {
            if (editingExpense) {
                await updateExpenses(editingExpense._id ?? "", data);
                fetchExpenses();
                toast.success("Expense updated");
            } else {
                await createExpense(data);
                toast.success("Expense created");
            }
            setFormOpen(false);
            setEditingExpense(null);
            fetchExpenses();
        } catch (err) {
            toast.error("Failed to save expense");
        }
    };

    const filteredExpenses  = expenses.filter((expense) => {
        const categoryMatch =
            selectedCategory === "all" ||
            expense.category === selectedCategory;
        const monthMatch =
            selectedMonth === "all" ||
            new Date(expense.expense_date).getMonth() === parseInt(selectedMonth);
        return categoryMatch && monthMatch;
    });

    useEffect(() => {
        const amount = getBudget();
        setBudgetAmount(amount);
    }, [setBudget]);

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div>
                        <img
                            src="/logo.jpg"
                            alt="Logo"
                            loading="lazy"
                            className="h-24 w-full rounded-full"
                        />
                    </div>
                    <div className="gap-5 flex text-sm">
                        <Button onClick={() => setFormOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Add Expense
                        </Button>
                        <BudgetSettings
                            currentBudget={budgetAmount || 0}
                            onSaveBudget={(budget) =>
                                { setBudget(budget); 
                                    setBudgetAmount(budget);
                                }
                            }
                        />
                    </div>
                </div>
            </header>
            <main className="container mx-auto space-y-6 px-4 py-8">
                <SummaryCards expenses={filteredExpenses} />
                <BudgetProgress
                    totalSpent={filteredExpenses.reduce(
                        (sum, exp) => sum + exp.amount,
                        0
                    )}
                    budget={budgetAmount || 0}
                />
                <ExpenseFilters
                    selectedCategory={selectedCategory}
                    selectedMonth={selectedMonth}
                    onCategoryChange={setSelectedCategory}
                    onMonthChange={setSelectedMonth}
                />
                <div className="grid gap-6 lg:grid-cols-2">
                    <ExpenseChart expenses={filteredExpenses} />
                    <ExpenseList
                        expenses={filteredExpenses}
                        onEdit={handleEdit}
                        onDelete={(id) => handleDelete(id)}
                    />
                </div>
            </main>
            <ExpenseForm
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open);
                    if (!open) setEditingExpense(null);
                }}
                onSubmit={handleFormSubmit}
                initialData={
                    editingExpense
                        ? {
                              title: editingExpense.title,
                              category: editingExpense.category,
                              amount: editingExpense.amount.toString(),
                              expense_date: new Date(
                                  editingExpense.expense_date
                              ),
                          }
                        : undefined
                }
                isEditing={!!editingExpense}
            />
        </div>
    );
};

export default Home;
