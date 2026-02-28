// Boltons Media - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  
  // Navigation scroll effect
  const nav = document.querySelector('.nav');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      nav.style.background = 'rgba(255, 255, 255, 0.98)';
      nav.style.backdropFilter = 'blur(20px)';
      nav.style.boxShadow = '0 1px 30px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.boxShadow = 'none';
    }

    lastScrollTop = scrollTop;
  });

  // Category filter functionality
  const categoryPills = document.querySelectorAll('.category-pill');
  const contentCards = document.querySelectorAll('.card');

  categoryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      // Remove active class from all pills
      categoryPills.forEach(p => p.classList.remove('active'));
      // Add active class to clicked pill
      this.classList.add('active');
      
      const filterCategory = this.textContent.toLowerCase();
      
      // Filter content (basic implementation)
      contentCards.forEach(card => {
        const cardCategory = card.querySelector('.card-category');
        if (filterCategory === 'all' || filterCategory === 'all books' || filterCategory === 'all shows' || filterCategory === 'latest') {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else if (cardCategory) {
          const cardCategoryText = cardCategory.textContent.toLowerCase();
          if (cardCategoryText.includes(filterCategory) || filterCategory.includes(cardCategoryText)) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.opacity = '0.3';
          }
        }
      });
    });
  });

  // Card hover animations
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
    });
  });

  // Newsletter form handling
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('.newsletter-input').value;
      
      if (email) {
        // Simulate subscription
        const button = this.querySelector('.newsletter-btn');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#22c55e';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
        }, 2000);
      }
    });
  });

  // Search functionality (basic)
  const searchButtons = document.querySelectorAll('.nav-search');
  searchButtons.forEach(button => {
    button.addEventListener('click', function() {
      const searchOverlay = createSearchOverlay();
      document.body.appendChild(searchOverlay);
      
      // Focus on search input
      setTimeout(() => {
        searchOverlay.querySelector('.search-input').focus();
      }, 100);
    });
  });

  function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
      max-width: 600px;
      width: 90%;
      text-align: center;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.className = 'search-input';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search books, articles, podcasts...';
    searchInput.style.cssText = `
      width: 100%;
      padding: 1.5rem 2rem;
      font-size: 1.5rem;
      border: 2px solid #e5e5e5;
      background: white;
      border-radius: 0;
      outline: none;
      transition: border-color 0.3s ease;
    `;
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'ESC';
    closeButton.style.cssText = `
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: none;
      border: 1px solid #e5e5e5;
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-size: 0.875rem;
      letter-spacing: 0.1em;
    `;
    
    searchContainer.appendChild(searchInput);
    overlay.appendChild(searchContainer);
    overlay.appendChild(closeButton);
    
    // Close functionality
    function closeSearch() {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300);
    }
    
    closeButton.addEventListener('click', closeSearch);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSearch();
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSearch();
    });
    
    // Fade in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    return overlay;
  }

  // Podcast player controls (basic simulation)
  const playButtons = document.querySelectorAll('.podcast-play, .player-btn-play');
  playButtons.forEach(button => {
    button.addEventListener('click', function() {
      const playIcon = this.querySelector('svg path');
      const isPaused = playIcon && playIcon.getAttribute('d').includes('M8 5v14l11-7z');
      
      if (isPaused) {
        // Change to pause icon
        if (playIcon) {
          playIcon.setAttribute('d', 'M6 4h4v16H6V4zm8 0h4v16h-4V4z');
        }
        // Simulate playing
        animateProgress();
      } else {
        // Change to play icon
        if (playIcon) {
          playIcon.setAttribute('d', 'M8 5v14l11-7z');
        }
      }
    });
  });

  function animateProgress() {
    const progressBar = document.querySelector('.player-bar-fill');
    if (progressBar) {
      let width = parseInt(progressBar.style.width) || 35;
      const interval = setInterval(() => {
        if (width < 100) {
          width += 0.5;
          progressBar.style.width = width + '%';
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Loading animation stagger
  const animatedCards = document.querySelectorAll('.card');
  animatedCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * (index + 1));
  });

  // Add reading progress for article pages
  if (document.querySelector('.article-body')) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: #1a1a1a;
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
      const article = document.querySelector('.article-body');
      if (article) {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const progress = Math.min(
          Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
          1
        );
        
        progressBar.style.width = (progress * 100) + '%';
      }
    });
  }

  // CTA button interactions
  const ctaButtons = document.querySelectorAll('.nav-cta, .btn-primary');
  ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });

  console.log('🎭 Boltons Media platform loaded successfully');
});

// Utility function for throttling scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}