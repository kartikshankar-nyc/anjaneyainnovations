// Cloudflare Worker for Anjaneya Innovations
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Cache configuration
  const cacheControl = {
    // HTML - no cache to ensure fresh content
    html: 'public, max-age=0, must-revalidate',
    // Assets - cache for a week
    assets: 'public, max-age=604800, immutable',
    // Images - cache for a month
    images: 'public, max-age=2592000, immutable'
  }
  
  // Clone the response to modify headers
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)
  
  // Set security headers
  newResponse.headers.set('X-XSS-Protection', '1; mode=block')
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Set appropriate cache control headers based on file type
  const pathname = url.pathname.toLowerCase()
  
  if (pathname.endsWith('.html') || pathname === '/' || !pathname.includes('.')) {
    newResponse.headers.set('Cache-Control', cacheControl.html)
  } else if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    newResponse.headers.set('Cache-Control', cacheControl.images)
  } else if (pathname.match(/\.(js|css|woff|woff2|ttf|otf)$/)) {
    newResponse.headers.set('Cache-Control', cacheControl.assets)
  }
  
  // Enable Brotli compression if available
  newResponse.headers.set('Accept-Encoding', 'br, gzip')
  
  return newResponse
} 