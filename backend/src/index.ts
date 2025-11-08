import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import expenseRoutes from "./routes/expense";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/expenses", expenseRoutes);

// Health check route
app.get("/", (req, res) => {
    res.send("API is running ✅");
});

app.listen(5000, () => console.log("Server running on port 5000"));
