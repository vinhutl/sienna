// Tab Cloaking System
const presets = [
  { previewTitle: "Google", realTitle: "Google", favicon: "static/assets/favicons/google.ico" },
  { previewTitle: "Schoology", realTitle: "Home | Schoology", favicon: "static/assets/favicons/schoology.ico" },
  { previewTitle: "Classlink", realTitle: "My Apps", favicon: "static/assets/favicons/classlink.ico" },
  { previewTitle: "Gmail", realTitle: "Inbox", favicon: "static/assets/favicons/gmail.ico" },
  { previewTitle: "Google Classroom", realTitle: "Home", favicon: "static/assets/favicons/googleclassroom.ico" },
  { previewTitle: "Google Drive", realTitle: "My Drive", favicon: "static/assets/favicons/googledrive.ico" },
  { previewTitle: "Google Docs", realTitle: "Google Docs", favicon: "static/assets/favicons/googledocs.ico" },
  { previewTitle: "Google Forms", realTitle: "Google Forms", favicon: "static/assets/favicons/googleforms.ico" },
  { previewTitle: "Google Forms Lock Down Mode", realTitle: "Start your quiz", favicon: "static/assets/favicons/googleforms.ico" },
  { previewTitle: "Google Slides", realTitle: "Google Slides", favicon: "static/assets/favicons/googleslides.ico" },
  { previewTitle: "Google Sites", realTitle: "Google Sites", favicon: "static/assets/favicons/googlesites.ico" },
  { previewTitle: "Home Access Center", realTitle: "Home View Summary", favicon: "static/assets/favicons/hac.ico" },
  { previewTitle: "IXL", realTitle: "IXL | Math, Language Arts, Social Studies, and Spanish", favicon: "static/assets/favicons/ixl.ico" },
  { previewTitle: "i-Ready Math", realTitle: "Math To Do, i-Ready", favicon: "static/assets/favicons/iready.ico" },
  { previewTitle: "i-Ready Reading", realTitle: "Reading To Do, i-Ready", favicon: "static/assets/favicons/iready.ico" },
  { previewTitle: "Eduphoria", realTitle: "Eduphoria! Login", favicon: "static/assets/favicons/eduphoria.ico" },
  { previewTitle: "McGraw Hill", realTitle: "McGraw Hill Professional | Textbooks | Interactive Learning Solutions", favicon: "static/assets/favicons/mcgrawhill.ico" }
];

// Initialize the cloaking system
function initTabCloaker() {
  // Load saved cloak on page load
  const savedCloak = sessionStorage.getItem('selectedCloak') || localStorage.getItem('defaultCloak');
  if (savedCloak) {
    applyCloak(parseInt(savedCloak));
  }
  
  // Create cloak buttons in the settings
  createCloakButtons();
  
  // Attach remove button event listener
  const removeBtn = document.getElementById('removeTabCloakBtn');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      removeCloak();
      updateCloakButtons(-1);
    });
  }
}

// Create buttons for each preset
function createCloakButtons() {
  const grid = document.getElementById('cloakGrid');
  if (!grid) return;
  
  presets.forEach((preset, index) => {
    const btn = document.createElement('button');
    btn.className = 'cloak-btn';
    btn.dataset.index = index;
    btn.title = preset.previewTitle;
    
    const img = document.createElement('img');
    img.src = preset.favicon;
    img.alt = preset.previewTitle;
    btn.appendChild(img);
    
    // Check if this is the active cloak
    const savedCloak = sessionStorage.getItem('selectedCloak') || localStorage.getItem('defaultCloak') || 0;
    if (parseInt(savedCloak) === index) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      selectCloak(index);
      updateCloakButtons(index);
    });
    
    grid.appendChild(btn);
  });
}

// Update active button state
function updateCloakButtons(activeIndex) {
  document.querySelectorAll('.cloak-btn').forEach((btn, index) => {
    if (activeIndex === -1) {
      // Remove cloak button is active
      if (btn.classList.contains('remove-cloak-btn')) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    } else if (btn.classList.contains('remove-cloak-btn')) {
      btn.classList.remove('active');
    } else if (index === activeIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Select and apply a cloak
function selectCloak(index) {
  // Save to both session and local storage
  sessionStorage.setItem('selectedCloak', index);
  localStorage.setItem('defaultCloak', index);
  applyCloak(index);
}

// Apply the cloak to the tab
function applyCloak(index) {
  const preset = presets[index];
  
  // Change document title
  document.title = preset.realTitle;
  
  // Change favicon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = preset.favicon;
  
  // Update active state visually
  updateCloakButtons(index);
}

// Remove the cloak and reset to default
function removeCloak() {
  sessionStorage.removeItem('selectedCloak');
  localStorage.removeItem('defaultCloak');
  document.title = 'settings - sienna.';
  
  // Reset favicon to default
  let link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = 'favicon.ico';
  }
  
  updateCloakButtons(-1);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabCloaker);
} else {
  initTabCloaker();
}