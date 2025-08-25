import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PaymentData {
  months: number;
  payment: number;
}

interface LoanData {
  model: string;
  netFinance: number;
  effectiveRateYear: number;
  payments: PaymentData[];
}

export const generatePDF = async (loanData: LoanData) => {
  const doc = new jsPDF();

  // Load and set Thai font (Sarabun)
  try {
    const res = await fetch('/fonts/Sarabun-Regular.ttf');
    const buf = await res.arrayBuffer();
    const b64 = arrayBufferToBase64(buf);
    doc.addFileToVFS('Sarabun-Regular.ttf', b64);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun');
  } catch (e) {
    doc.setFont('helvetica');
  }

  // Title
  doc.setFontSize(20);
  doc.text('ตารางค่าผ่อนจักรยานยนต์', 105, 30, { align: 'center' });

  // Loan details
  doc.setFontSize(14);
  const effectiveRateMonth = (loanData.effectiveRateYear / 12).toFixed(4);
  doc.text(`รุ่นรถ: ${loanData.model}`, 20, 50);
  doc.text(`ราคาตัวรถ: ${formatNumber(loanData.netFinance)} บาท`, 20, 65);
  doc.text(
    `ดอกเบี้ยต่อปี: ${loanData.effectiveRateYear}% (${effectiveRateMonth}% ต่อเดือน)`,
    20,
    80
  );

  // Table
  const tableData = loanData.payments.map((payment) => [
    `${payment.months} เดือน`,
    `${formatNumber(payment.payment)} บาท`,
  ]);

  autoTable(doc, {
    startY: 95,
    head: [['ระยะเวลาผ่อน', 'ค่าผ่อนต่อเดือน']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 35, 102], // Navy
      textColor: [255, 255, 255],
      fontSize: 14,
      fontStyle: 'bold',
    },
    bodyStyles: { fontSize: 12, cellPadding: 8 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 20, right: 20 },
  });

  // Footer
  const currentDate = new Date().toLocaleDateString('th-TH');
  doc.setFontSize(10);
  doc.text(`สร้างเมื่อ: ${currentDate}`, 20, doc.internal.pageSize.height - 20);

  // Save
  doc.save(`ตารางผ่อน_${loanData.model.replace(/\s+/g, '_')}.pdf`);
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('th-TH').format(num);
};

// ✅ เพิ่มฟังก์ชันนี้เพื่อแก้ build error
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000; // ป้องกัน stack overflow ถ้าไฟล์ใหญ่

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }

  return btoa(binary);
};
