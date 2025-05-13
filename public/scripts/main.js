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
    
    // Update cursor colors when theme changes
    if (window.updateCursorTheme) {
      window.updateCursorTheme();
    }
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

// 3D Spotlight Cursor implementation
const initCustomCursor = () => {
  // Check if we're on a touch device
  const isTouchDevice = () => {
    return (('ontouchstart' in window) || 
            (navigator.maxTouchPoints > 0) || 
            (navigator.msMaxTouchPoints > 0));
  };
  
  // Don't initialize on touch devices
  if (isTouchDevice()) {
    return;
  }
  
  // Create cursor elements if they don't exist
  if (!document.getElementById('custom-cursor') && !document.getElementById('cursor-spotlight')) {
    // Create the main cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.className = 'custom-cursor';
    
    // Create the spotlight element
    const spotlight = document.createElement('div');
    spotlight.id = 'cursor-spotlight';
    spotlight.className = 'cursor-spotlight';
    
    // Append elements to the body
    document.body.appendChild(cursor);
    document.body.appendChild(spotlight);
    
    // Select the elements
    const customCursor = document.getElementById('custom-cursor');
    const cursorSpotlight = document.getElementById('cursor-spotlight');
    
    // Function to update cursor colors based on current theme
    window.updateCursorTheme = () => {
      const isLightTheme = document.documentElement.classList.contains('light-theme');
      
      // Set different colors based on theme
      if (customCursor && cursorSpotlight) {
        if (isLightTheme) {
          // Light theme colors
          customCursor.style.setProperty('--cursor-color', 'rgba(8, 145, 178, 0.7)');
          customCursor.style.setProperty('--cursor-border', 'rgba(8, 145, 178, 0.3)');
          cursorSpotlight.style.setProperty('--spotlight-color', 'rgba(8, 145, 178, 0.08)');
          cursorSpotlight.style.setProperty('--spotlight-inner', 'rgba(8, 145, 178, 0.12)');
        } else {
          // Dark theme colors
          customCursor.style.setProperty('--cursor-color', 'rgba(34, 211, 238, 0.7)');
          customCursor.style.setProperty('--cursor-border', 'rgba(34, 211, 238, 0.3)');
          cursorSpotlight.style.setProperty('--spotlight-color', 'rgba(34, 211, 238, 0.08)');
          cursorSpotlight.style.setProperty('--spotlight-inner', 'rgba(34, 211, 238, 0.15)');
        }
      }
    };
    
    // Set initial colors
    window.updateCursorTheme();
    
    // Variables to track mouse position with smoothing
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let spotlightX = 0, spotlightY = 0;
    
    // Update mouse position
    const updateMousePosition = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    // Track interactive elements for state changes
    const interactiveElements = 'a, button, input, textarea, select, .btn, .logo, .service-card, .theme-toggle, .mobile-menu-toggle';
    
    // Set cursor state based on element
    const setCursorState = (state) => {
      if (customCursor && cursorSpotlight) {
        customCursor.className = `custom-cursor cursor-${state}`;
        cursorSpotlight.className = `cursor-spotlight spotlight-${state}`;
      }
    };
    
    // Enhanced spotlight effect on service cards
    const setupServiceCardEffects = () => {
      const serviceCards = document.querySelectorAll('.service-card');
      
      serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (cursorSpotlight) {
            cursorSpotlight.classList.add('service-card-spotlight');
            
            // Make the spotlight larger and more intense on service cards
            if (typeof gsap !== 'undefined') {
              gsap.to(cursorSpotlight, {
                width: 250,
                height: 250,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          }
        });
        
        card.addEventListener('mouseleave', () => {
          if (cursorSpotlight) {
            cursorSpotlight.classList.remove('service-card-spotlight');
            
            // Return to normal size
            if (typeof gsap !== 'undefined') {
              gsap.to(cursorSpotlight, {
                width: 120,
                height: 120,
                opacity: 0.8,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          }
        });
      });
    };

    // Apply special effect to heading elements
    const setupHeadingEffects = () => {
      const headings = document.querySelectorAll('h1, h2');
      
      headings.forEach(heading => {
        heading.addEventListener('mouseenter', () => {
          if (customCursor) {
            customCursor.classList.add('heading-cursor');
            
            // Special effect for headings
            if (typeof gsap !== 'undefined') {
              gsap.to(customCursor, {
                borderWidth: '3px',
                duration: 0.2
              });
            }
          }
        });
        
        heading.addEventListener('mouseleave', () => {
          if (customCursor) {
            customCursor.classList.remove('heading-cursor');
            
            // Return to normal
            if (typeof gsap !== 'undefined') {
              gsap.to(customCursor, {
                borderWidth: '2px',
                duration: 0.2
              });
            }
          }
        });
      });
    };

    // Add event listeners for cursor state changes
    document.querySelectorAll(interactiveElements).forEach(element => {
      element.addEventListener('mouseenter', () => setCursorState('hover'));
      element.addEventListener('mouseleave', () => setCursorState('default'));
      element.addEventListener('mousedown', () => setCursorState('active'));
      element.addEventListener('mouseup', () => setCursorState('hover'));
    });

    // Add mouse event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', () => setCursorState('active'));
    document.addEventListener('mouseup', () => setCursorState('default'));
    document.addEventListener('mouseleave', () => {
      if (customCursor && cursorSpotlight) {
        customCursor.style.opacity = '0';
        cursorSpotlight.style.opacity = '0';
      }
    });
    document.addEventListener('mouseenter', () => {
      if (customCursor && cursorSpotlight) {
        customCursor.style.opacity = '1';
        cursorSpotlight.style.opacity = '1';
      }
    });

    // Setup special effects for various elements
    setupServiceCardEffects();
    setupHeadingEffects();
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll(interactiveElements).forEach(el => {
      el.style.cursor = 'none';
    });
    
    // Animation function for smooth cursor movement
    const animateCursor = () => {
      if (!customCursor || !cursorSpotlight) return;
      
      // Smooth cursor movement with easing
      const easeSmall = 0.2; // For cursor
      const easeLarge = 0.05; // For spotlight
      
      // Calculate cursor position with smoother interpolation for main cursor
      cursorX += (mouseX - cursorX) * easeSmall;
      cursorY += (mouseY - cursorY) * easeSmall;
      
      // Update spotlight with more lag
      spotlightX += (mouseX - spotlightX) * easeLarge;
      spotlightY += (mouseY - spotlightY) * easeLarge;
      
      // Apply 3D perspective effect based on cursor movement
      const xPercentage = (cursorX / window.innerWidth - 0.5) * 2; // -1 to 1
      const yPercentage = (cursorY / window.innerHeight - 0.5) * 2; // -1 to 1
      
      // Apply transformations using GSAP for smoother animations
      if (typeof gsap !== 'undefined') {
        // Optimize by using GSAP's set method instead of to() for frame-by-frame updates
        gsap.set(customCursor, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50,
          rotateX: -yPercentage * 20, // Tilt based on Y position
          rotateY: xPercentage * 20,  // Tilt based on X position
          z: 0.01 // Ensure 3D transforms work
        });
        
        gsap.set(cursorSpotlight, {
          x: spotlightX,
          y: spotlightY,
          xPercent: -50,
          yPercent: -50,
          scale: 1 + Math.abs(xPercentage * 0.5 + yPercentage * 0.5),
          opacity: 0.8 - (Math.abs(xPercentage) + Math.abs(yPercentage)) * 0.2
        });
      } else {
        // Fallback without GSAP
        customCursor.style.transform = `
          translate(${cursorX}px, ${cursorY}px) 
          translate(-50%, -50%) 
          rotateX(${-yPercentage * 20}deg) 
          rotateY(${xPercentage * 20}deg)
        `;
        
        cursorSpotlight.style.transform = `
          translate(${spotlightX}px, ${spotlightY}px)
          translate(-50%, -50%)
          scale(${1 + Math.abs(xPercentage * 0.5 + yPercentage * 0.5)})
        `;
        cursorSpotlight.style.opacity = `${0.8 - (Math.abs(xPercentage) + Math.abs(yPercentage)) * 0.2}`;
      }
      
      // Continue animation loop
      requestAnimationFrame(animateCursor);
    };
    
    // Start the animation loop
    animateCursor();
  }
};

// Use DOMContentLoaded again
document.addEventListener('DOMContentLoaded', () => {
  // console.log("DOM Content Loaded - main.js executing"); 
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize custom cursor
  initCustomCursor();
  
  // --- Preloader Fade Out --- 
  // Add 'loaded' class to body after a short delay 
  // to trigger CSS transition for preloader fade-out.
  setTimeout(() => {
    document.body.classList.add('loaded');
    // console.log("Added .loaded class to body after delay"); 
  }, 300); 
  // --- End preloader logic --- 
  
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