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

// Projects + Gallery
const projectCatalog = [
  {
    id: "littlefish",
    title: "Beauty LittleFish",
    galleryLabel: "Gallery ảnh dự án Beauty LittleFish",
    description:
      "Beauty LittleFish là website thương mại điện tử mỹ phẩm, tập trung vào trải nghiệm mua sắm mượt mà, quản lý dữ liệu sản phẩm rõ ràng và tối ưu hiển thị trên công cụ tìm kiếm.",
    features: [
      "Đăng ký, đăng nhập, quên mật khẩu và quản lý tài khoản người dùng.",
      "Hiển thị danh mục sản phẩm, chi tiết sản phẩm và biến thể sản phẩm.",
      "Tìm kiếm, lọc, sắp xếp sản phẩm theo nhu cầu mua sắm.",
      "Giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng.",
      "Hệ thống đánh giá sản phẩm theo số sao, nội dung và hình ảnh.",
      "Trang quản trị: quản lý sản phẩm, tồn kho, đơn hàng và nội dung.",
      "Hỗ trợ khuyến mãi, voucher và logic giảm giá theo điều kiện.",
      "Tối ưu SEO với slug thân thiện, metadata và sitemap.",
    ],
    technologies: [
      "ASP.NET Core 8.0",
      "Entity Framework Core",
      "SQL Server",
      "Razor Views",
      "HTML",
      "CSS",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Google Analytics",
      "Mailchimp",
      "GitHub",
    ],
    images: [
      "./images/LittleFish/126962031438264350512.jpg",
      "./images/LittleFish/31361382703354435724.jpg",
      "./images/LittleFish/31361382703354435727.jpg",
      "./images/LittleFish/31361382703354435728.jpg",
      "./images/LittleFish/37518677369967932841.jpg",
      "./images/LittleFish/375186773699679328410.jpg",
      "./images/LittleFish/375186773699679328411.jpg",
      "./images/LittleFish/375186773699679328413.jpg",
      "./images/LittleFish/37518677369967932842.jpg",
      "./images/LittleFish/37518677369967932843.jpg",
      "./images/LittleFish/37518677369967932845.jpg",
      "./images/LittleFish/37518677369967932846.jpg",
      "./images/LittleFish/37518677369967932849.jpg",
    ],
    imageAltPrefix: "Ảnh dự án LittleFish",
  },
  {
    id: "m-task",
    title: "MATA",
    galleryLabel: "Gallery ảnh dự án MATA",
    description:
      "MATA là ứng dụng quản lý công việc theo mô hình Kanban, được xây dựng bằng HTML, CSS và JavaScript thuần. Dự án tập trung vào trải nghiệm kéo thả mượt mà, quản lý trạng thái rõ ràng trên client và lưu trữ dữ liệu cục bộ ổn định, phù hợp để sử dụng hằng ngày và demo năng lực frontend.",
    features: [
      "Bảng Kanban 3 cột: To Do, Doing, Done.",
      "Kéo thả task giữa các cột bằng SortableJS.",
      "Thêm task theo từng cột bằng nút cộng và modal popup.",
      "Chỉnh sửa task trực tiếp với thao tác nhanh trên card.",
      "Hoàn thành task để đẩy sang cột kế tiếp.",
      "Nhân bản task tại cột To Do để tạo việc tương tự nhanh.",
      "Lọc task theo từ khóa và mức độ ưu tiên.",
      "Mô tả rich text với Bold, Italic, Underline, Bullet list, Numbered list.",
      "Quản lý thời gian bắt đầu và kết thúc theo datetime.",
      "Gán màu và tag để phân loại công việc trực quan.",
      "Export/Import JSON để sao lưu và phục hồi dữ liệu.",
      "Lưu trữ localStorage và hỗ trợ dark mode.",
      "Chuẩn hóa dữ liệu cũ/mới và sanitize nội dung trước khi render.",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript (ES Modules)",
      "SortableJS (CDN)",
      "localStorage API",
      "JSON Import/Export",
      "GitHub",
    ],
    images: [
      "./images/M-Task/d00153d9-3797-4b0e-b3c8-b344ded9a638.jpg",
      "./images/M-Task/Screenshot 2026-04-19 165014.png",
      "./images/M-Task/Screenshot 2026-04-19 165050.png",
      "./images/M-Task/Screenshot 2026-04-19 165711.png",
      "./images/M-Task/Screenshot 2026-04-19 165809.png",
    ],
    imageAltPrefix: "Ảnh dự án MATA",
  },
];

let activeProjectIndex = 0;
let activeLittleFishIndex = 0;
let littleFishCards = [];
let littleFishIndicators = [];
let littleFishIndicatorsWrap = null;
let littleFishLocked = false;
let littleFishImages = [];
let littleFishLightbox = null;
let littleFishLightboxImage = null;
let littleFishLightboxCounter = null;
let littleFishLightboxIndex = 0;
let projectStage = null;
let projectInfoPanel = null;
let projectGalleryPanel = null;
let projectWrapper = null;
let projectTitleEl = null;
let activeImageByProject = {};
let activeHangingBoard = null;
let activeHangingBoardSide = null;
let projectsRevealTriggered = false;
let projectSwitchLocked = false;

function normalizeIndex(index, length) {
  if (!length) return 0;
  return (index + length) % length;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function triggerLittleFishPeel(
  direction,
  previousIndex,
  nextIndex,
  duration = 780,
) {
  const previousCard = littleFishCards[previousIndex];
  const nextCard = littleFishCards[nextIndex];

  if (!previousCard || !nextCard) return;

  const peelClasses = [
    "peel-exit-left",
    "peel-exit-right",
    "peel-enter-left",
    "peel-enter-right",
  ];

  littleFishCards.forEach((card) => card.classList.remove(...peelClasses));
  void previousCard.offsetWidth;

  if (direction > 0) {
    previousCard.classList.add("peel-exit-left");
    nextCard.classList.add("peel-enter-right");
  } else {
    previousCard.classList.add("peel-exit-right");
    nextCard.classList.add("peel-enter-left");
  }

  setTimeout(() => {
    previousCard.classList.remove(...peelClasses);
    nextCard.classList.remove(...peelClasses);
  }, duration);
}

function rotateLittleFish(direction) {
  if (!littleFishCards.length || littleFishLocked) return;

  const previousIndex = activeLittleFishIndex;
  const total = littleFishCards.length;
  activeLittleFishIndex = normalizeIndex(
    activeLittleFishIndex + direction,
    total,
  );

  persistActiveImageOfCurrentProject();
  littleFishLocked = true;
  paintLittleFishGallery();
  triggerLittleFishPeel(direction, previousIndex, activeLittleFishIndex);

  setTimeout(() => {
    littleFishLocked = false;
  }, 780);
}

function persistActiveImageOfCurrentProject() {
  const project = projectCatalog[activeProjectIndex];
  if (!project) return;
  activeImageByProject[project.id] = activeLittleFishIndex;
}

function jumpLittleFish(index) {
  if (
    !littleFishCards.length ||
    littleFishLocked ||
    index === activeLittleFishIndex
  ) {
    return;
  }

  const previousIndex = activeLittleFishIndex;
  const direction = index > activeLittleFishIndex ? 1 : -1;
  activeLittleFishIndex = normalizeIndex(index, littleFishCards.length);
  persistActiveImageOfCurrentProject();
  paintLittleFishGallery();
  triggerLittleFishPeel(direction, previousIndex, activeLittleFishIndex);

  littleFishLocked = true;
  setTimeout(() => {
    littleFishLocked = false;
  }, 780);
}

function renderImageIndicators() {
  if (!littleFishIndicatorsWrap) return;

  littleFishIndicatorsWrap.innerHTML = "";
  littleFishIndicators = littleFishCards.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-indicator";
    dot.setAttribute("aria-label", `Xem ảnh dự án ${i + 1}`);
    dot.addEventListener("click", () => jumpLittleFish(i));
    littleFishIndicatorsWrap.appendChild(dot);
    return dot;
  });
}

function bindCurrentGalleryToLightbox() {
  littleFishImages = littleFishCards
    .map((card) => card.querySelector("img"))
    .filter(Boolean);

  littleFishImages.forEach((image, i) => {
    image.addEventListener("click", () => openLittleFishLightbox(i));
  });
}

function buildProjectInfo(project) {
  if (!projectInfoPanel) return;

  const featureItems = project.features
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  const techItems = project.technologies
    .map((tech) => `<span class="skill-tag">${escapeHtml(tech)}</span>`)
    .join("");

  projectInfoPanel.innerHTML = `
    <article class="lf-flag-card">
      <h3>Mô tả dự án</h3>
      <p>${escapeHtml(project.description)}</p>
    </article>

    <article class="lf-flag-card">
      <h3>Chức năng chính</h3>
      <ul>${featureItems}</ul>
    </article>

    <article class="lf-flag-card">
      <h3>Công cụ và công nghệ sử dụng</h3>
      <div class="lf-tech-badges">${techItems}</div>
    </article>
  `;
}

function buildProjectGallery(project) {
  if (!projectStage) return;

  projectStage.innerHTML = project.images
    .map(
      (src, index) => `
      <figure class="lf-image-card" data-lf-index="${index}">
        <img src="${src}" alt="${escapeHtml(project.imageAltPrefix)} ${index + 1}" />
      </figure>
    `,
    )
    .join("");

  littleFishCards = Array.from(projectStage.querySelectorAll(".lf-image-card"));
  const storedImageIndex = activeImageByProject[project.id] ?? 0;
  activeLittleFishIndex = normalizeIndex(
    storedImageIndex,
    littleFishCards.length,
  );

  renderImageIndicators();
  paintLittleFishGallery();
  bindCurrentGalleryToLightbox();
}

function renderActiveProject() {
  const project = projectCatalog[activeProjectIndex];
  if (!project) return;

  if (projectTitleEl) {
    projectTitleEl.textContent = project.title;
  }

  if (projectGalleryPanel) {
    projectGalleryPanel.setAttribute("aria-label", project.galleryLabel);
  }

  if (projectInfoPanel) {
    projectInfoPanel.setAttribute(
      "aria-label",
      `Nội dung dự án ${project.title}`,
    );
  }

  buildProjectGallery(project);
  buildProjectInfo(project);
  closeLittleFishLightbox();
}

function switchProject(direction) {
  if (!projectCatalog.length || littleFishLocked || projectSwitchLocked) return;

  const switchDuration = 780;
  const swapAt = Math.floor(switchDuration * 0.45);

  const completeSwitch = () => {
    activeProjectIndex = normalizeIndex(
      activeProjectIndex + direction,
      projectCatalog.length,
    );
    renderActiveProject();
  };

  persistActiveImageOfCurrentProject();

  if (!projectWrapper) {
    completeSwitch();
    return;
  }

  projectSwitchLocked = true;
  projectWrapper.classList.remove("is-project-changing");
  void projectWrapper.offsetWidth;
  projectWrapper.classList.add("is-project-changing");

  setTimeout(() => {
    completeSwitch();
  }, swapAt);

  setTimeout(() => {
    projectWrapper.classList.remove("is-project-changing");
    projectSwitchLocked = false;
  }, switchDuration);
}

function updateLittleFishLightbox() {
  if (!littleFishImages.length || !littleFishLightboxImage) return;

  const currentProject = projectCatalog[activeProjectIndex];
  const currentImage = littleFishImages[littleFishLightboxIndex];
  littleFishLightboxImage.src = currentImage.src;
  littleFishLightboxImage.alt = `${currentProject.title} - ảnh ${littleFishLightboxIndex + 1}`;

  if (littleFishLightboxCounter) {
    littleFishLightboxCounter.textContent = `${currentProject.title} • ${littleFishLightboxIndex + 1} / ${littleFishImages.length}`;
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
  persistActiveImageOfCurrentProject();
  paintLittleFishGallery();
}

function setupLittleFishLightbox() {
  littleFishLightbox = document.getElementById("lfLightbox");
  littleFishLightboxImage = document.getElementById("lfLightboxImage");
  littleFishLightboxCounter = document.getElementById("lfLightboxCounter");

  if (!littleFishLightbox) return;

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

  projectWrapper = document.querySelector(".projects-wrapper");
  projectGalleryPanel = gallery;
  projectStage = gallery.querySelector("[data-project-stage]");
  littleFishIndicatorsWrap = gallery.querySelector("[data-lf-indicators]");
  projectTitleEl = gallery.querySelector("[data-project-title]");
  projectInfoPanel = document.querySelector("[data-project-info]");

  const prevBtn = gallery.querySelector("[data-project-prev]");
  const nextBtn = gallery.querySelector("[data-project-next]");
  const imagePrevBtn = gallery.querySelector("[data-image-prev]");
  const imageNextBtn = gallery.querySelector("[data-image-next]");

  if (!projectStage || !projectInfoPanel) return;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => switchProject(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => switchProject(1));
  }

  if (imagePrevBtn) {
    imagePrevBtn.addEventListener("click", () => rotateLittleFish(-1));
  }

  if (imageNextBtn) {
    imageNextBtn.addEventListener("click", () => rotateLittleFish(1));
  }

  setupLittleFishLightbox();
  renderActiveProject();
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
