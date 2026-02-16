// assets/js/main.js

// 1. PASTE YOUR G-ID HERE
const GA_MEASUREMENT_ID = 'G-QN1RCZ2H58'; 

document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU LOGIC (With Safety Checks) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Only add the listener if the elements actually exist on this page
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- DYNAMIC YEAR (Footer) ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- COOKIE CONSENT & ANALYTICS ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Check local storage to see if they already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        // User is a returning fan -> Load Analytics immediately
        loadGoogleAnalytics();
        if (cookieBanner) cookieBanner.style.display = 'none'; // Hide banner instantly
    } else {
        // New visitor -> Show banner after 2 seconds
        if (cookieBanner) {
            setTimeout(() => {
                // Remove the 'hidden' transform
                cookieBanner.style.transform = "translateY(0)"; 
            }, 2000);
        }
    }

    // Handle "Accept" Click
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // 1. Save the 'Yes'
            localStorage.setItem('cookiesAccepted', 'true');
            
            // 2. Hide the banner visually
            if (cookieBanner) {
                cookieBanner.style.transform = "translateY(100%)";
            }

            // 3. Fire up the Analytics
            loadGoogleAnalytics();
        });
    }
});

// --- SPHERE CTA ANIMATION (Index Page) ---
document.addEventListener('DOMContentLoaded', () => {
    const ctaContainer = document.getElementById('sphere-cta-container');
    const sphereBg = document.getElementById('sphere-bg');
    const sphereContent = document.getElementById('sphere-content');

    if (ctaContainer && sphereBg && sphereContent) {
        window.addEventListener('scroll', () => {
            const rect = ctaContainer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if the container's top has hit the top of the viewport
            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                // Calculate scroll percentage (0.0 to 1.0) inside the container
                const scrolledInContainer = -rect.top;
                const totalScrollableDistance = rect.height - windowHeight;
                const scrollPercent = scrolledInContainer / totalScrollableDistance;

                // Scale the sphere (max scale 100x covers the whole screen)
                const scaleValue = 1 + (scrollPercent * 100);
                sphereBg.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;

                // Fade in text when sphere covers the background (at ~30% scroll)
                if (scrollPercent > 0.3) {
                    sphereContent.style.opacity = '1';
                } else {
                    sphereContent.style.opacity = '0';
                }
            } 
            // Reset if scrolled back up above the section
            else if (rect.top > 0) {
                sphereBg.style.transform = 'translate(-50%, -50%) scale(1)';
                sphereContent.style.opacity = '0';
            } 
            // Lock fully open if scrolled past it into the footer
            else if (rect.bottom < windowHeight) {
                sphereBg.style.transform = 'translate(-50%, -50%) scale(100)';
                sphereContent.style.opacity = '1';
            }
        });
    }
});

// --- HELPER: Dynamically Inject Google Analytics ---
function loadGoogleAnalytics() {
    console.log("🚀 Analytics Enabled: Tracking Started");
    
    // 1. Create the <script> tag for Google
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // 2. Initialize the Data Layer
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
}