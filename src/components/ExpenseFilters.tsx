import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";

interface ExpenseFiltersProps {
    selectedCategory: string;
    selectedMonth: string;
    onCategoryChange: (category: string) => void;
    onMonthChange: (month: string) => void;
}

export function ExpenseFilters({
    selectedCategory,
    selectedMonth,
    onCategoryChange,
    onMonthChange,
}: ExpenseFiltersProps) {
    const months = [
        { value: "all", label: "All Months" },
        { value: "0", label: "January" },
        { value: "1", label: "February" },
        { value: "2", label: "March" },
        { value: "3", label: "April" },
        { value: "4", label: "May" },
        { value: "5", label: "June" },
        { value: "6", label: "July" },
        { value: "7", label: "August" },
        { value: "8", label: "September" },
        { value: "9", label: "October" },
        { value: "10", label: "November" },
        { value: "11", label: "December" },
    ];

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium">
                            Filter by Category
                        </label>
                        <Select
                            value={selectedCategory}
                            onValueChange={onCategoryChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                <SelectItem value="Food">Food</SelectItem>
                                <SelectItem value="Transport">
                                    Transport
                                </SelectItem>
                                <SelectItem value="Utilities">
                                    Utilities
                                </SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium">
                            Filter by Month
                        </label>
                        <Select
                            value={selectedMonth}
                            onValueChange={onMonthChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Months" />
                            </SelectTrigger>
                            <SelectContent>
                                {months.map((month) => (
                                    <SelectItem
                                        key={month.value}
                                        value={month.value}
                                    >
                                        {month.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
