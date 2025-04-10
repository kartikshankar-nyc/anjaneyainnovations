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

  // --- REMOVE Old Testimonial Carousel Logic --- 
  /* 
  const sliderContainer = document.querySelector('.testimonial-slider-container');
  if (sliderContainer) {
    const testimonials = sliderContainer.querySelectorAll('.testimonial');
    const prevBtn = sliderContainer.querySelector('.slider-btn.prev');
    const nextBtn = sliderContainer.querySelector('.slider-btn.next');
    const slider = sliderContainer.querySelector('.testimonial-slider'); 
    let currentIndex = 0;
    let intervalId = null;
    const totalTestimonials = testimonials.length;
    const slideInterval = 7000; 

    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        if (testimonial && testimonial.style) {
            if (i === index) {
                testimonial.style.position = ''; 
                testimonial.style.opacity = '1';
                testimonial.style.pointerEvents = 'auto';
            } else {
                testimonial.style.opacity = '0';
                testimonial.style.position = 'absolute'; 
                testimonial.style.pointerEvents = 'none';
            }
        } else {
            console.error('Testimonial element or style property not found for index:', i);
        }
      });
    }

    function setSliderHeight() {
        let maxHeight = 0;
        testimonials.forEach(testimonial => {
            const originalDisplay = testimonial.style.display;
            testimonial.style.position = 'absolute'; 
            testimonial.style.visibility = 'hidden';
            testimonial.style.display = 'block';
            maxHeight = Math.max(maxHeight, testimonial.offsetHeight);
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
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextTestimonial, slideInterval);
    }

    function stopAutoSlide() {
        if (intervalId) clearInterval(intervalId);
    }

    if (totalTestimonials > 1) {
      setSliderHeight(); 
      window.addEventListener('resize', setSliderHeight); 
      showTestimonial(currentIndex); 
      startAutoSlide(); 
      nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoSlide(); 
      });
      prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoSlide(); 
      });
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', startAutoSlide);
    } else {
        if(prevBtn) prevBtn.style.display = 'none';
        if(nextBtn) nextBtn.style.display = 'none';
    }
  }
  */
  // --- End Old Testimonial Carousel --- 
  
  // --- Swiper Initialization --- 
  const testimonialSwiper = document.querySelector('.testimonial-swiper');
  if (testimonialSwiper) {
      console.log("Initializing Swiper...");
      new Swiper('.testimonial-swiper', {
          modules: [Navigation, Autoplay],
          loop: true,
          slidesPerView: 1,
          spaceBetween: 30, 
          autoplay: {
            delay: 7000,
            disableOnInteraction: true, 
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      });
      console.log("Swiper Initialized.");
  } else {
      console.log("Testimonial Swiper element not found.");
  }
  // --- End Swiper Initialization --- 

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

  // --- tsParticles Initialization --- 
  const initParticles = async () => {
      console.log("Initializing tsParticles...");
      // Load the slim preset into the engine
      await loadSlim(tsParticles); 
      // Now load the options using the engine
      await tsParticles.load({ 
          id: "particles-js",
          options: {
              background: {
                  // color: "#111827", // Controlled by body CSS
              },
              fpsLimit: 60,
              interactivity: {
                  events: {
                      onHover: {
                          enable: true,
                          mode: "repulse", // Subtle interaction
                      },
                      onClick: {
                          enable: false, // No click interaction
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
                      value: ["#E5E7EB", "#9CA3AF", "#22D3EE"], // Use primary, secondary, accent colors
                  },
                  links: {
                      color: "#374151", // Use border color for links
                      distance: 150,
                      enable: true,
                      opacity: 0.3,
                      width: 1,
                  },
                  move: {
                      direction: "none",
                      enable: true,
                      outModes: {
                          default: "out", // Bounce off edges
                      },
                      random: true,
                      speed: 1, // Slow speed
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
      console.log("tsParticles initialized.");
  };
  initParticles();
  // --- End tsParticles Initialization --- 
}); 