// utils/favicon.js
export function updateFavicon(iconUrl) {
    if (!iconUrl) return;
  
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll("link[rel*='icon']");
    existingLinks.forEach(link => link.remove());
  
    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = iconUrl;
    document.head.appendChild(link);
  }