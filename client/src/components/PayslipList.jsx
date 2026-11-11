import * as React from "react";
import { Download, FileText } from "lucide-react";
import { downloadPayslip } from "../utils/downloadPayslip";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(Number(value || 0));

function PayslipList({ payslips = [], loading, onSelect }) {
  return (
    <section className="history-card">
      <h2>Previous Payslips</h2>
      <p>Previously generated employee payslips.</p>

      {loading ? (
        <p>Loading payslips...</p>
      ) : payslips.length === 0 ? (
        <p>No previous payslips found.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Designation</th>
                <th>Month</th>
                <th>Net Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {payslips.map((payslip) => (
                <tr key={payslip._id}>
                  <td>{payslip.name || payslip.employeeName || "N/A"}</td>
                  <td>{payslip.empId || payslip.employeeId || "N/A"}</td>
                  <td>{payslip.designation || "N/A"}</td>
                  <td>{payslip.month} {payslip.year}</td>
                  <td>{money(payslip.netSalary)}</td>
                  <td>
                    <button onClick={() => onSelect(payslip)}>
                      View
                    </button>

                    <button onClick={() => downloadPayslip(payslip)}>
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PayslipList;