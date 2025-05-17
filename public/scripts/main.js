// Plain JavaScript for public scripts folder
// Note: No import statements here since this is loaded as a plain script tag

// Theme toggle functionality
const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const STORAGE_KEY = 'anjaneya-theme-preference';

  // Check for saved theme preference or use system preference
  const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
  const setStoredTheme = (theme) => localStorage.setItem(STORAGE_KEY, theme);

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === 'light') {
      htmlElement.classList.add('light-theme');
      htmlElement.classList.remove('dark-theme-set');
    } else {
      htmlElement.classList.remove('light-theme');
      htmlElement.classList.add('dark-theme-set');
    }
    setStoredTheme(theme);
  };

  // Initialize theme
  const initializeTheme = () => {
    const storedTheme = getStoredTheme();

    if (storedTheme) {
      // If user has a saved preference, use it
      setTheme(storedTheme);
    } else {
      // Otherwise check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const currentTheme = htmlElement.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Check if on mobile device for simplified animations
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

    // Apply GSAP animations if available and not on mobile
    if (typeof window.gsap !== 'undefined' && !isMobile) {
      // Animate the toggle button with a rotation
      window.gsap.to(themeToggle, {
        rotation: '+=180',
        duration: 0.5,
        ease: 'back.out(1.7)'
      });

      // Use minimal elements for animation on mobile
      const contentElements = [
        'body',
        'header'
      ];

      // Fade elements slightly during transition
      window.gsap.to(contentElements, {
        opacity: 0.95,
        duration: 0.15,
        ease: 'power1.out',
        onComplete: () => {
          // Apply the theme class change
          setTheme(newTheme);

          // Animate back to full opacity with the new theme
          window.gsap.to(contentElements, {
            opacity: 1,
            duration: 0.15,
            ease: 'power1.in'
          });
        }
      });
    } else {
      // Simple non-animated theme switch for mobile or when GSAP isn't available
      setTheme(newTheme);
    }

    // If using particles, update particle colors for light/dark mode
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && window.tsParticles) {
      const container = window.tsParticles.domItem(0);
      if (container) {
        // Update particle colors based on theme
        const colors = newTheme === 'light'
          ? ["#4B5563", "#9CA3AF", "#0891B2"] // Light theme colors
          : ["#E5E7EB", "#B0B8C4", "#22D3EE"]; // Dark theme colors

        container.options.particles.color.value = colors;
        container.refresh();
      }
    }
  };

  // Add click event listener to theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Initialize theme on page load
  initializeTheme();

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    // Only apply if user hasn't set a preference
    if (!getStoredTheme()) {
      setTheme(matches ? 'dark' : 'light');
    }
  });
};

// Use DOMContentLoaded again
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme toggle
  initThemeToggle();

  // --- Preloader Fade Out --- 
  // Add 'loaded' class to body after a short delay 
  // to trigger CSS transition for preloader fade-out.
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
  // --- End preloader logic --- 

  // --- Swiper Initialization --- 
  const initSwiper = () => {
    const testimonialSwiper = document.querySelector('.testimonial-swiper');
    if (testimonialSwiper && window.Swiper) {
      new window.Swiper('.testimonial-swiper', {
        loop: true, // Enable continuous loop
        slidesPerView: 1, // Show one slide at a time
        spaceBetween: 30, // Space between slides (if multiple were shown)
        // Configure Autoplay
        autoplay: {
          delay: 7000, // Time between slides
          disableOnInteraction: true, // Stop autoplay on manual interaction
        },
        // Configure Navigation Arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  };

  // Initialize Swiper if it's available (loaded via separate script)
  if (typeof window.Swiper !== 'undefined') {
    initSwiper();
  }
  // --- End Swiper Initialization --- 

  // --- tsParticles Initialization --- 
  // Function to load and configure background particles if available
  const initParticles = async () => {
    // Check if tsParticles is loaded
    if (!window.tsParticles || !window.tsParticles.load) {
      return;
    }

    // Determine if we're in light mode
    const isLightMode = document.documentElement.classList.contains('light-theme');

    // Choose colors based on theme - make colors more vibrant
    const particleColors = isLightMode
      ? ["#3B4965", "#64748B", "#0E7490"] // Enhanced light theme colors - deeper blues
      : ["#E5E7EB", "#CBD5E1", "#38BDF8"]; // Enhanced dark theme colors - added lighter blue

    const linkColor = isLightMode ? "#94A3B8" : "#475569";
    // Increase opacity for more visibility
    const particleOpacity = isLightMode ? { min: 0.15, max: 0.6 } : { min: 0.25, max: 0.8 };

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

    try {
      // Configure particles with reasonable defaults
      await window.tsParticles.load({
        id: "particles-js",
        options: {
          background: {},
          fpsLimit: isMobile ? 30 : 60, // Lower fps on mobile
          interactivity: {
            events: {
              onHover: {
                enable: !isMobile, // Disable hover effects on mobile
                mode: "repulse",
              },
              onClick: {
                enable: false,
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: particleColors,
            },
            links: {
              color: linkColor,
              distance: 150,
              enable: true,
              opacity: isLightMode ? 0.3 : 0.4,
              width: isLightMode ? 1 : 1.2,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: isMobile ? (isLightMode ? 0.4 : 0.6) : (isLightMode ? 0.9 : 1.1), // Much slower on mobile
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: isMobile ? 1600 : 800, // Fewer particles on mobile
              },
              value: isMobile ? (isLightMode ? 30 : 40) : (isLightMode ? 75 : 90), // Much fewer particles on mobile
            },
            opacity: {
              value: particleOpacity,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: isLightMode ? 4 : 5 },
            },
          },
          detectRetina: true,
        }
      });
    } catch (err) {
      console.error("Particle Init Error:", err);
    }
  };

  // Try to initialize particles if tsParticles is available
  if (typeof window.tsParticles !== 'undefined') {
    // Only initialize when needed (on pages with particles container)
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
      initParticles().catch(err => console.error("Particle initialization error:", err));
    }
  }
  // --- End tsParticles Initialization --- 

  // --- Scroll Animations (Intersection Observer) --- 
  // Check if mobile for reduced animations
  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

  // On mobile, we'll add a small delay before setting up animations to prioritize page rendering
  const setupScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
      // Use lower threshold on mobile to trigger animations sooner
      const observerThreshold = isMobile ? 0.05 : 0.1;

      // Create an observer with optimized options for mobile
      const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add .is-visible class to trigger CSS animation
            entry.target.classList.add('is-visible');
            // Stop observing this element once animated
            observerInstance.unobserve(entry.target);
          }
        });
      }, {
        threshold: observerThreshold,
        // Add rootMargin to start loading earlier on mobile (when element is near viewport)
        rootMargin: isMobile ? '50px 0px' : '0px'
      });

      // Start observing each tagged element
      animatedElements.forEach(el => observer.observe(el));
    }
  };

  // On mobile, delay setup slightly to prioritize critical rendering
  if (isMobile) {
    setTimeout(setupScrollAnimations, 500); // Increase timeout on mobile
  } else {
    setupScrollAnimations();
  }
  // --- End Scroll Animations --- 

  // --- Mobile Menu Toggle Logic --- 
  const setupMobileMenu = () => {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('main-menu');

    if (toggleButton && menu) {
      // Preload menu animation to improve performance
      if (typeof window.gsap !== 'undefined') {
        // Use simplified toggle approach for better mobile performance
        toggleButton.addEventListener('click', () => {
          const wasOpen = toggleButton.getAttribute('aria-expanded') === 'true';
          const isOpen = !wasOpen;

          // Update ARIA attribute for accessibility
          toggleButton.setAttribute('aria-expanded', isOpen);

          // Use direct manipulation for better performance on mobile
          if (isOpen) {
            menu.style.display = 'flex';
            menu.classList.add('is-open');
            // Only use GSAP for opacity
            window.gsap.to(menu, { opacity: 1, duration: 0.2 });
          } else {
            window.gsap.to(menu, {
              opacity: 0,
              duration: 0.2,
              onComplete: () => {
                menu.style.display = 'none';
                menu.classList.remove('is-open');
              }
            });
          }
        });
      } else {
        // Fallback for when GSAP is not available
        toggleButton.addEventListener('click', () => {
          const isOpen = menu.classList.toggle('is-open');
          toggleButton.setAttribute('aria-expanded', isOpen);
          menu.style.display = isOpen ? 'flex' : 'none';
        });
      }
    }
  };

  // Call setup functions
  setupMobileMenu();
}); 