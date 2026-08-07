# Portfolio — Hero Replacement + Bugfix Brief

## Context

Existing files: `index.html`, `projects.html`, `project.html`, `style.css`, `projects-data.js`. The hero section on `index.html` currently has a virtual keyboard + terminal display (`.hero-computer`, `#hero-keyboard`, `#hero-typing`, `#hero-term-history`) that syncs to physical key presses. **Remove this entirely** — markup, its dedicated CSS block, and its JS block — and replace it per Task 1 below.

There is a separate, unrelated "secret terminal" easter egg (`#hacker-terminal`, triggered by typing "hack" anywhere on the page, includes a Snake game). **Leave that alone** — it is not in scope for this round, do not touch or remove it. Its keydown listener already has an `INPUT`/`TEXTAREA` guard; keep that guard intact.

---

## Task 1: Replace hero visual with a command palette

Build a functional command/search palette in the hero, replacing the removed keyboard/terminal.

**Behavior:**
- A visible search-style input sits in the hero where the keyboard/terminal was (styled like the existing dark-panel aesthetic — reuse `--panel`, `--line`, `--teal` variables, don't invent a new color scheme).
- It's a real, usable fuzzy search — not decorative. Typing "proj" should match "Projects," typing a project name (e.g. "healthtech") should match that project's title from `window.PROJECTS`.
- Results appear as a list below the input as the person types. Arrow Up/Down moves selection, Enter navigates to it, Escape clears/closes.
- Searchable targets: the four nav destinations (About, Skills, Projects, Contact — scroll to their section on `index.html`) plus every project in `projects-data.js` (navigates to `project.html?id=<id>`).
- Also bindable via a keyboard shortcut (`/` when not focused in another input, or `Cmd/Ctrl+K`) so it can be focused without clicking, mirroring the pattern already used for the "hack" trigger — but this needs the same `INPUT`/`TEXTAREA` guard so it doesn't hijack the contact form.

**Acceptance criteria:**
1. Typing a partial match for each of the 4 nav sections and all current projects returns the correct result — test every one individually, don't spot-check two and assume the rest work.
2. Arrow keys move selection visibly (highlighted state), Enter on a highlighted result navigates correctly, Escape clears input and closes results.
3. The `/` or `Cmd+K` shortcut does not fire while focus is inside the contact form's name/email/message fields — verify this explicitly, it's the same bug class we already fixed once this project.
4. With zero results (nonsense input), show a clear "no results" state — don't leave a blank list, that reads as broken.
5. Works with mouse only (click a result) as well as keyboard only — don't build a keyboard-only interaction.

**Verify by:** actually typing each test case into the running page and confirming the result, not by reading the code and asserting it should work.

---

## Task 2: Fix the missing-cursor bug on `projects.html` and `project.html`

**Root cause (already diagnosed, don't re-diagnose):** `style.css` sets `cursor: none` globally under `@media (pointer: fine)`. The custom cursor dot/outline elements and their positioning JS only exist in `index.html`'s inline `<script>` — they were never added to `projects.html` or `project.html`. Result: native cursor hidden, nothing replaces it, cursor is invisible on those two pages.

**Fix requirement:** don't copy-paste the cursor markup and JS into three separate files — that's exactly the kind of duplication that caused this bug (something added to one file and silently missing from the others). Move the cursor HTML + its JS logic into a single shared file all three pages already load (e.g. add it to `projects-data.js` or a new small shared script), so there's one source of truth going forward.

**Acceptance criteria:**
1. Custom cursor visible and tracking correctly on `index.html`, `projects.html`, and `project.html` — check all three individually.
2. Cursor still correctly falls back to native (not hidden) on touch devices and if JS fails to load, per the existing `pointer: fine` gating — don't regress that fix while moving the code.

**Verify by:** loading each of the three pages and moving the mouse, not by inspecting whether the script tag is present.

---

## What NOT to do this round

- Don't touch `#hacker-terminal` / the Snake game.
- Don't touch the contact form, mobile menu, SEO tags, or anything already closed out in prior rounds unless it's Task 2's cursor fix specifically.
- Don't add new external libraries/CDN dependencies for the command palette — plain JS fuzzy matching (simple substring/character-sequence matching is fine, doesn't need to be a real fuzzy-search library) is sufficient for ~8 searchable items.

## Required in your response

1. Full updated files (not snippets) for every file touched.
2. Pass/fail log matching the acceptance criteria in Task 1 and Task 2, one line per numbered item.
3. Confirm explicitly: is the old hero keyboard/terminal markup, CSS, and JS fully removed, or just visually hidden? (It must be removed, not hidden.)
4. Any assumptions you made — especially around what counts as a "match" in the fuzzy search.
