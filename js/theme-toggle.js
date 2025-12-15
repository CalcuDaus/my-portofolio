/**
 * Theme Toggle Functionality
 * Handles dark/light mode switching with localStorage persistence
 * Updated for Tailwind CSS v4 dark mode (class on html element)
 */

(function() {
  const STORAGE_KEY = 'portfolio-theme';
  const DARK_CLASS = 'dark';
  
  // Get stored theme or check system preference
  function getPreferredTheme() {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    
    // Check system preference - default to dark if prefers dark or no preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    return 'dark';
  }
  
  // Apply theme to document
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains(DARK_CLASS);
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    
    // Update Vanta background if exists
    updateVantaBackground(newTheme);
  }
  
  // Update Vanta.js background based on theme
  function updateVantaBackground(theme) {
    if (window.vantaEffect) {
      const colors = theme === 'dark' 
        ? { 
            color: 0x00d4ff,
            backgroundColor: 0x0a0a0f 
          }
        : { 
            color: 0x7c3aed,
            backgroundColor: 0xf0f4f8 
          };
      
      window.vantaEffect.setOptions(colors);
    }
  }
  
  // Initialize theme
  function init() {
    const preferredTheme = getPreferredTheme();
    applyTheme(preferredTheme);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupToggle);
    } else {
      setupToggle();
    }
  }
  
  // Setup toggle button event listener
  function setupToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }
    
    if (toggleBtnMobile) {
      toggleBtnMobile.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  }
  
  // Export for global access
  window.themeToggle = {
    toggle: toggleTheme,
    get: getPreferredTheme,
    set: applyTheme
  };
  
  // Initialize immediately
  init();
})();
