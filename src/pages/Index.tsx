
import React, { useState } from 'react';
import LoanForm from '@/components/LoanForm';
import PaymentTable from '@/components/PaymentTable';
import { calculateAllPayments } from '@/utils/loanCalculations';
import { generatePDF } from '@/utils/pdfGenerator';
import { Bike } from 'lucide-react';

interface LoanData {
  model: string;
  netFinance: number;
  effectiveRateYear: number;
}

interface PaymentData {
  months: number;
  payment: number;
}

const Index = () => {
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [payments, setPayments] = useState<PaymentData[]>([]);

  const handleCalculate = (data: LoanData) => {
    console.log('Calculating payments for:', data);
    
    const calculatedPayments = calculateAllPayments(data.netFinance, data.effectiveRateYear);
    console.log('Calculated payments:', calculatedPayments);
    
    setLoanData(data);
    setPayments(calculatedPayments);
  };

  const handleDownloadPDF = () => {
    if (loanData && payments.length > 0) {
      generatePDF({
        ...loanData,
        payments
      });
    }
  };

  const handleReset = () => {
    setLoanData(null);
    setPayments([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary-gradient shadow-float">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <Bike className="w-14 h-14 text-primary-foreground mr-4" />
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                ระบบคำนวณค่าผ่อนจักรยานยนต์
              </h1>
              <p className="text-2xl md:text-3xl text-primary-foreground/90">
                สำหรับร้านค้าจักรยานยนต์
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!loanData ? (
          <LoanForm onCalculate={handleCalculate} />
        ) : (
          <>
            <PaymentTable
              model={loanData.model}
              netFinance={loanData.netFinance}
              effectiveRateYear={loanData.effectiveRateYear}
              payments={payments}
              onDownloadPDF={handleDownloadPDF}
            />
            
            <div className="text-center">
              <button 
                onClick={handleReset}
                className="text-2xl md:text-3xl text-accent hover:text-accent/80 underline transition-colors"
              >
                คำนวณใหม่อีกครั้ง
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-2xl md:text-3xl text-muted-foreground">
            ระบบคำนวณค่าผ่อนจักรยานยนต์ | ออกแบบเพื่อความง่ายในการใช้งาน
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
