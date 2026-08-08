// site-common.js
document.addEventListener('DOMContentLoaded', () => {
  // Check if we are on a pointer device (desktop)
  if (window.matchMedia('(pointer: fine)').matches) {
    // Inject the custom cursor DOM elements
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    const outline = document.createElement('div');
    outline.id = 'cursor-outline';
    
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    let mX = 0, mY = 0;
    let outlineX = 0, outlineY = 0;
    
    let hasMoved = false;
    window.addEventListener('mousemove', (e) => {
      mX = e.clientX;
      mY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        document.body.classList.add('cursor-ready');
      }
      dot.style.transform = `translate(${mX}px, ${mY}px) translate(-50%, -50%)`;
    });
    
    const animateCursor = () => {
      outlineX += (mX - outlineX) * 0.2;
      outlineY += (mY - outlineY) * 0.2;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Bind hovering effect to interactive elements
    const bindHoverEffects = () => {
      const hoverElements = document.querySelectorAll('a, button, .project-card, .cmd-result-item, input, .tab');
      hoverElements.forEach(el => {
        // Prevent double binding
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "true";
        el.addEventListener('mouseenter', () => outline.classList.add('hovering'));
        el.addEventListener('mouseleave', () => outline.classList.remove('hovering'));
      });
    };
    
    bindHoverEffects();
    
    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          bindHoverEffects();
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Nav Scrolled State
  const nav = document.querySelector('nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }
});
