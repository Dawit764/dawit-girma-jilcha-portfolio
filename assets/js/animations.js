/* ====================================================================
   Dawit Girma Jilcha - Premium Animation Effects Engine
   ==================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMouseGlow();
  initScrollReveal();
  initTypingAnimation();
  initJourneyTimeline();
  initButtonRipple();
  initMagneticHover();
});

// 1. Mouse Cursor Follower Glow Effect
function initMouseGlow() {
  const root = document.documentElement;
  
  window.addEventListener("mousemove", (e) => {
    // Update CSS variables for radial gradient positioning
    root.style.setProperty("--mouse-x", `${e.clientX}px`);
    root.style.setProperty("--mouse-y", `${e.clientY}px`);
  });
}

// 2. High-performance scroll intersection reveal
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal-init");
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger slide-fade transition
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  elements.forEach(el => revealObserver.observe(el));
}

// 3. Typing animation loop (Vanishing / Typing effect)
function initTypingAnimation() {
  const textEl = document.getElementById("typing-text");
  if (!textEl) return;
  
  const words = [
    "Building AI Solutions",
    "Developing Modern Websites",
    "Learning Every Day",
    "Solving Real World Problems"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      charIndex++;
      typingSpeed = 100;
    }
    
    textEl.textContent = currentWord.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Delay before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Short break before starting next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000);
}

// 4. Scroll-linked Journey timeline filling animation
function initJourneyTimeline() {
  const timeline = document.querySelector(".journey-container");
  const lineFill = document.getElementById("timeline-fill");
  const items = document.querySelectorAll(".journey-item");
  
  if (!timeline || !lineFill) return;
  
  window.addEventListener("scroll", () => {
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the timeline container has scrolled into view
    const elementTop = timelineRect.top;
    const elementHeight = timelineRect.height;
    
    const startOffset = windowHeight * 0.8; // Triggers when top of element reaches 80% screen depth
    
    let scrollPercent = 0;
    
    if (elementTop < startOffset) {
      const scrolledAmount = startOffset - elementTop;
      scrollPercent = (scrolledAmount / elementHeight) * 100;
    }
    
    // Clamp between 0% and 100%
    scrollPercent = Math.max(0, Math.min(100, scrollPercent));
    lineFill.style.height = `${scrollPercent}%`;
    
    // Activate timeline indicator nodes based on scrolling depth
    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < windowHeight * 0.7) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
}

// 5. Google/Linear-style click ripple button enhancements
function initButtonRipple() {
  const buttons = document.querySelectorAll(".btn");
  
  buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Clean up after completion
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// 6. Magnetic cards follow cursor slightly on hover
function initMagneticHover() {
  const cards = document.querySelectorAll(".project-card, .skill-category-card, .contact-link-card, .education-card");
  
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Apply subtle tilt (max 3 degrees)
      const tiltX = (y / (rect.height / 2)) * -3;
      const tiltY = (x / (rect.width / 2)) * 3;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
