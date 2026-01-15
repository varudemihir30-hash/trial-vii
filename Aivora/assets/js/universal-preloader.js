/**
 * Universal Glowing Logo Preloader
 * Shows on every page load and navigation (header links, buttons, etc.)
 * Apply this script to all pages
 */
(function() {
    'use strict';
    
    // Function to show preloader with glowing effect
    function showPreloader() {
        var preloader = document.getElementById('preloader');
        if (!preloader) {
            // Create preloader if it doesn't exist
            preloader = document.createElement('div');
            preloader.id = 'preloader';
            preloader.className = 'preloader';
            preloader.innerHTML = '<div class="loader-logo" style="position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; width: 120px !important; height: 120px !important;"><img src="assets/img/logo/vertex-tech-logo.svg" alt="Vertex Tech Io Logo" loading="eager" style="width: 100% !important; max-width: 120px !important; height: auto !important; display: block !important; opacity: 1 !important; visibility: visible !important; filter: brightness(0) invert(1) drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 75px rgba(255, 255, 255, 0.7)) !important; transform: scale(1) !important; animation: logoGlowPulse 2s ease-in-out infinite !important;"></div>';
            document.body.insertBefore(preloader, document.body.firstChild);
        }
        
        // Add preloader-active class immediately
        document.body.classList.add('preloader-active');
        
        // Hide body content immediately
        var bodyWrap = document.querySelector('.body_wrap');
        if (bodyWrap) {
            bodyWrap.style.opacity = '0';
            bodyWrap.style.visibility = 'hidden';
            bodyWrap.style.pointerEvents = 'none';
        }
        
        // Ensure preloader is visible immediately with glowing effect
        preloader.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; width: 100vw !important; height: 100vh !important; display: flex !important; align-items: center !important; justify-content: center !important; opacity: 1 !important; visibility: visible !important; z-index: 999999 !important; background-color: #00020f !important; background: #00020f !important; margin: 0 !important; padding: 0 !important;';
        
        // Ensure logo is visible and glowing
        var logoImg = preloader.querySelector('img');
        if (logoImg) {
            logoImg.style.cssText = 'width: 100% !important; max-width: 120px !important; height: auto !important; display: block !important; opacity: 1 !important; visibility: visible !important; filter: brightness(0) invert(1) drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 75px rgba(255, 255, 255, 0.7)) !important; transform: scale(1) !important; animation: logoGlowPulse 2s ease-in-out infinite !important;';
        }
    }
    
    // Function to hide preloader
    function hidePreloader() {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                // Show body content
                var bodyWrap = document.querySelector('.body_wrap');
                if (bodyWrap) {
                    bodyWrap.style.opacity = '1';
                    bodyWrap.style.visibility = 'visible';
                    bodyWrap.style.pointerEvents = 'auto';
                }
                preloader.remove();
                document.body.classList.remove('preloader-active');
            }, 300);
        }
    }
    
    // Ensure glowing animation keyframes are always available
    if (!document.getElementById('preloader-glow-animation')) {
        var style = document.createElement('style');
        style.id = 'preloader-glow-animation';
        style.textContent = '@keyframes logoGlowPulse { 0%, 100% { filter: brightness(0) invert(1) drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 0 50px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 75px rgba(255, 255, 255, 0.7)) !important; transform: scale(1) !important; } 50% { filter: brightness(0) invert(1) drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 80px rgba(255, 255, 255, 1)) drop-shadow(0 0 120px rgba(255, 255, 255, 0.9)) !important; transform: scale(1.08) !important; } }';
        document.head.appendChild(style);
    }
    
    // Track if preloader has been initialized to prevent duplicate shows
    var preloaderInitialized = false;
    
    // Function to initialize and show preloader
    function initPreloader() {
        if (preloaderInitialized) return;
        preloaderInitialized = true;
        
        // Show preloader immediately
        showPreloader();
        
        // Hide loader when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                    hidePreloader();
                    preloaderInitialized = false; // Reset for next page load
                }, 2000); // Show for 2 seconds to ensure visibility
            });
        } else {
            // DOM already loaded - still show preloader for a moment
            setTimeout(function() {
                hidePreloader();
                preloaderInitialized = false; // Reset for next page load
            }, 2000);
        }
    }
    
    // Show preloader immediately on page load/reload - ALWAYS
    // This ensures it shows on every reload, refresh, or page visit
    initPreloader();
    
    // Ensure preloader shows on every reload (including hard reload)
    window.addEventListener('beforeunload', function() {
        // Reset flag so preloader shows on next load
        preloaderInitialized = false;
    });
    
    // Show preloader on every page show (including reloads from cache)
    window.addEventListener('pageshow', function(e) {
        // Always show preloader on page show (reload, back/forward, etc.)
        if (!preloaderInitialized) {
            initPreloader();
        }
    });
    
    // Show preloader on ALL link clicks (header links, buttons, etc.)
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && link.href) {
            // Skip anchor links (same page anchors)
            if (link.href.includes('#') && !link.href.match(/^https?:\/\//) && link.pathname === window.location.pathname) {
                return; // Same page anchor link, skip
            }
            // Skip javascript links and empty links
            if (link.href.includes('javascript:') || link.href === '#' || link.href === window.location.href) {
                return;
            }
            
            // Check if it's an internal link to a different page
            try {
                var linkUrl = new URL(link.href, window.location.origin);
                var currentUrl = new URL(window.location.href);
                if (linkUrl.origin === currentUrl.origin && linkUrl.pathname !== currentUrl.pathname) {
                    // Internal navigation to different page - show preloader
                    e.preventDefault();
                    showPreloader();
                    // Navigate after a brief delay to show the preloader
                    setTimeout(function() {
                        window.location.href = link.href;
                    }, 100);
                }
            } catch(err) {
                // Invalid URL, ignore
            }
        }
        
        // Also check for buttons that might navigate
        var button = e.target.closest('button');
        if (button && button.onclick) {
            // Button with onclick handler might navigate
            var onclickAttr = button.getAttribute('onclick');
            if (onclickAttr && onclickAttr.includes('location') || onclickAttr.includes('window.open')) {
                showPreloader();
            }
        }
    });
    
    // Note: pageshow handler moved above to handle all page shows including reloads
    
    // Also handle form submissions that navigate
    document.addEventListener('submit', function(e) {
        var form = e.target;
        if (form && form.action && form.method !== 'post') {
            // GET form submission - might navigate
            try {
                var formUrl = new URL(form.action, window.location.origin);
                var currentUrl = new URL(window.location.href);
                if (formUrl.origin === currentUrl.origin && formUrl.pathname !== currentUrl.pathname) {
                    showPreloader();
                }
            } catch(err) {
                // Invalid URL, ignore
            }
        }
    });
})();
