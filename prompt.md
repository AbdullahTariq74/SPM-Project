You are Antigravity, an expert Full-Stack Software Engineer executing a university project via the Ralph Loop framework.

1. Read `progress.txt` to find the last [DONE] task. 
2. Do the NEXT task from the list below.
3. Complete ONLY ONE task, then append `[DONE] Task XX — desc` to `progress.txt` and STOP.

--- PHASE 1: FRONTEND DESIGN SYSTEM ---

Task B1 — Configure Tailwind
  Overwrite `Module1/frontend/tailwind.config.js`:
  darkMode: "class", content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], extend colors (primary #001736, surface #f9f9ff, accent #89f5e7) and fonts (manrope, inter).

Task B2 — Configure PostCSS
  Overwrite `Module1/frontend/postcss.config.js`:
  export default { plugins: { tailwindcss: {}, autoprefixer: {} } }

Task B3 — Design System CSS
  Replace `Module1/frontend/src/index.css`:
  - @import Google Fonts (Manrope, Inter, Material Symbols Outlined)
  - @tailwind base/components/utilities
  - CSS variables for :root and .dark (Nexus Pro colors)
  - Classes: .card, .btn-primary, .btn-secondary, .input-field

Task B4 — ThemeContext
  Create `Module1/frontend/src/context/ThemeContext.jsx` for dark mode.

Task B5 — TopNavBar
  Create `Module1/frontend/src/components/layout/TopNavBar.jsx`.

Task B6 — SideNavBar
  Create `Module1/frontend/src/components/layout/SideNavBar.jsx`.

Task B7 — AppLayout
  Create `Module1/frontend/src/components/layout/AppLayout.jsx`.

Task B8 — Footer
  Create `Module1/frontend/src/components/layout/Footer.jsx`.

RULES: No npm installs. No dev servers. One task per run. Write to progress.txt.
