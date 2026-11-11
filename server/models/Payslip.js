import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true
    },
    empId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true
    },
    basicSalary: {
      type: Number,
      required: true,
      min: [0, "Basic salary cannot be negative"]
    },
    hra: {
      type: Number,
      required: true,
      min: [0, "HRA cannot be negative"]
    },
    deductions: {
      type: Number,
      required: true,
      min: [0, "Deductions cannot be negative"]
    },
    netSalary: {
      type: Number,
      required: true,
      min: 0
    },
    month: {
      type: String,
      required: [true, "Month is required"],
      trim: true
    },
    year: {
      type: Number,
      required: true,
      min: 2000
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payslip", payslipSchema);
