// Import GSAP (This will work once Node.js is installed)
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Remove the custom cursor styles import
// import '../styles/cursor.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// Import tsParticles engine and slim preset
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // loads tsparticles v3

// Import Swiper core and required modules
import Swiper from 'swiper';
import { Navigation, Autoplay, EffectCreative } from 'swiper/modules';

// For now, we'll use script tags in the layout for GSAP

// Add link prefetching for faster page transitions
const initLinkPrefetch = () => {
  // Don't prefetch if the user prefers reduced data usage
  if (navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType.includes('2g'))) {
    return;
  }

  const prefetchLinks = document.querySelectorAll('a[href^="/"]:not([prefetch="false"])');
  const prefetched = new Set();

  // Observe links
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target.getAttribute('href');

        if (!prefetched.has(link)) {
          // Create prefetch element
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = link;
          document.head.appendChild(prefetch);

          prefetched.add(link);
          // Stop observing this link
          observer.unobserve(entry.target);
        }
      }
    });
  });

  // Observe each link
  prefetchLinks.forEach(link => {
    observer.observe(link);
  });
};

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

    // Apply GSAP animations if available
    if (typeof gsap !== 'undefined') {
      // Animate the toggle button with a rotation
      if (themeToggle) {
        gsap.to(themeToggle, {
          rotation: '+=180',
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      }

      // Animate page elements for smooth transition
      const contentElements = [];

      // Query each element type separately and add to array if it exists
      const body = document.querySelector('body');
      if (body) contentElements.push(body);

      const header = document.querySelector('header');
      if (header) contentElements.push(header);

      const logoText = document.querySelector('.logo-text');
      if (logoText) contentElements.push(logoText);

      // Add only elements that exist to our array
      ['h1', 'h2', 'h3', 'p'].forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length) elements.forEach(el => contentElements.push(el));
      });

      const buttons = document.querySelectorAll('.btn');
      if (buttons.length) buttons.forEach(btn => contentElements.push(btn));

      const inputs = document.querySelectorAll('input');
      if (inputs.length) inputs.forEach(input => contentElements.push(input));

      const textareas = document.querySelectorAll('textarea');
      if (textareas.length) textareas.forEach(textarea => contentElements.push(textarea));

      // Only animate if we have elements to animate
      if (contentElements.length > 0) {
        // Fade elements slightly during transition
        gsap.to(contentElements, {
          opacity: 0.92,
          duration: 0.2,
          ease: 'power1.out',
          onComplete: () => {
            // Apply the theme class change
            setTheme(newTheme);

            // Animate back to full opacity with the new theme
            gsap.to(contentElements, {
              opacity: 1,
              duration: 0.3,
              delay: 0.1,
              ease: 'power1.in'
            });
          }
        });
      } else {
        // No elements to animate, just change the theme
        setTheme(newTheme);
      }
    } else {
      // Fallback for when GSAP is not available
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

// Add magnetic effect to interactive elements
const initMagneticElements = () => {
  const magneticElements = document.querySelectorAll('.magnetic-element');

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', e => {
      // Get element dimensions and position
      const rect = element.getBoundingClientRect();

      // Calculate mouse position relative to the element's center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center (normalized)
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate movement amount (max 10px)
      const moveX = distanceX * 10;
      const moveY = distanceY * 10;

      // Apply transformation
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Reset position on mouse leave
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  });
};

// Initialize GSAP safety
const ensureGSAP = () => {
  // Make sure GSAP is registered correctly
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      // Force re-register ScrollTrigger globally
      gsap.registerPlugin(ScrollTrigger);

      // Make sure GSAP and ScrollTrigger are available globally
      window.gsap = gsap;
      window.ScrollTrigger = ScrollTrigger;

      // Set initialization flag to true
      window.gsapInitialized = true;

      // Dispatch event for components that might be waiting
      document.dispatchEvent(new CustomEvent('gsap-ready'));

      console.log("GSAP ScrollTrigger registered globally");
      return true;
    } catch (e) {
      console.error("Error registering ScrollTrigger:", e);
    }
  } else {
    console.warn("GSAP or ScrollTrigger not available");
  }
  return false;
};

// Function to load and configure background particles
const initParticles = async () => {
  // Check if particles container exists
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) {
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

  try {
    // Load the slim preset (contains necessary features)
    await loadSlim(tsParticles);
    // Load configuration onto the #particles-js canvas
    await tsParticles.load({
      id: "particles-js",
      options: {
        fullScreen: {
          enable: false, // Disable fullscreen to prevent overflow issues
          zIndex: -1
        },
        background: {},
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: false,
              mode: "push",
            },
          },
          modes: {
            repulse: {
              distance: 100, // Increased interaction distance
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
            opacity: isLightMode ? 0.3 : 0.4, // Increased link opacity
            width: isLightMode ? 1 : 1.2, // Slightly thicker lines in dark mode
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: isLightMode ? 0.9 : 1.1, // Slightly faster in dark mode
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800, // Smaller area means more particles
            },
            value: isLightMode ? 75 : 90, // Increased number of particles
          },
          opacity: {
            value: particleOpacity,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: isLightMode ? 4 : 5 }, // Slightly larger particles in dark mode
          },
        },
        detectRetina: true,
      }
    });

    // Make particles available to the theme toggle
    window.tsParticles = tsParticles;

  } catch (err) {
    console.error("Particle Init Error:", err);
  }
};

// Initialize scroll animations with Intersection Observer
const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (animatedElements.length > 0) {
    // Create an observer to watch for elements entering the viewport
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        // If element is at least 10% visible
        if (entry.isIntersecting) {
          // Add .is-visible class to trigger CSS animation
          entry.target.classList.add('is-visible');
          // Stop observing this element once animated
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // % of element visibility needed to trigger
    });
    // Start observing each tagged element
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
};

// Set up mobile menu
const setupMobileMenu = () => {
  const toggleButton = document.querySelector('.mobile-menu-toggle');
  const menu = document.getElementById('main-menu');

  if (toggleButton && menu) {
    // Add click listener to the toggle button
    toggleButton.addEventListener('click', () => {
      // Toggle the .is-open class on the menu element
      const isOpen = menu.classList.toggle('is-open');
      // Update ARIA attribute for accessibility
      toggleButton.setAttribute('aria-expanded', isOpen);
    });
  }
};

// iOS-specific fixes
const applyIOSFixes = () => {
  // Check if running on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    // Get the AI superscript element
    const supAI = document.querySelector('.sup-ai');

    if (supAI) {
      // Apply iOS-specific fixes
      supAI.style.display = 'inline-block';
      supAI.style.webkitTransform = 'translateZ(0)';
      supAI.style.transform = 'translateZ(0)';
    }
  }
};

// Initialize all features on page load
const initializeFeatures = () => {
  // Core functionality
  initLinkPrefetch();
  initMagneticElements();
  initThemeToggle();
  ensureGSAP();
  setupMobileMenu();
  initScrollAnimations();

  // Apply magnetic effect to buttons
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-arrow');
  buttons.forEach(button => {
    button.classList.add('magnetic-element');
  });

  // Background particles
  initParticles().catch(err => console.error("Particle initialization error:", err));

  // iOS fixes
  applyIOSFixes();

  // Remove preloader
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 300);
};

// Main event listeners
document.addEventListener('DOMContentLoaded', initializeFeatures);

// Astro view transitions support
document.addEventListener('astro:page-load', () => {
  console.log("Page load event fired - initializing features");
  initializeFeatures();
}); 