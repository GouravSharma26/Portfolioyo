document.addEventListener('DOMContentLoaded', () => {
  const clustersContainer = document.querySelector('.skill-clusters');
  const clusters = document.querySelectorAll('.cluster');
  
  if (clustersContainer && clusters.length > 0) {
    // 1. Mouse tracking for radial background glow
    clustersContainer.addEventListener('mousemove', (e) => {
      for (const cluster of clusters) {
        const rect = cluster.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cluster.style.setProperty('--mouse-x', `${x}px`);
        cluster.style.setProperty('--mouse-y', `${y}px`);
      }
    });

    // 2. 3D Tilt Effect on Hover
    for (const cluster of clusters) {
      cluster.addEventListener('mousemove', (e) => {
        const rect = cluster.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate rotation (-3 to 3 degrees max to keep it subtle)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        
        cluster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        cluster.style.transition = 'none'; // Snap to mouse instantly
        cluster.style.zIndex = '10';
      });
      
      cluster.addEventListener('mouseleave', () => {
        cluster.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        cluster.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cluster.style.zIndex = '1';
      });
    }

    // 3. Staggered Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    clusters.forEach((cluster, index) => {
      cluster.style.setProperty('--delay', `${index * 0.1}s`);
      observer.observe(cluster);
    });
  }
});
