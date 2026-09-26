# Portfolio Upgrade — Agent Brief

**Repo:** https://github.com/GouravSharma26/Portfolioyo.git
**Live site:** https://gouravsharma26.github.io/Portfolioyo/
**Goal:** Modernize the UI/UX, restructure project listings, add a new "Achievements" section (certs/awards), and clean up technical debt — **without introducing a framework or build step**. The site must remain pure HTML5 + CSS3 + Vanilla JS.

Use this document as the full spec. Everything in it was verified against the actual repo contents (not assumed) — file names, class names, and line-level structure below are real.

---

## 1. Current State — Verified Facts

### Stack
- No framework, no bundler, no package.json. Plain static site served as-is (GitHub Pages).
- Fonts loaded via Google Fonts preconnect: `Space Grotesk` (headings), `IBM Plex Sans` (body), `JetBrains Mono` (labels/mono/code).
- `Tailwind CSS` appears only as a *text tag* on some project cards' tech stack — it is NOT actually used anywhere in this repo's own styling. Do not add the Tailwind CDN; keep everything in `css/style.css`.

### File structure
```
Portfolioyo/
├── README.md
├── index.html          (1017 lines — has a 377-line inline <style> block in <head>)
├── projects.html        (140 lines — has its own separate inline <style> block)
├── project.html         (209 lines — has its own separate inline <style> block)
├── css/
│   └── style.css         (875 lines — the "real" shared stylesheet)
├── js/
│   ├── projects-data.js  (single source of truth for all project cards)
│   └── site-common.js    (magnetic cursor, nav scroll state, scroll-spy)
├── assets/
│   ├── images/
│   └── docs/ (resume.pdf)
├── robots.txt
└── sitemap.xml
```

### Design tokens already defined in `css/style.css` (`:root`) — reuse these, do not invent new colors
```css
--ink: #0E1217;
--panel: #161B22;
--panel-2: #1C232C;
--line: #2A323D;
--text: #E9EDF2;
--muted: #8B95A3;
--teal: #5EEAD4;
--teal-dim: #2E8B7D;
--amber: #F5A35C;
--violet: #A78BFA;
--rose: #FB7185;
--radius: 14px;
```

### Existing structural patterns (mimic these, don't reinvent)
- **Section numbering convention** in every `<section>` head:
  `01 / About`, `02 / Skills`, `03 / Projects`, `04 / Contact` — rendered via `<span class="section-num mono">`.
- **Data-driven cards**: `window.PROJECTS` array lives in `js/projects-data.js`. An inline `<script>` in `index.html` (and similar logic in `projects.html`/`project.html`) reads this array and injects `.project-card` markup via `createElement` + `innerHTML`. **This pattern should be copied exactly for Achievements** (see Section 4).
- **Accent-to-CSS-variable map** already exists in `index.html`'s inline script:
  ```js
  const accentVar = { teal: 'var(--teal)', amber: 'var(--amber)', violet: 'var(--violet)', rose: 'var(--rose)' };
  ```
- **Scroll-reveal**: any element with class `.reveal` is toggled to `.reveal.active` by an `IntersectionObserver` defined inline in `index.html` (around line ~813) and styled in `style.css`:
  ```css
  .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.5,0,0,1); }
  .reveal.active { opacity: 1; transform: translateY(0); }
  ```
- **Nav + mobile menu** are two separate hardcoded `<a>` lists in `index.html` that must be kept in sync manually (`.navlinks` and `.mobile-menu`).
- **Scroll-spy** in `js/site-common.js` observes `section[id]` and toggles `.active` on the matching nav link — any new section needs a matching `id` and nav `href="#id"`.
- **Secret terminal easter egg** (type "hack") has a hardcoded `projects` command in its `switch` statement inside `index.html`'s inline script — optional nice-to-have: add an `achievements` command there too.

### Confirmed technical debt (verified, not guessed)
1. `index.html` has **377 lines of CSS inline in `<head>`** (`.about-grid`, `.avatar-block`, `.fact`, `.skill-clusters`, `.pill`, `.contact-card`, `.form-msg`, hero styles, etc.) — none of this exists in `css/style.css`.
2. `projects.html` and `project.html` **each have their own separate inline `<style>` blocks**, duplicating conventions instead of sharing `style.css`.
3. `index.html` also has a large inline `<script>` (typewriter effect, secret terminal + Snake game, parallax `.bg-shape` scroll handler, reveal observer, project card renderer — roughly 400 lines) that should be split into `js/` files, matching how `projects-data.js` is already separated out.
4. `--muted` (`#8B95A3`) on `--ink` (`#0E1217`) is borderline for WCAG AA at small text sizes — worth double-checking with a contrast tool before shipping more small-text UI (e.g., achievement meta rows).

---

## 2. Action Plan

### Phase 1 — UI/UX Overhaul
- [ ] Keep the existing dark palette and font trio — they're cohesive; don't replace them.
- [ ] Add two new CSS custom properties for consistency instead of ad-hoc values:
  - `--surface-hover` (for hover backgrounds currently done with inline `rgba()` values in different spots)
  - `--focus-ring` (currently just hardcodes `var(--teal)` in the `:focus-visible` rule)
- [ ] Introduce a small heading-scale system (2–3 `clamp()`-based tokens) so `h2`/`h3` sizing is consistent across all three HTML pages, not just `.hero h1`.
- [ ] Reuse the existing `.reveal` scroll-animation class on any new section instead of adding a second animation system.
- [ ] Add a "skip to content" link (currently absent) for keyboard/screen-reader users.
- [ ] Audit all `<img>` tags under `assets/images/` for meaningful `alt` text.
- [ ] Spot-check `--muted` text contrast on `--ink`/`--panel` backgrounds (see debt item #4 above); consider `#9AA4B2` if it fails AA.

### Phase 2 — Project Listing Updates
Extend (don't replace) the `window.PROJECTS` schema in `js/projects-data.js`:

```js
{
  id: "unique-slug",
  title: "Project Name",
  tagline: "One-liner for the card",
  description: "Longer paragraph for project.html",
  tech: ["React.js", "Django"],
  repo: "https://github.com/you/repo",
  live: "https://live-url.com", // or null
  date: "Jul 2025",
  accent: "teal",
  featured: true,        // NEW — explicitly controls homepage teaser
  status: "live",        // NEW — "live" | "in-progress" | "archived"
  highlights: ["Cut load time 40%", "Built role-based auth"] // NEW — for project.html
}
```

- [ ] In `index.html`'s inline renderer, change:
  `window.PROJECTS.slice(0, 4).forEach(...)`
  to:
  `window.PROJECTS.filter(p => p.featured).slice(0, 4).forEach(...)`
  so homepage teaser projects are an explicit editorial choice, not just array order.
- [ ] Optionally render a status badge (`live` / `in-progress` / `archived`) on `.project-card` using the same pill styling as `.tech-row span`.
- [ ] Optionally add a tech-tag filter UI on `projects.html` (pure vanilla JS `.filter()` over `window.PROJECTS`, no new dependency needed).

### Phase 3 — Technical / Code Optimization
- [ ] Move all inline `<style>` blocks (`index.html`, `projects.html`, `project.html`) into `css/style.css`, keeping the existing section-comment structure (`/* HERO */`, `/* ABOUT */`, etc. — already present in the inline block, just relocate).
- [ ] Bump the `style.css?v=9` query string after consolidation to bust cache.
- [ ] Extract `index.html`'s inline `<script>` into dedicated files: e.g. `js/hero-fx.js` (typewriter + editor tabs), `js/terminal.js` (secret terminal + Snake game), `js/reveal.js` (IntersectionObserver), following the same separation already used for `js/projects-data.js`.
- [ ] Add `js/achievements-data.js` (Section 4 below) using the identical conventions as `projects-data.js`.
- [ ] Add `loading="lazy"` to all non-hero `<img>` tags.
- [ ] Run Lighthouse (Performance / Accessibility / SEO) — target 90+ on all three.
- [ ] Replace the Formspree `PLACEHOLDER` ID in the contact form (`action="https://formspree.io/f/PLACEHOLDER"`) with a real endpoint before shipping.
- [ ] Confirm `sitemap.xml`/`robots.txt` don't need updates for the new in-page anchor (they generally won't, since it's a same-page section, not a new URL).

---

## 3. New Section: Achievements — Full Spec

### Placement
Insert as a new `<section id="achievements">` between the existing `#projects` and `#contact` sections in `index.html`. Renumber the Contact section's label from `04 / Contact` to `05 / Contact`, and this new section becomes `04 / Achievements`.

### Nav updates
Add to **both** `.navlinks` and `.mobile-menu` (they are separate hardcoded lists, must edit both):
```html
<a href="#achievements">Achievements</a>
```

### 3.1 Data file — `js/achievements-data.js` (new file)
```js
/*
  ONE PLACE TO EDIT WHEN ADDING CERTIFICATIONS/AWARDS.
  category: "certification" | "award" | "hackathon"
  accent:   "teal" | "amber" | "violet" | "rose" — matches project accent system
*/
window.ACHIEVEMENTS = [
  {
    id: "aws-cert",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    category: "certification",
    credentialUrl: "https://www.credly.com/badges/your-badge-id",
    accent: "amber"
  },
  {
    id: "hackathon-win",
    title: "1st Place — SRM Hack 2025",
    issuer: "SRM Institute of Science and Technology",
    date: "Mar 2025",
    category: "hackathon",
    credentialUrl: null,
    accent: "teal"
  }

  /*
  ADD NEW ENTRIES BY COPYING THIS BLOCK:
  {
    id: "unique-slug",
    title: "Certification/Award Name",
    issuer: "Issuing Organization",
    date: "Mon Year",
    category: "certification", // certification | award | hackathon
    credentialUrl: "https://...", // or null
    accent: "teal" // teal | amber | violet | rose
  },
  */
];
```

### 3.2 HTML markup — insert into `index.html`
```html
<section id="achievements">
  <div class="wrap">
    <div class="section-head">
      <span class="section-num mono">04 / Achievements</span>
      <h2>Certifications & recognition</h2>
    </div>
    <div class="achievement-grid reveal" id="achievements-grid"></div>
  </div>
</section>
```

### 3.3 Render logic — add near the existing `PROJECTS` render block in `index.html`'s inline `<script>` (reuses the same `accentVar` map already defined there)
```html
<script src="js/achievements-data.js"></script>
<script>
  const achGrid = document.getElementById('achievements-grid');
  const catLabel = { certification: 'Certification', award: 'Award', hackathon: 'Hackathon' };

  window.ACHIEVEMENTS.forEach(a => {
    const card = document.createElement(a.credentialUrl ? 'a' : 'div');
    card.className = 'achievement-card';
    if (a.credentialUrl) {
      card.href = a.credentialUrl;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    card.innerHTML = `
      <div class="ach-badge" style="--glow:${accentVar[a.accent] || 'var(--teal)'}">
        <span class="ach-cat mono">${catLabel[a.category] || 'Achievement'}</span>
      </div>
      <h3>${a.title}</h3>
      <p class="ach-issuer">${a.issuer}</p>
      <div class="ach-meta mono">
        <span>${a.date}</span>
        ${a.credentialUrl ? '<span class="ach-link">View credential →</span>' : ''}
      </div>
    `;
    achGrid.appendChild(card);
  });
</script>
```

### 3.4 CSS — add to `css/style.css` (as part of the Phase 3 consolidation, not a new inline block)
```css
/* ACHIEVEMENTS */
#achievements {
  border-top: 1px solid var(--line);
}

.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
}

.achievement-card {
  display: block;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
  transition: border-color .2s, transform .15s ease-out, box-shadow .2s;
}

.achievement-card:hover {
  border-color: var(--teal-dim);
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(46, 139, 125, 0.12);
}

.ach-badge {
  position: relative;
  height: 64px;
  border-radius: 12px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  padding: 0 14px;
  overflow: hidden;
  margin-bottom: 14px;
}

.ach-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, var(--glow, var(--teal)) 0%, transparent 65%);
  opacity: 0.18;
}

.ach-cat {
  position: relative;
  z-index: 1;
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: .06em;
}

.achievement-card h3 {
  font-size: 1.02rem;
  margin-bottom: 6px;
}

.ach-issuer {
  color: var(--muted);
  font-size: 0.88rem;
  margin-bottom: 14px;
}

.ach-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--muted);
}

.ach-link {
  color: var(--teal);
}
```

### 3.5 Design notes for this component
- Reuses the `--glow` radial-gradient trick already established on `.thumb` — keeps the new section visually native, not bolted on.
- Hover state mirrors `.project-card:hover` (teal-dim border, translateY lift, teal-tinted shadow) for consistency.
- Consider swapping `.ach-cat` text pills for the existing `.tech-row span` pill style if you want tighter visual parity with the Projects section.
- Consider small inline `currentColor` SVG icons (trophy/medal/cert) inside `.ach-badge` once there are enough entries to justify per-category iconography.
- Since the list will start small, consider capping `.achievement-grid` to 2 columns on desktop until there are 4+ entries, so it doesn't look sparse against the `max-width: 1100px` `.wrap`.

---

## 4. Deployment / Final QA Checklist
- [ ] Inline `<style>` blocks consolidated into `css/style.css`; `?v=` bumped
- [ ] Inline `<script>` extracted into `js/` files
- [ ] `js/achievements-data.js` added; section + nav links wired into `index.html`
- [ ] `featured` and `status` fields set on all entries in `projects-data.js`
- [ ] `loading="lazy"` added to non-hero images
- [ ] Lighthouse run (Performance / Accessibility / SEO) — 90+ target
- [ ] `--muted`-on-dark contrast re-checked
- [ ] All images have descriptive `alt` text
- [ ] Formspree `PLACEHOLDER` replaced with real form ID
- [ ] Scroll-spy in `js/site-common.js` correctly highlights `#achievements` in nav when scrolled into view
- [ ] Cross-browser + responsive check at 375px / 768px / 1024px+ for the new Achievements grid
- [ ] `sitemap.xml` / `robots.txt` reviewed (likely no change needed — same-page anchor only)
