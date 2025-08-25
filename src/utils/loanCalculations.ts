
// PMT function similar to Excel's PMT
export const calculatePMT = (rate: number, nper: number, pv: number): number => {
  if (rate === 0) {
    return -pv / nper;
  }
  
  const denominator = 1 - Math.pow(1 + rate, -nper);
  return -(rate * pv) / denominator;
};

// Calculate monthly payment using the Excel PMT formula
export const calculateMonthlyPayment = (
  netFinance: number,
  effectiveRateYear: number,
  months: number
): number => {
  const monthlyRate = effectiveRateYear / 100 / 12; // Convert percentage to decimal and divide by 12
  const payment = calculatePMT(monthlyRate, months, netFinance);
  
  // Round down as specified in the requirement
  return Math.floor(payment);
};

// Calculate payments for all standard terms
export const calculateAllPayments = (netFinance: number, effectiveRateYear: number) => {
  const terms = [12, 18, 24, 30, 36, 42, 48];
  
  return terms.map(months => ({
    months,
    payment: calculateMonthlyPayment(netFinance, effectiveRateYear, months)
  }));
};
