// Enhanced favicon script with theme support
document.addEventListener('DOMContentLoaded', () => {
  // Check SVG support
  const isSvgSupported = () => {
    const svgTest = document.createElement('img');
    svgTest.setAttribute('src', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
    return svgTest.complete && svgTest.naturalWidth > 0;
  };

  // If SVG not supported, ensure we fallback to ico
  if (!isSvgSupported()) {
    const faviconLink = document.querySelector('link[rel="icon"]');
    if (faviconLink) {
      faviconLink.href = '/favicon.ico';
    }
  }

  // Update theme color meta tag based on current theme
  const updateThemeColorMeta = () => {
    const isLightTheme = document.documentElement.classList.contains('light-theme');
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (themeColorMeta) {
      // Use slightly darker cyan for light theme, brighter for dark
      themeColorMeta.setAttribute('content', isLightTheme ? '#0891B2' : '#22D3EE');
    } else {
      // Create theme-color meta if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isLightTheme ? '#0891B2' : '#22D3EE';
      document.head.appendChild(meta);
    }
  };

  // Initial theme color update
  updateThemeColorMeta();
  
  // Listen for theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Allow a moment for theme to change, then update meta
      setTimeout(updateThemeColorMeta, 50);
    });
  }

  // Also listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColorMeta);

  // Log for development purposes
  console.log('Favicon compatibility check complete. SVG support:', isSvgSupported());
}); 