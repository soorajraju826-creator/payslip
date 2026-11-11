import * as React from "react";

import {
  Download,
  FileText
} from "lucide-react";

import { downloadPayslip } from "../utils/downloadPayslip";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(Number(value || 0));

function PayslipPreview({ payslip }) {

  if (!payslip) {
    return (
      <div className="preview-card empty-preview">

        <div className="empty-icon">
          <FileText size={25} />
        </div>

        <h3>Your payslip preview</h3>

        <p>
          Fill in the employee and salary details,
          then select Preview payslip.
        </p>

      </div>
    );
  }

  return (
    <div className="preview-card">

      <div className="preview-top">

        <div className="preview-brand">

          <div className="brand-mark">
            P
          </div>

          <div>
            <strong>PAYROLL</strong>
            <span>EMPLOYEE STATEMENT</span>
          </div>

        </div>

        <span className="preview-tag">
          PAYSLIP
        </span>

      </div>

      <div className="preview-period">
        <span>PAY PERIOD</span>

        <strong>
          {payslip.month || "—"} {payslip.year || ""}
        </strong>
      </div>

      <div className="preview-employee">

        <span className="eyebrow">
          EMPLOYEE DETAILS
        </span>

        <h3>
          {payslip.name || "Employee name"}
        </h3>

        <div className="employee-meta">
          <span>
            ID: {payslip.empId || "—"}
          </span>

          <span>
            {payslip.designation || "Designation"}
          </span>
        </div>

      </div>

      <div className="preview-breakdown">

        <span className="eyebrow">
          SALARY BREAKDOWN
        </span>

        <div className="breakdown-row">
          <span>Basic salary</span>
          <strong>{money(payslip.basicSalary)}</strong>
        </div>

        <div className="breakdown-row">
          <span>House rent allowance (HRA)</span>
          <strong>{money(payslip.hra)}</strong>
        </div>

        <div className="breakdown-row deduction">
          <span>Deductions</span>
          <strong>
            − {money(payslip.deductions)}
          </strong>
        </div>

      </div>

      <div className="net-total">

        <span>NET SALARY</span>

        <strong>
          {money(payslip.netSalary)}
        </strong>

      </div>

      <p className="preview-note">
        This is a computer-generated payslip.
      </p>

      <button
        className="button download-button"
        onClick={() => downloadPayslip(payslip)}
      >
        <Download size={17} />
        Download PDF
      </button>

    </div>
  );
}

export default PayslipPreview;