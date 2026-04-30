// Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      handleScroll();
    }, 800);
  }, 2000);
});

// Custom Cursor
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  }, 60);
});

const interactives = document.querySelectorAll(
  "a, button, .project-card, .timeline-content",
);
interactives.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("hover");
    cursorRing.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("hover");
    cursorRing.classList.remove("hover");
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile Menu
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Smooth Scroll & Active Link
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.classList.remove("show");
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: "smooth",
    });
  });
});

function handleScroll() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 250) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", handleScroll);

// Intersection Observer for fluid reveals
const reveals = document.querySelectorAll(".reveal");
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      if (entry.target.classList.contains("skill-group")) {
        const bars = entry.target.querySelectorAll(".skill-progress");
        bars.forEach((bar) => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

reveals.forEach((reveal) => {
  observer.observe(reveal);
});

// 3D Tilt Effect - Improved smoothing
const tiltCard = document.getElementById("tilt-card");
const heroSection = document.querySelector(".hero");

let tiltAnimation;
heroSection.addEventListener("mousemove", (e) => {
  cancelAnimationFrame(tiltAnimation);
  tiltAnimation = requestAnimationFrame(() => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const multiplier = 15;
    const xRotate = (-y / rect.height) * multiplier;
    const yRotate = (x / rect.width) * multiplier;

    tiltCard.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale3d(1.03, 1.03, 1.03)`;
  });
});

heroSection.addEventListener("mouseleave", () => {
  cancelAnimationFrame(tiltAnimation);
  tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
});

// Particle Canvas Background
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let width, height, particles;

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = [];

  const numParticles = Math.min(Math.floor((width * height) / 12000), 120);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  const cyan = "rgba(6, 182, 212, 0.4)";
  const indigo = "rgba(99, 102, 241, 0.4)";

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 === 0 ? cyan : indigo;
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 - dist / 1600})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  initCanvas();
});

// Accent Color Switcher
const accentDots = document.querySelectorAll(".accent-dot");
accentDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const color = dot.getAttribute("data-color");
    document.documentElement.style.setProperty("--accent-main", color);
    accentDots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
  });
});

// Project Modals Data
const projectData = {
  learnhub: {
    title: "LearnHub Full-Stack LMS",
    content: `
            <p>LearnHub is a professional-grade Learning Management System (LMS) designed to bridge the gap between educational content creators and ambitious learners. This comprehensive full-stack application represents a complete architectural transformation from a static UI prototype into a high-performance, secure, and dynamically scalable educational ecosystem. The platform supports multiple user roles including students, instructors, and administrators, each with tailored dashboards and functionality.</p>
            <h4><i class="fa-solid fa-microchip"></i> Technical Architecture & Infrastructure</h4>
            <ul>
                <li><strong>Decoupled Full-Stack Design:</strong> Built with a modern React 19 frontend utilizing hooks, context API, and custom hooks for state management, communicating seamlessly with a robust Node.js/Express REST API backend. The architecture follows MVC patterns with clear separation of concerns.</li>
                <li><strong>Advanced Authentication System:</strong> Implemented multi-layered security using httpOnly JWT cookies for session management, bcrypt password hashing with salt rounds, and CSRF token protection. This provides robust protection against XSS attacks, session hijacking, and unauthorized access attempts.</li>
                <li><strong>Payment Processing Integration:</strong> Full Stripe Checkout flow implementation with secure webhook handling for enrollment automation, payment confirmation emails, invoice generation, and subscription management for premium course tiers.</li>
                <li><strong>Database Architecture:</strong> MySQL relational database with optimized schema design including normalized tables for users, courses, lessons, enrollments, progress tracking, and payments. Implemented indexing strategies for fast query performance on large datasets.</li>
            </ul>
            <h4><i class="fa-solid fa-database"></i> Core Workflows & Features</h4>
            <ul>
                <li><strong>Intelligent Course Persistence:</strong> SQL-based tracking of lesson completion with percentage calculations, time spent analytics, bookmark functionality, and user curriculum trees that visualize learning paths and prerequisites.</li>
                <li><strong>Smart Cart Synchronization:</strong> Advanced middleware logic to synchronize guest shopping carts with authenticated user accounts upon login, preserving wishlist items, and handling concurrent session conflicts.</li>
                <li><strong>Content Management:</strong> Rich text editor integration for instructors, video upload handling with progress bars, file attachment management, and automated content moderation workflows.</li>
                <li><strong>Real-time Notifications:</strong> WebSocket implementation for live course updates, instructor announcements, and peer-to-peer messaging within learning communities.</li>
            </ul>
            <h4><i class="fa-solid fa-rocket"></i> Performance & Scalability</h4>
            <ul>
                <li><strong>Caching Strategy:</strong> Redis integration for session storage and frequently accessed course data, reducing database load by 60%.</li>
                <li><strong>Image Optimization:</strong> Automatic WebP conversion and responsive image serving based on device viewport.</li>
                <li><strong>Lazy Loading:</strong> Code-splitting and dynamic imports for course content, reducing initial bundle size by 40%.</li>
            </ul>
        `,
  },
  taskflow: {
    title: "TaskFlow Manager",
    content: `
            <p>TaskFlow is a comprehensive productivity engine engineered to handle high-volume task management with sub-millisecond responsiveness, complete state reliability, and enterprise-grade data persistence. Built as a single-page application (SPA), it demonstrates advanced JavaScript patterns and browser API mastery while maintaining zero external dependencies for core functionality.</p>
            <h4><i class="fa-solid fa-code-branch"></i> State Management & Data Architecture</h4>
            <ul>
                <li><strong>Intelligent Persistence Layer:</strong> Robust LocalStorage implementation featuring data versioning with migration guards, schema validation, compression algorithms for large datasets, and automatic backup/restore capabilities to prevent data loss during browser crashes.</li>
                <li><strong>DOM Optimization Engine:</strong> Manual DOM manipulation using DocumentFragments for batch updates, event delegation patterns to minimize listener overhead, virtual scrolling for task lists exceeding 1000 items, and requestIdleCallback for non-critical background operations.</li>
                <li><strong>Data Model Design:</strong> Normalized task objects with UUID generation, timestamp tracking for creation/modification/completion, priority scoring algorithms, tag categorization systems, and dependency mapping between related tasks.</li>
            </ul>
            <h4><i class="fa-solid fa-shield-halved"></i> Security, Accessibility & UX Excellence</h4>
            <ul>
                <li><strong>Content Security:</strong> Integrated DOMPurify library to prevent XSS attacks during Markdown rendering in task descriptions, with strict CSP headers and input sanitization on all user-generated content.</li>
                <li><strong>Accessibility Compliance:</strong> Full WCAG 2.1 AA compliance including ARIA labels for dynamic content, keyboard navigation shortcuts (Ctrl+N for new task, Ctrl+D for delete), screen reader announcements via aria-live regions for toast notifications, and reduced motion support respecting prefers-reduced-motion settings.</li>
                <li><strong>Progressive Web App Features:</strong> Service Worker implementation for offline functionality, background sync for task updates, install prompts, and native-like app behavior on mobile devices.</li>
            </ul>
            <h4><i class="fa-solid fa-wand-magic-sparkles"></i> Advanced Features</h4>
            <ul>
                <li><strong>Smart Task Organization:</strong> Drag-and-drop kanban board implementation using native HTML5 Drag API, custom sorting algorithms (by date, priority, tags), fuzzy search with highlighting, and filter persistence across sessions.</li>
                <li><strong>Productivity Analytics:</strong> Visual charts using Canvas API showing completion rates, productivity trends, time estimation accuracy, and streak counters for consistent task completion.</li>
                <li><strong>Integration Ready:</strong> Export functionality to CSV/JSON formats, iCal feed generation for calendar sync, and webhook support for third-party automation tools like Zapier.</li>
            </ul>
        `,
  },
  dragondash: {
    title: "Dragon Dash Arcade",
    content: `
            <p>Dragon Dash is a precision-engineered browser-based arcade game that pushes the boundaries of JavaScript performance and canvas rendering. This project demonstrates deep understanding of game loop architecture, collision physics, sprite animation, and real-time input handling—all achieved without game engines or external libraries, utilizing only vanilla JavaScript and the HTML5 Canvas API.</p>
            <h4><i class="fa-solid fa-gauge-high"></i> Performance & Rendering Architecture</h4>
            <ul>
                <li><strong>Frame-Perfect Animation System:</strong> Custom game loop utilizing high-precision <code>requestAnimationFrame</code> with delta time calculations for consistent character movement across different refresh rates (60Hz to 144Hz). Implemented frame interpolation for smooth sprite animations.</li>
                <li><strong>Spatial Collision Engine:</strong> Custom AABB (Axis-Aligned Bounding Box) collision detection with pixel-perfect accuracy, quadtree spatial partitioning for efficient collision checks with hundreds of obstacles, and predictive collision detection to prevent tunneling at high velocities.</li>
                <li><strong>Canvas Rendering Optimization:</strong> Offscreen canvas pre-rendering for static backgrounds, sprite batching to minimize draw calls, dirty rectangle tracking for partial screen updates, and automatic quality scaling based on device performance metrics.</li>
            </ul>
            <h4><i class="fa-solid fa-gamepad"></i> Game Mechanics & Systems Design</h4>
            <ul>
                <li><strong>Procedural Content Generation:</strong> Dynamic obstacle spawning algorithms using Perlin noise for natural-feeling difficulty curves, weighted randomization for power-up distribution, and infinite level generation without repetition patterns.</li>
                <li><strong>Finite State Machine:</strong> Lightweight FSM architecture managing game states (Menu → Playing → Paused → Game Over → Victory) with clean state transitions, event-driven callbacks, and memory leak prevention through proper cleanup routines.</li>
                <li><strong>Physics Simulation:</strong> Gravity acceleration curves, jump velocity calculations, friction coefficients for ground/air movement, and knockback mechanics with invulnerability frames after taking damage.</li>
            </ul>
            <h4><i class="fa-solid fa-star"></i> Player Experience Features</h4>
            <ul>
                <li><strong>Input Responsiveness:</strong> Multi-input support (keyboard, touch, gamepad via Gamepad API), input buffering for jump commands, and adjustable input sensitivity settings.</li>
                <li><strong>Progression Systems:</strong> Local high score storage with player initials, achievement unlocks for milestones, collectible coin economy, and unlockable dragon skins with unique particle effects.</li>
                <li><strong>Audio Engine:</strong> Web Audio API integration for synthesized sound effects (jump, coin collect, crash), background music looping with dynamic tempo adjustment based on game intensity, and volume controls with mute options.</li>
            </ul>
        `,
  },
  netflix: {
    title: "Netflix India Clone",
    content: `
            <p>This project is a pixel-perfect, fully responsive technical replication of Netflix India's streaming landing page, engineered to demonstrate mastery of modern CSS layout techniques, performance optimization, and responsive design principles. Every visual element—from the hero gradient overlays to the FAQ accordion animations—was hand-coded without frameworks, proving deep understanding of the web platform's native capabilities.</p>
            <h4><i class="fa-solid fa-palette"></i> Design Engineering & CSS Architecture</h4>
            <ul>
                <li><strong>Advanced Layout Systems:</strong> Sophisticated integration of CSS Grid for complex multi-column footer structures and hero section alignments, combined with Flexbox for component-level layouts. Implemented subgrid patterns and container queries for component-scoped responsive behavior.</li>
                <li><strong>Asset Integration & Optimization:</strong> Optimized handling of autoplaying background videos with multiple format fallbacks (WebM, MP4), poster image placeholders for reduced data usage, lazy loading implementation for below-fold images, and semi-transparent gradient overlays using CSS linear-gradients with multiple color stops.</li>
                <li><strong>Visual Polish:</strong> CSS-only shimmer loading effects, custom scrollbar styling, focus-visible outlines for accessibility, and smooth scroll behavior with scroll-snap points for carousel sections.</li>
            </ul>
            <h4><i class="fa-solid fa-mobile-screen"></i> Responsive Strategy & Interactivity</h4>
            <ul>
                <li><strong>Fluid Typography System:</strong> Zero-breakpoint-jump design using clamp() functions for fluid type scaling, viewport-relative spacing with CSS custom properties, and aspect-ratio preservation for video thumbnails across all device sizes.</li>
                <li><strong>Interactive FAQ Accordion:</strong> Custom-built accordion logic using CSS max-height transitions for smooth expand/collapse animations, ARIA expanded state management for accessibility, and rotating SVG chevron icons synchronized with animation timing.</li>
                <li><strong>Mobile-First Navigation:</strong> Hamburger menu transformation animations, touch-optimized gesture handling for carousels, and responsive image art direction using picture elements and srcset attributes.</li>
            </ul>
            <h4><i class="fa-solid fa-bolt"></i> Performance & Accessibility</h4>
            <ul>
                <li><strong>Loading Strategy:</strong> Critical CSS inlining, deferred non-critical stylesheet loading, and intersection observer-based lazy loading for images entering the viewport.</li>
                <li><strong>Semantic HTML:</strong> Proper heading hierarchy, landmark regions (header, main, footer, nav), alt text for all images, and color contrast ratios exceeding WCAG AA standards.</li>
                <li><strong>Form Handling:</strong> Email validation with regex patterns, custom-styled form controls that maintain accessibility, and error message displays with aria-describedby associations.</li>
            </ul>
        `,
  },
};

// Modal Logic
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".btn-project").forEach((btn) => {
  btn.addEventListener("click", () => {
    const project = btn.getAttribute("data-project");
    const data = projectData[project];
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modalClose.click();
});

// Skills-to-Project Interaction
const skillChips = document.querySelectorAll(".chip[data-skill]");
const projectCards = document.querySelectorAll(".project-card");

skillChips.forEach((chip) => {
  chip.addEventListener("mouseenter", () => {
    const skill = chip.getAttribute("data-skill");
    projectCards.forEach((card) => {
      const techs = card
        .querySelector(".project-tech")
        .getAttribute("data-tech");
      if (techs && techs.split(",").includes(skill)) {
        card.classList.add("highlight");
      }
    });
  });
  chip.addEventListener("mouseleave", () => {
    projectCards.forEach((card) => card.classList.remove("highlight"));
  });
});

// Initialize
initCanvas();
drawParticles();
