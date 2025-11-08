import express from "express";
import Expense from "../models/expense";

const router = express.Router();

// Middleware to get deviceId from header
const getDeviceId = (req: express.Request) => {
    const deviceId = req.header("X-Device-ID") || req.body.deviceId;
    if (!deviceId) throw new Error("Device ID is required");
    return deviceId;
};

// Create Expense
router.post("/", async (req, res) => {
    try {
        const deviceId = getDeviceId(req);
        const expense = await Expense.create({ ...req.body, deviceId });
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

// Get all Expenses for this device
router.get("/", async (req, res) => {
    try {
        const deviceId = getDeviceId(req);
        const expenses = await Expense.find({ deviceId }).sort({
            expense_date: -1,
        });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Update Expense (only if belongs to device)
router.put("/:id", async (req, res) => {
    try {
        const deviceId = getDeviceId(req);
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, deviceId },
            req.body,
            { new: true }
        );
        if (!expense)
            return res.status(404).json({ error: "Not found or unauthorized" });
        res.json(expense);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

// Delete Expense (only if belongs to device)
router.delete("/:id", async (req, res) => {
    try {
        const deviceId = getDeviceId(req);
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            deviceId,
        });
        if (!expense)
            return res.status(404).json({ error: "Not found or unauthorized" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
