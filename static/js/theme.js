// Theme and Background System
const themes = {
  default: {
    '--primary-bg-1': '#888686',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#1f1f1f',
    '--border-color': '#333',
    '--text-shadow-1': 'rgba(255, 255, 255, 0.5)',
    '--text-shadow-2': 'rgba(255, 255, 255, 0.3)',
    '--text-shadow-3': 'rgba(255, 255, 255, 0.2)',
  },
  blue: {
    '--primary-bg-1': '#2563eb',
    '--primary-bg-2': '#1e40af',
    '--primary-text': '#ffffff',
    '--secondary-text': '#bfdbfe',
    '--accent-text': '#93c5fd',
    '--sidebar-bg': '#1e3a8a',
    '--border-color': '#3b82f6',
    '--text-shadow-1': 'rgba(59, 130, 246, 0.5)',
    '--text-shadow-2': 'rgba(59, 130, 246, 0.3)',
    '--text-shadow-3': 'rgba(59, 130, 246, 0.2)',
  },
  green: {
    '--primary-bg-1': '#10b981',
    '--primary-bg-2': '#047857',
    '--primary-text': '#ffffff',
    '--secondary-text': '#a7f3d0',
    '--accent-text': '#6ee7b7',
    '--sidebar-bg': '#064e3b',
    '--border-color': '#34d399',
    '--text-shadow-1': 'rgba(16, 185, 129, 0.5)',
    '--text-shadow-2': 'rgba(16, 185, 129, 0.3)',
    '--text-shadow-3': 'rgba(16, 185, 129, 0.2)',
  },
  purple: {
    '--primary-bg-1': '#a855f7',
    '--primary-bg-2': '#7e22ce',
    '--primary-text': '#ffffff',
    '--secondary-text': '#e9d5ff',
    '--accent-text': '#d8b4fe',
    '--sidebar-bg': '#581c87',
    '--border-color': '#c084fc',
    '--text-shadow-1': 'rgba(168, 85, 247, 0.5)',
    '--text-shadow-2': 'rgba(168, 85, 247, 0.3)',
    '--text-shadow-3': 'rgba(168, 85, 247, 0.2)',
  },
};

// Background themes with their color schemes
const backgroundThemes = {
  theme3: {
    '--primary-bg-1': '#081848',
    '--primary-bg-2': '#5f81bf',
    '--primary-text': '#ffffff',
    '--secondary-text': '#c7d4f0',
    '--accent-text': '#a0b5e8',
    '--sidebar-bg': '#34436a',
    '--border-color': '#081848',
    '--background-image': "url('/static/assets/backgrounds/心流.jpg')",
  },
  theme4: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/invain.jpg')",
  },
  theme5: {
    '--primary-bg-1': '#0e1339',
    '--primary-bg-2': '#ff8c71',
    '--primary-text': '#ffffff',
    '--secondary-text': '#ffe0d6',
    '--accent-text': '#f48fb1',
    '--sidebar-bg': '#252466',
    '--border-color': '#f48fb1',
    '--background-image': "url('/static/assets/backgrounds/かえりみち.jpg')",
  },
  theme6: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/astray.jpg')",
  },
  theme7: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/sakuracherrybiome.gif')",
  },
  theme8: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/walkbythebeach.gif')",
  },
  theme9: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/kny.gif')",
  },
    theme10: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/meaning.jpg')",
  },
      theme11: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/underthestarrysky.jpg')",
  },
      theme12: {
    '--primary-bg-1': '#181c24',
    '--primary-bg-2': '#000000',
    '--primary-text': '#ffffff',
    '--secondary-text': '#888',
    '--accent-text': '#9ca3af',
    '--sidebar-bg': '#2d3748',
    '--border-color': '#4a5568',
    '--background-image': "url('/static/assets/backgrounds/isolated.jpg')",
  },
};

// Function to extract the raw URL from the CSS `url(...)` string
function extractUrl(cssUrl) {
    const match = cssUrl.match(/url\(['"]?(.*?)['"]?\)/);
    return match ? match[1] : null;
}

// Apply theme function
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return; const root = document.documentElement;
    // 🌟 FIX: Clear any active background image first
    root.style.setProperty('--background-image', 'none');
    localStorage.removeItem('selectedBackground'); // Clear background preference

  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Save theme to localStorage
  localStorage.setItem('selectedTheme', themeName);
}

// Apply background theme, includes image preloading
function applyBackgroundTheme(themeName) {
  const theme = backgroundThemes[themeName];
    if (!theme) return; const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });

    // Preload the image instantly
    const imageUrl = theme['--background-image'] ? extractUrl(theme['--background-image']) : null;
    if (imageUrl) {
        // Create an Image object to start loading the image immediately
        const img = new Image();
        img.src = imageUrl;
    }
  
    // 🌟 FIX: The theme color variables (like --primary-bg-1, --primary-bg-2) are part of the
    // background theme object, so applying them here is correct, and they will override
    // the previous theme's colors. We only need to save the background preference.
  localStorage.setItem('selectedBackground', themeName);
  localStorage.setItem('selectedTheme', themeName); // Save background theme as primary theme as well for consistency
}

// --- INSTANT THEME LOAD AND EVENT LISTENERS SETUP ---

// Load saved theme and background instantly (outside DOMContentLoaded)
const savedBackground = localStorage.getItem('selectedBackground') ;
const savedTheme = localStorage.getItem('selectedTheme') || 'default'; // Keep 'default' as a fallback

// 🌟 FIX: Prioritize loading the background if it's saved, otherwise load the color theme.
if (savedBackground) {
    applyBackgroundTheme(savedBackground);
} else {
    applyTheme(savedTheme);
}


// Setup event listeners and button state on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // Get the currently active stored values
    const currentTheme = localStorage.getItem('selectedTheme') || 'default';
    const currentBackground = localStorage.getItem('selectedBackground');

    // Update button state for simple themes
    const themeButtons = document.querySelectorAll('.theme-btn[data-theme]');
    themeButtons.forEach(btn => {
        // Only mark as active if it matches the current theme AND no background is set
        if (btn.getAttribute('data-theme') === currentTheme && !currentBackground) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update button state for background themes
    const bgButtons = document.querySelectorAll('.theme-btn[data-background]');
    bgButtons.forEach(btn => {
        // Only mark as active if it matches the current background
        if (btn.getAttribute('data-background') === currentBackground) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Add theme button listeners (Apply Theme and Clear Background)
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const themeName = this.getAttribute('data-theme');
            applyTheme(themeName);
            
            // Reset active states for both theme and background buttons
            themeButtons.forEach(b => b.classList.remove('active'));
            bgButtons.forEach(b => b.classList.remove('active'));
            
            this.classList.add('active');
        });
    });

    // Add background button listeners (Apply Background and Override Theme)
    bgButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const themeName = this.getAttribute('data-background');
            applyBackgroundTheme(themeName);
            
            // Reset active states for both theme and background buttons
            themeButtons.forEach(b => b.classList.remove('active'));
            bgButtons.forEach(b => b.classList.remove('active'));
            
            this.classList.add('active');
        });
    });
});

// Particle system
const canvas = document.getElementById("particleCanvas");
// Check if canvas exists before running particle system
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 0.8 + 0.3;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < 125; i++) {
        particles.push(new Particle());
    }

    // Mouse tracking
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function drawLines() {
        const connectionDistance = 200;
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            
            // Draw line from cursor to nearby particles
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                const opacity = (1 - distance / connectionDistance) * 0.3;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(mouseX, mouseY);
                ctx.lineTo(particle.x, particle.y);
                ctx.stroke();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Update and draw particles
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        // Draw connection lines
        drawLines();
        requestAnimationFrame(animate);
    }

    animate();
}


// Export for use in buttons or selectors
window.setTheme = applyTheme;
window.setBackground = applyBackgroundTheme;
window.themes = themes;
window.backgroundThemes = backgroundThemes;