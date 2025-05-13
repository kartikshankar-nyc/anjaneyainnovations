// Import GSAP (This will work once Node.js is installed)
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// Import tsParticles engine and slim preset
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // loads tsparticles v3

// Import Swiper core and required modules
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

// For now, we'll use script tags in the layout for GSAP

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
      gsap.to(themeToggle, {
        rotation: '+=180',
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
      
      // Animate page elements for smooth transition
      const contentElements = [
        'body', 
        'header', 
        '.logo-text', 
        'h1', 'h2', 'h3', 
        'p', 
        '.btn', 
        'input', 
        'textarea'
      ];
      
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

// Use DOMContentLoaded again
document.addEventListener('DOMContentLoaded', () => {
  // console.log("DOM Content Loaded - main.js executing"); 
  
  // Initialize theme toggle
  initThemeToggle();
  
  // --- Preloader Fade Out --- 
  // Add 'loaded' class to body after a short delay 
  // to trigger CSS transition for preloader fade-out.
  setTimeout(() => {
    document.body.classList.add('loaded');
    // console.log("Added .loaded class to body after delay"); 
  }, 300); 
  // --- End preloader logic --- 
  
  // Initialize animations when GSAP is available
  // --- REMOVE GSAP CODE BLOCK --- 
  /*
  if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animation
    gsap.from('header', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    // Hero section animation
    gsap.from('.hero-content', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Animate sections on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
      });
    });
    
    // Services card animations
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power1.out'
      });
    });
  }
  */
  // --- END REMOVE GSAP CODE BLOCK --- 
  
  // --- Swiper Initialization --- 
  const testimonialSwiper = document.querySelector('.testimonial-swiper');
  if (testimonialSwiper) {
      // console.log("Initializing Swiper...");
      new Swiper('.testimonial-swiper', {
          // Include necessary modules
          modules: [Navigation, Autoplay],
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
      // console.log("Swiper Initialized.");
  } 
  // --- End Swiper Initialization --- 

  // --- tsParticles Initialization --- 
  // Function to load and configure background particles
  const initParticles = async () => {
    // console.log("Initializing tsParticles...");
    
    // Determine if we're in light mode
    const isLightMode = document.documentElement.classList.contains('light-theme');
    
    // Choose colors based on theme - make colors more vibrant
    const particleColors = isLightMode 
      ? ["#3B4965", "#64748B", "#0E7490"] // Enhanced light theme colors - deeper blues
      : ["#E5E7EB", "#CBD5E1", "#38BDF8"]; // Enhanced dark theme colors - added lighter blue
    
    const linkColor = isLightMode ? "#94A3B8" : "#475569";
    // Increase opacity for more visibility
    const particleOpacity = isLightMode ? { min: 0.15, max: 0.6 } : { min: 0.25, max: 0.8 };
    
    // Load the slim preset (contains necessary features)
    await loadSlim(tsParticles); 
    // Load configuration onto the #particles-js canvas
    await tsParticles.load({ 
      id: "particles-js",
      options: {
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
    
    // console.log("tsParticles initialized.");
  };
  // Initialize particles when DOM is ready
  initParticles().catch(err => console.error("Particle Init Error:", err)); // Add catch for async errors
  // --- End tsParticles Initialization --- 

  // --- Scroll Animations (Intersection Observer) --- 
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  // console.log("Found elements to animate:", animatedElements.length); 

  if (animatedElements.length > 0) {
    // Create an observer to watch for elements entering the viewport
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        // console.log("Observing:", entry.target, "Intersecting:", entry.isIntersecting); 
        // If element is at least 10% visible
        if (entry.isIntersecting) {
          // Add .is-visible class to trigger CSS animation
          entry.target.classList.add('is-visible');
          // console.log("Added .is-visible to:", entry.target); 
          // Stop observing this element once animated
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // % of element visibility needed to trigger
    });
    // Start observing each tagged element
    animatedElements.forEach(el => {
      // console.log("Observing element:", el); 
      observer.observe(el);
    });
  } else {
      // console.log("No elements with .animate-on-scroll found.");
  }
  // --- End Scroll Animations --- 

  // --- Mobile Menu Toggle Logic --- 
  const setupMobileMenu = () => {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('main-menu');

    if (toggleButton && menu) {
      // console.log("Setting up mobile menu toggle");
      // Add click listener to the toggle button
      toggleButton.addEventListener('click', () => {
        // Toggle the .is-open class on the menu element
        const isOpen = menu.classList.toggle('is-open');
        // Update ARIA attribute for accessibility
        toggleButton.setAttribute('aria-expanded', isOpen);
        // console.log("Mobile menu toggled:", isOpen);
      });
    } else {
        console.error("Mobile menu toggle button or menu element not found.");
    }
  };
  
  // Call setup functions
  setupMobileMenu();
}); 