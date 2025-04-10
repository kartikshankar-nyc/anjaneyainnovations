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
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const menu = document.getElementById('main-menu');

    if (toggleButton && menu) {
      console.log("Setting up mobile menu toggle");
      toggleButton.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggleButton.setAttribute('aria-expanded', isOpen);
        console.log("Mobile menu toggled:", isOpen);
      });
    } else {
        console.error("Mobile menu toggle button or menu element not found.");
    }
  };
  
  // Call setup functions that depend on DOM being ready, but can run after load
  setupMobileMenu();

  // --- Testimonial Carousel Logic --- 
  const sliderContainer = document.querySelector('.testimonial-slider-container');
  if (sliderContainer) {
    const testimonials = sliderContainer.querySelectorAll('.testimonial');
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');
    const slider = sliderContainer.querySelector('.testimonial-slider'); // Get slider element
    let currentIndex = 0;
    let intervalId = null;
    const totalTestimonials = testimonials.length;
    const slideInterval = 7000; // Time in ms for auto-slide

    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        // Ensure the element exists and has style property
        if (testimonial && testimonial.style) {
            if (i === index) {
                testimonial.style.position = ''; // Let it occupy space
                testimonial.style.opacity = '1';
                testimonial.style.pointerEvents = 'auto';
            } else {
                testimonial.style.opacity = '0';
                testimonial.style.position = 'absolute'; // Stack hidden ones
                testimonial.style.pointerEvents = 'none';
                // REMOVE setting display: none
                // testimonial.style.display = 'none'; 
            }
        } else {
            console.error('Testimonial element or style property not found for index:', i);
        }
      });
    }

    // Function to set slider height based on tallest item
    function setSliderHeight() {
        let maxHeight = 0;
        testimonials.forEach(testimonial => {
            // Temporarily display to measure height accurately
            const originalDisplay = testimonial.style.display;
            testimonial.style.position = 'absolute'; // Avoid affecting flow
            testimonial.style.visibility = 'hidden';
            testimonial.style.display = 'block';
            
            maxHeight = Math.max(maxHeight, testimonial.offsetHeight);
            
            // Restore original display style (respecting initial setup)
            testimonial.style.position = ''; 
            testimonial.style.visibility = '';
            testimonial.style.display = originalDisplay;
        });
        
        if (slider && maxHeight > 0) {
            slider.style.height = `${maxHeight}px`;
            console.log(`Set slider height to: ${maxHeight}px`);
        }
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % totalTestimonials;
      showTestimonial(currentIndex);
    }

    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
      showTestimonial(currentIndex);
    }

    function startAutoSlide() {
        // Clear existing interval if any
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextTestimonial, slideInterval);
    }

    function stopAutoSlide() {
        if (intervalId) clearInterval(intervalId);
    }

    if (totalTestimonials > 1) { // Only enable controls if more than one
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoSlide(); // Stop auto-slide on manual interaction
            // Optional: Restart after a delay
            // setTimeout(startAutoSlide, slideInterval * 2);
        });

        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoSlide(); // Stop auto-slide on manual interaction
            // Optional: Restart after a delay
            // setTimeout(startAutoSlide, slideInterval * 2);
        });

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Initial setup
        setSliderHeight(); // Set height before showing first slide
        window.addEventListener('resize', setSliderHeight); // Recalculate on resize
        showTestimonial(currentIndex); 
        startAutoSlide(); 
    } else {
        // Hide buttons if only one testimonial
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
    }
  }
  // --- End Testimonial Carousel --- 

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