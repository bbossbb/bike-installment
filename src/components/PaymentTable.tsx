
import React from 'react';
import { Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PaymentData {
  months: number;
  payment: number;
}

interface PaymentTableProps {
  model: string;
  netFinance: number;
  effectiveRateYear: number;
  payments: PaymentData[];
  onDownloadPDF: () => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  model,
  netFinance,
  effectiveRateYear,
  payments,
  onDownloadPDF
}) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('th-TH').format(num);
  };

  const effectiveRateMonth = (effectiveRateYear / 12).toFixed(4);

  return (
    <Card className="card-elderly max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-accent" />
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
          ตารางค่าผ่อนรายเดือน
        </h2>
        
        <div className="bg-accent/10 rounded-xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-1">รุ่นรถ</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{model}</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-1">ราคาตัวรถ</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                ฿{formatNumber(netFinance)}
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-1">ดอกเบี้ย/ปี</p>
              <p className="text-2xl md:text-3xl font-bold text-accent">
                {effectiveRateYear}% ({effectiveRateMonth}%/เดือน)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full" aria-label="ตารางค่าผ่อนรายเดือน">
          <thead>
            <tr className="border-b-2 border-primary/20">
              <th className="text-2xl md:text-3xl font-bold text-primary py-5 px-6 text-center">
                ระยะเวลาผ่อน
              </th>
              <th className="text-2xl md:text-3xl font-bold text-primary py-5 px-6 text-center">
                ค่าผ่อนต่อเดือน
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr 
                key={payment.months}
                className={`border-b border-border hover:bg-accent/5 transition-colors ${
                  index % 2 === 0 ? 'bg-muted/30' : 'bg-card'
                }`}
              >
            <td className="text-2xl md:text-3xl text-center py-7 px-6 font-semibold text-foreground">
              {payment.months} เดือน
            </td>
            <td className="text-3xl md:text-4xl text-center py-7 px-6 font-bold text-success">
              ฿{formatNumber(payment.payment)}
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Button onClick={onDownloadPDF} className="btn-accent text-2xl md:text-3xl py-6">
          <Download className="w-7 h-7 mr-3" />
          ดาวน์โหลด PDF
        </Button>
      </div>
    </Card>
  );
};

export default PaymentTable;
