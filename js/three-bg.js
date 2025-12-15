/**
 * Vanta.js NET Background Effect
 * Creates an animated mesh network background
 */

(function() {
  // Wait for DOM and Vanta to be ready
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof VANTA !== 'undefined' && VANTA.NET) {
      initVantaBackground();
    } else {
      // Retry after a short delay if Vanta isn't loaded yet
      setTimeout(function() {
        if (typeof VANTA !== 'undefined' && VANTA.NET) {
          initVantaBackground();
        }
      }, 500);
    }
  });

  function initVantaBackground() {
    try {
      VANTA.NET({
        el: "#bg-canvas",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        // Cyber theme colors
        color: 0x00d4ff,        // Primary cyan
        backgroundColor: 0x0a0a0f, // Dark background
        points: 12.00,
        maxDistance: 22.00,
        spacing: 18.00,
        showDots: true
      });
      console.log('Vanta.js NET background initialized');
    } catch (error) {
      console.error('Failed to initialize Vanta.js:', error);
    }
  }
})();
