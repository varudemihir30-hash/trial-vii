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
        // Remove ALL preloader elements (script-created + static HTML) so page content is visible
        var preloaders = document.querySelectorAll('#preloader, .preloader');
        preloaders.forEach(function(preloader) {
            preloader.classList.add('fade-out');
        });
        setTimeout(function() {
            preloaders.forEach(function(preloader) {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            });
            // Show body content (in case it was hidden by showPreloader)
            var bodyWrap = document.querySelector('.body_wrap');
            if (bodyWrap) {
                bodyWrap.style.opacity = '1';
                bodyWrap.style.visibility = 'visible';
                bodyWrap.style.pointerEvents = 'auto';
            }
            document.body.classList.remove('preloader-active');
        }, 300);
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
        
        // Hide loader when DOM is ready, short display
        var minDisplayMs = 350;
        var startTime = Date.now();
        function tryHide() {
            var elapsed = Date.now() - startTime;
            var delay = Math.max(0, minDisplayMs - elapsed);
            setTimeout(function() {
                hidePreloader();
                preloaderInitialized = false;
            }, delay);
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', tryHide);
        } else {
            tryHide();
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
    
    // Do NOT intercept internal link clicks - let the browser navigate normally.
    // This prevents redirects (e.g. to Contact Us) from getting stuck. The preloader
    // will show when the new page loads.
    
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
