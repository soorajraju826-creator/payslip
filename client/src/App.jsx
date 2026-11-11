import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { BadgeIndianRupee, FilePlus2, RefreshCw, ShieldCheck } from "lucide-react";
import api from "./api";
import PayslipForm from "./components/PayslipForm";
import PayslipPreview from "./components/PayslipPreview";
import PayslipList from "./components/PayslipList";

function App() {
  const [payslips, setPayslips] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);

  const fetchPayslips = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/payslips");
      setPayslips(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load previous payslips.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  const handleSave = async (data) => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await api.post("/payslips", data);

      setPreview(response.data.payslip);
      setMessage("Payslip generated and saved successfully.");

      await fetchPayslips();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save payslip.");
    } finally {
      setSaving(false);
    }
  };

  const createNewPayslip = () => {
    setPreview(null);
    setMessage("");
    setError("");
    setFormResetKey((key) => key + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectPayslip = async (payslip) => {
    try {
      const response = await api.get(`/payslips/${payslip._id}`);
      setPreview(response.data);
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("Unable to load selected payslip.");
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="logo" href="/">
            <span className="logo-icon">
              <BadgeIndianRupee size={22} />
            </span>
            <span>Pay<span>wise</span></span>
          </a>
          <div className="admin-label">
            <span className="status-dot" /> HR ADMIN PORTAL
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="page-heading">
          <div>
            <div className="overline">PAYROLL MANAGEMENT</div>
            <h1>Payslip Generator</h1>
            <p>Create, preview and download employee salary statements.</p>
          </div>
          <div className="secure-badge">
            <ShieldCheck size={16} /> Secure payroll workspace
          </div>
        </section>

        {error && <div className="alert error-alert">{error}</div>}
        {message && <div className="alert success-alert">{message}</div>}

        <div className="workspace-grid">
          <div className="form-column">
            <div className="form-heading-row">
              <div className="card-title">
                <FilePlus2 size={19} />
                <h2>Create New Payslip</h2>
              </div>

              <button
                type="button"
                className="button secondary"
                onClick={createNewPayslip}
              >
                + New Payslip
              </button>
            </div>

            <PayslipForm
              key={formResetKey}
              onPreview={setPreview}
              onSave={handleSave}
              saving={saving}
            />
          </div>

          <div className="preview-column">
            <div className="card-title">
              <RefreshCw size={18} />
              <h2>Payslip Preview</h2>
            </div>

            <PayslipPreview payslip={preview} />
          </div>
        </div>

        <PayslipList
          payslips={payslips}
          loading={loading}
          onSelect={selectPayslip}
        />

        <footer>
          Paywise Payroll <span>•</span> Employee Salary Management
        </footer>
      </main>
    </div>
  );
}

export default App;