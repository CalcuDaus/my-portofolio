/**
 * Skeleton Loading Controller
 * Handles lazy image loading with skeleton placeholders
 * and page-level skeleton loading states
 */

(function () {
  'use strict';

  /**
   * Initialize skeleton loading system
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupLoading);
    } else {
      setupLoading();
    }
  }

  /**
   * Setup all loading handlers
   */
  function setupLoading() {
    // Handle lazy loaded images
    initLazyImages();
    
    // Handle content skeleton loading
    initContentSkeletons();
    
    // Remove page loading class after initial load
    removePageLoadingState();
    
    console.log('Skeleton loading initialized');
  }

  /**
   * Initialize lazy image loading with smooth fade-in
   */
  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
      // If image is already loaded (cached)
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        hideImageSkeleton(img);
      } else {
        // Add load event listener
        img.addEventListener('load', function() {
          this.classList.add('loaded');
          hideImageSkeleton(this);
        });
        
        // Handle error case
        img.addEventListener('error', function() {
          this.classList.add('loaded'); // Still show something
          hideImageSkeleton(this);
        });
      }
    });
  }

  /**
   * Hide skeleton placeholder for an image
   */
  function hideImageSkeleton(img) {
    const container = img.closest('.lazy-image-container');
    if (container) {
      const skeleton = container.querySelector('.skeleton-placeholder');
      if (skeleton) {
        skeleton.classList.add('hidden');
      }
    }
  }

  /**
   * Initialize content skeleton loading
   */
  function initContentSkeletons() {
    const contentElements = document.querySelectorAll('.content-loading');
    
    contentElements.forEach(el => {
      // Simulate content loading (in real app, this would be after data fetch)
      setTimeout(() => {
        el.classList.add('loaded');
      }, 500);
    });
  }

  /**
   * Remove page loading state after initial content is ready
   */
  function removePageLoadingState() {
    // Remove loading class from body to reveal content
    document.body.classList.remove('loading');
    
    // Also check when all images in viewport have loaded
    window.addEventListener('load', function() {
      document.body.classList.add('fully-loaded');
    });
  }

  /**
   * Create skeleton element dynamically
   * @param {string} type - Type of skeleton (text, avatar, card, icon, image)
   * @param {object} options - Additional options
   */
  function createSkeleton(type = 'text', options = {}) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    
    switch (type) {
      case 'text':
        skeleton.classList.add('skeleton-text');
        if (options.width) skeleton.style.width = options.width;
        break;
      case 'text-sm':
        skeleton.classList.add('skeleton-text-sm');
        if (options.width) skeleton.style.width = options.width;
        break;
      case 'text-lg':
        skeleton.classList.add('skeleton-text-lg');
        if (options.width) skeleton.style.width = options.width;
        break;
      case 'title':
        skeleton.classList.add('skeleton-title');
        break;
      case 'avatar':
        skeleton.classList.add('skeleton-avatar');
        skeleton.style.width = options.size || '120px';
        skeleton.style.height = options.size || '120px';
        break;
      case 'card':
        skeleton.classList.add('skeleton-card');
        break;
      case 'icon':
        skeleton.classList.add('skeleton-icon');
        break;
      case 'image':
        skeleton.classList.add('skeleton-image');
        break;
      case 'button':
        skeleton.classList.add('skeleton-button');
        break;
    }
    
    return skeleton;
  }

  /**
   * Show skeleton loading for a container
   * @param {HTMLElement} container - Container element
   * @param {string} type - Type of content being loaded
   */
  function showSkeleton(container, type = 'card') {
    container.classList.add('content-loading');
    
    const overlay = document.createElement('div');
    overlay.className = 'skeleton-overlay';
    
    // Add appropriate skeleton based on type
    switch (type) {
      case 'profile':
        overlay.innerHTML = `
          <div class="skeleton-profile">
            <div class="skeleton skeleton-avatar" style="width: 120px; height: 120px;"></div>
            <div class="skeleton skeleton-title" style="width: 60%;"></div>
            <div class="skeleton skeleton-text" style="width: 40%;"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
          </div>
        `;
        break;
      case 'tech':
        overlay.innerHTML = `
          <div class="flex flex-col items-center gap-3 justify-center h-full">
            <div class="skeleton skeleton-tech-icon"></div>
            <div class="skeleton skeleton-text-sm" style="width: 60%;"></div>
          </div>
        `;
        break;
      case 'project':
        overlay.innerHTML = `
          <div class="flex flex-col justify-end h-full gap-3">
            <div class="flex gap-2">
              <div class="skeleton skeleton-text-sm" style="width: 60px;"></div>
              <div class="skeleton skeleton-text-sm" style="width: 50px;"></div>
            </div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text" style="width: 90%;"></div>
            <div class="skeleton skeleton-text" style="width: 70%;"></div>
          </div>
        `;
        break;
      default:
        overlay.innerHTML = `
          <div class="skeleton skeleton-icon"></div>
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-text" style="width: 90%;"></div>
          <div class="skeleton skeleton-text" style="width: 70%;"></div>
        `;
    }
    
    container.appendChild(overlay);
  }

  /**
   * Hide skeleton loading for a container
   * @param {HTMLElement} container - Container element
   */
  function hideSkeleton(container) {
    container.classList.add('loaded');
    
    // Remove overlay after animation
    setTimeout(() => {
      const overlay = container.querySelector('.skeleton-overlay');
      if (overlay) {
        overlay.remove();
      }
      container.classList.remove('content-loading');
    }, 400);
  }

  // Export for global access
  window.skeletonLoader = {
    createSkeleton,
    showSkeleton,
    hideSkeleton,
    init
  };

  // Initialize immediately
  init();
})();
