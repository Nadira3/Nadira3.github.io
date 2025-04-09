// main.js - Site interactivity and contact form functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive elements
  initNavigation();
  initContactForm();
  initAnimations();
  initJournalFilters();
  mermaid.initialize({ startOnLoad: true });
});

// Navigation enhancement
function initNavigation() {
  // Add active class to current nav item
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }

    // Add smooth hover animation
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'color 0.3s ease';
    });
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.navbar-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const navMenu = document.querySelector('.navbar-nav');
      navMenu.classList.toggle('show');
    });
  }
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.querySelector('#contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form input values
      const name = contactForm.querySelector('#name').value;
      const email = contactForm.querySelector('#email').value;
      const message = contactForm.querySelector('#message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Here you would normally send the form data to your server
      // For now, just show a success message
      showFormMessage('Thanks for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }
  
  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Helper function to show form messages
  function showFormMessage(message, type) {
    const messageEl = document.querySelector('.form-message');
    if (messageEl) {
      messageEl.textContent = message;
      messageEl.className = 'form-message ' + type;
      messageEl.style.display = 'block';
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }
}

// Animation enhancements
function initAnimations() {
  // Fade in elements as they scroll into view
  const fadeElements = document.querySelectorAll('.fade-in-scroll');

  if (fadeElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Card hover animations
  const cards = document.querySelectorAll('.card, .project-card, .post-card, .journal-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)';
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)';
    });
  });
}

// Journal category filters
function initJournalFilters() {
  const categoryButtons = document.querySelectorAll('.category-button');
  const journalEntries = document.querySelectorAll('.journal-card');

  if (categoryButtons.length > 0 && journalEntries.length > 0) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.getAttribute('data-category') || this.classList.contains('daily') ? 'daily' : this.classList.contains('special') ? 'special' : 'all';

        // Toggle active state on buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter journal entries
        journalEntries.forEach(entry => {
          if (category === 'all') {
            entry.style.display = 'flex';
          } else {
            const entryCategory = entry.querySelector('.entry-category').textContent.toLowerCase();
            entry.style.display = (entryCategory === category) ? 'flex' : 'none';
          }
        });

        // Animate entries coming into view
        setTimeout(() => {
          journalEntries.forEach(entry => {
            if (entry.style.display !== 'none') {
              entry.classList.add('fade-in');
            }
          });
        }, 100);
      });
    });
  }
}

  document.addEventListener('DOMContentLoaded', function() {
    // Recommendations slider functionality
    const track = document.querySelector('.recommendations-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    // Move to specified slide
    const moveToSlide = (index) => {
      // Update the track transform
      track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
      
      // Update active indicator
      document.querySelector('.indicator.active').classList.remove('active');
      indicators[index].classList.add('active');
      
      // Update current index
      currentIndex = index;
      
      // Optional: Disable prev/next buttons at start/end
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === slides.length - 1;
    };
    
    // Next button click
    nextButton.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        moveToSlide(currentIndex + 1);
      } else {
        // Optional: Loop back to first slide
        moveToSlide(0);
      }
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        moveToSlide(currentIndex - 1);
      } else {
        // Optional: Loop to last slide
        moveToSlide(slides.length - 1);
      }
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        moveToSlide(index);
      });
    });
    
    // Auto-advancing slides (optional)
    let slideInterval = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        moveToSlide(currentIndex + 1);
      } else {
        moveToSlide(0);
      }
    }, 7000); // Change slide every 7 seconds
    
    // Pause auto-advance on hover (optional)
    const slider = document.querySelector('.recommendations-slider');
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        if (currentIndex < slides.length - 1) {
          moveToSlide(currentIndex + 1);
        } else {
          moveToSlide(0);
        }
      }, 7000);
    });
    
    // Initial setup - fixes an issue where the slider might not be properly positioned on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        track.style.transition = 'none';
        moveToSlide(0);
        setTimeout(() => {
          track.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 100);
    });
  });
