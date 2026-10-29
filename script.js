/* ==========================================================================
   NOIR//NEXUS — CLIENT INTERACTION ENGINE
   Aesthetic: Obsidian Black + Electric Lime + Cybernetic Fluid Interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Loading Screen
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.visibility = "hidden";
        }, 600);
      }, 500);
    });

    // Fallback if load event already triggered or slow
    setTimeout(() => {
      if (loader.style.visibility !== "hidden") {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.visibility = "hidden";
        }, 600);
      }
    }, 2500);
  }

  // 2. Custom Interactive Cursor
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth Lerp for ring
    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .project-card, .skill-card, .timeline-body, .edu-card, .contact-card"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-hover"));
    });
  }

  // 3. Navbar Sticky Effect & Mobile Menu
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNav();
  });

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !expanded);
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuBtn.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("show");
      });
    });
  }

  // 4. Smooth Section Tracking for Active Nav Link
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === `#${sectionId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  // 5. Scroll Reveal with IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // 6. Interactive 3D Tilt for Hero Code Window
  const heroTilt = document.getElementById("hero-tilt");
  const heroSection = document.getElementById("home");

  if (heroTilt && heroSection) {
    let isTilting = false;

    heroSection.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 1024) return;
      if (!isTilting) {
        requestAnimationFrame(() => {
          const rect = heroTilt.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);

          const rotX = -deltaY * 10;
          const rotY = deltaX * 10;

          heroTilt.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
          isTilting = false;
        });
        isTilting = true;
      }
    });

    heroSection.addEventListener("mouseleave", () => {
      heroTilt.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  }

  // 7. Ambient Particle Background
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    const particleCount = 48;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.4 + 0.15,
        color: Math.random() > 0.4 ? "16, 240, 116" : "0, 240, 255",
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(16, 240, 116, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 8. Project Deep Dive Modal System
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-project-title");
  const modalMeta = document.getElementById("modal-project-meta");
  const modalBody = document.getElementById("modal-project-body");
  const modalLinks = document.getElementById("modal-project-links");

  const projectDetails = {
    learnhub: {
      badge: "FEATURED ARCHITECTURE • FULL-STACK LMS",
      title: "LearnHub Learning Management System",
      tech: ["React 19", "Node.js", "Express", "MySQL", "Stripe API", "JWT", "Bcrypt", "REST API"],
      liveUrl: "https://learnhub-elwb.onrender.com",
      githubUrl: "https://github.com/Rohith-180503/ONLINE-LEARNING-WEBSITE",
      body: `
        <p>LearnHub represents a production-grade full-stack LMS engineered from the ground up to support modern online education workflows. The architecture pairs a decoupled React 19 single-page application with a secure Node.js/Express REST backend and a structured MySQL database.</p>
        
        <h4><i class="fa-solid fa-shield-halved"></i> Security & Authentication Architecture</h4>
        <ul>
          <li><strong>HttpOnly JWT Authentication:</strong> Token-based authentication utilizing HttpOnly cookies to protect against XSS and cross-site credential theft.</li>
          <li><strong>Password Security:</strong> Cryptographic hashing via bcrypt with salt rounds and strict password validation schemas.</li>
          <li><strong>Role-Based Access Control:</strong> Middleware-enforced authorization hierarchies distinguishing Students, Instructors, and Admin users.</li>
        </ul>

        <h4><i class="fa-solid fa-credit-card"></i> Payment Processing & Course Enrollment</h4>
        <ul>
          <li><strong>Stripe Checkout Integration:</strong> Secure checkout sessions handling end-to-end payments with live webhooks for instant order confirmation and automated student enrollment.</li>
          <li><strong>Course Progress & Persistence:</strong> Real-time progress tracking persisting module completions, video watch milestones, and completion certificates.</li>
        </ul>

        <h4><i class="fa-solid fa-database"></i> Database Design & Performance</h4>
        <ul>
          <li><strong>Relational Data Modeling:</strong> Normalized MySQL schema linking users, courses, lesson modules, enrollments, and transactions.</li>
          <li><strong>Optimized Queries:</strong> Parameterized SQL queries preventing injection vulnerabilities and index tuning for low-latency lookups.</li>
        </ul>
      `
    },
    taskflow: {
      badge: "PRODUCTIVITY ENGINE • SPA & ACCESSIBILITY",
      title: "TaskFlow Manager",
      tech: ["Vanilla JavaScript", "HTML5", "CSS3", "DOMPurify", "LocalStorage API", "ARIA 2.1"],
      liveUrl: "https://taskflow-nm5v.onrender.com",
      githubUrl: "https://github.com/Rohith-180503/TODO-LIST-APP",
      body: `
        <p>TaskFlow is a high-performance productivity tool designed for rapid, uninterrupted daily workflows. Engineered with pure vanilla JavaScript, it demonstrates deep mastery of browser APIs, clean state management, and strict security and accessibility principles.</p>

        <h4><i class="fa-solid fa-code"></i> Engineering Highlights</h4>
        <ul>
          <li><strong>State Persistence & Migration:</strong> Robust LocalStorage storage schema with defensive parsing, version migration checks, and error recovery.</li>
          <li><strong>DOM Sanitization:</strong> Integrated DOMPurify to neutralize potential XSS vectors when rendering user-entered markdown and descriptions.</li>
          <li><strong>Sub-Millisecond UI Updates:</strong> Optimized DOM reflows using DocumentFragments and delegated event handling for silky-smooth responsiveness.</li>
          <li><strong>Accessibility Compliance:</strong> Complete WCAG 2.1 AA keyboard support, dynamic ARIA live regions, and semantic roles.</li>
        </ul>
      `
    },
    dragondash: {
      badge: "GAME DEVELOPMENT • 2D PHYSICS ENGINE",
      title: "Dragon Dash Arcade",
      tech: ["JavaScript", "HTML5 Canvas", "AABB Physics", "Web Audio API", "requestAnimationFrame"],
      liveUrl: null,
      githubUrl: "https://github.com/Rohith-180503/DRAGON-DASH-GAME",
      body: `
        <p>Dragon Dash is an arcade-style 2D side-scrolling browser game built strictly with vanilla JavaScript and the HTML5 Canvas API without any external game engines or helper libraries.</p>

        <h4><i class="fa-solid fa-gamepad"></i> Systems Architecture</h4>
        <ul>
          <li><strong>Tick-Rate Independent Game Loop:</strong> Frame-rate smoothed loop using <code>requestAnimationFrame</code> with delta-time calculation to ensure consistent physics across 60Hz, 120Hz, and 144Hz monitors.</li>
          <li><strong>Collision Physics:</strong> High-precision Axis-Aligned Bounding Box (AABB) spatial detection system with obstacle bounding hulls and jump velocity curves.</li>
          <li><strong>Procedural Obstacle Spawner:</strong> Dynamic velocity ramp algorithms and randomized hazard spacing creating increasing difficulty.</li>
        </ul>
      `
    },
    netflix: {
      badge: "CREATIVE FRONTEND • RESPONSIVE CLONE",
      title: "Netflix India Clone",
      tech: ["HTML5", "CSS3", "CSS Grid", "Flexbox", "Fluid Typography", "Responsive Video"],
      liveUrl: null,
      githubUrl: "https://github.com/Rohith-180503/NETFLIX-CLONE",
      body: `
        <p>A pixel-accurate recreation of Netflix India's high-converting landing page showcasing modern CSS layout techniques, advanced typography hierarchy, and performant multimedia presentation.</p>

        <h4><i class="fa-solid fa-palette"></i> Design & CSS Implementation</h4>
        <ul>
          <li><strong>Zero-Framework CSS Mastery:</strong> Complex nested CSS Grid and Flexbox layouts without external utility frameworks.</li>
          <li><strong>Interactive FAQ Accordion:</strong> Accessible, animated accordion controls with smooth max-height transitions and chevron rotations.</li>
          <li><strong>Fluid Typography & Viewports:</strong> Precision clamp() typography scaling perfectly across small smartphones up to 4K ultra-wide monitors.</li>
        </ul>
      `
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data) return;

    modalBadge.textContent = data.badge;
    modalTitle.textContent = data.title;

    // Render Tech tags
    modalMeta.innerHTML = data.tech
      .map((t) => `<span class="tech-badge tech-badge-alt">${t}</span>`)
      .join("");

    // Render Body
    modalBody.innerHTML = data.body;

    // Render Action Buttons
    let linksHtml = "";
    if (data.liveUrl) {
      linksHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>Live Demo</span></a>`;
    }
    if (data.githubUrl) {
      linksHtml += `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i><span>GitHub Repo</span></a>`;
    }
    modalLinks.innerHTML = linksHtml;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Open modal on click
  document.querySelectorAll(".btn-details, .proj-deepdive").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const projId = btn.getAttribute("data-project");
      openProjectModal(projId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeProjectModal();
    }
  });

  // 9. Copy Email to Clipboard
  const copyBtn = document.getElementById("copy-email-btn");
  const copyText = document.getElementById("copy-email-text");

  if (copyBtn && copyText) {
    copyBtn.addEventListener("click", () => {
      const email = "rohithnidumolu@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyText.textContent;
        copyText.textContent = "Copied to Clipboard!";
        copyBtn.style.borderColor = "var(--accent-lime)";
        copyBtn.style.color = "var(--accent-lime)";

        setTimeout(() => {
          copyText.textContent = originalText;
          copyBtn.style.borderColor = "";
          copyBtn.style.color = "";
        }, 2200);
      });
    });
  }
});
