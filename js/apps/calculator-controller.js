/**
 * Calculator Controller Module
 * Handles tab switching, input events, and export functionality
 */

const CalculatorController = {
  /**
   * Initialize tab switching functionality
   */
  initTabs: function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTab = this.dataset.tab;

        // Update active state on buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Show/hide content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === targetTab + '-content') {
            content.classList.add('active');
          }
        });
      });
    });
  },

  /**
   * Initialize PPh 21 Calculator
   */
  initPPhCalculator: function() {
    const calcButton = document.getElementById('calc-pph');
    const grossInput = document.getElementById('pph-gross');
    const ptkpSelect = document.getElementById('pph-ptkp');
    
    if (!calcButton || !grossInput || !ptkpSelect) return;

    const calculateAndUpdate = () => {
      const gross = parseFloat(grossInput.value) || 0;
      const ptkp = parseFloat(ptkpSelect.value) || 54000000;

      if (gross > 0) {
        const result = Formulas.calculatePPh21(gross, ptkp);
        
        // Update DOM
        document.getElementById('pph-yearly').textContent = Formulas.formatRupiah(result.yearlyTax);
        document.getElementById('pph-monthly').textContent = Formulas.formatRupiah(result.monthlyTax);
        
        // Update Chart
        ChartsModule.updatePPhChart(result);
      }
    };

    calcButton.addEventListener('click', calculateAndUpdate);
    
    // Real-time calculation on input
    grossInput.addEventListener('input', calculateAndUpdate);
    ptkpSelect.addEventListener('change', calculateAndUpdate);
  },

  /**
   * Initialize KPR Calculator
   */
  initKPRCalculator: function() {
    const calcButton = document.getElementById('calc-kpr');
    const priceInput = document.getElementById('kpr-price');
    const dpInput = document.getElementById('kpr-dp');
    const rateInput = document.getElementById('kpr-rate');
    const tenorInput = document.getElementById('kpr-tenor');
    
    if (!calcButton || !priceInput) return;

    const calculateAndUpdate = () => {
      const price = parseFloat(priceInput.value) || 0;
      const dp = parseFloat(dpInput.value) || 20;
      const rate = parseFloat(rateInput.value) || 8.5;
      const tenor = parseFloat(tenorInput.value) || 15;

      if (price > 0) {
        const result = Formulas.calculateKPR(price, dp, rate, tenor);
        
        // Update DOM
        document.getElementById('kpr-monthly').textContent = Formulas.formatRupiah(result.monthlyPayment);
        document.getElementById('kpr-loan').textContent = Formulas.formatRupiah(result.principal);
        document.getElementById('kpr-interest').textContent = Formulas.formatRupiah(result.totalInterest);
        
        // Update Chart
        ChartsModule.updateKPRChart(result);
      }
    };

    calcButton.addEventListener('click', calculateAndUpdate);
    
    // Real-time calculation on input
    [priceInput, dpInput, rateInput, tenorInput].forEach(input => {
      input.addEventListener('input', calculateAndUpdate);
    });
  },

  /**
   * Initialize Freelance Rate Calculator
   */
  initFreelanceCalculator: function() {
    const calcButton = document.getElementById('calc-freelance');
    const expenseInput = document.getElementById('fl-expense');
    const savingsInput = document.getElementById('fl-savings');
    const hoursInput = document.getElementById('fl-hours');
    
    if (!calcButton || !expenseInput) return;

    const calculateAndUpdate = () => {
      const expense = parseFloat(expenseInput.value) || 0;
      const savings = parseFloat(savingsInput.value) || 0;
      const hours = parseFloat(hoursInput.value) || 120;

      if (expense > 0 || savings > 0) {
        const result = Formulas.calculateFreelanceRate(expense, savings, hours);
        
        // Update DOM
        document.getElementById('fl-hourly').textContent = Formulas.formatRupiah(result.hourlyRate);
        document.getElementById('fl-daily').textContent = Formulas.formatRupiah(result.dailyRate);
        document.getElementById('fl-target').textContent = Formulas.formatRupiah(result.targetIncome);
        
        // Update Chart
        ChartsModule.updateFreelanceChart(result);
      }
    };

    calcButton.addEventListener('click', calculateAndUpdate);
    
    // Real-time calculation on input
    [expenseInput, savingsInput, hoursInput].forEach(input => {
      input.addEventListener('input', calculateAndUpdate);
    });
  },

  /**
   * Initialize Export functionality using html2canvas
   */
  initExport: function() {
    // Export PPh Result
    const exportPph = document.getElementById('export-pph');
    if (exportPph) {
      exportPph.addEventListener('click', () => {
        this.exportToImage('pph-result', 'PPh21-Result.png');
      });
    }

    // Export KPR Result
    const exportKpr = document.getElementById('export-kpr');
    if (exportKpr) {
      exportKpr.addEventListener('click', () => {
        this.exportToImage('kpr-result', 'KPR-Result.png');
      });
    }

    // Export Freelance Result
    const exportFreelance = document.getElementById('export-freelance');
    if (exportFreelance) {
      exportFreelance.addEventListener('click', () => {
        this.exportToImage('freelance-result', 'Freelance-Rate-Result.png');
      });
    }
  },

  /**
   * Export element to PNG image
   * @param {string} elementId - ID of the element to capture
   * @param {string} filename - Name of the downloaded file
   */
  exportToImage: function(elementId, filename) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Show loading state
    const originalHTML = element.innerHTML;
    
    html2canvas(element, {
      backgroundColor: '#0a0a0f',
      scale: 2,
      logging: false,
      useCORS: true
    }).then(canvas => {
      // Create download link
      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(error => {
      console.error('Export failed:', error);
      alert('Gagal mengekspor gambar. Silakan coba lagi.');
    });
  },

  /**
   * Initialize all calculator functionality
   */
  init: function() {
    this.initTabs();
    this.initPPhCalculator();
    this.initKPRCalculator();
    this.initFreelanceCalculator();
    this.initExport();
    console.log('Calculator controller initialized');
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts first
  ChartsModule.init();
  
  // Then initialize calculator controller
  CalculatorController.init();
});

// Export for use in other modules
window.CalculatorController = CalculatorController;
