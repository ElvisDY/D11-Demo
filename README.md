# ANU Events Listing Demo

A responsive events listing component built with **Drupal 11**, hosted on **Pantheon**, and themed with a custom Claro sub-theme. It displays at least 6 event items sourced found from real ANU events, each showing a title, date, thumbnail, short summary, and link, in an equal-height card grid that works across mobile and desktop.

---

## Live Demo

🔗 https://dev-d11-demo-elvis.pantheonsite.io

---

## How to Run Locally

> **Note:** Running locally requires access to the Pantheon workspace to pull the database and files. Please [contact me](mailto:elvis.yang@example.com) to request access before proceeding.

### Prerequisites

- DDEV — see setup guide: https://docs.pantheon.io/guides/local-development/ddev
- SSH key added to your Pantheon account (for database/files pull)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/ElvisDY/D11-Demo.git d11-demo-elvis
cd d11-demo-elvis

# 2. Start DDEV
ddev start

# 3. Install Composer dependencies
ddev composer install

# 4. Pull the database and files from Pantheon (requires Pantheon auth)
ddev pull pantheon

# 5. Open in browser
ddev launch
```

---

## Build Timeline

All work completed on 1 April 2026.

| Phase | Time |
|---|---|
| Pantheon upstream site deployment (automated pipeline) | 7:40 PM – 7:50 PM |
| Local development environment setup (DDEV + Pantheon pull) | 7:50 PM - 8:00 PM |
| Theming, configuration and content entry | 8:00 PM – 9:40 PM |
| Documentation (this README) | 9:40 PM - 10:10 PM  |

> **Note on AI assistance:** GitHub Copilot was used to help with environment setup debugging, structuring and formatting this README, and tracking the build timeline.

---

## Approach

I created an **Event content type** with fields for title, date, body, thumbnail, and a link. Content was manually entered using real events from the ANU website.

The listing page is built with a **Drupal View** using the Responsive Grid display, which handles the column layout across breakpoints (1 column on mobile, up to 3 on desktop).

**Equal-height cards** are achieved with [jquery.matchHeight](https://github.com/liabru/jquery-match-height), which keeps titles and body text aligned across each row.

The **custom_claro** theme is a sub-theme of Claro. Styles are written in Sass with CSS custom properties for colours and spacing. Focal Point is installed so editors can control the thumbnail crop focus.

---

## Assumptions

- Content is representative of the real ANU events site rather than live-scraped (live scraping would require a migration or feed integration, out of scope for a 2-hour task).
- The "link" on each card routes to the original ANU event page, preserving attribution.
- Drupal's built-in caching (Internal Page Cache, Dynamic Page Cache) is left enabled, as it would be in production.
- Accessibility targets WCAG 2.1 AA: all images have alt text, colour contrast ratios meet AA, interactive elements are keyboard-reachable with visible focus styles.

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| Starting from a Pantheon upstream | Rather than building locally and deploying up, starting from Pantheon's Drupal upstream means the hosting, Composer integration, and deployment pipeline are ready for use. The trade-off is that the local environment depends on pulling from Pantheon, so local setup requires workspace access |
| Drupal over a static page | Drupal is where I'm most comfortable, and it made the listing straightforward to build — the Views module with Responsive Grid handles layout and templating without custom code, and the whole thing is easily extendable (filters, taxonomy, pagination, etc.). The trade-off is the upfront effort of setting up the site, configuring the content type, and getting the theme in place, which takes longer than dropping HTML into a static file |
| `jquery.matchHeight` for equal heights | Simple and reliable across browsers; a pure CSS `grid` with `align-items: stretch` and flexbox column layout inside each card achieves the same result without JS — preferred for a production build |
| Claro sub-theme (admin theme) | Claro is an admin theme; for a public-facing events listing a front-end theme (Olivero, or a custom base) would normally be used. Claro was chosen here to keep the scope minimal |

---

## How This Would Be Implemented in Modern Drupal

The approach taken here is already close to how this would be built on a real Drupal project. The main differences in a production context would be:

- Use a **front-end base theme** (e.g. Olivero or a custom one) rather than Claro, which is intended for the admin UI.
- Override the card markup with a **Twig template** for full control over the HTML structure and class names.
- Use **Image Styles** with responsive sizes and WebP for better image performance.
- Pull content from the ANU site via a **migration or feed** rather than entering it manually.
- Export all configuration (content type, fields, views) with `drush cex` so the site can be rebuilt from code.

---

## Tech Stack

- Drupal 11.3
- Pantheon (hosting + Deployment)
- DDEV (local development)
- Sass / CSS custom properties
- jQuery
- Responsive design
- Git (Pantheon remote + GitHub mirror)
