/**
 * Charts Rendering Module
 * Handles Chart.js initialization and updates for all calculators
 */

const ChartsModule = {
  charts: {},
  
  // Chart.js default configuration with dark theme
  defaultOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#94a3b8',
          font: {
            family: 'Inter',
            size: 12
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 15, 25, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let value = context.raw;
            return context.label + ': ' + Formulas.formatRupiah(value);
          }
        }
      }
    }
  },

  // Color palette for charts
  colors: {
    primary: '#00d4ff',
    secondary: '#7c3aed',
    accent: '#f472b6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444'
  },

  /**
   * Initialize PPh 21 Chart (Doughnut)
   */
  initPPhChart: function() {
    const ctx = document.getElementById('pph-chart');
    if (!ctx) return;

    this.charts.pph = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Take Home', 'PPh 21'],
        datasets: [{
          data: [0, 0],
          backgroundColor: [this.colors.primary, this.colors.secondary],
          borderColor: 'rgba(10, 10, 15, 1)',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        ...this.defaultOptions,
        cutout: '65%'
      }
    });
  },

  /**
   * Initialize KPR Chart (Doughnut)
   */
  initKPRChart: function() {
    const ctx = document.getElementById('kpr-chart');
    if (!ctx) return;

    this.charts.kpr = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pokok Pinjaman', 'Total Bunga'],
        datasets: [{
          data: [0, 0],
          backgroundColor: [this.colors.primary, this.colors.secondary],
          borderColor: 'rgba(10, 10, 15, 1)',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        ...this.defaultOptions,
        cutout: '65%'
      }
    });
  },

  /**
   * Initialize Freelance Chart (Doughnut)
   */
  initFreelanceChart: function() {
    const ctx = document.getElementById('freelance-chart');
    if (!ctx) return;

    this.charts.freelance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Pengeluaran', 'Tabungan'],
        datasets: [{
          data: [0, 0],
          backgroundColor: [this.colors.accent, this.colors.success],
          borderColor: 'rgba(10, 10, 15, 1)',
          borderWidth: 3,
          hoverOffset: 4
        }]
      },
      options: {
        ...this.defaultOptions,
        cutout: '65%'
      }
    });
  },

  /**
   * Update PPh 21 Chart
   * @param {object} result - Calculation result from Formulas.calculatePPh21
   */
  updatePPhChart: function(result) {
    if (!this.charts.pph) return;

    this.charts.pph.data.datasets[0].data = [
      result.takeHome,
      result.yearlyTax
    ];
    this.charts.pph.update('none');
  },

  /**
   * Update KPR Chart
   * @param {object} result - Calculation result from Formulas.calculateKPR
   */
  updateKPRChart: function(result) {
    if (!this.charts.kpr) return;

    this.charts.kpr.data.datasets[0].data = [
      result.principal,
      result.totalInterest
    ];
    this.charts.kpr.update('none');
  },

  /**
   * Update Freelance Chart
   * @param {object} result - Calculation result from Formulas.calculateFreelanceRate
   */
  updateFreelanceChart: function(result) {
    if (!this.charts.freelance) return;

    this.charts.freelance.data.datasets[0].data = [
      result.monthlyExpenses,
      result.monthlySavings
    ];
    this.charts.freelance.update('none');
  },

  /**
   * Initialize all charts
   */
  init: function() {
    this.initPPhChart();
    this.initKPRChart();
    this.initFreelanceChart();
    console.log('Charts module initialized');
  }
};

// Export for use in other modules
window.ChartsModule = ChartsModule;
