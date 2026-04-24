import { useState, useRef } from "react";
import logo from "./assets/logo.jpg";

const defaultForm = {
  employeeName: "Arun Kumar S",
  employeeAddress: "12, Gandhi Nagar, 2nd Street\nMadurai - 625020\nTamil Nadu",
  jobRole: "Software Developer",
  department: "Engineering",
  annualCTC: "360000",
  dateOfJoining: "2024-08-01",
  hrManagerName: "Priya Devi R",
  refNo: "JOD/527/07/2024",
  date: "2024-07-05",
  basic: "15000",
  hra: "6000",
  otherAllowances: "4000",
  employerPF: "5000",
};

const benefits = [
  "Performance Bonus",
  "Paid Leave",
  "Free Lunch/Snacks",
  "Health Insurance",
  "Accident Insurance",
  "Laptop/Work Device",
  "Festival Bonus",
  "Flexible Hours",
  "Training Programs",
];

function formatDate(dateStr) {
  if (!dateStr) return "mm/dd/yyyy";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function num(v) {
  return parseInt(v) || 0;
}

export default function OfferLetterGenerator() {
  const [form, setForm] = useState(defaultForm);
  const [activeTab, setActiveTab] = useState("form");
  const [printing, setPrinting] = useState(false);
  const previewRef = useRef(null);

  const monthly = {
    basic: num(form.basic),
    hra: num(form.hra),
    other: num(form.otherAllowances),
    pf: num(form.employerPF),
  };
  const totalMonthly = monthly.basic + monthly.hra + monthly.other + monthly.pf;
  const annual = {
    basic: monthly.basic * 12,
    hra: monthly.hra * 12,
    other: monthly.other * 12,
    pf: monthly.pf * 12,
    total: totalMonthly * 12,
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDownloadPDF() {
    setPrinting(true);
    // Give the browser more time to prepare the layout for printing
    await new Promise((r) => setTimeout(r, 500));
    window.print();
    setTimeout(() => setPrinting(false), 1000);
  }

  const inp =
    "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";
  const label = "block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Source Sans 3', sans-serif; background: #f1f5f9; }

        .app-shell { min-height: 100vh; display: flex; flex-direction: column; }

        .topbar {
          background: linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%);
          color: white;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .topbar-brand { display: flex; align-items: center; gap: 12px; }
        .topbar-logo {
          width: 44px; height: 44px; 
          object-fit: contain;
        }
        .topbar-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; }
        .topbar-sub { font-size: 11px; opacity: 0.7; margin-top: 2px; }
        .btn-download {
          background: #f59e0b; color: #1a1a1a; border: none; border-radius: 10px;
          padding: 10px 20px; font-weight: 700; font-size: 13px;
          cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: all 0.2s; white-space: nowrap;
          box-shadow: 0 2px 8px rgba(245,158,11,0.4);
        }
        .btn-download:hover { background: #d97706; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(245,158,11,0.5); }

        .tabs { display: flex; background: white; border-bottom: 2px solid #e2e8f0; }
        .tab {
          flex: 1; padding: 14px; text-align: center; font-weight: 600; font-size: 13px;
          cursor: pointer; color: #64748b; border-bottom: 3px solid transparent;
          transition: all 0.2s; margin-bottom: -2px;
        }
        .tab.active { color: #059669; border-bottom-color: #059669; background: #ecfdf5; }
        .tab:hover:not(.active) { color: #059669; background: #ecfdf5; }

        .main-content { display: flex; gap: 0; flex: 1; }

        /* FORM PANEL */
        .form-panel {
          width: 380px; min-width: 320px; background: white;
          border-right: 1px solid #e2e8f0;
          overflow-y: auto; padding: 24px;
          max-height: calc(100vh - 110px);
        }
        .form-section { margin-bottom: 24px; }
        .form-section-title {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; color: #059669; margin-bottom: 12px;
          padding-bottom: 6px; border-bottom: 2px solid #d1fae5;
        }
        .form-row { margin-bottom: 14px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* PREVIEW PANEL */
        .preview-panel {
          flex: 1; padding: 24px; overflow-y: auto;
          max-height: calc(100vh - 110px);
          background: #f1f5f9;
        }
        .preview-wrapper { max-width: 794px; margin: 0 auto; }

        /* LETTER DOCUMENT */
        .letter-doc {
          background: white;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 13px; line-height: 1.6;
          color: #1a1a1a;
          padding: 48px 56px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.12);
          min-height: 1100px;
          position: relative;
        }
        .letter-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 3px solid #064e3b;
          margin-bottom: 24px;
        }
        .letter-logo-box {
          width: 80px; height: 80px;
          object-fit: contain;
          flex-shrink: 0;
        }
        .letter-company-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px; font-weight: 700; color: #064e3b;
          margin: 0 0 4px 0;
        }
        .letter-company-sub { font-size: 11px; color: #64748b; }
        .letter-company-contact { font-size: 11px; color: #64748b; margin-top: 2px; }
        .accent-bar { height: 4px; background: linear-gradient(90deg, #064e3b, #059669, #10b981); margin-bottom: 24px; border-radius: 2px; }
        
        .meta-row { display: flex; justify-content: space-between; font-size: 12px; color: #475569; margin-bottom: 4px; }
        .letter-to { margin: 16px 0; font-size: 13px; }
        .letter-to-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; }
        .letter-to-name { font-weight: 700; color: #064e3b; font-size: 15px; }
        .letter-to-addr { color: #475569; white-space: pre-line; }
        .salutation { margin: 20px 0 12px; font-size: 14px; }
        .opening-para { color: #334155; line-height: 1.7; margin-bottom: 20px; }
        
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: 13px; font-weight: 700;
          color: #064e3b; margin: 20px 0 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .section-title::before {
          content: ''; width: 4px; height: 16px;
          background: linear-gradient(#064e3b, #10b981);
          border-radius: 2px; display: block;
        }
        .clause-text { color: #334155; line-height: 1.7; margin-bottom: 8px; font-size: 12.5px; }
        
        .salary-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12px; }
        .salary-table th {
          background: #064e3b; color: white;
          padding: 10px 14px; text-align: left; font-weight: 600;
          font-size: 11px; letter-spacing: 0.5px;
        }
        .salary-table td { padding: 9px 14px; border-bottom: 1px solid #f1f5f9; }
        .salary-table tr:nth-child(even) td { background: #f8faff; }
        .salary-table .total-row td { font-weight: 700; color: #064e3b; background: #d1fae5 !important; border-top: 2px solid #064e3b; }
        
        .bullet-list { list-style: none; padding: 0; margin: 8px 0; }
        .bullet-list li { padding: 3px 0 3px 20px; position: relative; color: #334155; font-size: 12.5px; }
        .bullet-list li::before { content: '•'; position: absolute; left: 0; color: #059669; font-weight: 900; }
        
        .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px 0; }
        .benefit-chip {
          background: #ecfdf5; border: 1px solid #6ee7b7;
          border-radius: 8px; padding: 8px 10px;
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; color: #065f46;
        }
        .benefit-chip span { color: #10b981; font-size: 14px; }
        
        .closing-para { color: #334155; line-height: 1.7; margin: 20px 0; }
        .signature-block { display: flex; justify-content: space-between; margin-top: 40px; gap: 40px; }
        .sig-box { flex: 1; }
        .sig-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 30px; }
        .sig-name { font-weight: 700; color: #064e3b; border-top: 1.5px solid #cbd5e1; padding-top: 8px; font-size: 13px; }
        .sig-role { font-size: 11px; color: #64748b; }
        
        .footer-bar {
          margin-top: 40px; padding-top: 16px;
          border-top: 2px solid #e2e8f0;
          text-align: center; color: #94a3b8; font-size: 10px;
        }

        .print-page-break {
          display: none;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .form-panel { width: 100%; min-width: unset; max-height: none; border-right: none; border-bottom: 1px solid #e2e8f0; display: none; }
          .form-panel.show { display: block; }
          .preview-panel { padding: 12px; max-height: none; }
          .letter-doc { padding: 24px 20px; font-size: 12px; min-height: unset; }
          .letter-company-name { font-size: 17px; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .signature-block { flex-direction: row; gap: 20px; font-size: 11px; }
          .sig-box { flex: 1; min-width: 0; }
          .main-content { flex-direction: column; }
          .preview-panel, .form-panel { max-height: unset; }
          .topbar { padding: 12px 16px; }
          .topbar-title { font-size: 15px; }
        }

        /* PRINT */
        @media print {
          body { background: white !important; }
          .topbar, .tabs, .form-panel, .preview-panel > *:not(.preview-wrapper) { display: none !important; }
          .app-shell { display: block; }
          .main-content, .preview-panel, .preview-wrapper, .letter-doc { 
            display: block !important; 
            visibility: visible !important;
            overflow: visible !important;
            max-height: none !important;
            height: auto !important;
          }
          .preview-panel { padding: 0; background: white; }
          .preview-wrapper { max-width: 100%; }
          .letter-doc { box-shadow: none; padding: 40px 56px; min-height: unset; }
          .benefits-grid { grid-template-columns: repeat(3, 1fr); }
          .print-page-break { display: block; page-break-before: always; }
          .signature-block { 
            display: flex !important; 
            flex-direction: row !important; 
            justify-content: space-between !important; 
            margin-top: 30px !important; 
            page-break-inside: avoid !important;
          }
          .sig-box { flex: 1 !important; }
          .footer-bar { margin-top: 20px !important; }
          @page { margin: 1cm; size: A4; }
        }
      `}</style>

      <div className="app-shell">
        {/* TOP BAR */}
        <div className="topbar">
          <div className="topbar-brand">
            <img src={logo} alt="JOD Logo" className="topbar-logo" />
            <div>
              <div className="topbar-title">Offer Letter Generator</div>
              <div className="topbar-sub">JOD TECH IT SOLUTION • Professional HR Tool</div>
            </div>
          </div>
          <button className="btn-download" onClick={handleDownloadPDF}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </button>
        </div>

        {/* TABS (mobile) */}
        <div className="tabs">
          <div className={`tab ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>
            ✏️ Edit Details
          </div>
          <div className={`tab ${activeTab === "preview" ? "active" : ""}`} onClick={() => setActiveTab("preview")}>
            👁 Live Preview
          </div>
        </div>

        <div className="main-content">
          {/* FORM PANEL */}
          <div className={`form-panel ${activeTab === "form" ? "show" : ""}`} style={{ display: activeTab === "form" ? "block" : undefined }}>

            <div className="form-section">
              <div className="form-section-title">📋 Document Info</div>
              <div className="form-row">
                <label className={label}>Reference Number</label>
                <input className={inp} name="refNo" value={form.refNo} onChange={handleChange} />
              </div>
              <div className="form-row">
                <label className={label}>Date</label>
                <input className={inp} type="date" name="date" value={form.date} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">👤 Employee Details</div>
              <div className="form-row">
                <label className={label}>Full Name</label>
                <input className={inp} name="employeeName" value={form.employeeName} onChange={handleChange} placeholder="Employee Full Name" />
              </div>
              <div className="form-row">
                <label className={label}>Full Address</label>
                <textarea className={inp} name="employeeAddress" value={form.employeeAddress} onChange={handleChange} rows={3} placeholder="Street, City, State - PIN" />
              </div>
              <div className="form-row">
                <label className={label}>Job Role / Designation</label>
                <input className={inp} name="jobRole" value={form.jobRole} onChange={handleChange} placeholder="e.g. Software Developer" />
              </div>
              <div className="form-row">
                <label className={label}>Department</label>
                <input className={inp} name="department" value={form.department} onChange={handleChange} placeholder="e.g. Engineering" />
              </div>
              <div className="form-row">
                <label className={label}>Date of Joining</label>
                <input className={inp} type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">💰 Salary Structure (Monthly ₹)</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className={label}>Basic Salary</label>
                  <input className={inp} type="number" name="basic" value={form.basic} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label className={label}>HRA</label>
                  <input className={inp} type="number" name="hra" value={form.hra} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label className={label}>Other Allowances</label>
                  <input className={inp} type="number" name="otherAllowances" value={form.otherAllowances} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label className={label}>Employer PF</label>
                  <input className={inp} type="number" name="employerPF" value={form.employerPF} onChange={handleChange} />
                </div>
              </div>
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "10px 14px", marginTop: "8px" }}>
                <div style={{ fontSize: "11px", color: "#166534", fontWeight: "700" }}>Total Annual CTC</div>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#15803d" }}>₹{annual.total.toLocaleString("en-IN")}</div>
                <div style={{ fontSize: "11px", color: "#4ade80" }}>₹{totalMonthly.toLocaleString("en-IN")} / month</div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-title">🖊 Authorized Signatory</div>
              <div className="form-row">
                <label className={label}>HR Manager Name</label>
                <input className={inp} name="hrManagerName" value={form.hrManagerName} onChange={handleChange} />
              </div>
            </div>

          </div>

          {/* PREVIEW PANEL */}
          <div className="preview-panel" style={{ display: activeTab === "preview" || window.innerWidth >= 768 ? "block" : "none" }}>
            <div className="preview-wrapper" ref={previewRef}>
              <div className="letter-doc">

                {/* HEADER */}
                <div className="letter-header">
                  <img src={logo} alt="Company Logo" className="letter-logo-box" style={{ objectFit: 'contain' }} />
                  <div style={{ flex: 1 }}>
                    <div className="letter-company-name">JOD TECH IT SOLUTION</div>
                    <div className="letter-company-sub">No 10, Chitharanjan Street, Chinna Chokkikulam, Madurai - 625002</div>
                    <div className="letter-company-contact">✉ jodtech11@gmail.com &nbsp;|&nbsp; 📞 96298 72195 / 78679 08377</div>
                  </div>
                </div>

                <div className="accent-bar" />

                {/* META */}
                <div className="meta-row">
                  <span><strong>Date:</strong> {formatDate(form.date)}</span>
                  <span><strong>Ref No:</strong> {form.refNo}</span>
                </div>

                {/* TO */}
                <div className="letter-to">
                  <div className="letter-to-label">Offer of Employment</div>
                  <div style={{ marginTop: "8px", fontWeight: 600, color: "#475569" }}>To,</div>
                  <div className="letter-to-name">{form.employeeName || "[Employee Name]"}</div>
                  <div className="letter-to-addr">{form.employeeAddress || "[Employee Address]"}</div>
                </div>

                <div className="salutation">Dear <strong>{form.employeeName.split(" ")[0] || "[Name]"}</strong>,</div>

                <div className="opening-para">
                  We are extremely pleased to offer you employment with <strong>JOD TECH IT SOLUTION</strong> for the position of{" "}
                  <strong>{form.jobRole || "[Job Role]"}</strong> in the <strong>{form.department || "[Department]"}</strong> department.
                  We believe your skills and experience will be a great asset to our company.
                </div>

                {/* 1. SALARY */}
                <div className="section-title">1. Remuneration & Salary Structure</div>
                <div className="clause-text">
                  Your Annual Cost To Company (CTC) will be <strong>Rs. {annual.total.toLocaleString("en-IN")}/-</strong>. Your salary will be paid on the last working day of every month, subject to standard statutory deductions.
                </div>
                <table className="salary-table">
                  <thead>
                    <tr>
                      <th>Salary Component</th>
                      <th>Monthly (₹)</th>
                      <th>Annual (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Basic Salary</td><td>{monthly.basic.toLocaleString("en-IN")}</td><td>{annual.basic.toLocaleString("en-IN")}</td></tr>
                    <tr><td>HRA</td><td>{monthly.hra.toLocaleString("en-IN")}</td><td>{annual.hra.toLocaleString("en-IN")}</td></tr>
                    <tr><td>Other Allowances</td><td>{monthly.other.toLocaleString("en-IN")}</td><td>{annual.other.toLocaleString("en-IN")}</td></tr>
                    <tr><td>Employer PF Contribution</td><td>{monthly.pf.toLocaleString("en-IN")}</td><td>{annual.pf.toLocaleString("en-IN")}</td></tr>
                    <tr className="total-row"><td><strong>Total CTC</strong></td><td><strong>{totalMonthly.toLocaleString("en-IN")}</strong></td><td><strong>{annual.total.toLocaleString("en-IN")}</strong></td></tr>
                  </tbody>
                </table>

                {/* 2–4 */}
                <div className="section-title">2. Date of Joining</div>
                <div className="clause-text">Your official date of joining will be <strong>{formatDate(form.dateOfJoining)}</strong>.</div>

                <div className="section-title">3. Salary Revision</div>
                <div className="clause-text">Your salary revision will be based solely on your performance and the annual review cycle of the company.</div>

                {/* PAGE BREAK (1-3) */}
                <div className="print-page-break" />

                <div className="section-title">4. Adherence to Company Policies</div>
                <div className="clause-text">You are required to strictly adhere to all company policies, which may be updated from time to time, including but not limited to:</div>
                <ul className="bullet-list">
                  {["Attendance & Leave Policy","IT and Internet Usage","Email Usage Policy","Confidentiality & Data Privacy","Remote Work Guidelines","Password and Security Policies","Professional Conduct"].map(p => <li key={p}>{p}</li>)}
                </ul>

                <div className="section-title">5. Confidentiality</div>
                <div className="clause-text">All company information, software, source code, business plans, client information, and internal documents are strictly confidential. You shall not disclose any confidential information during or after your employment with the company.</div>

                <div className="section-title">6. Transferability</div>
                <div className="clause-text">You may be transferred or assigned to any department, project, branch office, client location, or partner company depending on the business requirements of JOD TECH IT SOLUTION.</div>

                <div className="section-title">7. Assignment of Rights in Work</div>
                <div className="clause-text">All work, designs, software, code, inventions, ideas, documents, and materials created or developed by you during your employment belong exclusively to the company.</div>

                <div className="section-title">8. Concurrent Education</div>
                <div className="clause-text">You shall not pursue any full-time or part-time educational courses without prior written approval from the company management.</div>

                <div className="section-title">9. Concurrent Employment or Business</div>
                <div className="clause-text">During your employment, you cannot work for another company, engage in freelance activities, or run any other business without explicit written permission from the management.</div>

                <div className="section-title">10. Non-Compete</div>
                <div className="clause-text">During your employment and for a period of one (1) year after leaving the company, you shall not work for direct competitors or utilize company knowledge, trade secrets, or methodologies to assist competing businesses.</div>

                {/* PAGE BREAK (4-10) */}
                <div className="print-page-break" />

                <div className="section-title">11. Termination</div>
                <div className="clause-text">Either party may terminate this employment agreement by providing <strong>30 days written notice</strong> or salary in lieu of notice. However, the company reserves the right to terminate your employment immediately, without notice or compensation, for the following reasons:</div>
                <ul className="bullet-list">
                  {["Misconduct or Policy Violations","Poor Performance","Submission of Fake Documents","Breach of Confidentiality","Fraudulent Activities","Background Verification Failure"].map(r => <li key={r}>{r}</li>)}
                </ul>

                <div className="section-title">12. Non-Solicitation</div>
                <div className="clause-text">For a period of <strong>six (6) months</strong> following the termination of your employment, you shall not attempt to recruit, solicit, or influence other employees or clients to leave the company.</div>

                <div className="section-title">13. Amendment of Terms</div>
                <div className="clause-text">The company reserves the right to revise the terms of employment and policies from time to time based on business needs.</div>

                <div className="section-title">14. Governing Law and Jurisdiction</div>
                <div className="clause-text">This agreement shall be governed by Indian law, and any disputes arising out of this employment shall be handled exclusively in the courts located in <strong>Madurai, Tamil Nadu</strong>.</div>

                <div className="section-title">15. Additional Benefits</div>
                <div className="benefits-grid">
                  {benefits.map(b => (
                    <div className="benefit-chip" key={b}>
                      <span>✓</span>{b}
                    </div>
                  ))}
                </div>

                <div className="closing-para">
                  Please sign and return the duplicate copy of this offer letter as a token of your acceptance. We look forward to welcoming you to the <strong>JOD TECH IT SOLUTION</strong> family and wish you a long, rewarding, and successful career with us.
                </div>

                {/* SIGNATURES */}
                <div className="signature-block">
                  <div className="sig-box">
                    <div className="sig-label">For JOD TECH IT SOLUTION</div>
                    <div className="sig-name">{form.hrManagerName || "[HR Manager Name]"}</div>
                    <div className="sig-role">Authorized Signatory / HR Manager</div>
                  </div>
                  <div className="sig-box">
                    <div className="sig-label">Accepted & Agreed</div>
                    <div className="sig-name">{form.employeeName || "[Employee Name]"}</div>
                    <div className="sig-role">Employee Signature & Date</div>
                  </div>
                </div>

                <div className="footer-bar">
                  JOD TECH IT SOLUTION • No 10, Chitharanjan Street, Madurai - 625002 • jodtech11@gmail.com<br />
                  This is a confidential document. Unauthorized reproduction or distribution is prohibited.
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
