# Betsebay Getahun — Professional Portfolio

A modern, high-tech dark-themed developer portfolio built with HTML, Tailwind CSS, and Vanilla JavaScript. Designed to deliver a premium, visually striking experience using bento-grid layouts, neon accents, and smooth micro-animations.

**Live structure:** Multiple HTML pages (`index.html`, `contact.html`), styled via Tailwind CSS (CDN), with custom 3D and scroll animations.

---

## 1. Features & Aesthetics

- **Modern Bento Grid:** Used for skills, languages, and "Inside Scoop" sections to organize content cleanly.
- **3D Interactive Cards:** Project cards feature 3D tilt effects (`perspective` & `rotateX`) on hover for a tactile feel.
- **Dynamic Animations:**
  - **Hero Rings:** Smooth, continuous dual-spinning SVG rings around the profile avatar.
  - **Scroll Timeline:** A glowing neon scrollbar that dynamically grows as you scroll through the experience timeline.
  - **Stat Counters:** IntersectionObserver-based counter animations that tick up from zero when scrolled into view.
  - **Page Transitions:** A 6-panel staggered curtain reveal (matching radnaabazar.com) used on the Contact page.
- **Floating Social Dock:** Persistent bottom-right dock containing quick links to GitHub, LinkedIn, and other socials.

---

## 2. File Structure

```text
portfolio/
├── index.html        → Main "Professional" page (Hero, Stats, Projects, Bento Grid)
├── contact.html      → Contact page (Form, copy-to-clipboard, page transition)
├── styles.css        → Custom CSS for 3D transforms, animations, and scrollbars
├── script.js         → JS logic for scroll glow, stat counters, and clipboard actions
├── img/              → Directory for all images (avatar, project thumbnails)
└── README.md         → This file
```

No complex build process is required. You can open `index.html` directly in a browser or host it on any static file server.

---

## 3. Tech Stack

- **Structure:** Semantic HTML5
- **Styling:** Tailwind CSS (loaded via CDN for zero-build setup) + Custom Vanilla CSS for specific animations (e.g., spinning borders, page transitions).
- **Interactivity:** Vanilla JavaScript (`IntersectionObserver` for scroll triggers, `requestAnimationFrame` for counters).
- **Fonts:** `Inter` for body text, `JetBrains Mono` for accents and technical details.

---

## 4. Design System & Theme

The project relies heavily on a dark mode aesthetic with vibrant neon green accents.

- **Primary Background:** `#09090b` (Deep black)
- **Accent Color:** `#00ff99` (Neon green)
- **Card Backgrounds:** `#16161d` (Dark gray/blue tint for bento cards)

These colors are configured directly in the Tailwind config injected in the `<head>` of the HTML files:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#09090b',
                accent: { DEFAULT: '#00ff99', hover: '#00cc7a' }
            }
        }
    }
}
```

---

## 5. How to Edit Content

### Updating the Hero
Edit the `<!-- HERO SECTION -->` in `index.html`. You can modify the text, font sizes, and avatar image (`img/avatar.jpg`).

### Updating Projects
Look for the `<!-- EXPERIENCE & PROJECTS SECTION -->` in `index.html`. Copy and paste one of the `group perspective-1000` project card blocks to add a new project. Remember to add a thumbnail image to the `img/` folder and update the `src` attribute.

### Updating Contact Info
Edit `contact.html`. The "Email copy row" contains the email address in plain text, and the `copyEmail()` function in the script at the bottom of the file handles copying it to the user's clipboard. 

---

## 6. Deployment

Since this is a static site without a build step, deployment is incredibly simple:

1. **Vercel / Netlify:** Drag and drop the folder into the dashboard, or link your GitHub repository. No build command or output directory configuration is needed.
2. **GitHub Pages:** Push the code to a GitHub repository and enable GitHub Pages from the repository settings, pointing to the `main` branch.

---

## 7. Future Enhancements

- [ ] Connect the Contact form in `contact.html` to a backend service like Formspree or EmailJS (currently it opens the native `mailto:` client).
- [ ] Add the `personal.html` page to complete the navigation structure.
- [ ] Implement a custom favicon.

