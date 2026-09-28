document.addEventListener('DOMContentLoaded', () => {
  const container = '.sphere-box';
  if (!document.querySelector(container) || typeof TagCloud === 'undefined') return;

  const texts = [
    '<span class="pill" style="--brand: #61DAFB;"><i class="devicon-react-original colored"></i> React.js</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-nextjs-original"></i> Next.js</span>',
    '<span class="pill" style="--brand: #F7DF1E;"><i class="devicon-javascript-plain colored"></i> JavaScript</span>',
    '<span class="pill" style="--brand: #3178C6;"><i class="devicon-typescript-plain colored"></i> TypeScript</span>',
    '<span class="pill" style="--brand: #3776AB;"><i class="devicon-python-plain colored"></i> Python</span>',
    '<span class="pill" style="--brand: #00599C;"><i class="devicon-cplusplus-plain colored"></i> C++</span>',
    '<span class="pill" style="--brand: #44B78B;"><i class="devicon-django-plain colored"></i> Django</span>',
    '<span class="pill" style="--brand: #339933;"><i class="devicon-nodejs-plain colored"></i> Node.js</span>',
    '<span class="pill" style="--brand: #4169E1;"><i class="devicon-postgresql-plain colored"></i> PostgreSQL</span>',
    '<span class="pill" style="--brand: #47A248;"><i class="devicon-mongodb-plain colored"></i> MongoDB</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-express-original"></i> Express</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-fastify-plain"></i> Fastify</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-prisma-original"></i> Prisma</span>',
    '<span class="pill" style="--brand: #00758F;"><i class="devicon-sqldeveloper-plain colored"></i> SQL</span>',
    '<span class="pill" style="--brand: #E34F26;"><i class="devicon-html5-plain colored"></i> HTML</span>',
    '<span class="pill" style="--brand: #1572B6;"><i class="devicon-css3-plain colored"></i> CSS</span>',
    '<span class="pill" style="--brand: #06B6D4;"><i class="devicon-tailwindcss-original colored"></i> Tailwind</span>',
    '<span class="pill" style="--brand: var(--teal);">REST APIs</span>',
    '<span class="pill" style="--brand: #37814A;">Celery</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-socketio-original"></i> Socket.io</span>',
    '<span class="pill" style="--brand: #FFFFFF;"><i class="devicon-github-original"></i> Git</span>',
    '<span class="pill" style="--brand: #007ACC;"><i class="devicon-vscode-plain colored"></i> VS Code</span>'
  ];

  // Adjust radius based on screen width
  const isMobile = window.innerWidth < 768;
  const radius = isMobile ? 140 : 200;

  const options = {
    radius: radius,
    maxSpeed: 'fast',
    initSpeed: 'fast',
    direction: 135,
    keep: true,
    useHTML: true,
    useItemInlineStyles: false // Let CSS handle colors
  };

  TagCloud(container, texts, options);
});
