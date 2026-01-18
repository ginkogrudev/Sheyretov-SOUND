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