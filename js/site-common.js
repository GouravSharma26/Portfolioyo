document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const nav = document.querySelector('nav');
  const mobileButton = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  const closeMenu = () => {
    if (!mobileButton || !mobileMenu) return;
    mobileButton.setAttribute('aria-expanded', 'false');
    mobileButton.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('open');
  };

  if (mobileButton && mobileMenu) {
    mobileButton.addEventListener('click', event => {
      event.stopPropagation();
      const open = mobileButton.getAttribute('aria-expanded') !== 'true';
      mobileButton.setAttribute('aria-expanded', String(open));
      mobileButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.classList.toggle('open', open);
    });
    mobileMenu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('click', event => {
      if (!mobileMenu.contains(event.target) && event.target !== mobileButton) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeMenu();
        mobileButton.focus();
      }
    });
  }

  if (nav) {
    const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  if (finePointer && !reducedMotion) {
    const dot = document.createElement('div');
    const outline = document.createElement('div');
    dot.id = 'cursor-dot';
    outline.id = 'cursor-outline';
    document.body.append(dot, outline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let moved = false;

    window.addEventListener('mousemove', event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!moved) {
        moved = true;
        document.body.classList.add('cursor-ready');
      }
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const bindHoverEffects = () => {
      document.querySelectorAll('a, button, input, textarea, .tab').forEach(element => {
        if (element.dataset.cursorBound) return;
        element.dataset.cursorBound = 'true';
        element.addEventListener('mouseenter', () => outline.classList.add('hovering'));
        element.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
      });
    };
    bindHoverEffects();
    new MutationObserver(bindHoverEffects).observe(document.body, { childList: true, subtree: true });
  }
});
