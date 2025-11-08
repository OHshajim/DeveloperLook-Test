import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";

interface BudgetSettingsProps {
    currentBudget: number;
    onSaveBudget: (budget: number) => void;
}

export function BudgetSettings({
    currentBudget,
    onSaveBudget,
}: BudgetSettingsProps) {
    const [open, setOpen] = useState(false);
    const [budget, setBudget] = useState(currentBudget.toString());

    const handleSave = () => {
        const budgetValue = parseFloat(budget);
        if (!isNaN(budgetValue) && budgetValue >= 0) {
            onSaveBudget(budgetValue);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Set Budget
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set Monthly Budget</DialogTitle>
                    <DialogDescription>
                        Set your monthly spending limit to track your expenses
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="budget">Monthly Budget ($)</label>
                        <Input
                            id="budget"
                            type="number"
                            min="0"
                            step="0.01"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            placeholder="Enter budget amount"
                        />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                        Save Budget
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
