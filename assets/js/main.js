// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const btn = document.getElementById('menu-btn');
    const nav = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        nav.classList.toggle('hidden');
    });

    // --- 2. Cookie Consent Logic (GDPR) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');

    // Check if user already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 2000); // Show after 2 seconds
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('visible');
        
        // Trigger Google Analytics here if needed
        enableAnalytics();
    });

    // --- 3. Dynamic Year in Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();
});

// --- Google Analytics Loader (Placeholder) ---
function enableAnalytics() {
    console.log("Cookies accepted. Loading GA...");
    // Paste your GA script here later:
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'G-XXXXXXXXXX');
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const btn = document.getElementById('menu-btn');
    const nav = document.getElementById('mobile-menu');

    if(btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });
    }

    // 2. Dynamic Year
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});