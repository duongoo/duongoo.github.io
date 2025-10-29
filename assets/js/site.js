// Simple theme toggle (class on <html>) and mobile nav toggle
(function(){
  const btn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');

  // Initialize theme: prefer saved, else system preference
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      root.classList.add('dark');
      if (btn) { btn.textContent = 'Light'; btn.setAttribute('aria-pressed','true'); }
    } else if (saved === 'light') {
      root.classList.remove('dark');
      if (btn) { btn.textContent = 'Dark'; btn.setAttribute('aria-pressed','false'); }
    } else {
      // no saved preference -> use prefers-color-scheme
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        if (btn) { btn.textContent = 'Light'; btn.setAttribute('aria-pressed','true'); }
      } else {
        root.classList.remove('dark');
        if (btn) { btn.textContent = 'Dark'; btn.setAttribute('aria-pressed','false'); }
      }
    }
  } catch (e) {
    // localStorage may be unavailable — fail silently
  }

  if (btn) {
    btn.addEventListener('click', () => {
      if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme','light');
        btn.textContent = 'Dark';
        btn.setAttribute('aria-pressed','false');
      } else {
        root.classList.add('dark');
        localStorage.setItem('theme','dark');
        btn.textContent = 'Light';
        btn.setAttribute('aria-pressed','true');
      }
    });
  }

  // Mobile nav toggle
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('hidden');
    });
  }
})();