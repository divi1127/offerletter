import React, { useState, useRef } from 'react';
import { Download, Eye, EyeOff, Building2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import logoImg from './assets/logo.jpg';
import OfferLetterForm from './components/OfferLetterForm';

function App() {
  const [isPreview, setIsPreview] = useState(false);
  const formRef = useRef();

  const handleDownloadPDF = () => {
    const element = formRef.current;
    if (!element) return;

    const wasPreview = isPreview;
    setIsPreview(true);
    
    // Explicitly scroll to top
    window.scrollTo(0, 0);

    setTimeout(() => {
      element.classList.add('pdf-capture-mode');
      
      // Physical swap of inputs/textareas to divs for perfect rendering
      const replacements = [];
      const originalStyles = new Map();
      const allElements = Array.from(element.querySelectorAll('*'));
      
      // Step 1: Force colors to hex to avoid oklch errors
      allElements.forEach(el => {
        const computed = window.getComputedStyle(el);
        const properties = [
          'color', 'background-color', 'border-color', 'border-top-color', 
          'border-right-color', 'border-bottom-color', 'border-left-color',
          'outline-color'
        ];
        
        const elOrigStyles = {};
        properties.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && value.includes('oklch')) {
            elOrigStyles[prop] = el.style.getPropertyValue(prop);
            
            if (prop === 'color') el.style.setProperty(prop, '#000000', 'important');
            else if (prop === 'background-color') {
               if (el.classList.contains('bg-brand')) el.style.setProperty(prop, '#0f4d3f', 'important');
               else el.style.setProperty(prop, '#ffffff', 'important');
            }
            else el.style.setProperty(prop, '#d1d5db', 'important');
          }
        });
        if (Object.keys(elOrigStyles).length > 0) {
          originalStyles.set(el, elOrigStyles);
        }
      });

      const inputs = Array.from(element.querySelectorAll('input:not([type="checkbox"]), textarea'));
      
      inputs.forEach(input => {
        const parent = input.parentNode;
        const div = document.createElement('div');
        
        // Copy essential styles
        const computed = window.getComputedStyle(input);
        div.style.display = computed.display.includes('inline') ? 'inline-block' : 'block';
        div.style.padding = '0 4px';
        div.style.margin = '0';
        div.style.fontSize = computed.fontSize;
        div.style.fontFamily = computed.fontFamily;
        div.style.lineHeight = computed.lineHeight;
        div.style.color = '#000000';
        div.style.fontWeight = input.classList.contains('font-bold') ? '700' : '400';
        div.style.whiteSpace = 'pre-wrap';
        div.style.wordBreak = 'break-word';
        div.style.border = 'none';
        div.style.verticalAlign = 'baseline';
        
        div.innerText = input.value || '';
        
        parent.replaceChild(div, input);
        replacements.push({ parent, div, input });
      });

      // Flawless checkbox rendering workaround
      const checkboxes = Array.from(element.querySelectorAll('input[type="checkbox"]'));
      checkboxes.forEach(chk => {
        const parent = chk.parentNode;
        const box = document.createElement('span');
        box.style.display = 'inline-flex';
        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';
        box.style.minWidth = '14px';
        box.style.height = '14px';
        box.style.border = '1px solid #000000';
        box.style.borderRadius = '2px';
        box.style.marginRight = '6px';
        box.style.fontSize = '10px';
        box.style.fontWeight = '900';
        box.style.color = '#000000';
        box.style.verticalAlign = 'text-bottom'; // Better alignment for checkboxes
        box.style.lineHeight = '1';
        box.innerHTML = chk.checked ? '✓' : '&nbsp;';
        
        parent.replaceChild(box, chk);
        replacements.push({ parent, div: box, input: chk });
      });

      // Add mobile-specific page breaks ONLY if on a small screen
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const terminationSection = element.querySelector('.section-termination');
        if (terminationSection) {
          const breakDiv = document.createElement('div');
          breakDiv.className = 'html2pdf__page-break';
          terminationSection.parentNode.insertBefore(breakDiv, terminationSection);
        }
      }

      const opt = {
        margin: [10, 10],
        filename: `JOD_TECH_Offer_Letter.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          letterRendering: true,
          windowWidth: 1024 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['h3', 'table', '.avoid-break', '.signature-section'] }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        // Revert replacements
        replacements.forEach(r => {
          r.parent.replaceChild(r.input, r.div);
        });
        // Revert styles
        originalStyles.forEach((styles, el) => {
          Object.keys(styles).forEach(prop => {
            el.style.setProperty(prop, styles[prop]);
          });
        });
        setIsPreview(wasPreview);
        element.classList.remove('pdf-capture-mode');
      }).catch(err => {
        console.error("PDF generation failed:", err);
        // Revert replacements on error
        replacements.forEach(r => {
          r.parent.replaceChild(r.input, r.div);
        });
        // Revert styles on error
        originalStyles.forEach((styles, el) => {
          Object.keys(styles).forEach(prop => {
            el.style[prop] = styles[prop];
          });
        });
        setIsPreview(wasPreview);
        element.classList.remove('pdf-capture-mode');
      });
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="no-print bg-white border-b px-4 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-brand text-white p-2 rounded-lg">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-brand m-0 leading-tight">JOD TECH Forms</h1>
            <p className="text-sm text-gray-500 m-0">Offer Letter Generator</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors border ${isPreview ? 'bg-brand text-white border-brand' : 'bg-transparent text-gray-800 border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            <span>{isPreview ? 'Edit Mode' : 'Live Preview'}</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white bg-brand hover:bg-brand-light transition-colors shadow-sm"
            onClick={handleDownloadPDF}
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-2 sm:p-4 flex justify-center">
        <div 
          ref={formRef}
          className={`bg-white w-full max-w-[210mm] p-8 sm:p-10 shadow-md rounded-md ${isPreview ? 'pdf-capture-mode' : ''}`}
          style={{ minHeight: '297mm' }}
        >
          {/* Header Section based on Zoho format */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex-shrink-0">
              <img src={logoImg} alt="JOD TECH Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-[Green] uppercase tracking-tight">JOD TECH IT SOLUTION</h2>
              <p className="text-[11px] text-gray-700 leading-tight">
                No 10, Chitharanjan Street, Chinna Chokkikulam,<br/>
                Madurai - 625002<br/>
                Email: jodtech11@gmail.com<br/>
                Phone: 96298 72195 / 78679 08377
              </p>
            </div>
          </div>

          {/* Double Horizontal Line */}
          <div className="border-t border-black mb-[2px]"></div>
          <div className="border-t-[3px] border-black mb-6"></div>

          {/* Date & Ref Section below lines */}
          <div className="flex justify-end mb-10">
            <div className="text-right space-y-1">
              <div className="flex items-center justify-end gap-2">
                <span className="font-medium text-sm">Date:</span>
                <input type="text" defaultValue="5th July 2024" className="outline-none text-sm w-32 border-b border-transparent focus:border-gray-300" />
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="font-medium text-sm">Ref No:</span>
                <input type="text" defaultValue="JOD/527/07/2024" className="outline-none text-sm w-40 border-b border-transparent focus:border-gray-300 text-right" />
              </div>
            </div>
          </div>

          <div className="text-center font-bold text-lg uppercase tracking-widest mb-10 text-gray-900">
            Offer of Employment
          </div>

          <OfferLetterForm />
          
        </div>
      </main>

      <div className="no-print sm:hidden fixed bottom-6 right-6 z-50">
        <button 
          className="bg-brand text-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:bg-brand-light transition-colors"
          onClick={handleDownloadPDF}
        >
          <Download size={24} />
        </button>
      </div>
    </div>
  );
}

export default App;
