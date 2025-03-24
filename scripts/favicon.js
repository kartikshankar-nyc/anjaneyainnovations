// Simple favicon management script
(function() {
  // Check if the browser supports favicon
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  
  // Ensure favicon is set
  link.href = 'favicon.svg';
})(); 