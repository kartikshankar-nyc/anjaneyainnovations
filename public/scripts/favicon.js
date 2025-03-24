// Browser compatibility checker for favicon
document.addEventListener('DOMContentLoaded', () => {
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

  // Log for development purposes
  console.log('Favicon compatibility check complete. SVG support:', isSvgSupported());
}); 