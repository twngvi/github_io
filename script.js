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

// Animate on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".timeline-card, .skill-category");

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

// Initial setup
document.querySelectorAll(".timeline-card, .skill-category").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(50px)";
  el.style.transition = "all 0.6s ease";
});

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", () => {
  animateOnScroll();
  // Set Winter theme as default to match initial active button
  changeTheme("winter");

  // Reset typing animation on page load
  const h1Element = document.querySelector(".home-info h1");
  if (h1Element) {
    // Force reflow to restart animation
    h1Element.style.animation = "none";
    setTimeout(() => {
      h1Element.style.animation = "";
    }, 10);
  }

  // Initialize project wheel
  showArcProject(0);
  updateWheel(0, 0);
});

// Close theme switcher when clicking outside
document.addEventListener("click", (e) => {
  const switcher = document.querySelector(".theme-switcher");
  if (!switcher.contains(e.target) && themeSwitcherOpen) {
    toggleThemeSwitcher();
  }
});
