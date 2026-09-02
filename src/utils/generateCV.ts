import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib'; // <-- NEW IMPORT for encryption
import { OPERATOR_PROFILE } from '../data/portfolioData';

export const CV_DETAILS = {
  fullName: 'D.B. Jayasankha Madhusith',
  headline: 'Cybersecurity Specialist | Digital Forensics & Software Tools Developer',
  email: OPERATOR_PROFILE.email,
  phone: '94 71 148 2061',
  phoneIntl: '+94 71 148 2061',
  location: 'Kurunegala, Sri Lanka',
  github: OPERATOR_PROFILE.github,
  linkedin: OPERATOR_PROFILE.linkedin,

  summary:
    'Multidisciplinary graduate with an academic foundation in Criminology, Psychology, and International Relations from the University of Sri Jayewardenepura, combined with advanced expertise in Cybersecurity, Digital Forensics, and Full-Stack Software Engineering. Proven capability in architecting production-ready live forensic triage utilities, memory analyzers, threat-hunting systems, and published browser extensions. Passionate about merging behavioral insights with technical security protocols, automation, and modern code protection to engineer robust, human-centric digital solutions.',

  education: [
    {
      degree: 'Bachelor of Arts (General) Degree',
      institution: 'University of Sri Jayewardenepura',
      year: '2026',
      details: 'Specialization in Criminology, Psychology & International Relations with multidisciplinary applications to behavioral threat vectors and cyber governance.'
    },
    {
      degree: 'G.C.E. Advanced Level (A/L) Examination',
      institution: 'Ministry of Education, Sri Lanka',
      year: '2017',
      details: 'Completed Advanced Level Examinations.'
    },
    {
      degree: 'G.C.E. Ordinary Level (O/L) Examination',
      institution: 'Ministry of Education, Sri Lanka',
      year: '2014',
      details: 'Completed Ordinary Level Examinations with distinctions.'
    }
  ],

  workExperience: [
    {
      role: 'Management Assistant',
      company: 'Asiri Home Building Service',
      period: '2022 - 2023',
      responsibilities: [
        'Managed administrative workflows, operational documentation, and digital client record systems.',
        'Assisted with operational logistics, schedule coordination, and data maintenance.',
        'Applied structured organizational protocols to improve service delivery and workflow efficiency.'
      ]
    }
  ],

  technicalSkills: {
    languages: 'Python, Rust, C++, Go, JavaScript, TypeScript, PowerShell, Bash, HTML/CSS | Sinhala, English',
    cyberMalware: 'Malware/RAT Dev, Windows Internals (Win32 API, Process Injection, AMSI/ETW Bypass), Reverse Engineering, Memory Forensics, Penetration Testing, Threat Hunting',
    toolsDev: 'Metasploit, Burp Suite, Nmap, Wireshark, Ghidra, IDA Pro, x64dbg, Sysinternals, Volatility 3, Frida, Flask, SQLite, VeraCrypt, Code Obfuscation, Chrome Extension Architecture (Checkers Pro, Aeon Hunter)'
  },

  featuredProjects: [
    {
      name: 'Console Injection+',
      tag: 'Chrome Web Store Extension',
      desc: 'Advanced browser developer companion enabling rapid script execution, variable inspection, automated payload injection testing, and CSP header bypass simulation.'
    },
    {
      name: 'CodeRED-Tool',
      tag: 'Cyber Reconnaissance & Incident Response',
      desc: 'Automated threat hunting and incident response triage suite designed for rapid endpoint artifact extraction and heuristic threat analysis.'
    },
    {
      name: 'AegisX-Pro',
      tag: 'Offensive & Defensive Security Framework',
      desc: 'High-performance automation and endpoint telemetry framework featuring custom encrypted socket transport and in-memory execution mechanics.'
    },
    {
      name: 'Checkers+',
      tag: 'Optimized Game Engine Extension',
      desc: 'Algorithmically optimized, sandboxed browser extension utilizing minimax decision trees with alpha-beta pruning in dedicated Web Workers.'
    }
  ],

  referees: [
    {
      name: 'Ms. D.P. Bandara',
      title: 'ESL Teacher / English For Kids',
      email: 'Englishforkids@gmail.com',
      phone: '+94 74 153 4794'
    },
    {
      name: 'Mr. Manju Warnashantha',
      title: 'Sales Executive / Radiant Technology',
      email: 'radiantcom@gmail.com',
      phone: '+94 71 377 1377'
    }
  ]
};

export type CVTemplateType = 'ats-executive' | 'cyber-dark';

/**
 * Generates an ATS-compliant, executive-grade PDF resume with large readable typography,
 * fills the entire A4 sheet with elegant vertical balance, and encrypts it with a password.
 *
 * @param filename - The name of the file (used for reference, but download is handled by caller)
 * @param template - 'ats-executive' or 'cyber-dark'
 * @param password - The password to lock the PDF (if empty, no encryption is applied)
 * @returns Promise<Uint8Array> - The encrypted PDF bytes ready for download
 */
export async function generateCVPdf(
  filename: string = 'D_B_Jayasankha_Madhusith_CV.pdf',
  template: CVTemplateType = 'ats-executive',
  password: string = ''
): Promise<Uint8Array> {
  // 1. Build the PDF using jsPDF (your existing drawing logic)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - margin * 2;
  let y = 12;

  const isDark = template === 'cyber-dark';

  if (isDark) {
    doc.setFillColor(4, 14, 8);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  }

  // ==================== 1. HEADER ====================
  if (isDark) {
    doc.setFillColor(9, 28, 16);
    doc.roundedRect(margin, y, contentWidth, 27, 2, 2, 'F');
    doc.setDrawColor(0, 180, 60);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 27, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(CV_DETAILS.fullName.toUpperCase(), margin + 6, y + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(0, 230, 80);
    doc.text(CV_DETAILS.headline, margin + 6, y + 15.0);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(210, 235, 220);
    const contactText = `${CV_DETAILS.email}   |   ${CV_DETAILS.phone}   |   ${CV_DETAILS.location}   |   GitHub: Jayasankha-dev`;
    doc.text(contactText, margin + 6, y + 21.5);

    y += 31.5;
  } else {
    // ATS Executive Clean Header (Large, commanding typography)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(CV_DETAILS.fullName.toUpperCase(), margin, y + 7.0);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.8);
    doc.setTextColor(13, 115, 85); // refined emerald-800
    doc.text(CV_DETAILS.headline, margin, y + 13.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.0);
    doc.setTextColor(71, 85, 105); // slate-600
    const contactLine1 = `Email: ${CV_DETAILS.email}    |    Phone: ${CV_DETAILS.phone}    |    Location: ${CV_DETAILS.location}`;
    const contactLine2 = `GitHub: ${CV_DETAILS.github}    |    LinkedIn: ${CV_DETAILS.linkedin}`;
    doc.text(contactLine1, margin, y + 19.2);
    doc.text(contactLine2, margin, y + 24.2);

    // Elegant Divider Line
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.6);
    doc.line(margin, y + 27.5, pageWidth - margin, y + 27.5);

    // Accent line
    doc.setDrawColor(13, 148, 100);
    doc.setLineWidth(1.5);
    doc.line(margin, y + 27.5, margin + 45, y + 27.5);

    y += 32.5;
  }

  // ==================== SECTION HEADER HELPER ====================
  const drawSectionHeader = (title: string) => {
    if (isDark) {
      doc.setFillColor(242, 248, 244);
      doc.roundedRect(margin, y, contentWidth, 6.0, 1.0, 1.0, 'F');
      doc.setFillColor(0, 170, 65);
      doc.rect(margin, y, 2.8, 6.0, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.8);
      doc.setTextColor(10, 45, 20);
      doc.text(title.toUpperCase(), margin + 5.0, y + 4.3);
      y += 8.6;
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title.toUpperCase(), margin, y + 4.2);

      // Bottom underline
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y + 6.2, pageWidth - margin, y + 6.2);

      doc.setDrawColor(13, 148, 100);
      doc.setLineWidth(1.4);
      doc.line(margin, y + 6.2, margin + 32, y + 6.2);

      y += 9.6;
    }
  };

  // ==================== 2. PROFESSIONAL SUMMARY ====================
  drawSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.0);
  doc.setTextColor(isDark ? 215 : 51, isDark ? 225 : 65, isDark ? 220 : 85);
  const summaryLines = doc.splitTextToSize(CV_DETAILS.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.1 + 3.0;

  // ==================== 3. TECHNICAL SKILLS & COMPETENCIES ====================
  drawSectionHeader('Technical Skills & Core Competencies');

  const skillCategories = [
    { label: 'Languages & Core Systems', val: CV_DETAILS.technicalSkills.languages },
    { label: 'Cybersecurity & Malware Dev', val: CV_DETAILS.technicalSkills.cyberMalware },
    { label: 'Security Tools & Platforms', val: CV_DETAILS.technicalSkills.toolsDev },
  ];

  skillCategories.forEach((sc) => {
    doc.setFillColor(isDark ? 0 : 13, isDark ? 230 : 148, isDark ? 80 : 100);
    doc.circle(margin + 1.2, y - 1.0, 0.7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.0);
    doc.setTextColor(isDark ? 0 : 13, isDark ? 230 : 120, isDark ? 80 : 70);
    doc.text(`${sc.label}:`, margin + 4.0, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(isDark ? 215 : 51, isDark ? 225 : 65, isDark ? 220 : 85);

    const startX = margin + 50;
    const valLines = doc.splitTextToSize(sc.val, contentWidth - 50);
    doc.text(valLines, startX, y);
    y += Math.max(valLines.length * 3.9, 4.8);
  });
  y += 2.0;

  // ==================== 4. FEATURED PROJECTS & EXTENSIONS ====================
  drawSectionHeader('Featured Security Projects & Extensions');
  CV_DETAILS.featuredProjects.forEach((proj) => {
    // Bullet indicator
    doc.setFillColor(isDark ? 0 : 13, isDark ? 255 : 148, isDark ? 65 : 100);
    doc.circle(margin + 1.2, y - 1.1, 0.75, 'F');

    // Project Name on left
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(isDark ? 255 : 15, isDark ? 255 : 23, isDark ? 255 : 42);
    doc.text(proj.name, margin + 4.2, y);

    // Tag cleanly aligned to the right
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.6);
    doc.setTextColor(isDark ? 0 : 13, isDark ? 210 : 120, isDark ? 80 : 70);
    doc.text(`[${proj.tag}]`, pageWidth - margin, y, { align: 'right' });

    y += 4.0;
    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(isDark ? 205 : 71, isDark ? 215 : 85, isDark ? 210 : 105);
    const descLines = doc.splitTextToSize(proj.desc, contentWidth - 4.2);
    doc.text(descLines, margin + 4.2, y);
    y += descLines.length * 3.8 + 2.0;
  });

  // Portfolio Discovery Note
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(isDark ? 0 : 13, isDark ? 230 : 120, isDark ? 80 : 70);
  doc.text(`Explore More: Discover all 37+ open-source repositories & tools on GitHub (${CV_DETAILS.github})`, margin, y);
  y += 6.5;

  // ==================== 5. EDUCATION & ACADEMIC CREDENTIALS ====================
  drawSectionHeader('Education & Academic Credentials');
  CV_DETAILS.education.forEach((edu) => {
    // Bullet indicator
    doc.setFillColor(isDark ? 0 : 13, isDark ? 255 : 148, isDark ? 65 : 100);
    doc.circle(margin + 1.2, y - 1.1, 0.75, 'F');

    // Degree Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.4);
    doc.setTextColor(isDark ? 255 : 15, isDark ? 255 : 23, isDark ? 255 : 42);
    doc.text(edu.degree, margin + 4.2, y);

    // Year (right aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.0);
    doc.setTextColor(isDark ? 0 : 13, isDark ? 230 : 120, isDark ? 80 : 70);
    doc.text(edu.year, pageWidth - margin, y, { align: 'right' });

    y += 3.9;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.6);
    doc.setTextColor(isDark ? 195 : 71, isDark ? 205 : 85, isDark ? 200 : 105);

    const eduDetailStr = `${edu.institution} - ${edu.details}`;
    const eduLines = doc.splitTextToSize(eduDetailStr, contentWidth - 4.2);
    doc.text(eduLines, margin + 4.2, y);
    y += eduLines.length * 3.7 + 1.8;
  });
  y += 1.5;

  // ==================== 6. PROFESSIONAL WORK EXPERIENCE ====================
  drawSectionHeader('Professional Work Experience');
  CV_DETAILS.workExperience.forEach((exp) => {
    // Bullet indicator
    doc.setFillColor(isDark ? 0 : 13, isDark ? 255 : 148, isDark ? 65 : 100);
    doc.circle(margin + 1.2, y - 1.1, 0.75, 'F');

    // Role
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.4);
    doc.setTextColor(isDark ? 255 : 15, isDark ? 255 : 23, isDark ? 255 : 42);
    doc.text(exp.role, margin + 4.2, y);

    const roleWidth = doc.getTextWidth(exp.role);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.9);
    doc.setTextColor(isDark ? 0 : 13, isDark ? 210 : 120, isDark ? 80 : 70);
    doc.text(` - ${exp.company}`, margin + 4.2 + roleWidth, y);

    // Period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.0);
    doc.setTextColor(isDark ? 185 : 100, isDark ? 195 : 116, isDark ? 190 : 139);
    doc.text(exp.period, pageWidth - margin, y, { align: 'right' });

    y += 4.0;
    exp.responsibilities.forEach((resp) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(isDark ? 205 : 71, isDark ? 215 : 85, isDark ? 210 : 105);
      const rLines = doc.splitTextToSize(`- ${resp}`, contentWidth - 6.0);
      doc.text(rLines, margin + 4.2, y);
      y += rLines.length * 3.6;
    });
  });
  y += 2.5;

  // ==================== 7. NON-RELATED REFEREES ====================
  drawSectionHeader('Non-Related Referees');
  const refereeColWidth = (contentWidth - 6) / 2;

  CV_DETAILS.referees.forEach((ref, idx) => {
    const colX = margin + idx * (refereeColWidth + 6);

    if (isDark) {
      doc.setFillColor(11, 26, 17);
      doc.roundedRect(colX, y, refereeColWidth, 21.0, 1.5, 1.5, 'F');
      doc.setDrawColor(0, 160, 60);
      doc.roundedRect(colX, y, refereeColWidth, 21.0, 1.5, 1.5, 'S');
    } else {
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(colX, y, refereeColWidth, 21.5, 1.5, 1.5, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(colX, y, refereeColWidth, 21.5, 1.5, 1.5, 'S');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.2);
    doc.setTextColor(isDark ? 255 : 15, isDark ? 255 : 23, isDark ? 255 : 42);
    doc.text(ref.name, colX + 4.0, y + 5.2);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.4);
    doc.setTextColor(isDark ? 0 : 13, isDark ? 220 : 120, isDark ? 80 : 70);
    doc.text(ref.title, colX + 4.0, y + 9.6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(isDark ? 205 : 71, isDark ? 215 : 85, isDark ? 210 : 105);
    doc.text(`Email: ${ref.email}`, colX + 4.0, y + 14.2);
    doc.text(`Phone: ${ref.phone}`, colX + 4.0, y + 18.5);
  });

  // ================================================================
  // 8. NEW: Convert jsPDF output to ArrayBuffer and Encrypt with pdf-lib
  // ================================================================

  // Step A: Get the PDF as an ArrayBuffer from jsPDF
  const pdfBytes = doc.output('arraybuffer');

  // Step B: Load the PDF into pdf-lib
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Step C: Apply encryption if a password is provided
  if (password) {
    pdfDoc.encrypt({
      userPassword: password,      // The password users must enter to open it
      ownerPassword: password,     // We'll set the same password for ownership
      permissions: {
        printing: 'highResolution', // Allow high-quality printing
        modifying: false,           // Prevent editing the PDF content
        copying: true,              // Allow copying text
        annotating: false,          // Prevent adding annotations
        fillingForms: false,
        contentAccessibility: true,
        documentAssembly: false,
      },
    });
  }

  // Step D: Save the encrypted (or plain) PDF as a Uint8Array
  const encryptedPdfBytes = await pdfDoc.save();

  // Step E: Return the bytes so the caller (CVModal) can handle the download
  return encryptedPdfBytes;
}
