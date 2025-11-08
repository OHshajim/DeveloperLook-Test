import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "../components/ui/popover";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    category: z.enum(["Food", "Transport", "Utilities", "Other"]),
    amount: z.number().min(0.01, "Amount must be positive"),
    expense_date: z.date(),
});

type FormData = z.infer<typeof formSchema>;

interface ExpenseFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: FormData) => void;
    initialData?: FormData;
    isEditing?: boolean;
}

export function ExpenseForm({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    isEditing = false,
}: ExpenseFormProps) {
    const [date, setDate] = useState<Date>(
        initialData?.expense_date || new Date()
    );

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            category: initialData?.category ?? "Food",
            amount: initialData?.amount ?? 0,
            expense_date: initialData?.expense_date ?? new Date(),
        },
    });

    const submitHandler = (data: FormData) => {
        onSubmit({ ...data, expense_date: date });
        reset();
        onOpenChange(false);
    };
    useEffect(() => {
        if (isEditing) {
            reset({
                title: initialData?.title ?? "",
                category: initialData?.category ?? "Food",
                amount: initialData?.amount ?? 0,
                expense_date: initialData?.expense_date ?? new Date(),
            });
        } else {
            reset({
                title: "",
                category:"Food",
                amount:0,
                expense_date:new Date(),
            });
        }
    }, [initialData, reset, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
                <h2 className="text-lg font-bold mb-2">
                    {isEditing ? "Edit Expense" : "Add Expense"}
                </h2>

                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-4"
                >
                    {/* Title */}
                    <div>
                        <label className="block font-medium">Title</label>
                        <Input
                            type="text"
                            {...register("title")}
                            className="border rounded p-2 w-full"
                            placeholder="e.g., Grocery shopping"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium">Category</label>
                        <Select
                            onValueChange={(val) =>
                                setValue(
                                    "category",
                                    val as FormData["category"]
                                )
                            }
                            defaultValue={initialData?.category ?? "Food"}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
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
                        {errors.category && (
                            <p className="text-red-500 text-sm">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block font-medium">Amount</label>
                        <Input
                            type="number"
                            step="0.01"
                            {...register("amount", { valueAsNumber: true })}
                            className="border rounded p-2 w-full"
                            placeholder="0.00"
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block font-medium">Date</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between"
                                >
                                    {date ? format(date, "PPP") : "Pick a date"}
                                    <CalendarIcon className="w-4 h-4 ml-2" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={d=>setDate(d)}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                    className="pointer-events-auto"
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {isEditing ? "Update" : "Add"} Expense
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
