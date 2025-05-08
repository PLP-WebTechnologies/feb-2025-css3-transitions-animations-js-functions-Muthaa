const themeBtn = document.getElementById('toggleThemeBtn');
const fontSizeSelect = document.getElementById('fontSizeSelect');
const layoutSelect = document.getElementById('layoutSelect');
const previewBox = document.getElementById('previewBox');

// Utility: Apply all settings from localStorage
function applyPreferences() {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', theme === 'dark');

  const fontSize = localStorage.getItem('fontSize') || 'medium';
  previewBox.classList.remove('small-font', 'medium-font', 'large-font');
  previewBox.classList.add(`${fontSize}-font`);
  fontSizeSelect.value = fontSize;

  const layout = localStorage.getItem('layout') || 'full';
  document.body.classList.toggle('boxed-layout', layout === 'boxed');
  document.body.classList.toggle('full-layout', layout === 'full');
  layoutSelect.value = layout;
}

// Events
themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  animatePreview();
});

fontSizeSelect.addEventListener('change', (e) => {
  const size = e.target.value;
  localStorage.setItem('fontSize', size);
  previewBox.classList.remove('small-font', 'medium-font', 'large-font');
  previewBox.classList.add(`${size}-font`);
  animatePreview();
});

layoutSelect.addEventListener('change', (e) => {
  const layout = e.target.value;
  localStorage.setItem('layout', layout);
  document.body.classList.toggle('boxed-layout', layout === 'boxed');
  document.body.classList.toggle('full-layout', layout === 'full');
  animatePreview();
});

// Animation reset trick
function animatePreview() {
  previewBox.style.animation = 'none';
  previewBox.offsetHeight; // Force reflow
  previewBox.style.animation = '';
  previewBox.classList.add('fadeInUp');
}

// On load
document.addEventListener('DOMContentLoaded', applyPreferences);
