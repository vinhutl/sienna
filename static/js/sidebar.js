function loadSidebar() {
  const sidebarHTML = `
    <div class="sidebar">
      <div class="logo">
        <img src="static/img/tenplogo.webp" alt="vinhutl logo" />
      </div>
      <div class="divider"></div>

      <div class="nav-section">
        <button class="nav-btn" onclick="navigate('index.html')" data-page="index.html" data-tooltip="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </button>

        <button class="nav-btn" onclick="navigate('static/games.html')" data-page="games.html" data-tooltip="Games">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="6" y1="11" x2="10" y2="11"/>
            <line x1="8" y1="9" x2="8" y2="13"/>
            <line x1="15" y1="12" x2="15.01" y2="12"/>
            <line x1="18" y1="10" x2="18.01" y2="10"/>
            <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>
          </svg>
        </button>

        <button class="nav-btn" onclick="navigate('static/apps.html')" data-page="apps.html" data-tooltip="Apps">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
        </button>

        <button class="nav-btn" onclick="navigate('static/settings.html')" data-page="settings.html" data-tooltip="Settings">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6"/>
            <path d="M17 7l-5 5"/>
            <path d="M7 7l5 5"/>
            <path d="M7 17l5-5"/>
            <path d="M17 17l-5-5"/>
          </svg>
        </button>
      </div>

      <div class="bottom-section">
        <button class="nav-btn" onclick="navigate('contact.html')" data-page="contact.html" data-tooltip="Contact">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>

        <button class="nav-btn" onclick="navigate('legal.html')" data-page="legal.html" data-tooltip="Legal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </button>

        <button class="nav-btn" onclick="navigate('about.html')" data-page="about.html" data-tooltip="About">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.getElementById("sidebar-container").innerHTML = sidebarHTML;

  // Set active button based on current page
  setActiveButton();

  // Tooltip logic
  const tooltip = document.createElement("div");
  tooltip.id = "tooltip";
  document.body.appendChild(tooltip);

  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", (e) => {
      tooltip.textContent = btn.getAttribute("data-tooltip");
      tooltip.style.opacity = "1";
      const rect = btn.getBoundingClientRect();
      tooltip.style.top = `${rect.top + rect.height / 2 - 10}px`;
      tooltip.style.left = `${rect.right + 10}px`;
    });
    btn.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
  });
}

function setActiveButton() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  const buttons = document.querySelectorAll(".nav-btn");
  buttons.forEach((btn) => {
    const btnPage = btn.getAttribute("data-page");
    if (btnPage === currentPage || (currentPage === '' && btnPage === 'index.html')) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function navigate(page) {
  // Always navigate from root using absolute path
  const basePath = window.location.origin;
  window.location.href = basePath + '/' + page;
}

document.addEventListener("DOMContentLoaded", loadSidebar);