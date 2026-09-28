# Gourav Sharma — Personal Portfolio

A clean, modern, and highly interactive personal developer portfolio designed to showcase my projects, achievements, and technical skills as a Full-Stack Web Developer. 

🔗 **Live Site:** [https://gouravsharma26.github.io/Portfolioyo/](https://gouravsharma26.github.io/Portfolioyo/)

## ✨ Premium Features

- **Awwwards-Level 3D Interactions:** Features a bespoke, math-driven 3D Fibonacci sphere of floating technology icons that smoothly unwraps into an infinite-scrolling marquee grid as the user scrolls.
- **Glassmorphism Design System:** The entire UI utilizes advanced backdrop-filters, subtle translucent borders, and custom glowing neon accents for a highly premium, dark-mode aesthetic.
- **3D Tilt-Tracking Cards:** Project, achievement, and contact cards dynamically track mouse movement, tilting in 3D space with cinematic depth and hover-glow effects.
- **Vanilla Tech Stack:** Built entirely from scratch using pure HTML5, CSS3, and Vanilla JavaScript—no heavy libraries, dependencies, or build steps required.
- **Dynamic Data Architecture:** Projects and achievements are rendered dynamically via lightweight JS data modules (`projects-data.js`, `achievements-data.js`).
- **Easter Eggs:** Includes an interactive command palette and a secret terminal with a playable Snake game hidden inside the UI!

## 📂 Project Architecture

- `assets/` - Contains all static images and internal documentation.
- `css/` - Core stylesheets (`style.css` driving the entire design system and glassmorphism).
- `js/` - Modular JavaScript logic:
  - `projects-data.js`, `achievements-data.js` (Content databases)
  - `globe-to-map.js` (The 3D Fibonacci sphere & marquee logic)
  - `skills-fx.js`, `hero-fx.js`, `site-common.js` (Micro-interactions and cursor logic)
- `index.html` - The dynamic homepage teasing top projects and achievements.
- `projects.html` - The dedicated, full-list project showcase.
- `achievements.html` - The dedicated certifications and hackathons showcase.

## 🚀 Running Locally

Because the site uses module-like structure and pure Vanilla JS, it is incredibly lightweight.

1. Clone the repository.
2. Run a local static server (e.g., using Python, Node, or VS Code Live Server).
   ```bash
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in your browser.
