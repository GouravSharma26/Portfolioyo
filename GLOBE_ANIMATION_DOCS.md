# Custom 3D Globe to Marquee Transition (Documentation)

## Overview
This feature is a bespoke, zero-dependency (Vanilla JS) scroll-linked animation designed to create a premium, "Awwwards"-level interaction. It renders a floating 3D sphere of glowing technology icons in the Hero section that physically travels down the screen and seamlessly unwraps into a flat, infinite-scrolling marquee grid as the user scrolls into the Skills section.

## How It Works (The Math & Logic)
The entire animation is driven by a single `requestAnimationFrame` loop in `js/globe-to-map.js`. 
Instead of rendering in a `<canvas>`, it calculates mathematically accurate 3D positions and applies them to native HTML `<span>` elements using hardware-accelerated CSS `transform3d()`. This allows the icons to retain native crispness, colors, and drop-shadows.

### 1. Fibonacci Sphere
In the Hero state, the icons are mathematically distributed across a 3D sphere using the **Fibonacci lattice algorithm**, which ensures completely even spacing for all 60 icons (2 copies of your 30 skills) regardless of the radius.

### 2. Scroll Interpolation (`lerp`)
We track two hidden HTML anchor divs: one in the Hero section and one in the Skills section. As the user scrolls, the script calculates a normalized progress value `p` (from 0 to 1). 
Every frame, the script interpolates the 3D sphere coordinates `(sx, sy, sz)` into the 2D grid coordinates `(mx, my, mz)`. Visually, the globe smoothly "flattens" out and flies into grid formation based entirely on how far down the user has scrolled.

## Key Features & Polish
- **Cinematic Depth-of-Field:** When in Globe mode, icons rotating to the back (negative Z-axis) dynamically receive a CSS `filter: blur()` and reduced opacity. This mimics a real camera's depth of field.
- **Interactive Momentum Rotation:** The globe tracks the user's mouse `clientX`. Moving the mouse left or right smoothly accelerates the globe's rotation in that direction using momentum interpolation, making it feel highly responsive.
- **Opposing Marquee Rows:** In Map mode, the rows scroll in alternating directions (even rows move left, odd rows move right) creating a highly dynamic background.
- **Flawless Infinite Loop (Edge Fading):** To prevent icons from visibly "jumping" when they wrap around the screen in Map mode, a proximity calculation fades the icons' opacity to 0% as they approach the horizontal edges of the wrapper.
- **Transit Fade:** While the globe is traveling over the "About" section, its overall opacity dips to 30% via a sine-wave function so it doesn't distract from reading the text, then blooms back to 100% upon landing in the Skills section.
- **Smart Text Fallbacks:** If an icon doesn't exist in the Devicon library (like Pandas, OpenCV, Fastify, AWS), the script catches the empty icon string and renders a glowing, short-form text placeholder (e.g., `pd`, `AWS`) that fits perfectly alongside the SVG logos.
- **Contextual Tooltips:** A custom CSS tooltip system uses a `.map-mode` class injected by JS. Hovering over icons shows their exact name, but *only* when the globe has fully transitioned into the Skills map, keeping the Hero section clutter-free. 
