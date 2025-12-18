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

// Intersection Observer for Navigation Dots
const sections = document.querySelectorAll("section");
const navDots = document.querySelectorAll(".nav-dot");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        navDots.forEach((dot) => {
          dot.classList.remove("active");
          if (dot.dataset.section === sectionId) {
            dot.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => observer.observe(section));

// Arc Projects with Rotation - Ferris Wheel Mechanic
let currentIndex = 0;
let currentRotation = 0;
const totalProjects = 3;
let isRotating = false;

const projectTitles = [
  "Beauty LittleFish",
  "Weather App",
  "Quiz Flashcard App",
];

function showArcProject(index) {
  // Update active state for text descriptions
  document.querySelectorAll(".project-description").forEach((detail, i) => {
    detail.classList.toggle("active", i === index);
  });

  // Update active state for project items
  document.querySelectorAll(".arc-project-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  // Update project title
  const projectTitle = document.getElementById("projectTitle");
  if (projectTitle) {
    projectTitle.classList.remove("active");
    setTimeout(() => {
      projectTitle.textContent = projectTitles[index];
      projectTitle.classList.add("active");
    }, 300);
  }
}

function navigateArcProject(direction) {
  if (isRotating) return;

  isRotating = true;

  // Calculate new index (content display)
  currentIndex = (currentIndex + direction + totalProjects) % totalProjects;

  // Calculate rotation angle (visual effect)
  // Each click rotates 120 degrees (360 / 3 items)
  // direction = 1 (Next) => rotate counter-clockwise (push right item up)
  // direction = -1 (Prev) => rotate clockwise
  currentRotation -= direction * 120;

  // Apply to DOM
  updateWheel(currentIndex, currentRotation);

  // Allow next rotation after animation completes
  setTimeout(() => {
    isRotating = false;
  }, 1000);
}

function updateWheel(index, rotation) {
  const wheel = document.getElementById("arcProjects");
  const items = document.querySelectorAll(".arc-project-item");

  // Rotate main axis (Container)
  wheel.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

  // Counter-rotate child items to keep icons upright
  // Like Ferris Wheel cabins
  items.forEach((item) => {
    const icon = item.querySelector(".arc-project-icon");
    if (icon) {
      icon.style.transform = `rotate(${-rotation}deg)`;
    }
  });

  // Show content
  showArcProject(index);
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
    subject
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
  document.querySelectorAll(".project-card").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });

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

  // Initialize project wheel (nếu còn dùng)
  if (typeof showArcProject === "function") {
    showArcProject(0);
  }
  if (typeof updateWheel === "function") {
    updateWheel(0, 0);
  }
});

// Close theme switcher when clicking outside
document.addEventListener("click", (e) => {
  const switcher = document.querySelector(".theme-switcher");
  if (!switcher.contains(e.target) && themeSwitcherOpen) {
    toggleThemeSwitcher();
  }
});
