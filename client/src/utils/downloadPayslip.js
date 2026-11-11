import { jsPDF } from "jspdf";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(Number(amount || 0));

export const downloadPayslip = (payslip) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFillColor(25, 45, 78);
  pdf.rect(0, 0, pageWidth, 42, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(22);
  pdf.text("PAYSLIP", 18, 20);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("Employee salary statement", 18, 29);
  pdf.text(`${payslip.month} ${payslip.year}`, pageWidth - 18, 24, { align: "right" });

  pdf.setTextColor(35, 45, 60);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("EMPLOYEE DETAILS", 18, 58);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  const details = [
    ["Employee Name", payslip.name],
    ["Employee ID", payslip.empId],
    ["Designation", payslip.designation]
  ];

  let y = 69;
  details.forEach(([label, value]) => {
    pdf.setTextColor(110, 120, 135);
    pdf.text(label, 18, y);
    pdf.setTextColor(35, 45, 60);
    pdf.text(String(value), 78, y);
    y += 10;
  });

  pdf.setDrawColor(220, 225, 232);
  pdf.line(18, 105, pageWidth - 18, 105);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("SALARY BREAKDOWN", 18, 119);

  const rows = [
    ["Basic Salary", formatCurrency(payslip.basicSalary)],
    ["House Rent Allowance (HRA)", formatCurrency(payslip.hra)],
    ["Deductions", `- ${formatCurrency(payslip.deductions)}`]
  ];

  y = 133;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  rows.forEach(([label, value], index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(246, 248, 251);
      pdf.rect(18, y - 7, pageWidth - 36, 13, "F");
    }
    pdf.setTextColor(65, 75, 90);
    pdf.text(label, 23, y + 1);
    pdf.text(value, pageWidth - 23, y + 1, { align: "right" });
    y += 15;
  });

  pdf.setFillColor(235, 244, 255);
  pdf.roundedRect(18, y + 3, pageWidth - 36, 25, 3, 3, "F");
  pdf.setTextColor(25, 75, 140);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("NET SALARY", 24, y + 19);
  pdf.setFontSize(15);
  pdf.text(formatCurrency(payslip.netSalary), pageWidth - 24, y + 19, { align: "right" });

  pdf.setTextColor(130, 140, 150);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.text("This is a computer-generated payslip.", pageWidth / 2, 275, { align: "center" });

  const safeName = String(payslip.name).trim().replace(/[^a-z0-9-_]/gi, "_");
  pdf.save(`Payslip_${safeName}_${payslip.month}_${payslip.year}.pdf`);
};
