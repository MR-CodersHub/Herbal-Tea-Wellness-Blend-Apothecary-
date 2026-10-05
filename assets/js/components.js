/* ============================================================
   VERDANA APOTHECARY — Shared Components (Navbar + Footer)
   ============================================================ */

const NAVBAR_HTML = `
<nav class="navbar" id="mainNavbar" role="navigation" aria-label="Main navigation">
  <div class="container">
    <div class="nav-inner">
      <a href="index.html" class="nav-brand" aria-label="Verdana Apothecary Home">
        <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg> Verdana <span>Apothecary</span>
      </a>
      <ul class="nav-links" role="list">
        <li><a href="index.html" class="nav-link">Home</a></li>
        <li><a href="home2.html" class="nav-link">Home 2</a></li>
        <li><a href="about.html"   class="nav-link">About</a></li>
        <li><a href="services.html" class="nav-link">Services</a></li>
        <li><a href="blog.html" class="nav-link">Blog</a></li>
        <li><a href="pricing.html"  class="nav-link">Pricing</a></li>
        <li><a href="contact.html"  class="nav-link">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" data-theme-toggle aria-label="Toggle theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></button>
        <button class="theme-toggle" data-rtl-toggle aria-label="Switch to right-to-left layout" title="RTL / LTR" aria-pressed="false"><span class="rtl-label" aria-hidden="true">RTL</span></button>
        <button class="btn btn-gold btn-sm hide-mobile" onclick="location.href='login.html'">Get Started</button>
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
</nav>

<div class="mobile-overlay" id="mobileOverlay"></div>
<aside class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
  <nav style="display:flex;flex-direction:column;" aria-label="Mobile">
    <a href="index.html"          class="mobile-nav-link">Home</a>
    <a href="home2.html"          class="mobile-nav-link">Home 2</a>
    <a href="about.html"          class="mobile-nav-link">About Us</a>
    <a href="services.html"       class="mobile-nav-link">Services</a>
    <a href="blog.html"           class="mobile-nav-link">Blog</a>
    <a href="pricing.html"        class="mobile-nav-link">Pricing</a>
    <a href="contact.html"        class="mobile-nav-link">Contact</a>
    <a href="login.html"          class="mobile-nav-link">Login / Register</a>
  </nav>
</aside>
<button class="scroll-top" id="scrollTop" aria-label="Back to top"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg></button>
`;

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="grid footer-grid" style="grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;">
      <div>
        <div class="footer-brand">
          <a href="index.html" style="font-family:var(--ff-heading);font-size:2rem;color:var(--clr-gold);font-weight:700;display:inline-flex;align-items:center;gap:0.5rem;"><svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg> Verdana Apothecary</a>
        </div>
        <p class="footer-desc">Crafting premium herbal wellness blends since 2018. Every cup tells a botanical story of healing, harmony, and nature's purest gifts.</p>
        <div class="social-links">
          <a href="#" class="social-btn" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
          <a href="#" class="social-btn" aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8.5 20.5 12 8.5"/><path d="M10.6 8.2c-.4-.2-.8-.3-1.1-.3-1.7 0-3 1.7-3 3.7 0 1.4.8 2.5 2 2.5.6 0 1.2-.3 1.6-.8"/><path d="M12.5 8.5c2.5 0 4 1.7 4 3.7 0 2.3-1.5 4.3-3.7 4.3-.7 0-1.4-.2-1.9-.6"/></svg></a>
          <a href="#" class="social-btn" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" class="social-btn" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></a>
        </div>
      </div>
      <div>
        <h6 class="footer-heading">Explore</h6>
        <a href="index.html"   class="footer-link">Home</a>
        <a href="about.html"   class="footer-link">About Us</a>
        <a href="services.html" class="footer-link">Services</a>
        <a href="pricing.html" class="footer-link">Pricing</a>
        <a href="blog.html"    class="footer-link">Wellness Blog</a>
        <a href="contact.html" class="footer-link">Contact</a>
      </div>
      <div>
        <h6 class="footer-heading">Blends</h6>
        <a href="home2.html#sleep"     class="footer-link">Sleep Blends</a>
        <a href="home2.html#digestion" class="footer-link">Digestion</a>
        <a href="home2.html#immunity"  class="footer-link">Immunity</a>
        <a href="home2.html#stress"    class="footer-link">Stress Relief</a>
        <a href="home2.html#energy"    class="footer-link">Energy & Focus</a>
        <a href="home2.html#detox"     class="footer-link">Detox Blends</a>
      </div>
      <div>
        <h6 class="footer-heading">Contact</h6>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.5);margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> 42 Botanical Lane, Wellness District, CA 94102</p>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.5);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +1 (800) VERDANA</p>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.5);margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> hello@verdana-apothecary.com</p>
        <p style="font-size:0.875rem;color:rgba(255,255,255,0.5);display:flex;align-items:center;gap:0.5rem;"><svg class="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Mon–Sat, 9am–6pm PST</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Verdana Apothecary. All rights reserved.</span>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
        <a href="#" style="color:inherit;transition:color 0.2s;">Privacy Policy</a>
        <a href="#" style="color:inherit;transition:color 0.2s;">Terms of Service</a>
        <a href="#" style="color:inherit;transition:color 0.2s;">Accessibility</a>
      </div>
    </div>
  </div>
</footer>
`;

// Inject shared components
document.addEventListener('DOMContentLoaded', () => {
  const navPlaceholder    = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder)    navPlaceholder.innerHTML    = NAVBAR_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;
});
