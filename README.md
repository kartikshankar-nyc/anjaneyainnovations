# Anjaneya Innovations LLC Website

This is the official website for Anjaneya Innovations LLC, built with Astro and GSAP for smooth animations.

## Prerequisites

Before you can run this website locally, you'll need to have Node.js installed on your computer. Visit [https://nodejs.org/](https://nodejs.org/) to download and install the latest LTS version.

## Setup Instructions

1. Clone this repository to your local machine:
   ```
   git clone https://github.com/yourusername/anjaneyainnovations.git
   ```

2. Navigate to the project directory:
   ```
   cd anjaneyainnovations
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to view the website.

## Build for Production

To build the site for production:

```
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to your hosting provider.

## Project Structure

- `src/` - Contains the source code for the website
  - `pages/` - Astro pages for each route
  - `layouts/` - Layout components
  - `components/` - Reusable UI components
  - `styles/` - Global styles
  - `scripts/` - JavaScript files including GSAP animations
- `public/` - Static assets that will be copied to the build directory
  - `images/` - Images used throughout the site

## Customization

- Color scheme can be adjusted in the CSS variables in `src/layouts/MainLayout.astro`
- Services, team members, and other content can be edited in their respective page files

## Deployment

This site is configured for static site generation. The built files can be deployed to any static site hosting provider such as Netlify, Vercel, GitHub Pages, or any traditional web hosting.

## Need to Install Node.js?

If you need to install Node.js:

1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version for your operating system
3. Follow the installation instructions
4. Verify installation by opening a terminal/command prompt and typing:
   ```
   node -v
   npm -v
   ```

## License

All rights reserved by Anjaneya Innovations LLC. 