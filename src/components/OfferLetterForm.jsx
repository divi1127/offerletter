import React from 'react';

const OfferLetterForm = () => {
  return (
    <div className="text-[0.95rem] leading-relaxed text-gray-800 space-y-2">
      
      {/* 2. Employee Address Section */}
      <div className="mb-2 min-h-[70px]"> {/* Reserved space for address to keep bottom alignment consistent */}
        <p className="font-bold text-gray-900 uppercase text-[10px] mb-1">To,</p>
        <div className="flex flex-col">
          <input type="text" placeholder="[Employee Name]" className="font-bold text-base border border-gray-300 rounded px-2 py-0.5 outline-none focus:border-brand w-full sm:w-64 transition-colors mb-1" />
          <textarea placeholder="[Employee Full Address]" className="border border-gray-300 rounded px-2 py-0.5 outline-none focus:border-brand w-full sm:w-64 h-20 resize-none transition-colors" />
        </div>
      </div>

      {/* 4. Opening Paragraph */}
      <div className="space-y-2">
        <p>
          Dear <input type="text" placeholder="[Name]" className="border-b border-dashed border-gray-400 w-32 px-1 outline-none text-left focus:border-brand bg-transparent font-medium" />,
        </p>
        <p>
          We are extremely pleased to offer you employment with <strong>JOD TECH IT SOLUTION</strong> for the position of 
          <input type="text" placeholder="[Job Role]" className="border-b border-dashed border-gray-400 w-40 px-1 mx-1 outline-none text-left font-bold focus:border-brand bg-transparent" /> 
          in the 
          <input type="text" placeholder="[Department Name]" className="border-b border-dashed border-gray-400 w-40 px-1 mx-1 outline-none text-left focus:border-brand bg-transparent" /> 
          department. We believe your skills and experience will be a great asset to our company.
        </p>
      </div>

      {/* 5. Remuneration & 21. Annexure Salary Table */}
      <div className="my-6">
        <h3 className="font-bold text-brand mb-2 text-base">1. Remuneration & Salary Structure</h3>
        <p className="mb-4">
          Your Annual Cost To Company (CTC) will be <strong>Rs. <input type="text" placeholder="[Annual CTC]" className="border-b border-dashed border-gray-400 w-24 px-1 outline-none focus:border-brand bg-transparent" />/-</strong>. 
          Your salary will be paid on the last working day of every month, subject to standard statutory deductions.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 my-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left w-1/2">Salary Component</th>
                <th className="border border-gray-300 p-2 text-right">Monthly (Rs.)</th>
                <th className="border border-gray-300 p-2 text-right">Annual (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-medium">Basic Salary</td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-medium">HRA</td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-medium">Other Allowances</td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-medium">Employer PF Contribution</td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none bg-transparent" /></td>
              </tr>
              <tr className="bg-gray-50 font-bold">
                <td className="border border-gray-300 p-2">Total CTC</td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none font-bold bg-transparent" /></td>
                <td className="border border-gray-300 p-2 text-right"><input type="number" placeholder="0" className="w-full text-right outline-none font-bold bg-transparent" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Date of Joining */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">2. Date of Joining</h3>
        <p>Your official date of joining will be <input type="date" className="border-b border-dashed border-gray-400 outline-none w-auto focus:border-brand bg-transparent" />.</p>
      </div>

      {/* 7. Salary Revision */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">3. Salary Revision</h3>
        <p>Your salary revision will be based solely on your performance and the annual review cycle of the company.</p>
      </div>

      {/* 8. Adherence to Company Policies */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">4. Adherence to Company Policies</h3>
        <p className="mb-2">You are required to strictly adhere to all company policies, which may be updated from time to time, including but not limited to:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 list-disc pl-5">
          <li>Attendance & Leave Policy</li>
          <li>IT and Internet Usage</li>
          <li>Email Usage Policy</li>
          <li>Confidentiality & Data Privacy</li>
          <li>Remote Work Guidelines</li>
          <li>Password and Security Policies</li>
          <li>Professional Conduct</li>
        </ul>
      </div>

      {/* 9. Confidentiality */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">5. Confidentiality</h3>
        <p>All company information, software, source code, business plans, client information, and internal documents are strictly confidential. You shall not disclose any confidential information during or after your employment with the company.</p>
      </div>

      {/* 10. Transferability */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">6. Transferability</h3>
        <p>You may be transferred or assigned to any department, project, branch office, client location, or partner company depending on the business requirements of JOD TECH IT SOLUTION.</p>
      </div>

      {/* 11. Assignment of Rights in Work */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">7. Assignment of Rights in Work</h3>
        <p>All work, designs, software, code, inventions, ideas, documents, and materials created or developed by you during your employment belong exclusively to the company.</p>
      </div>

      {/* 12. Concurrent Education */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">8. Concurrent Education</h3>
        <p>You shall not pursue any full-time or part-time educational courses without prior written approval from the company management.</p>
      </div>

      {/* 13. Concurrent Employment or Business */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">9. Concurrent Employment or Business</h3>
        <p>During your employment, you cannot work for another company, engage in freelance activities, or run any other business without explicit written permission from the management.</p>
      </div>

      {/* 14. Non-Compete Clause */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">10. Non-Compete</h3>
        <p>During your employment and for a period of one (1) year after leaving the company, you shall not work for direct competitors or utilize company knowledge, trade secrets, or methodologies to assist competing businesses.</p>
      </div>

      
      {/* 15. Termination Clause */}
      <table className="w-full border-none border-collapse m-0 p-0 avoid-break section-termination" style={{ marginTop: '0', paddingTop: '0' }}>
        <tbody>
          <tr>
            <td className="border-none p-0">
              <h3 className="font-bold text-brand mb-1 text-base">11. Termination</h3>
              <p className="mb-2">Either party may terminate this employment agreement by providing 30 days written notice or salary in lieu of notice. However, the company reserves the right to terminate your employment immediately, without notice or compensation, for the following reasons:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Misconduct or Policy Violations</li>
                <li>Poor Performance</li>
                <li>Submission of Fake Documents</li>
                <li>Breach of Confidentiality</li>
                <li>Fraudulent Activities</li>
                <li>Background Verification Failure</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 16. Non-Solicitation */}
      <div className="avoid-break section-solicitation">
        <h3 className="font-bold text-brand mb-1 text-base">12. Non-Solicitation</h3>
        <p>For a period of six (6) months following the termination of your employment, you shall not attempt to recruit, solicit, or influence other employees or clients to leave the company.</p>
      </div>

      {/* 17. Amendment of Terms */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">13. Amendment of Terms</h3>
        <p>The company reserves the right to revise the terms of employment and policies from time to time based on business needs.</p>
      </div>

      {/* 18. Governing Law and Jurisdiction */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">14. Governing Law and Jurisdiction</h3>
        <p>This agreement shall be governed by Indian law, and any disputes arising out of this employment shall be handled exclusively in the courts located in Madurai, Tamil Nadu.</p>
      </div>

      {/* 22. Additional Benefits */}
      <div className="avoid-break">
        <h3 className="font-bold text-brand mb-1 text-base">15. Additional Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Performance Bonus</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Paid Leave</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Free Lunch/Snacks</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Health Insurance</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Accident Insurance</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Laptop/Work Device</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Festival Bonus</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Flexible Hours</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 text-brand rounded border-gray-300 focus:ring-brand" /> Training Programs</label>
        </div>
      </div>

      {/* 19 & 20. Validity & Closing Paragraph */}
      <div className="mt-8 pt-6 border-t border-gray-200 avoid-break">
        <p className="mb-8">
          Please sign and return the duplicate copy of this offer letter as a token of your acceptance. 
          We look forward to welcoming you to the <strong>JOD TECH IT SOLUTION</strong> family and wish you a long, rewarding, and successful career with us.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 mt-6 signature-section">
          {/* Company Signature */}
          <div>
            <p className="mb-12 font-bold text-brand">For JOD TECH IT SOLUTION</p>
            <div className="border-t border-gray-800 w-full sm:w-48 mb-2"></div>
            <p className="font-bold"><input type="text" placeholder="[HR Manager Name]" className="outline-none focus:border-b focus:border-brand w-full bg-transparent" /></p>
            <p className="text-gray-500 text-sm">Authorized Signatory / HR Manager</p>
          </div>

          {/* Employee Signature */}
          <div>
            <p className="mb-12 font-bold text-brand">Accepted & Agreed</p>
            <div className="border-t border-gray-800 w-full sm:w-48 mb-2"></div>
            <p className="font-bold"><input type="text" placeholder="[Employee Signature]" className="outline-none focus:border-b focus:border-brand w-full bg-transparent" /></p>
            <p className="text-gray-500 text-sm">Employee Name & Date</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OfferLetterForm;
