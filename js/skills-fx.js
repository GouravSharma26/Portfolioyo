document.addEventListener('DOMContentLoaded', () => {
  const clustersContainer = document.querySelector('.skill-clusters');
  const clusters = document.querySelectorAll('.cluster');
  
  if (clustersContainer && clusters.length > 0) {
    clustersContainer.addEventListener('mousemove', (e) => {
      for (const cluster of clusters) {
        const rect = cluster.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cluster.style.setProperty('--mouse-x', `${x}px`);
        cluster.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }
});
