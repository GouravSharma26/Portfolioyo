# Portfolio — Build Brief for Antigravity

## Context (read first, do not skip)

This is an **existing** static portfolio site. Five files already exist in this folder:

- `index.html` — home page (hero, about, skills, projects teaser, contact)
- `projects.html` — full project grid with hover preview
- `project.html` — project detail page, reads `?id=slug` from the URL, renders from `projects-data.js`
- `style.css` — shared design system (dark theme: `--ink` background, `--teal` accent, `--amber` secondary, JetBrains Mono / Space Grotesk / IBM Plex Sans)
- `projects-data.js` — single source of truth for all project content (array of objects)

**Do not rewrite these from scratch. Do not change the visual design language** (colors, fonts, the dark-panel/mono-label aesthetic) unless a task below explicitly asks for it. Extend what's here.

Open all five files first and understand the structure before touching anything.

---

## Hard constraints

1. No build step / no framework migration. Stays vanilla HTML/CSS/JS. Don't introduce React, a bundler, or npm dependencies for this phase.
2. `projects-data.js` stays the single source of truth for project content. If you add a feature that needs new project fields (e.g. an image path), add the field to every existing object in the array too, with a placeholder value — don't leave objects with missing keys.
3. Don't break the existing pages. After every task, actually load the page and click through it — don't assume it works because the code looks right.
4. Keep it accessible: every interactive element needs a visible focus state, every image needs alt text, color contrast must hold up (the design already meets WCAG AA — don't regress it).

---

## Tasks

Do these in order. Each has acceptance criteria — a task isn't done until its criteria pass, verified by actually running the site in a browser, not by inspection alone.

### 1. Resume download button
- Add a "Download Resume" button in the hero section of `index.html`, next to the existing "View projects" / "Contact me" buttons.
- It should link to a `resume.pdf` placed at the project root (create a placeholder PDF if none exists — one page, plain text is fine, clearly labeled "placeholder — replace with real resume").
- **Acceptance:** clicking the button downloads/opens a PDF. No broken link.

### 2. SEO + social share metadata
- Add proper `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`), and Twitter Card tags to all three HTML pages.
- Add a `favicon`.
- Add a `sitemap.xml` and `robots.txt` at project root.
- **Acceptance:** each page has unique, accurate title/description tags (not copy-pasted identically across all three). Validate the OG tags render correctly using a social share debugger's expected fields (you don't need to hit a live URL — just confirm the tags are structurally correct).

### 3. Accessibility pass
- Run through every page with keyboard only (Tab/Shift+Tab/Enter) — confirm every link, button, and card is reachable and has a visible focus ring.
- Add `aria-label`s where an element's purpose isn't clear from visible text alone (icon-only links, etc.).
- Check color contrast on all text/background combos against WCAG AA (4.5:1 for body text, 3:1 for large text).
- **Acceptance:** no keyboard traps, no unreachable interactive elements, no contrast failures. Report any you found and fixed.

### 4. Responsive / cross-device check
- Test at three widths minimum: 375px (mobile), 768px (tablet), 1440px (desktop).
- Fix any overflow, overlap, or broken layout at each breakpoint — pay particular attention to `project.html`'s two-column layout and `projects.html`'s grid.
- **Acceptance:** no horizontal scroll at any tested width, no overlapping elements, nav is usable on mobile (currently the nav links are hidden below 860px with no mobile menu — fix this: add a working hamburger/mobile menu, don't leave navigation inaccessible on mobile).

### 5. Contact form (replace/extend static contact cards)
- Add an actual contact form (name, email, message) to the contact section on `index.html`, above or alongside the existing contact cards.
- Since this is a static site with no backend, wire it to a static form service (e.g. Formspree-style endpoint) — use a placeholder endpoint and clearly comment where the real endpoint ID needs to go.
- **Acceptance:** form has client-side validation (required fields, valid email format), shows a clear success/error state, degrades gracefully if JS is disabled (basic HTML form fallback).

### 6. Functional test pass on the project system
This is the part that's most likely to have bugs — test it properly:
- Confirm every project in `projects-data.js` has a working detail page at `project.html?id=<its-id>`.
- Confirm `project.html` with a missing or invalid `?id=` shows the existing "not found" state correctly.
- Confirm the right-side preview box on the detail page links to `live` when set, and falls back to `repo` when `live` is `null` — test both cases (at least one project currently has `live: null`, verify that path explicitly, don't just check the ones with real data).
- Confirm the hover overlay on `projects.html` cards appears on hover and that the whole card is clickable (not just the image or just the title).
- **Acceptance:** list out each of the above checks and mark pass/fail. If anything fails, fix it and re-test.

### 7. Basic performance check
- Check for render-blocking issues (fonts loading via `@import` in `style.css` is currently blocking — consider moving to `<link rel="preload">` in the `<head>` if it measurably helps).
- Confirm no console errors on any page.
- **Acceptance:** report before/after if you change the font loading strategy. No console errors on any of the three pages.

---

## What to send back

When done, give back:
1. All changed/added files, complete (not diffs/snippets — full file contents).
2. A short report: what you did for each of the 7 tasks, and explicitly call out anything you couldn't verify or that you're unsure about (don't claim something works if you didn't actually test it).
3. Any new placeholder values I need to replace (API endpoint IDs, resume PDF, etc.) listed in one place.

That report is going to a second reviewer (not you) who will check your work critically and is not going to take "should work" as good enough — so be precise about what you actually tested versus what you assumed.
