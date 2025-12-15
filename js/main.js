/**
 * Main JavaScript Module
 * Handles navigation, smooth scroll, mobile menu, and AOS initialization
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // Mobile Menu Toggle
  initMobileMenu();

  // Smooth Scroll for anchor links
  initSmoothScroll();

  // Navbar background on scroll
  initNavbarScroll();

  console.log('Main.js initialized');
});

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Toggle hamburger to X animation
      const icon = menuToggle.querySelector('svg');
      if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        `;
      } else {
        icon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        `;
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        const icon = menuToggle.querySelector('svg');
        icon.innerHTML = `
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        `;
      });
    });
  }
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const navHeight = 64; // Height of fixed navbar
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Add background opacity to navbar on scroll
 */
function initNavbarScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add/remove shadow and adjust background opacity based on scroll
    if (currentScroll > 50) {
      nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

/**
 * Utility: Throttle function for scroll events
 * @param {function} func - Function to throttle
 * @param {number} wait - Wait time in ms
 */
function throttle(func, wait) {
  let timeout = null;
  let previous = 0;
  
  return function() {
    const now = Date.now();
    const remaining = wait - (now - previous);
    const context = this;
    const args = arguments;
    
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(function() {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}
