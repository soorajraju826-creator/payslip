import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import payslipRoutes from "./routes/payslipRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Payslip Generator API is running." });
});

app.use("/api/payslips", payslipRoutes);

// Central error handler
app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid payslip ID." });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  res.status(500).json({ message: "Internal server error." });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();