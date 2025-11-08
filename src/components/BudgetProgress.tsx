import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface BudgetProgressProps {
    totalSpent: number;
    budget: number;
}

export function BudgetProgress({ totalSpent, budget }: BudgetProgressProps) {
    const percentage = budget > 0 ? (totalSpent / budget) * 100 : 0;
    const isOverBudget = totalSpent > budget;
    const remaining = budget - totalSpent;

    return (
        <Card className={isOverBudget ? "border-destructive" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    Monthly Budget
                </CardTitle>
                {isOverBudget ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                ) : (
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Spent</span>
                        <span className="font-bold">
                            ${totalSpent.toFixed(2)}
                        </span>
                    </div>
                    <Progress
                        value={Math.min(percentage, 100)}
                        className={isOverBudget ? "[&>div]:bg-destructive" : ""}
                    />
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-medium">
                            ${budget.toFixed(2)}
                        </span>
                    </div>
                </div>
                {budget > 0 && (
                    <div
                        className={`text-center ${
                            isOverBudget
                                ? "text-destructive"
                                : "text-muted-foreground"
                        }`}
                    >
                        {isOverBudget ? (
                            <p className="text-sm font-medium">
                                Over budget by ${Math.abs(remaining).toFixed(2)}
                            </p>
                        ) : (
                            <p className="text-sm">
                                ${remaining.toFixed(2)} remaining (
                                {(100 - percentage).toFixed(1)}%)
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
