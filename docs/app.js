/* Moblink: small, dependency-free interactions.
   This static website never accesses a visitor's phone or personal data. */
(function () {
  'use strict';
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('site-nav');
  const themeKey = 'moblink-vi-theme';

  try {
    const saved = window.localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (_error) {
    // Storage may be disabled in a privacy-focused browser.
  }

  function syncThemeLabel() {
    if (!themeButton) return;
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    themeButton.setAttribute('title', dark ? 'Chuyển sang sáng' : 'Chuyển sang tối');
  }
  syncThemeLabel();

  if (themeButton) themeButton.addEventListener('click', function () {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    syncThemeLabel();
    try { window.localStorage.setItem(themeKey, root.dataset.theme); } catch (_error) {}
  });

  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
  }
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('click', function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const search = document.getElementById('feature-search');
  const featureCards = Array.from(document.querySelectorAll('.feature-card'));
  const emptyState = document.getElementById('no-results');
  const normalize = function (value) {
    return (value || '').toLocaleLowerCase('vi').normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').trim();
  };
  if (search) {
    search.addEventListener('input', function () {
      const query = normalize(search.value);
      let shown = 0;
      featureCards.forEach(function (card) {
        const corpus = normalize(card.textContent + ' ' + card.dataset.search);
        const matches = !query || corpus.includes(query);
        card.hidden = !matches;
        if (matches) shown++;
      });
      if (emptyState) emptyState.hidden = shown !== 0;
    });
    document.addEventListener('keydown', function (event) {
      const target = event.target;
      const editing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !editing) {
        event.preventDefault();
        search.focus();
      }
    });
  }

  const galleryButtons = Array.from(document.querySelectorAll('.gallery-item[data-image]'));
  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  const dialogCounter = document.getElementById('dialog-count');
  const prevButton = document.getElementById('dialog-prev');
  const nextButton = document.getElementById('dialog-next');
  const closeButton = document.getElementById('dialog-close');
  let current = 0;

  function showImage(index) {
    if (!galleryButtons.length || !dialogImage) return;
    current = (index + galleryButtons.length) % galleryButtons.length;
    const target = galleryButtons[current];
    dialogImage.src = target.dataset.image;
    dialogImage.alt = target.querySelector('img')?.alt || 'Ảnh chụp màn hình';
    if (dialogCaption) dialogCaption.textContent = target.dataset.caption || dialogImage.alt;
    if (dialogCounter) dialogCounter.textContent = (current + 1) + ' / ' + galleryButtons.length;
  }
  if (dialog && typeof dialog.showModal === 'function') {
    galleryButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        showImage(index);
        dialog.showModal();
      });
    });
    if (prevButton) prevButton.addEventListener('click', function () { showImage(current - 1); });
    if (nextButton) nextButton.addEventListener('click', function () { showImage(current + 1); });
    if (closeButton) closeButton.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () { if (dialogImage) dialogImage.removeAttribute('src'); });
    document.addEventListener('keydown', function (event) {
      if (!dialog.open) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(current - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showImage(current + 1); }
    });
  } else {
    galleryButtons.forEach(function (button) {
      button.addEventListener('click', function () { window.open(button.dataset.image, '_blank', 'noopener,noreferrer'); });
    });
  }

  if ('IntersectionObserver' in window) {
    const spyLinks = Array.from(document.querySelectorAll('.toc-card a, .nav-links a'));
    const visibleSections = document.querySelectorAll('article section[id]');
    const observer = new IntersectionObserver(function (entries) {
      const visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      const hash = '#' + visible[0].target.id;
      spyLinks.forEach(function (link) {
        const active = link.getAttribute('href') === hash;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-90px 0px -62% 0px', threshold: 0 });
    visibleSections.forEach(function (section) { observer.observe(section); });
  }
})();
