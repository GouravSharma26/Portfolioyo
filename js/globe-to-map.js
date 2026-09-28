document.addEventListener('DOMContentLoaded', () => {
  const universe = document.createElement('div');
  universe.id = 'skills-universe';
  Object.assign(universe.style, {
    position: 'absolute',
    top: '0', left: '0', width: '100%',
    pointerEvents: 'none', zIndex: '0',
    perspective: '1000px'
  });
  document.body.appendChild(universe);

  const heroAnchor = document.getElementById('hero-globe-anchor');
  const skillsAnchor = document.getElementById('skills-map-anchor');
  if (!heroAnchor || !skillsAnchor) return;

  const baseSkills = [
    // Languages
    { name: 'Python', icon: 'devicon-python-plain colored', color: '#3776AB' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', color: '#F7DF1E' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored', color: '#3178C6' },
    { name: 'C', icon: 'devicon-c-plain colored', color: '#A8B9CC' },
    { name: 'C++', icon: 'devicon-cplusplus-plain colored', color: '#00599C' },
    { name: 'SQL', icon: 'devicon-sqldeveloper-plain colored', color: '#00758F' },
    
    // Machine Learning & AI
    { name: 'PyTorch', icon: 'devicon-pytorch-original colored', color: '#EE4C2C' },
    { name: 'TensorFlow', icon: 'devicon-tensorflow-original colored', color: '#FF6F00' },
    { name: 'Pandas', icon: '', short: 'pd', color: '#8259FF' },
    { name: 'NumPy', icon: 'devicon-numpy-original colored', color: '#013243' },
    { name: 'OpenCV', icon: '', short: 'CV', color: '#7A61F2' },
    
    // Backend & Systems
    { name: 'Node.js', icon: 'devicon-nodejs-plain colored', color: '#339933' },
    { name: 'Express.js', icon: 'devicon-express-original', color: '#FFFFFF' },
    { name: 'Django', icon: 'devicon-django-plain colored', color: '#44B78B' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain', color: '#FFFFFF' },
    { name: 'Fastify', icon: '', short: 'FST', color: '#FFFFFF' },
    { name: 'Flask', icon: 'devicon-flask-plain', color: '#FFFFFF' },
    { name: 'Socket.io', icon: 'devicon-socketio-plain', color: '#FFFFFF' },
    
    // Frontend
    { name: 'React.js', icon: 'devicon-react-original colored', color: '#61DAFB' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original colored', color: '#06B6D4' },
    { name: 'HTML5', icon: 'devicon-html5-plain colored', color: '#E34F26' },
    { name: 'CSS3', icon: 'devicon-css3-plain colored', color: '#1572B6' },
    
    // Databases
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored', color: '#4169E1' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain colored', color: '#47A248' },
    { name: 'SQLite', icon: 'devicon-sqlite-plain colored', color: '#003B57' },
    { name: 'Prisma ORM', icon: 'devicon-prisma-plain', color: '#FFFFFF' },
    
    // DevOps & Cloud
    { name: 'Git', icon: 'devicon-git-plain colored', color: '#F05032' },
    { name: 'GitHub', icon: 'devicon-github-plain', color: '#FFFFFF' },
    { name: 'Docker', icon: 'devicon-docker-plain colored', color: '#2496ED' },
    { name: 'AWS', icon: '', short: 'AWS', color: '#FF9900' }
  ];

  // Dynamically inject tooltip styles
  const style = document.createElement('style');
  style.textContent = `
    #skills-universe .pill::after {
      content: attr(data-name);
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%) scale(0.8);
      background: var(--surface, #1e1e24);
      color: var(--text, #fff);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 14px;
      font-family: 'JetBrains Mono', monospace;
      opacity: 0;
      pointer-events: none;
      transition: all 0.2s ease;
      white-space: nowrap;
      border: 1px solid var(--border, #333);
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      z-index: 100;
    }
    #skills-universe.map-mode .pill:hover::after {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  `;
  document.head.appendChild(style);

  // We need enough items to fill a horizontal marquee on wide screens, 
  // so we duplicate the 30 unique skills just once to hit 60 items.
  const skills = [...baseSkills, ...baseSkills];
  const N = skills.length;
  const elements = [];

  skills.forEach((skill) => {
    const el = document.createElement('span');
    el.className = 'pill'; 
    el.setAttribute('data-name', skill.name);
    // Modify standard pill styles to be just a huge icon wrapper
    Object.assign(el.style, {
      position: 'absolute',
      top: '0', left: '0',
      pointerEvents: 'auto',
      fontSize: '3rem', // Massive icons
      padding: '10px',
      background: 'transparent',
      border: 'none',
      boxShadow: 'none'
    });
    
    el.style.setProperty('--brand', skill.color);
    
    if (skill.icon) {
      el.innerHTML = `<i class="${skill.icon}" style="color: ${skill.color}; filter: drop-shadow(0 0 6px color-mix(in srgb, ${skill.color} 30%, transparent));"></i>`;
    } else if (skill.short) {
      el.innerHTML = `<span style="color: ${skill.color}; font-family: var(--font-mono); font-weight: 700; font-size: 2.2rem; filter: drop-shadow(0 0 6px color-mix(in srgb, ${skill.color} 30%, transparent));">${skill.short}</span>`;
    }
    
    universe.appendChild(el);
    elements.push(el);
  });

  const sphereCoords = [];
  const isMobile = window.innerWidth < 768;
  const R = isMobile ? 120 : 180; 
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(1 - 2 * (i + 0.5) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    sphereCoords.push({ phi, theta });
  }

  // Increase rows to fill up the empty space in the skills section
  const rows = isMobile ? 6 : 4;
  const cols = Math.ceil(N / rows);
  const spacingX = isMobile ? 120 : 150; 
  const spacingY = 85; // Vertical distance between rows
  const totalWidth = cols * spacingX;

  let timeMap = 0;
  let globeThetaOffset = 0;
  let currentGlobeSpeed = 0.003;
  let targetGlobeSpeed = 0.003;
  
  document.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    targetGlobeSpeed = normX * 0.015;
  });

  function render() {
    timeMap += 0.003;
    currentGlobeSpeed += (targetGlobeSpeed - currentGlobeSpeed) * 0.05;
    globeThetaOffset += currentGlobeSpeed;

    const heroRect = heroAnchor.getBoundingClientRect();
    const skillsRect = skillsAnchor.getBoundingClientRect();
    
    const hCY = window.scrollY + heroRect.top + heroRect.height / 2;
    const hCX = heroRect.left + heroRect.width / 2;

    const sCY = window.scrollY + skillsRect.top + skillsRect.height / 2;
    const sCX = skillsRect.left + skillsRect.width / 2;

    const viewCenter = window.scrollY + window.innerHeight / 2;
    
    // Finish transition 250px before reaching the center of skills, so it "lands" into a perfect map early
    const transitionStart = hCY;
    const transitionEnd = sCY - 250;
    
    let p = (viewCenter - transitionStart) / (transitionEnd - transitionStart);
    p = Math.max(0, Math.min(1, p));
    const easeP = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

    const cX = hCX + (sCX - hCX) * easeP;
    const cY = hCY + (sCY - hCY) * easeP;

    // Only show tooltips when the transition is nearly complete (in the Skills section)
    if (easeP > 0.8) {
      universe.classList.add('map-mode');
    } else {
      universe.classList.remove('map-mode');
    }

    if (!elements[0].cachedW) {
      elements.forEach(el => {
        el.cachedW = el.offsetWidth;
        el.cachedH = el.offsetHeight;
      });
    }

    elements.forEach((el, i) => {
      // Sphere pos
      const { phi, theta } = sphereCoords[i];
      const currentTheta = theta + globeThetaOffset;
      
      const sx = R * Math.sin(phi) * Math.cos(currentTheta);
      const sy = R * Math.cos(phi);
      const sz = R * Math.sin(phi) * Math.sin(currentTheta);

      // Map pos
      const r = i % rows;
      const c = Math.floor(i / rows);
      
      // Opposing directions for rows
      const dir = r % 2 === 0 ? -1 : 1;
      let mx = ((c * spacingX + timeMap * 300 * dir) % totalWidth);
      if (mx < 0) mx += totalWidth;
      mx -= totalWidth / 2;
      
      const my = (r - (rows - 1) / 2) * spacingY;
      
      // Map is completely straight
      const mz = 0; 

      const x = sx * (1 - easeP) + mx * easeP;
      const y = sy * (1 - easeP) + my * easeP;
      const z = sz * (1 - easeP) + mz * easeP;

      const scaleZ = (z + R) / (2 * R); // 0 (back) to 1 (front)
      const scale = (0.5 + 0.5 * scaleZ) * (1 - easeP) + 1 * easeP;
      
      let mapOpacity = 1;
      const edgeDist = (totalWidth / 2) - Math.abs(mx);
      const fadeThreshold = 200;
      if (edgeDist < fadeThreshold) {
        mapOpacity = Math.max(0, edgeDist / fadeThreshold);
      }

      // Base opacity (objects in back are dimmer)
      const baseOpacity = (0.2 + 0.8 * scaleZ) * (1 - easeP) + mapOpacity * easeP;
      const transitFade = 1 - Math.sin(easeP * Math.PI) * 0.7; 
      el.style.opacity = baseOpacity * transitFade;

      // Depth of Field Blur for objects in back (fades out in Map mode)
      const blurAmount = Math.max(0, (0.6 - scaleZ) * 8) * (1 - easeP);
      el.style.filter = `blur(${blurAmount}px)`;

      const finalX = cX + x - el.cachedW / 2;
      const finalY = cY + y - el.cachedH / 2;

      el.style.transform = `translate3d(${finalX}px, ${finalY}px, ${z}px) scale(${scale})`;
      el.style.zIndex = Math.round(z);
    });

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
});
