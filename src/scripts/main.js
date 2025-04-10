// Import GSAP (This will work once Node.js is installed)
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// For now, we'll use script tags in the layout for GSAP

// Use DOMContentLoaded again
document.addEventListener('DOMContentLoaded', () => {
  // console.log("DOM Content Loaded - main.js executing"); 
  
  // --- Add .loaded class to body after a short delay --- 
  setTimeout(() => {
    document.body.classList.add('loaded');
    // console.log("Added .loaded class to body after delay"); 
  }, 300); // 300ms delay
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
  
  // Mobile menu toggle logic (placeholder)
  const setupMobileMenu = () => {
    // Add mobile menu functionality when HTML is updated
  };
  
  // Call setup functions that depend on DOM being ready, but can run after load
  setupMobileMenu();

  // --- Intersection Observer for Scroll Animations --- 
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  // console.log("Found elements to animate:", animatedElements.length); 

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        // console.log("Observing:", entry.target, "Intersecting:", entry.isIntersecting); 
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // console.log("Added .is-visible to:", entry.target); 
          observerInstance.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 
    });

    animatedElements.forEach(el => {
      // console.log("Observing element:", el); 
      observer.observe(el);
    });
  } else {
      // console.log("No elements with .animate-on-scroll found.");
  }
  // --- End Scroll Animations --- 
}); 