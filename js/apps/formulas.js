/**
 * Financial Formulas Module
 * Contains all calculation logic for PPh 21, KPR, and Freelance Rate
 */

const Formulas = {
  /**
   * Calculate PPh 21 (Indonesian Income Tax)
   * Uses 2024 progressive tax brackets
   * 
   * @param {number} grossIncome - Annual gross income
   * @param {number} ptkp - Tax-free income threshold
   * @returns {object} - Tax calculation breakdown
   */
  calculatePPh21: function(grossIncome, ptkp) {
    // Calculate taxable income (PKP)
    const pkp = Math.max(0, grossIncome - ptkp);
    
    // Progressive tax brackets (2024)
    // 5%  for 0 - 60,000,000
    // 15% for 60,000,001 - 250,000,000
    // 25% for 250,000,001 - 500,000,000
    // 30% for 500,000,001 - 5,000,000,000
    // 35% for > 5,000,000,000
    
    let tax = 0;
    let remaining = pkp;
    const brackets = [];
    
    // Bracket 1: 5%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 60000000);
      const bracketTax = taxable * 0.05;
      tax += bracketTax;
      remaining -= taxable;
      if (taxable > 0) {
        brackets.push({ rate: '5%', amount: taxable, tax: bracketTax });
      }
    }
    
    // Bracket 2: 15%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 190000000); // 250jt - 60jt
      const bracketTax = taxable * 0.15;
      tax += bracketTax;
      remaining -= taxable;
      if (taxable > 0) {
        brackets.push({ rate: '15%', amount: taxable, tax: bracketTax });
      }
    }
    
    // Bracket 3: 25%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 250000000); // 500jt - 250jt
      const bracketTax = taxable * 0.25;
      tax += bracketTax;
      remaining -= taxable;
      if (taxable > 0) {
        brackets.push({ rate: '25%', amount: taxable, tax: bracketTax });
      }
    }
    
    // Bracket 4: 30%
    if (remaining > 0) {
      const taxable = Math.min(remaining, 4500000000); // 5M - 500jt
      const bracketTax = taxable * 0.30;
      tax += bracketTax;
      remaining -= taxable;
      if (taxable > 0) {
        brackets.push({ rate: '30%', amount: taxable, tax: bracketTax });
      }
    }
    
    // Bracket 5: 35%
    if (remaining > 0) {
      const bracketTax = remaining * 0.35;
      tax += bracketTax;
      brackets.push({ rate: '35%', amount: remaining, tax: bracketTax });
    }
    
    return {
      grossIncome: grossIncome,
      ptkp: ptkp,
      pkp: pkp,
      yearlyTax: Math.round(tax),
      monthlyTax: Math.round(tax / 12),
      takeHome: grossIncome - tax,
      brackets: brackets,
      effectiveRate: pkp > 0 ? ((tax / pkp) * 100).toFixed(2) : 0
    };
  },

  /**
   * Calculate KPR (Mortgage) with fixed interest rate
   * Uses annuity formula for monthly payment
   * 
   * @param {number} propertyPrice - Property price
   * @param {number} dpPercent - Down payment percentage
   * @param {number} yearlyRate - Annual interest rate (percentage)
   * @param {number} tenorYears - Loan term in years
   * @returns {object} - Mortgage calculation breakdown
   */
  calculateKPR: function(propertyPrice, dpPercent, yearlyRate, tenorYears) {
    // Calculate loan principal
    const downPayment = propertyPrice * (dpPercent / 100);
    const principal = propertyPrice - downPayment;
    
    // Convert to monthly rate and months
    const monthlyRate = (yearlyRate / 100) / 12;
    const months = tenorYears * 12;
    
    // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    let monthlyPayment = 0;
    let totalInterest = 0;
    
    if (monthlyRate > 0 && months > 0) {
      const factor = Math.pow(1 + monthlyRate, months);
      monthlyPayment = principal * (monthlyRate * factor) / (factor - 1);
      
      // Calculate totals
      const totalPayment = monthlyPayment * months;
      totalInterest = totalPayment - principal;
    }
    
    return {
      propertyPrice: propertyPrice,
      downPayment: Math.round(downPayment),
      principal: Math.round(principal),
      monthlyRate: monthlyRate,
      tenorMonths: months,
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(monthlyPayment * months),
      totalInterest: Math.round(totalInterest),
      interestRatio: principal > 0 ? ((totalInterest / principal) * 100).toFixed(1) : 0
    };
  },

  /**
   * Calculate Freelance Hourly Rate
   * 
   * @param {number} monthlyExpenses - Monthly living expenses
   * @param {number} monthlySavings - Target monthly savings
   * @param {number} billableHours - Expected billable hours per month
   * @returns {object} - Rate calculation breakdown
   */
  calculateFreelanceRate: function(monthlyExpenses, monthlySavings, billableHours) {
    // Calculate target income
    const targetIncome = monthlyExpenses + monthlySavings;
    
    // Calculate hourly rate
    const hourlyRate = billableHours > 0 ? targetIncome / billableHours : 0;
    
    // Calculate daily rate (8-hour day)
    const dailyRate = hourlyRate * 8;
    
    // Calculate suggested project rates
    const weeklyRate = hourlyRate * 40; // 40-hour week
    
    return {
      monthlyExpenses: monthlyExpenses,
      monthlySavings: monthlySavings,
      targetIncome: Math.round(targetIncome),
      billableHours: billableHours,
      hourlyRate: Math.round(hourlyRate),
      dailyRate: Math.round(dailyRate),
      weeklyRate: Math.round(weeklyRate),
      // Suggested ranges (with buffer)
      minHourlyRate: Math.round(hourlyRate * 0.9),
      maxHourlyRate: Math.round(hourlyRate * 1.3)
    };
  },

  /**
   * Format number to Indonesian Rupiah
   * @param {number} amount - Amount to format
   * @returns {string} - Formatted currency string
   */
  formatRupiah: function(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
};

// Export for use in other modules
window.Formulas = Formulas;
