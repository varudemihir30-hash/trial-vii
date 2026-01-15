/**
 * Universal Glowing Logo Preloader
 * Shows on every page load and navigation
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
    
    // Show preloader on page load
    showPreloader();
    
    // Hide loader when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                hidePreloader();
            }, 2000); // Show for 2 seconds to ensure visibility
        });
    } else {
        // DOM already loaded
        setTimeout(function() {
            hidePreloader();
        }, 2000);
    }
    
    // Show preloader on link clicks (page navigation)
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (link && link.href) {
            // Skip anchor links, javascript links, and same page
            if (link.href.includes('#') && !link.href.match(/^https?:\/\//)) {
                return; // Anchor link, skip
            }
            if (link.href.includes('javascript:') || link.href === '#' || link.href === window.location.href) {
                return; // JavaScript link or same page, skip
            }
            
            // Check if it's an internal link
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
    });
    
    // Show preloader on browser back/forward
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            // Page was loaded from cache (back/forward)
            showPreloader();
            setTimeout(function() {
                hidePreloader();
            }, 1500);
        }
    });
})();
