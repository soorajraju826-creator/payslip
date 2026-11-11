import * as React from "react";
import { useState } from "react";
import { Calculator, UserRound, Wallet } from "lucide-react";

const initialForm = {
  name: "",
  empId: "",
  designation: "",
  basicSalary: "",
  hra: "",
  deductions: "",
  month: new Date().toLocaleString("en-US", { month: "long" }),
  year: new Date().getFullYear()
};

function PayslipForm({ onPreview, onSave, saving }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const netSalary =
    Number(form.basicSalary || 0) +
    Number(form.hra || 0) -
    Number(form.deductions || 0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (netSalary < 0) {
      setError("Deductions cannot exceed total earnings.");
      return;
    }

    const requiredFields = [
      "name",
      "empId",
      "designation",
      "basicSalary",
      "hra",
      "deductions",
      "month",
      "year"
    ];

    if (requiredFields.some((field) => form[field] === "")) {
      setError("Please complete all fields.");
      return;
    }

    const data = {
      ...form,
      basicSalary: Number(form.basicSalary),
      hra: Number(form.hra),
      deductions: Number(form.deductions),
      year: Number(form.year),
      netSalary
    };

    onPreview(data);
    await onSave(data);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div className="heading-icon">
          <UserRound size={18} />
        </div>
        <div>
          <h2>Employee Information</h2>
          <p>Enter employee details.</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Employee Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Employee name"
            required
          />
        </label>

        <label>
          Employee ID
          <input
            name="empId"
            value={form.empId}
            onChange={handleChange}
            placeholder="EMP-001"
            required
          />
        </label>

        <label className="full-width">
          Designation
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            placeholder="Software Developer"
            required
          />
        </label>
      </div>

      <div className="section-heading salary-heading">
        <div className="heading-icon green">
          <Wallet size={18} />
        </div>
        <div>
          <h2>Salary Details</h2>
          <p>Enter salary and deduction information.</p>
        </div>
      </div>

      <div className="form-grid">
        <label>
          Basic Salary (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            name="basicSalary"
            value={form.basicSalary}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          HRA (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            name="hra"
            value={form.hra}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Deductions (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            name="deductions"
            value={form.deductions}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Month
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
          >
            {[
              "January", "February", "March", "April",
              "May", "June", "July", "August",
              "September", "October", "November", "December"
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>

        <label>
          Year
          <input
            type="number"
            name="year"
            min="2000"
            max="2100"
            value={form.year}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="calculation-box">
        <div className="calculation-label">
          <Calculator size={16} />
          Estimated Net Salary
        </div>

        <strong>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
          }).format(netSalary)}
        </strong>

        <small>Basic Salary + HRA − Deductions</small>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button
          type="button"
          className="button secondary"
          onClick={() =>
            onPreview({
              ...form,
              basicSalary: Number(form.basicSalary || 0),
              hra: Number(form.hra || 0),
              deductions: Number(form.deductions || 0),
              year: Number(form.year),
              netSalary
            })
          }
        >
          Preview Payslip
        </button>

        <button
          type="submit"
          className="button primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Generate & Save Payslip"}
        </button>
      </div>
    </form>
  );
}

export default PayslipForm;