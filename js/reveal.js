
// reveal.js
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Parallax Background Shapes
  const shapes = document.querySelectorAll('.bg-shape');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    shapes.forEach(shape => {
      const speed = parseFloat(shape.dataset.speed || 1);
      shape.style.transform = `translateY(${scrolled * speed * 0.2}px)`;
    });
  });
});
