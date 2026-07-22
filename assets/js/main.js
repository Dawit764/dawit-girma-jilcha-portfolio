/* ====================================================================
   Dawit Girma Jilcha - Core Vanilla JS Application State & Routing
   ==================================================================== */

// Project Data Store for Dynamic Hash-based Detail Page Router
const PROJECTS_DATA = {
  "paper-bag": {
    title: "Paper Bag Business Website",
    tagline: "Eco-Friendly Packaging Digital Showroom",
    badges: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    problem: "A sustainable packaging startup in Addis Ababa needed a professional digital platform to showcase their environmentally-friendly paper bags, explain bespoke manufacturing options, and convert wholesale orders efficiently.",
    solution: "Developed a stunning, modern business portal incorporating product visualizers, interactive custom-size configurators, and a optimized layout that showcases paper bag models in high fidelity.",
    designProcess: "Designed using a minimalist, sustainable visual language. I focused on clean off-white elements with green-accented dark boards, generous breathing room, structured specifications grids, and fluid scroll-linked item sizing.",
    features: [
      "<strong>Interactive Size Configurator:</strong> Allows corporate clients to visualize paper bag dimensions (Small, Medium, Large) dynamically in a real-time responsive visual card.",
      "<strong>Eco-Impact Counter:</strong> Calculates plastic waste saved based on hypothetical paper bag purchase volume to drive customer conversion.",
      "<strong>Wholesale Order Portal:</strong> A fully integrated, elegant contact form that collects volume demands and outputs precise spec lists.",
      "<strong>Fluid Mobile layout:</strong> Optimized to ensure quick rendering on lower-speed regional networks across Ethiopia."
    ],
    challenges: "Managing high-resolution product photographs without affecting page loading times. Solved by designing vector illustration overlays and leveraging modern CSS gradients with tiny compressed PNG sprites.",
    lessons: "I learned how to structure a corporate commercial catalog purely using CSS Grid and clean, lightweight flexboxes, proving that premium design doesn't require heavy bloated libraries.",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/zelaqi-pack-ethiopia",
    demo: "https://zelaqi-pack-ethiopia.netlify.app/",
    location: "Addis Ababa, Ethiopia",
    client: "Local Sustainable Packaging Startup",
    duration: "4 Weeks"
  },
  "anniversary": {
    title: "50th Anniversary Interactive Website",
    tagline: "A Bespoke Digital Family Keepsake",
    badges: ["HTML5", "CSS3", "JavaScript", "Animations", "Storytelling"],
    problem: "A family wanted to celebrate a couple's 50th wedding anniversary by bringing together relatives from around the world to view a timeline of historical photographs, quotes, and memories in a unified interactive digital experience.",
    solution: "Created an immersive, sliding digital memory book that combines warm editorial styling, smooth custom canvas slide effects, curated quotes, and dynamic visual galleries.",
    designProcess: "Inspired by premium digital editorial publications. Emphasized delicate serifs, deep cozy lighting, smooth crossfades, and carefully balanced typography grids that feel respectful and timeless.",
    features: [
      "<strong>Infinite Memory Carousel:</strong> A hand-coded vanilla JS slideshow system supporting swipe, keyboard navigation, and seamless crossfade transitions.",
      "<strong>Milestone Timeline:</strong> An interactive chronological path mapping the couple's history from 1976 to 2026, featuring lazy-loaded historical photos.",
      "<strong>Interactive Memory Wall:</strong> Relatives can write and send greetings (persisted client-side) which display on a beautiful glowing masonry message board.",
      "<strong>Atmospheric Soundscapes:</strong> Implemented safe, user-triggered HTML5 audio controllers for delicate ambient theme music."
    ],
    challenges: "Achieving seamless transitions on standard smartphone browsers with variable performance levels while managing large image asset arrays.",
    lessons: "Perfected techniques for advanced browser memory management, client-side caching of pre-loaded slider elements, and writing custom touch-gesture detectors in pure vanilla JS.",
    gallery: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600"
    ],
    github: "https://github.com/Dawit764/50th-anniversary-digital-album",
    demo: "https://50-th-anniversary-for-my-grandpa.netlify.app/",
    location: "Global Reach",
    client: "Private Family Commemoration",
    duration: "3 Weeks"
  }
};

// Main Init Handlers
document.addEventListener("DOMContentLoaded", () => {
  initRouter();
  initParticles();
  initContactForm();
  initNavbarScroll();
  initMobileNav();
  initStatsCounter();
});

// 1. Dynamic Single Page App Router (Hash-Based)
function initRouter() {
  const landingSections = [
    document.querySelector("header"),
    document.getElementById("hero"),
    document.getElementById("mission"),
    document.getElementById("skills"),
    document.getElementById("featured-projects"),
    document.getElementById("journey"),
    document.getElementById("education"),
    document.getElementById("certificates"),
    document.getElementById("contact"),
    document.querySelector(".stats-banner")
  ].filter(Boolean);

  const detailSection = document.getElementById("project-details");

  function handleRoute() {
    const hash = window.location.hash;
    
    if (hash.startsWith("#project-")) {
      const projectId = hash.replace("#project-", "");
      const project = PROJECTS_DATA[projectId];
      
      if (project) {
        // Hide Main Landing
        document.body.style.overflowY = "hidden"; // Pause main scrolling
        
        // Transition fade out
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        landingSections.forEach(sec => sec.style.display = "none");
        
        // Render project details
        renderProjectDetails(project);
        
        // Show detail panel
        detailSection.style.display = "block";
        document.body.style.overflowY = "auto";
        
        // Push focus state
        detailSection.focus();
      } else {
        // Fallback to home
        window.location.hash = "";
      }
    } else {
      // Show Home Landing
      detailSection.style.display = "none";
      landingSections.forEach(sec => {
        // Restore custom displays
        if (sec.tagName === "HEADER") sec.style.display = "block";
        else if (sec.classList.contains("stats-banner")) sec.style.display = "block";
        else sec.style.display = "block";
      });
      
      document.body.style.overflowY = "auto";
      
      // If returning to a specific landing section
      if (hash && hash !== "#home") {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }

  // Bind Listeners
  window.addEventListener("hashchange", handleRoute);
  // Run on initial load
  handleRoute();
}

// Render dynamic project detail markup
function renderProjectDetails(project) {
  const container = document.getElementById("project-details-container");
  if (!container) return;
  
  const badgesMarkup = project.badges.map(b => `<span class="tech-badge">${b}</span>`).join("");
  const featuresMarkup = project.features.map(f => `<li class="detail-list-item">${f}</li>`).join("");
  const galleryMarkup = project.gallery.map(img => `
    <div class="detail-gallery-card">
      <img src="${img}" alt="${project.title} screenshot" class="detail-gallery-img" loading="lazy" referrerPolicy="no-referrer">
    </div>
  `).join("");

  container.innerHTML = `
    <div class="detail-back-bar">
      <a href="#featured-projects" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Back to Portfolio
      </a>
    </div>
    
    <div class="detail-header">
      <div class="detail-badges">${badgesMarkup}</div>
      <h1 class="detail-title">${project.title}</h1>
      <p class="story-intro" style="color: var(--primary);">${project.tagline}</p>
      
      <div class="detail-actions">
        <a href="${project.demo}" target="_blank" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
          Launch Live Demo
        </a>
        <a href="${project.github}" target="_blank" class="btn btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          View Source Code
        </a>
      </div>
    </div>
    
    <div class="detail-hero-media">
      <img src="${project.gallery[0]}" alt="${project.title} cover" class="detail-hero-img" referrerPolicy="no-referrer">
    </div>
    
    <div class="detail-meta-panel">
      <div class="detail-meta-cell">
        <span class="detail-meta-lbl">Client</span>
        <span class="detail-meta-val">${project.client}</span>
      </div>
      <div class="detail-meta-cell">
        <span class="detail-meta-lbl">Duration</span>
        <span class="detail-meta-val">${project.duration}</span>
      </div>
      <div class="detail-meta-cell">
        <span class="detail-meta-lbl">Location</span>
        <span class="detail-meta-val">${project.location}</span>
      </div>
    </div>
    
    <div class="detail-content-grid">
      <div class="detail-block">
        <h3 class="detail-block-title">The Challenge / Problem</h3>
        <p class="detail-block-p">${project.problem}</p>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">The Solution</h3>
        <p class="detail-block-p">${project.solution}</p>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">Design Direction</h3>
        <p class="detail-block-p">${project.designProcess}</p>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">Core Implementation Features</h3>
        <ul class="detail-list">${featuresMarkup}</ul>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">Obstacles & Solutions</h3>
        <p class="detail-block-p">${project.challenges}</p>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">Key Takeaways</h3>
        <p class="detail-block-p">${project.lessons}</p>
      </div>
      
      <div class="detail-block">
        <h3 class="detail-block-title">Visual Layout Gallery</h3>
        <div class="detail-gallery">${galleryMarkup}</div>
      </div>
    </div>
  `;
}

// 2. Generate floating tiny particles in background
function initParticles() {
  const container = document.getElementById("particles-container");
  if (!container) return;
  
  const particleCount = 24;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    
    // Random sizes, positions, speed
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    p.style.top = `${Math.random() * 100}vh`;
    
    // Vary animation duration and delays
    const delay = Math.random() * 10;
    const duration = Math.random() * 15 + 10;
    p.style.animationDelay = `${delay}s`;
    p.style.animationDuration = `${duration}s`;
    
    container.appendChild(p);
  }
}

// 3. Simple elegant scroll-linked Header styles
function initNavbarScroll() {
  const header = document.querySelector("header");
  const progressBar = document.getElementById("scroll-progress");
  
  window.addEventListener("scroll", () => {
    // Scroll progress bar math
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
    
    // Header scrolled styles
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 4. Hamburger drawer controllers
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const links = document.querySelectorAll(".nav-link");
  
  if (!hamburger || !navLinks) return;
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("mobile-open");
  });
  
  // Close menu when links clicked
  links.forEach(l => {
    l.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("mobile-open");
    });
  });
}

// 5. Contact Form Handler (Standard dynamic feedback, saved to local storage)
function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-form-status");
  const submitBtn = document.getElementById("form-submit-btn");
  const btnText = submitBtn?.querySelector(".btn-text");

  if (!form || !statusEl || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const subject = document.getElementById("form-subject").value.trim();
    const message = document.getElementById("form-message").value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending...";

    showStatus("Sending message...", "info");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "662245c4-f272-4ae8-b71c-8073505a1c16",
          name,
          email,
          subject,
          message,
          from_name: name,
          replyto: email,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      showStatus("Thank you! Your message has been sent.", "success");
      form.reset();

      if (btnText) btnText.textContent = "Message Sent!";

      setTimeout(() => {
        if (btnText) btnText.textContent = "Send Message";
      }, 2500);

    } catch (error) {
      console.error(error);

      showStatus("Something went wrong. Please try again.", "error");

      if (btnText) btnText.textContent = "Send Message";
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `form-status ${type}`;
  }
}
// 6. Statistics Counter animation
function initStatsCounter() {
  const stats = document.querySelectorAll(".stat-number");
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute("data-target"));
        let count = 0;
        const speed = 2000 / countTo; // Complete in 2s
        
        const updateCount = () => {
          count++;
          target.textContent = count + (target.getAttribute("data-suffix") || "");
          if (count < countTo) {
            setTimeout(updateCount, speed);
          } else {
            target.textContent = countTo + (target.getAttribute("data-suffix") || "");
          }
        };
        
        updateCount();
        obs.unobserve(target); // Run once
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(s => observer.observe(s));
}
