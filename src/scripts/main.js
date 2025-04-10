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

// Use DOMContentLoaded again
document.addEventListener('DOMContentLoaded', () => {
  // console.log("DOM Content Loaded - main.js executing"); 
  
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
                          distance: 80,
                          duration: 0.4,
                      },
                  },
              },
              particles: {
                  color: {
                      value: ["#E5E7EB", "#B0B8C4", "#22D3EE"], // Updated secondary color
                  },
                  links: {
                      color: "#374151",
                      distance: 150,
                      enable: true,
                      opacity: 0.3,
                      width: 1,
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "out",
                      },
                      random: true,
                      speed: 1,
                      straight: false,
                  },
                  number: {
                      density: {
                          enable: true,
                      },
                      value: 80,
                  },
                  opacity: {
                      value: { min: 0.2, max: 0.7 },
                  },
                  shape: {
                      type: "circle",
                  },
                  size: {
                      value: { min: 1, max: 4 },
                  },
              },
              detectRetina: true,
          }
      });
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