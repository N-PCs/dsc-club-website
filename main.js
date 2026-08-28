document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Controls
  const burgerBtn = document.querySelector(".burger-btn");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-link, .mobile-sign-in");

  function openMenu() {
    if (!mobileOverlay || !burgerBtn) return;
    mobileOverlay.hidden = false;
    void mobileOverlay.offsetWidth;
    mobileOverlay.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!mobileOverlay || !burgerBtn) return;
    mobileOverlay.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    setTimeout(() => {
      if (!mobileOverlay.classList.contains("active")) {
        mobileOverlay.hidden = true;
      }
    }, 280);
  }

  if (burgerBtn) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = burgerBtn.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) {
        closeMenu();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && burgerBtn?.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Active Navigation Link Highlighting on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll);

  // Telemetry Metric Count-Up Animation
  const statItems = document.querySelectorAll(".stat-item");

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateStat(item, index) {
    const target = parseFloat(item.dataset.target);
    const suffix = item.dataset.suffix || "";
    const decimals = parseInt(item.dataset.decimals || "0", 10);
    const valueEl = item.querySelector(".stat-value");
    if (!valueEl) return;

    const duration = 1500 + index * 80;
    const startDelay = 300 + index * 90;

    setTimeout(() => {
      let startTime = null;

      function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const currentValue = easedProgress * target;

        valueEl.textContent = currentValue.toFixed(decimals) + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          valueEl.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    }, startDelay);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statItems.forEach((item, index) => {
              animateStat(item, index);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    const statsBar = document.querySelector(".stats-telemetry-bar");
    if (statsBar) {
      observer.observe(statsBar);
    }
  } else {
    statItems.forEach((item, index) => {
      animateStat(item, index);
    });
  }

  // Events Timeline Tabs Switcher
  const filterTabBtns = document.querySelectorAll(".filter-tab-btn");
  const eventLists = document.querySelectorAll(".events-list");

  filterTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetTab = btn.dataset.tab;
      eventLists.forEach((list) => {
        list.classList.remove("active");
        if (list.id === `events-${targetTab}`) {
          list.classList.add("active");
        }
      });
    });
  });

  // Team Roster Filter Switcher
  const teamTabBtns = document.querySelectorAll(".team-tab-btn");
  const memberCards = document.querySelectorAll(".member-card");

  teamTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      teamTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const group = btn.dataset.group;
      memberCards.forEach((card) => {
        if (group === "All" || card.dataset.group === group) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Form Submission Handler
  const joinForm = document.getElementById("join-form");
  const toast = document.getElementById("toast");

  if (joinForm && toast) {
    joinForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show toast
      toast.hidden = false;
      setTimeout(() => {
        toast.hidden = true;
      }, 4000);

      joinForm.reset();
    });
  }
});
