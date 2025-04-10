# Anjaneya Innovations Website

This repository contains the code for the Anjaneya Innovations corporate website, built with the Astro framework.

## ✨ Features

*   Modern dark-mode theme with accent colors.
*   Responsive design for desktop and mobile.
*   Content pages: Home, Services, About, Insights (Placeholder), Contact.
*   Interactive elements: Testimonial carousel, mobile menu, subtle animations.
*   Deployment via GitHub Actions to GitHub Pages.

## 🚀 Project Structure

Inside the project, you'll find the following key directories and files:

```
/
├── public/
│   └── # Static assets (images, favicon.svg, site.webmanifest, etc.)
├── src/
│   ├── components/
│   │   └── Breadcrumbs.astro # Reusable breadcrumbs component
│   ├── layouts/
│   │   └── MainLayout.astro  # Main site layout template
│   ├── pages/
│   │   ├── *.astro           # Individual site pages
│   │   └── index.astro       # Home page
│   └── scripts/
│       └── main.js           # Main client-side JavaScript
├── .github/workflows/
│   └── deploy.yml        # GitHub Actions workflow for build & deployment
├── astro.config.mjs      # Astro configuration file
├── package.json          # Project dependencies and scripts
├── tailwind.config.cjs   # Tailwind CSS configuration (if used - currently not)
└── README.md             # This file
```

*   `/public`: Static assets directly copied to the build output.
*   `/src/components`: Reusable UI components built with Astro.
*   `/src/layouts`: Defines the overall HTML structure shared across pages.
*   `/src/pages`: Each `.astro` file here becomes a page route on the site.
*   `/src/scripts`: Client-side JavaScript files.

## 🛠️ Technology Stack

*   **Framework:** [Astro](https://astro.build/) v4.x
*   **UI:** Primarily custom CSS with CSS Variables. No major UI framework (like Tailwind or Bootstrap) is currently installed.
*   **JavaScript:** Vanilla JS for interactivity, plus:
    *   [Swiper.js](https://swiperjs.com/) for the testimonial carousel.
    *   [@tsparticles/slim](https://github.com/tsparticles/tsparticles) for the background particle animation.
*   **Deployment:** GitHub Actions & GitHub Pages.
*   **Package Manager:** npm

## 🔧 Development Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd anjaneyainnovations
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If encountering issues, try removing `node_modules` and `package-lock.json` and running `npm install` again.*

## ⚙️ Running Locally

To start the development server:

```bash
npm run dev
```

This will start a local development server, typically at `http://localhost:4321`. The server will automatically reload as you save changes to source files.

## 🏗️ Building for Production

To build the static site for production:

```bash
npm run build
```

This command will generate the optimized static files in the `dist/` directory.

## 🚀 Deployment

Deployment to GitHub Pages is handled automatically by the GitHub Actions workflow defined in `.github/workflows/deploy.yml`. Pushing to the `master` branch triggers the build and deployment process.

## ✏️ Editing Website Content

Much of the website's content (like services descriptions, testimonials, core values, team members, FAQs) is managed using [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). This allows content updates without directly editing component code.

To edit content:

1.  Navigate to the `src/content/` directory.
2.  Find the relevant collection sub-directory (e.g., `services/`, `testimonials/`, `values/`, `team/`, `faq/`).
3.  Locate the specific Markdown file (`.md`) corresponding to the content you want to change (e.g., `src/content/services/data-ai.md` for the Data & AI service).
4.  Edit the fields in the YAML frontmatter at the top of the file (the section between `---`). For example, change the `description:` or add/remove items from the `features:` list.
5.  Save the file.
6.  Commit and push the changes to the `master` branch on GitHub.
7.  The GitHub Actions workflow will automatically rebuild and redeploy the site with the updated content.

*Note: Ensure your edits conform to the schema defined in `src/content/config.ts` for that collection.*

## 🤝 Contributing

Please refer to `CONTRIBUTING.md` for detailed guidelines (To be created).

Basic guidelines:
*   Follow the existing code style.
*   Write clear commit messages.
*   Ensure changes work correctly on both desktop and mobile.
*   (Future) Ensure all tests pass before pushing.

## 📄 License

Copyright © 2025 Anjaneya Innovations. All rights reserved. 