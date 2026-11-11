import express from "express";
import Payslip from "../models/Payslip.js";

const router = express.Router();

// GET all previously generated payslips
router.get("/", async (req, res, next) => {
  try {
    const payslips = await Payslip.find().sort({ createdAt: -1 });
    res.status(200).json(payslips);
  } catch (error) {
    next(error);
  }
});

// GET a single payslip by MongoDB ID
router.get("/:id", async (req, res, next) => {
  try {
    const payslip = await Payslip.findById(req.params.id);
    if (!payslip) {
      return res.status(404).json({ message: "Payslip not found" });
    }
    res.status(200).json(payslip);
  } catch (error) {
    next(error);
  }
});

// CREATE and store a payslip
router.post("/", async (req, res, next) => {
  try {
    const {
      name, empId, designation, basicSalary, hra,
      deductions, month, year
    } = req.body;

    if (
      !name?.trim() || !empId?.trim() || !designation?.trim() ||
      !month?.trim() || year === "" || year === undefined ||
      basicSalary === "" || basicSalary === undefined ||
      hra === "" || hra === undefined ||
      deductions === "" || deductions === undefined
    ) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const basic = Number(basicSalary);
    const houseRent = Number(hra);
    const deductionAmount = Number(deductions);
    const numericYear = Number(year);

    if (
      ![basic, houseRent, deductionAmount, numericYear].every(Number.isFinite) ||
      basic < 0 || houseRent < 0 || deductionAmount < 0 ||
      !Number.isInteger(numericYear) || numericYear < 2000
    ) {
      return res.status(400).json({ message: "Enter valid salary amounts and year." });
    }

    const netSalary = basic + houseRent - deductionAmount;
    if (netSalary < 0) {
      return res.status(400).json({ message: "Deductions cannot exceed basic salary plus HRA." });
    }

    const payslip = await Payslip.create({
      name: name.trim(),
      empId: empId.trim(),
      designation: designation.trim(),
      basicSalary: basic,
      hra: houseRent,
      deductions: deductionAmount,
      netSalary,
      month: month.trim(),
      year: numericYear
    });

    res.status(201).json({
      message: "Payslip created successfully.",
      payslip
    });
  } catch (error) {
    next(error);
  }
});

export default router;
