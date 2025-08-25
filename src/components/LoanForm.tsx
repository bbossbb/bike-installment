
import React, { useState } from 'react';
import { Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface LoanFormProps {
  onCalculate: (data: {
    model: string;
    netFinance: number;
    effectiveRateYear: number;
  }) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    model: '',
    netFinance: '',
    effectiveRateYear: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.model || !formData.netFinance || !formData.effectiveRateYear) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const netFinance = parseFloat(formData.netFinance);
    const effectiveRateYear = parseFloat(formData.effectiveRateYear);

    if (netFinance <= 0 || effectiveRateYear < 0) {
      alert('กรุณากรอกตัวเลขที่ถูกต้อง');
      return;
    }

    onCalculate({
      model: formData.model,
      netFinance,
      effectiveRateYear
    });
  };

  return (
    <Card className="card-elderly max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Calculator className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          คำนวณค่าผ่อนจักรยานยนต์
        </h1>
        <p className="text-2xl md:text-3xl text-muted-foreground">
          กรอกข้อมูลเพื่อคำนวณค่าผ่อนต่อเดือน
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-4">
          <Label htmlFor="model" className="text-2xl md:text-3xl font-semibold text-foreground">
            รุ่นรถจักรยานยนต์
          </Label>
          <Input
            id="model"
            type="text"
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            placeholder="เช่น Honda PCX 160, Yamaha NMAX"
            className="input-elderly"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="netFinance" className="text-2xl md:text-3xl font-semibold text-foreground">
            ราคาตัวรถ (บาท)
          </Label>
          <Input
            id="netFinance"
            type="number"
            value={formData.netFinance}
            onChange={(e) => setFormData(prev => ({ ...prev, netFinance: e.target.value }))}
            placeholder="เช่น 85000"
            className="input-elderly"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="effectiveRateYear" className="text-2xl md:text-3xl font-semibold text-foreground">
            ดอกเบี้ยต่อปี (%)
          </Label>
          <Input
            id="effectiveRateYear"
            type="number"
            step="0.01"
            value={formData.effectiveRateYear}
            onChange={(e) => setFormData(prev => ({ ...prev, effectiveRateYear: e.target.value }))}
            placeholder="เช่น 7.5"
            className="input-elderly"
          />
        </div>

        <Button type="submit" className="btn-primary w-full text-2xl md:text-3xl py-6">
          <Calculator className="w-7 h-7 mr-3" />
          คำนวณค่าผ่อน
        </Button>
      </form>
    </Card>
  );
};

export default LoanForm;
