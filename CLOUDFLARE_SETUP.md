# Cloudflare CDN Setup for Anjaneya Innovations

This document provides instructions for setting up Cloudflare CDN for the Anjaneya Innovations website.

## Prerequisites

1. A Cloudflare account
2. Domain name (anjaneyainnovations.com) added to Cloudflare
3. Cloudflare API token with appropriate permissions

## Setup Steps

### 1. Initial Domain Setup

1. Log in to your Cloudflare account
2. Add your domain by clicking "Add a Site"
3. Follow the instructions to change your domain's nameservers to Cloudflare's

### 2. Configure SSL/TLS

1. Go to the SSL/TLS tab
2. Set the encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

### 3. Caching Configuration

1. Go to the Caching tab
2. Set the Browser Cache TTL to "Respect Existing Headers"
3. Enable "Always Online"
4. In Caching Configuration, set "Cache Level" to "Standard"

### 4. Page Rules

Create the following page rules:

1. **Cache Everything Rule**
   - URL pattern: `anjaneyainnovations.com/*`
   - Setting: Cache Level: Cache Everything
   - Setting: Edge Cache TTL: 2 hours

2. **Bypass Cache for Admin**
   - URL pattern: `anjaneyainnovations.com/admin/*`
   - Setting: Cache Level: Bypass

### 5. Deploy the Worker

1. Go to Workers & Pages
2. Click "Create Application"
3. Choose "Create Worker"
4. Name it "anjaneya-cdn"
5. Paste the code from `cloudflare-worker.js` into the editor
6. Click "Deploy"

### 6. Configure Worker Routes

1. In the worker details page, go to "Triggers"
2. Add a route: `anjaneyainnovations.com/*`
3. Save changes

### 7. Performance Optimizations

1. Go to the "Speed" tab
2. Enable "Auto Minify" for HTML, CSS, and JavaScript
3. Enable "Brotli" compression
4. Enable "Early Hints"
5. In "Optimization", enable "Rocket Loader" and "Mirage"

### 8. Security Settings

1. Go to the "Security" tab
2. Set Security Level to "Medium"
3. Enable "Bot Fight Mode"
4. Enable "Browser Integrity Check"

## Verifying the Setup

1. Test your website using [WebPageTest](https://www.webpagetest.org/)
2. Check for the `cf-cache-status` header in browser dev tools
3. Verify all assets are being served with Cloudflare's cache

## Troubleshooting

- If assets aren't being cached, check the Cache-Control headers
- If the worker isn't running, verify the route pattern
- For SSL issues, verify your origin server configuration

For more assistance, contact Cloudflare support or refer to their [documentation](https://developers.cloudflare.com/). 