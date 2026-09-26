/*
  ONE PLACE TO EDIT WHEN ADDING/UPDATING PROJECTS.
  Every field is used somewhere on the site — don't delete keys, just fill them in.

  live:  full URL if deployed, or null if not deployed yet.
         If null, the big preview box on the detail page links to the repo instead.
  date:  e.g. "Mar 2025". Leave as "" if unknown — the date row just won't render.
  accent: "teal" | "amber" | "violet" | "rose" — controls the placeholder thumbnail glow color.
          Swap thumb.style with a real screenshot later: give the card an <img> instead
          of the .thumb placeholder markup once you have one.
*/

window.PROJECTS = [
  {
    id: "healthtech",
    title: "HealthTech Website",
    tagline: "Doctor–patient telehealth marketplace with AI-assisted triage",
    description: "A working telehealth marketplace with custom auth and separate roles for patients and doctors. Covers the full appointment lifecycle (pending → confirmed → cancel/reschedule → completed), role-restricted in-app messaging and notifications, doctor license/degree verification uploads, and automated scheduling jobs — plus secure AI-assisted triage and prescription scanning.",
    tech: ["React.js", "Django", "PostgreSQL", "AI Integration"],
    repo: "https://github.com/GouravSharma26/HealthTechWebsite.git",
    live: "https://healthtech-web.onrender.com",
    date: "Sep 2026",
    accent: "teal",
    featured: true,
    status: "live"
  },
  {
    id: "devforge",
    title: "DevForge",
    tagline: "AI-powered command center for developer growth",
    description: "A full-stack platform for practicing technical interviews and algorithmic problem-solving. Runs AI mock interviews (Google Gemini) with real-time scoring across system design, concurrency, and data structures, a live DSA sandbox with a Monaco in-browser editor and sandboxed code execution (Piston), an ELO rating ladder, a JD-matching resume generator, and a background worker pipeline (BullMQ) that pulls in tech news. Built as a turborepo monorepo: Next.js/React 19 frontend, Fastify + Prisma backend, Neon Postgres, Upstash Redis.",
    tech: ["Next.js", "TypeScript", "Fastify", "Prisma", "Gemini AI"],
    repo: "https://github.com/GouravSharma26/DevForge.git",
    live: "https://dev-forge-frontend-zeta.vercel.app/",
    date: "Sep 2026",
    accent: "violet",
    featured: true,
    status: "live"
  },
  {
    id: "vibeloader",
    title: "VibeLoader",
    tagline: "Full-stack YouTube video & playlist downloader",
    description: "Paste a YouTube URL to preview thumbnails, pick specific videos out of a playlist, choose format (MP4/MP3) and quality (360p–1080p), and download. Downloads run as background jobs via Celery so the UI stays responsive, with live progress polling from the frontend and automatic cleanup of files from the server after they're fetched.",
    tech: ["Django", "React.js", "Celery"],
    repo: "https://github.com/GouravSharma26/VibeLoader.git",
    live: "https://vibe-loader.vercel.app",
    date: "Aug 2026",
    accent: "amber",
    featured: true,
    status: "live"
  },
  {
    id: "chat-app",
    title: "Real-Time Chat Application",
    tagline: "MERN + Socket.io messaging app",
    description: "A full-stack real-time chat application. React frontend (Zustand for state, Tailwind for styling) talks to an Express/MongoDB backend over Socket.io for live messaging, with JWT-based auth and Cloudinary for media uploads.",
    tech: ["React.js", "Node.js", "Express", "Socket.io", "MongoDB"],
    repo: "https://github.com/GouravSharma26/Chat-Application.git",
    live: "https://convo-chat-app-ulz7.onrender.com/login",
    date: "Aug 2026",
    accent: "rose",
    featured: true,
    status: "live"
  },
  {
    id: "symguard",
    title: "SymGuard",
    tagline: "Static analyzer that proves vulnerabilities, not guesses",
    description: "A static analysis tool for Python that doesn't flag code as 'possibly vulnerable' — it proves it. Parses source with Python's ast module, symbolically executes the AST to build up logical formulas over tainted data paths, then hands those formulas to the Z3 SMT solver to produce an actual proof of exploitability.",
    tech: ["Python", "AST", "Z3 SMT Solver"],
    repo: "https://github.com/GouravSharma26/SymGuard.git",
    live: null,
    date: "Aug 2026",
    accent: "teal",
    featured: false,
    status: "live"
  },
  {
    id: "game-2048",
    title: "2048 Clone — Neon Edition",
    tagline: "Responsive 2048 with a neon dark-mode skin",
    description: "A polished take on the classic 2048 tile game — sliding-tile animations, neon dark theme, a persistent high-score tracker, and swipe controls for mobile, on top of the standard keyboard controls for desktop.",
    tech: ["HTML", "CSS", "JavaScript"],
    repo: "https://github.com/GouravSharma26/2048-clone.git",
    live: "https://2048-clone-iota.vercel.app",
    date: "Mar 2025",
    accent: "amber",
    featured: false,
    status: "live"
  },
  {
    id: "ebook-system",
    title: "E-Book Management System",
    tagline: "Online e-book shopping platform",
    description: "An online bookstore where users browse, purchase, and manage e-books. Includes a cart, payment integration, and an admin panel for managing inventory and orders. Originally built with server-rendered templates, later revamped with a React frontend.",
    tech: ["React.js", "Django", "PostgreSQL"],
    repo: "https://github.com/GouravSharma26/E-Book-System.git",
    live: null,
    date: "Aug 2024",
    accent: "violet",
    featured: false,
    status: "live"
  },
  {
    id: "chat-bot",
    title: "Chat Bot Application",
    tagline: "NLP-powered chatbot with REST API backend",
    description: "A chatbot that responds to user queries using natural language processing. Backed by a REST API with user authentication, so conversations can be tied to individual accounts.",
    tech: ["React.js", "Django", "PostgreSQL"],
    repo: "https://github.com/GouravSharma26/Chat_Bot.git",
    live: "https://chat-bot-vert-two.vercel.app",
    date: "Mar 2025",
    accent: "rose",
    featured: false,
    status: "in-progress"
  },
  {
    id: "old-newspaper",
    title: "Old Newspaper Archive",
    tagline: "Digital archive for historical newspaper editions",
    description: "A digital archive platform that collects and displays old newspaper editions. Includes filtering, file uploads, an admin dashboard for managing entries, and a responsive reading interface.",
    tech: ["React.js", "Django", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/GouravSharma26/Old_Newspaper.git",
    live: null,
    date: "Mar 2025",
    accent: "teal",
    featured: false,
    status: "archived"
  }

  /*
  ADD NEW PROJECTS BY COPYING THIS BLOCK:
  {
    id: "unique-slug-no-spaces",
    title: "Project Name",
    tagline: "One line, shows on the card",
    description: "Longer paragraph, shows on the detail page.",
    tech: ["Tech1", "Tech2"],
    repo: "https://github.com/you/repo",
    live: "https://your-live-url.com",  // or null
    date: "Jul 2025",
    accent: "teal",  // teal | amber | violet | rose
    featured: true,
    status: "live"
  },
  */
];
