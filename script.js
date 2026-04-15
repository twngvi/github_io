// Theme Switcher
let currentTheme = "winter";
let themeSwitcherOpen = false;

function toggleThemeSwitcher() {
  const switcher = document.querySelector(".theme-switcher");
  const toggleBtn = document.querySelector(".theme-toggle-btn i");

  themeSwitcherOpen = !themeSwitcherOpen;

  if (themeSwitcherOpen) {
    switcher.classList.remove("collapsed");
    toggleBtn.style.transform = "rotate(180deg)";
  } else {
    switcher.classList.add("collapsed");
    toggleBtn.style.transform = "rotate(0deg)";
  }
}

function changeTheme(theme) {
  currentTheme = theme;
  document.body.className = theme;

  // Update active button
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(`.theme-btn.${theme}`).classList.add("active");

  // Auto close theme switcher after selection
  setTimeout(() => {
    if (themeSwitcherOpen) {
      toggleThemeSwitcher();
    }
  }, 300);
}

// Navigation
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

if (sections.length && navItems.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;
        navItems.forEach((item) => {
          item.classList.toggle("active", item.dataset.section === sectionId);
        });
      });
    },
    { threshold: 0.55 },
  );

  sections.forEach((section) => navObserver.observe(section));
}

// LittleFish Gallery 3D
let activeLittleFishIndex = 0;
let littleFishCards = [];
let littleFishIndicators = [];
let littleFishLocked = false;
let littleFishImages = [];
let littleFishLightbox = null;
let littleFishLightboxImage = null;
let littleFishLightboxCounter = null;
let littleFishLightboxIndex = 0;
let activeHangingBoard = null;
let activeHangingBoardSide = null;
let projectsRevealTriggered = false;

function normalizeIndex(index, length) {
  return (index + length) % length;
}

function refreshLittleFishIndicators() {
  littleFishIndicators.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeLittleFishIndex);
  });
}

function paintLittleFishGallery() {
  if (!littleFishCards.length) return;

  const total = littleFishCards.length;
  littleFishCards.forEach((card, i) => {
    const relative = normalizeIndex(i - activeLittleFishIndex, total);
    card.classList.remove("is-active", "is-left", "is-right", "is-hidden");

    if (relative === 0) {
      card.classList.add("is-active");
      card.style.zIndex = "4";
      return;
    }

    if (relative === 1) {
      card.classList.add("is-right");
      card.style.zIndex = "3";
      return;
    }

    if (relative === total - 1) {
      card.classList.add("is-left");
      card.style.zIndex = "3";
      return;
    }

    card.classList.add("is-hidden");
    card.style.zIndex = "1";
  });

  refreshLittleFishIndicators();
}

function rotateLittleFish(direction) {
  if (!littleFishCards.length || littleFishLocked) return;

  const previousIndex = activeLittleFishIndex;
  const total = littleFishCards.length;
  activeLittleFishIndex = normalizeIndex(
    activeLittleFishIndex + direction,
    total,
  );

  const previousCard = littleFishCards[previousIndex];
  const nextCard = littleFishCards[activeLittleFishIndex];

  previousCard.classList.remove("flip-exit-left", "flip-exit-right");
  nextCard.classList.remove("flip-enter-left", "flip-enter-right");

  if (direction > 0) {
    previousCard.classList.add("flip-exit-left");
    nextCard.classList.add("flip-enter-right");
  } else {
    previousCard.classList.add("flip-exit-right");
    nextCard.classList.add("flip-enter-left");
  }

  littleFishLocked = true;
  paintLittleFishGallery();

  setTimeout(() => {
    littleFishCards.forEach((card) => {
      card.classList.remove(
        "flip-exit-left",
        "flip-exit-right",
        "flip-enter-left",
        "flip-enter-right",
      );
    });
    littleFishLocked = false;
  }, 850);
}

function jumpLittleFish(index) {
  if (
    !littleFishCards.length ||
    littleFishLocked ||
    index === activeLittleFishIndex
  ) {
    return;
  }

  const direction = index > activeLittleFishIndex ? 1 : -1;
  activeLittleFishIndex = normalizeIndex(index, littleFishCards.length);
  paintLittleFishGallery();

  const activeCard = littleFishCards[activeLittleFishIndex];
  activeCard.classList.add(
    direction > 0 ? "flip-enter-right" : "flip-enter-left",
  );

  littleFishLocked = true;
  setTimeout(() => {
    activeCard.classList.remove("flip-enter-right", "flip-enter-left");
    littleFishLocked = false;
  }, 850);
}

function updateLittleFishLightbox() {
  if (!littleFishImages.length || !littleFishLightboxImage) return;

  const currentImage = littleFishImages[littleFishLightboxIndex];
  littleFishLightboxImage.src = currentImage.src;
  littleFishLightboxImage.alt = currentImage.alt || "Ảnh dự án LittleFish";

  if (littleFishLightboxCounter) {
    littleFishLightboxCounter.textContent = `${littleFishLightboxIndex + 1} / ${littleFishImages.length}`;
  }
}

function openLittleFishLightbox(index) {
  if (!littleFishLightbox || !littleFishImages.length) return;

  littleFishLightboxIndex = normalizeIndex(index, littleFishImages.length);
  updateLittleFishLightbox();
  littleFishLightbox.classList.add("open");
  littleFishLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLittleFishLightbox() {
  if (!littleFishLightbox) return;

  littleFishLightbox.classList.remove("open");
  littleFishLightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navigateLittleFishLightbox(direction) {
  if (!littleFishImages.length) return;

  littleFishLightboxIndex = normalizeIndex(
    littleFishLightboxIndex + direction,
    littleFishImages.length,
  );
  updateLittleFishLightbox();

  activeLittleFishIndex = littleFishLightboxIndex;
  paintLittleFishGallery();
}

function setupLittleFishLightbox() {
  littleFishLightbox = document.getElementById("lfLightbox");
  littleFishLightboxImage = document.getElementById("lfLightboxImage");
  littleFishLightboxCounter = document.getElementById("lfLightboxCounter");

  if (!littleFishLightbox || !littleFishCards.length) return;

  littleFishImages = littleFishCards
    .map((card) => card.querySelector("img"))
    .filter(Boolean);

  littleFishImages.forEach((image, i) => {
    image.addEventListener("click", () => openLittleFishLightbox(i));
  });

  const closeBtn = document.getElementById("lfLightboxClose");
  const prevBtn = document.getElementById("lfLightboxPrev");
  const nextBtn = document.getElementById("lfLightboxNext");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLittleFishLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => navigateLittleFishLightbox(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => navigateLittleFishLightbox(1));
  }

  littleFishLightbox.addEventListener("click", (e) => {
    if (e.target === littleFishLightbox) {
      closeLittleFishLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!littleFishLightbox.classList.contains("open")) return;

    if (e.key === "Escape") {
      closeLittleFishLightbox();
      return;
    }

    if (e.key === "ArrowLeft") {
      navigateLittleFishLightbox(-1);
      return;
    }

    if (e.key === "ArrowRight") {
      navigateLittleFishLightbox(1);
    }
  });
}

function setupProjectCarousel() {
  const gallery = document.querySelector(".littlefish-gallery-panel");
  if (!gallery) return;

  littleFishCards = Array.from(gallery.querySelectorAll(".lf-image-card"));
  if (!littleFishCards.length) return;

  const prevBtn = gallery.querySelector("[data-lf-prev]");
  const nextBtn = gallery.querySelector("[data-lf-next]");
  const indicatorsWrap = gallery.querySelector("[data-lf-indicators]");

  if (indicatorsWrap) {
    indicatorsWrap.innerHTML = "";
    littleFishIndicators = littleFishCards.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-indicator";
      dot.setAttribute("aria-label", `Xem ảnh dự án ${i + 1}`);
      dot.addEventListener("click", () => jumpLittleFish(i));
      indicatorsWrap.appendChild(dot);
      return dot;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => rotateLittleFish(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => rotateLittleFish(1));
  }

  paintLittleFishGallery();
  setupLittleFishLightbox();
}

function clearHangingBoardTilt() {
  if (activeHangingBoard) {
    activeHangingBoard.classList.remove(
      "is-tilted",
      "bounce-left",
      "bounce-right",
    );
    activeHangingBoard = null;
  }

  activeHangingBoardSide = null;
}

function setHangingBoardTilt(board, direction) {
  if (!board) return;

  if (activeHangingBoard !== board) {
    clearHangingBoardTilt();
  }

  const nextClass = direction === "left" ? "bounce-left" : "bounce-right";
  const previousClass = direction === "left" ? "bounce-right" : "bounce-left";

  if (activeHangingBoardSide !== direction) {
    board.classList.remove(previousClass, nextClass);
    void board.offsetWidth;
  }

  board.classList.remove(previousClass);
  board.classList.add("is-tilted", nextClass);

  activeHangingBoard = board;
  activeHangingBoardSide = direction;
}

function setupHangingBoardInteractions() {
  const boards = document.querySelectorAll(".hanging-board");
  if (!boards.length) return;

  const directionFromPointer = (board, clientX) => {
    const rect = board.getBoundingClientRect();
    return clientX <= rect.left + rect.width / 2 ? "left" : "right";
  };

  boards.forEach((board) => {
    board.addEventListener("mouseenter", (event) => {
      const direction = directionFromPointer(board, event.clientX);
      setHangingBoardTilt(board, direction);
    });

    board.addEventListener("mousemove", (event) => {
      const direction = directionFromPointer(board, event.clientX);
      setHangingBoardTilt(board, direction);
    });

    board.addEventListener("mouseleave", () => {
      if (activeHangingBoard === board) {
        clearHangingBoardTilt();
      }
    });
  });
}

// Form Submission
function sendEmail(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const subject = `Portfolio Contact from ${name}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

  window.location.href = `mailto:truongtuongvi5804@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${body}`;

  alert("🎨 Cảm ơn bạn đã liên hệ! Email client sẽ được mở.");
  form.reset();
}

// Animate on scroll - Xử lý hiệu ứng xuất hiện cho tất cả section (CHẠY LẠI KHI QUAY LẠI)
const animateOnScroll = () => {
  // Animate Section Titles
  document.querySelectorAll(".section-title").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      el.classList.add("visible");

      if (
        el.classList.contains("education-main-title") &&
        !educationTypingStarted
      ) {
        educationTypingStarted = true;
        setTimeout(typeEducationTitle, 550);
      }
    } else {
      el.classList.remove("visible");
    }
  });

  // Animate Education Columns
  document.querySelectorAll(".edu-cert-column").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });

  // Animate Hanging Education Stack
  document.querySelectorAll(".edu-hanging-stack").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });

  // Animate Hanging Boards with stagger
  document.querySelectorAll(".hanging-board").forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

    if (!isInView) {
      return;
    }

    if (el.dataset.revealed === "true") {
      el.classList.add("visible");
      return;
    }

    if (el.dataset.revealQueued === "true") {
      return;
    }

    el.dataset.revealQueued = "true";
    setTimeout(() => {
      el.classList.add("visible", "reveal-once");
      el.dataset.revealed = "true";
      el.dataset.revealQueued = "false";

      // Remove the one-time animation class after initial drop-in is finished.
      setTimeout(() => {
        el.classList.remove("reveal-once");
      }, 1320);
    }, index * 340);
  });

  // Animate Timeline Cards
  document.querySelectorAll(".timeline-card").forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      setTimeout(() => {
        el.classList.add("visible");
      }, index * 100);
    } else {
      el.classList.remove("visible");
    }
  });

  // Animate Skill Categories
  document.querySelectorAll(".skill-category").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });

  // Animate Project Cards
  const projectsWrapper = document.querySelector(".projects-wrapper");
  if (projectsWrapper) {
    const rect = projectsWrapper.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

    if (isInView && !projectsRevealTriggered) {
      projectsRevealTriggered = true;
      projectsWrapper.classList.add("projects-revealed");
    }
  }

  // Animate Contact Section
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const rect = contactSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

    // Animate paper plane
    const paperPlane = document.querySelector(".paper-plane-art");
    if (paperPlane) {
      if (isInView && !paperPlane.classList.contains("animate")) {
        paperPlane.classList.add("animate");
      } else if (!isInView && paperPlane.classList.contains("animate")) {
        paperPlane.classList.remove("animate");
        // Reset animation
        paperPlane.style.animation = "none";
        paperPlane.offsetHeight; // Trigger reflow
        paperPlane.style.animation = "";
      }
    }

    // Animate contact cards
    const contactCards = document.querySelectorAll(".contact-card");
    contactCards.forEach((card) => {
      if (isInView && !card.classList.contains("animate")) {
        card.classList.add("animate");
      } else if (!isInView && card.classList.contains("animate")) {
        card.classList.remove("animate");
        // Reset animation
        card.style.animation = "none";
        card.offsetHeight; // Trigger reflow
        card.style.animation = "";
      }
    });
  }
};

// ===== TYPING EFFECT LOOP FOR SUBTITLE =====
const subtitleText = "Web Developer Intern (Full-stack)";
let subtitleIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

const educationTitleLine1 = "Học vấn";
const educationTitleLine2 = "& Chứng chỉ";
let educationTypingStarted = false;

function typeEducationTitle() {
  const line1Element = document.getElementById("educationTypingLine1");
  const line2Element = document.getElementById("educationTypingLine2");

  if (!line1Element || !line2Element) return;

  let line1Index = 0;
  let line2Index = 0;

  const typeLine1 = () => {
    line1Index += 1;
    line1Element.textContent = educationTitleLine1.slice(0, line1Index);

    if (line1Index < educationTitleLine1.length) {
      setTimeout(typeLine1, 150);
      return;
    }

    setTimeout(typeLine2, 900);
  };

  const typeLine2 = () => {
    line2Index += 1;
    line2Element.textContent = educationTitleLine2.slice(0, line2Index);

    if (line2Index < educationTitleLine2.length) {
      setTimeout(typeLine2, 150);
    }
  };

  line1Element.textContent = "";
  line2Element.textContent = "";
  typeLine1();
}

function typeSubtitle() {
  const subtitleElement = document.getElementById("subtitleTyping");
  if (!subtitleElement) return;

  const currentText = subtitleText.substring(0, subtitleIndex);
  subtitleElement.textContent = currentText;

  if (!isDeleting) {
    // Đang gõ
    subtitleIndex++;
    typingSpeed = 80 + Math.random() * 50; // Tốc độ gõ ngẫu nhiên

    if (subtitleIndex > subtitleText.length) {
      // Gõ xong, dừng 2 giây rồi bắt đầu xóa
      isDeleting = true;
      typingSpeed = 2000;
    }
  } else {
    // Đang xóa
    subtitleIndex--;
    typingSpeed = 40; // Xóa nhanh hơn gõ

    if (subtitleIndex === 0) {
      // Xóa xong, dừng 0.5 giây rồi bắt đầu gõ lại
      isDeleting = false;
      typingSpeed = 500;
    }
  }

  setTimeout(typeSubtitle, typingSpeed);
}

// Initial setup - Xóa style inline cũ, dùng class thay thế
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
  // Trigger animation check ngay khi load
  setTimeout(animateOnScroll, 100);

  // Set Winter theme as default to match initial active button
  changeTheme("winter");

  // Reset typing animation on page load
  const h1Element = document.querySelector(".home-info h1");
  if (h1Element) {
    h1Element.style.animation = "none";
    setTimeout(() => {
      h1Element.style.animation = "";
    }, 10);
  }

  // Start subtitle typing effect
  setTimeout(typeSubtitle, 1500);

  setupProjectCarousel();
  setupHangingBoardInteractions();
});

// Close theme switcher when clicking outside
document.addEventListener("click", (e) => {
  const switcher = document.querySelector(".theme-switcher");
  if (!switcher.contains(e.target) && themeSwitcherOpen) {
    toggleThemeSwitcher();
  }
});
