/*!
 * HiStack Auto-Gen Platform - Custom JS
 * Author: HiStack Corporation
 * Version: 1.1.0
 * Description: Custom JavaScript functionalities for the platform.
 * License: HiStack Secure License (HSL)
 * Contact: https://histack.rs/
 *
 * Structure
 *  1. Helpers
 *  2. Preloader
 *  3. Header: desktop mega menu overlay
 *  4. Header: language switcher
 *  5. Header: mobile menu
 *  6. Header: search popup + search results
 *  7. Anchor links: clean URL hash
 *  8. Footer: current year
 *  9. Sliders (Swiper): portfolio + carousel 2
 * 10. Testimonial slider
 * 11. Scroll to top button
 * 12. Lazy background images
 * 13. Custom select dropdown icons
 * 14. Searchable list filter
 * 15. Global functions called from inline HTML (onclick / onsubmit)
 *
 * Every block checks that its elements exist before using them, so one missing
 * element on a page can no longer stop the rest of the script.
 */


/* ==========================================================================
   1. Helpers
   ========================================================================== */

var HS = {
  byId: function (id) { return document.getElementById(id); },
  // Lowercase and strip Serbian diacritics, so "kolacici" matches "Kolačići"
  normalize: function (str) {
    return (str || '')
      .toLowerCase()
      .replace(/č|ć/g, 'c')
      .replace(/š/g, 's')
      .replace(/ž/g, 'z')
      .replace(/đ/g, 'dj');
  }
};


/* ==========================================================================
   2. Preloader
   Fades out and removes #preloader once the page has fully loaded.
   ========================================================================== */

window.addEventListener('load', function () {
  var preloader = HS.byId('preloader');
  if (!preloader) return;

  preloader.classList.add('opacity-0', 'pointer-events-none');
  setTimeout(function () { preloader.remove(); }, 500);
});


/* ==========================================================================
   3. Header: desktop mega menu overlay
   Darkens the page and makes the header opaque while a dropdown is open.
   ========================================================================== */

(function () {
  var hoverElements = document.querySelectorAll('.hoverElement');
  var overlay = HS.byId('header-black-overlay-on-hover');
  var header = document.querySelector('header');
  if (!hoverElements.length || !overlay || !header) return;

  hoverElements.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      overlay.classList.remove('opacity-0', 'pointer-events-none');
      overlay.classList.add('opacity-70', 'pointer-events-auto');
      header.classList.remove('bg-opacity-70');
      header.classList.add('bg-opacity-100');
    });

    el.addEventListener('mouseleave', function () {
      overlay.classList.remove('opacity-70', 'pointer-events-auto');
      overlay.classList.add('opacity-0', 'pointer-events-none');
      header.classList.remove('bg-opacity-100');
      header.classList.add('bg-opacity-70');
    });
  });
})();


/* ==========================================================================
   4. Header: language switcher
   Closes the <details class="lang-switcher"> dropdown on outside click,
   Escape, or when the mobile menu closes.
   ========================================================================== */

(function () {
  function closeLang(except) {
    document.querySelectorAll('.lang-switcher[open]').forEach(function (d) {
      if (d !== except) d.removeAttribute('open');
    });
  }

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.lang-switcher[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLang();
  });

  var closeBtn = HS.byId('mobileMenu-iconClose');
  if (closeBtn) closeBtn.addEventListener('click', function () { closeLang(); });
})();


/* ==========================================================================
   5. Header: mobile menu
   Opens/closes #mobileMenu (+ optional #mobileMenu-backdrop) and locks
   page scrolling while it is open. Closes on backdrop click or Escape.
   ========================================================================== */

(function () {
  var menu = HS.byId('mobileMenu');
  var openBtn = HS.byId('mobileMenu-iconOpen');
  var closeBtn = HS.byId('mobileMenu-iconClose');
  var backdrop = HS.byId('mobileMenu-backdrop');
  if (!menu || !openBtn) return;

  function openMenu(e) {
    if (e) e.preventDefault();
    menu.classList.remove('hidden');
    if (backdrop) backdrop.classList.remove('hidden');
    setTimeout(function () { menu.classList.add('open'); }, 10);
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    setTimeout(function () {
      menu.classList.add('hidden');
      if (backdrop) backdrop.classList.add('hidden');
    }, 300);
  }

  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
})();


/* ==========================================================================
   6. Header: search popup + search results
   Opens the full-screen #searchPopup and filters a static list of pages
   as the user types. Serbian or English list is chosen by URL (/en/).
   ========================================================================== */

(function () {
  var popup = HS.byId('searchPopup');
  var openBtn = HS.byId('searchPopup-btnOpen');
  var closeBtn = HS.byId('searchPopup-btnClose');
  var input = HS.byId('search');
  var results = HS.byId('searchResults');

  /* ---- Popup open / close ---- */
  function openPopup() {
    popup.classList.remove('hidden');
    setTimeout(function () {
      popup.classList.add('open');
      if (input) input.focus();
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('open');
    setTimeout(function () { popup.classList.add('hidden'); }, 300);
    document.body.style.overflow = '';
  }

  if (popup && openBtn) openBtn.addEventListener('click', openPopup);
  if (popup && closeBtn) closeBtn.addEventListener('click', closePopup);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && popup && !popup.classList.contains('hidden')) closePopup();
  });

  /* ---- Page index (Serbian URLs follow the folder structure, root-relative) ---- */
  var pagesSR = [
    { name: 'Početna', url: '/' },
    { name: 'Naše usluge', url: '/usluge/' },
    { name: 'Web razvoj', url: '/usluge/web-razvoj.html' },
    { name: 'Razvoj digitalnih proizvoda', url: '/usluge/razvoj-digitalnih-proizvoda.html' },
    { name: 'Razvoj mobilnih aplikacija', url: '/usluge/razvoj-mobilnih-aplikacija.html' },
    { name: 'Rešenja za e-trgovinu', url: '/usluge/resenja-za-e-trgovinu.html' },
    { name: 'Cene i paketi', url: '/cene-i-paketi.html' },
    { name: 'O nama', url: '/o-nama.html' },
    { name: 'Projekti', url: '/projekti/' },
    { name: 'Digi svet', url: '/digi-svet/' },
    { name: 'Kontakt', url: '/kontakt.html' },
    { name: 'Resursi', url: '/resursi/' },
    { name: 'Česta pitanja', url: '/resursi/#faq' },
    { name: 'HiStack portal: vodič za korišćenje', url: '/resursi/vodic-za-koriscenje-platforme.html' },
    { name: 'Proces saradnje', url: '/resursi/proces-saradnje.html' },
    { name: 'HiStack Fondacija', url: '/resursi/fondacija.html' },
    { name: 'EU integracije', url: '/resursi/eu-integracije.html' },
    { name: 'Karijera', url: '/resursi/karijera.html' },
    { name: 'Partnerstvo', url: '/resursi/partnerstvo.html' },
    { name: 'Uslovi korišćenja', url: '/resursi/uslovi-koriscenja.html' },
    { name: 'Politika privatnosti', url: '/resursi/politika-privatnosti.html' },
    { name: 'Politika kolačića', url: '/resursi/kolacici.html' },
    { name: 'Pravne informacije', url: '/resursi/pravne-informacije.html' }
  ];

  /* English pages: unchanged until the EN URL structure is decided (prefixed with /en/ below) */
  var pagesEN = [
    { name: 'Our services', url: 'our-services.html' },
    { name: 'Prices and packages', url: 'prices-and-packages.html' },
    { name: 'About us', url: 'about-us.html' },
    { name: 'Our projects', url: 'our-projects.html' },
    { name: 'Support center', url: 'support.html' },
    { name: 'Blog', url: 'blog.html' },
    { name: 'Contact', url: 'contact.html' },
    { name: 'Terms of use', url: 'terms-of-use.html' },
    { name: 'Privacy policy', url: 'privacy-policy.html' },
    { name: 'Cookies', url: 'cookies.html' },
    { name: 'Legal information', url: 'legal-information.html' },
    { name: 'HiStack foundation', url: 'histack-foundation.html' },
    { name: 'HiStack guide: Marketing', url: 'marketing-guide.html' },
    { name: 'HiStack guide: Design', url: 'design-guide.html' },
    { name: 'HiStack guide: Cooperation instructions', url: 'collaboration-guide.html' },
    { name: 'HiStack guide: Material preparation', url: 'preparing-materials.html' },
    { name: 'Platform user guide', url: 'platform-user-guide.html' },
    { name: 'Web design & development', url: 'web-design-development.html' },
    { name: 'WordPress development', url: 'wordpress-development.html' },
    { name: 'E-Commerce solutions', url: 'ecommerce-solutions.html' },
    { name: 'SEO & digital marketing', url: 'seo-digital-marketing.html' }
  ];

  var isEnglish = window.location.pathname.indexOf('/en/') === 0;
  var pages = isEnglish ? pagesEN : pagesSR;

  /* ---- Render results ---- */
  function showResults(query) {
    if (!results) return;
    results.innerHTML = '';

    var q = HS.normalize(query.trim());
    if (!q) return;

    var matches = pages.filter(function (item) {
      return HS.normalize(item.name).indexOf(q) !== -1;
    });

    matches.forEach(function (item) {
      var a = document.createElement('a');
      a.href = isEnglish ? '/en/' + item.url : item.url;
      a.className = 'p-5 w-full border-b border-[#333333] bg-transparent hover:bg-gray-500 hover:bg-opacity-20 text-gray-400 text-base lg:text-[20px] rounded transition-all duration-100';
      a.textContent = item.name;
      results.appendChild(a);
    });

    if (!matches.length) {
      var empty = document.createElement('div');
      empty.className = 'py-2 text-white';
      empty.textContent = isEnglish ? 'No results found' : 'Nema rezultata';
      results.appendChild(empty);
    }
  }

  if (input) {
    input.addEventListener('input', function () { showResults(this.value); });
  }
})();


/* ==========================================================================
   7. Anchor links: clean URL hash
   Scrolls to the #section from the URL on load, then removes the hash
   from the address bar (also after clicking in-page anchor links).
   ========================================================================== */

(function () {
  function clearHash() {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  window.addEventListener('DOMContentLoaded', function () {
    var hash = window.location.hash.substring(1);
    if (!hash) return;
    var el = HS.byId(hash);
    if (el) {
      el.scrollIntoView();
      clearHash();
    }
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    if (!HS.byId(href.substring(1))) return;

    setTimeout(clearHash, 10);
  });
})();


/* ==========================================================================
   8. Footer: current year
   Fills every #year element (copyright line) with the current year.
   ========================================================================== */

document.querySelectorAll('#year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});


/* ==========================================================================
   9. Sliders (Swiper)
   Run only when the Swiper library is loaded AND the slider exists,
   so pages without Swiper no longer throw an error.
   ========================================================================== */

(function () {
  if (typeof Swiper === 'undefined') return;

  /* ---- Portfolio slider (homepage, .portfolio-section) ---- */
  document.querySelectorAll('.portfolio-section').forEach(function (root) {
    var el = root.querySelector('.portfolio-swiper');
    if (!el) return;

    new Swiper(el, {
      loop: false,
      speed: 600,
      grabCursor: true,
      watchOverflow: true,
      slidesPerView: 1.25,
      spaceBetween: 20,
      navigation: {
        prevEl: root.querySelector('.portfolio-prev'),
        nextEl: root.querySelector('.portfolio-next')
      },
      scrollbar: {
        el: root.querySelector('.portfolio-scrollbar'),
        draggable: true,
        snapOnRelease: true
      },
      keyboard: { enabled: true, onlyInViewport: true },
      mousewheel: { forceToAxis: true, releaseOnEdges: true },
      a11y: {
        prevSlideMessage: 'Prethodni projekat',
        nextSlideMessage: 'Sledeći projekat',
        slideLabelMessage: 'Projekat {{index}} od {{slidesLength}}'
      },
      breakpoints: {
        450:  { slidesPerView: 1.45, spaceBetween: 20 },
        640:  { slidesPerView: 2.00, spaceBetween: 20 },
        768:  { slidesPerView: 1.25, spaceBetween: 24 },
        1024: { slidesPerView: 1.35, spaceBetween: 28 },
        1280: { slidesPerView: 1.55, spaceBetween: 32 },
        1536: { slidesPerView: 1.80, spaceBetween: 38 }
      }
    });
  });

  /* ---- Carousel 2 (.multiple-slide-carousel-2) ---- */
  if (document.querySelector('.multiple-slide-carousel-2')) {
    window.swiper2 = new Swiper('.multiple-slide-carousel-2', {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.multiple-slide-carousel-2 .swiper-button-next',
        prevEl: '.multiple-slide-carousel-2 .swiper-button-prev'
      },
      breakpoints: {
        320:  { slidesPerView: 1.15, spaceBetween: 10 },
        650:  { slidesPerView: 1.5, spaceBetween: 20 },
        900:  { slidesPerView: 2, spaceBetween: 10 },
        1280: { slidesPerView: 2, spaceBetween: 15 },
        1535: { slidesPerView: 2, spaceBetween: 30 }
      }
    });
  }
})();


/* ==========================================================================
   10. Testimonial slider (#slider-container)
   Three stacked images (active / next / prev) with matching comment and
   author blocks. Works with pagination clicks, image clicks, arrow keys
   and touch swipe.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var root = HS.byId('slider-container');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('.slider-image'));
  var pages = Array.prototype.slice.call(root.querySelectorAll('#pagination li'));
  var comments = Array.prototype.slice.call(root.querySelectorAll('#comment-section .tst-item'));
  var authors = Array.prototype.slice.call(root.querySelectorAll("[id^='author-info-']"));
  var total = slides.length;
  var current = 0;
  if (!total) return;

  function goTo(index) {
    current = (index + total) % total;

    slides.forEach(function (el, i) {
      var offset = (i - current + total) % total; // 0 = active, 1 = next, 2 = prev
      el.dataset.pos = offset === 0 ? 'active' : offset === 1 ? 'next' : 'prev';
      el.classList.toggle('is-active', offset === 0);
      el.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
    });

    [comments, authors].forEach(function (group) {
      group.forEach(function (el, i) {
        el.classList.toggle('is-active', i === current);
        el.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
    });

    pages.forEach(function (li, i) {
      li.classList.toggle('is-active', i === current);
      if (li.firstElementChild) li.firstElementChild.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  }

  pages.forEach(function (li, i) { li.addEventListener('click', function () { goTo(i); }); });
  slides.forEach(function (img, i) { img.addEventListener('click', function () { goTo(i); }); }); // click a side image to bring it forward

  root.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
  });

  /* ---- Touch swipe (mobile) ---- */
  var startX = null;
  root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  goTo(0);
});


/* ==========================================================================
   11. Scroll to top button (#scroll-to-top-button)
   Appears after 400px of scrolling; the ring shows reading progress.
   Visibility and position are styled in style.css (.is-visible).
   ========================================================================== */

(function () {
  var btn = HS.byId('scroll-to-top-button');
  if (!btn) return;

  var ring = btn.querySelector('.stt-progress');
  var C = 2 * Math.PI * 22;   // circle circumference (r = 22)
  var SHOW_AFTER = 400;       // px scrolled before the button appears
  var ticking = false;

  if (ring) {
    ring.style.strokeDasharray = C;
    ring.style.strokeDashoffset = C;
  }

  function update() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(y / max, 1) : 0;
    if (ring) ring.style.strokeDashoffset = C * (1 - progress);
    btn.classList.toggle('is-visible', y > SHOW_AFTER);
    ticking = false;
  }

  // addEventListener (not window.onscroll) so it never overwrites other scroll handlers
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);

  btn.addEventListener('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  update();
})();


/* ==========================================================================
   12. Lazy background images ([data-bg])
   Sets background-image only when the element scrolls into view.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var lazyBg = document.querySelectorAll('[data-bg]');
  if (!lazyBg.length) return;

  // Older browsers without IntersectionObserver: load all backgrounds at once
  if (!('IntersectionObserver' in window)) {
    lazyBg.forEach(function (el) { el.style.backgroundImage = el.dataset.bg; });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.backgroundImage = entry.target.dataset.bg;
        obs.unobserve(entry.target);
      }
    });
  });
  lazyBg.forEach(function (el) { observer.observe(el); });
});


/* ==========================================================================
   13. Custom select dropdown icons
   Rotates the chevron next to #price-select-dropdown-menu and
   #service-select-dropdown-menu while the select is focused.
   ========================================================================== */

document.querySelectorAll('#price-select-dropdown-menu, #service-select-dropdown-menu').forEach(function (menu) {
  var holder = menu.nextElementSibling;
  var icon = holder ? holder.querySelector('i') : null;
  if (!icon) return;

  menu.addEventListener('focus', function () { icon.style.transform = 'rotate(180deg)'; });
  menu.addEventListener('blur', function () { icon.style.transform = 'rotate(0deg)'; });
  menu.addEventListener('change', function () { menu.blur(); });
});


/* ==========================================================================
   14. Searchable list filter
   Filters items in #custom-scrollbar by the text typed into
   #searchInput-ulList.
   ========================================================================== */

(function () {
  var input = HS.byId('searchInput-ulList');
  if (!input) return;

  var items = document.querySelectorAll('#custom-scrollbar li');

  input.addEventListener('input', function () {
    var filter = HS.normalize(input.value);
    items.forEach(function (item) {
      var text = HS.normalize(item.textContent || item.innerText);
      item.style.display = text.indexOf(filter) !== -1 ? '' : 'none';
    });
  });
})();


/* ==========================================================================
   15. Global functions called from inline HTML
   These must stay global (onclick="..." / onsubmit="..." in the markup).
   ========================================================================== */

/* ---- Old mobile submenu toggle (legacy headers) ---- */
function toggleMenu(event) {
  event.preventDefault();
  var li = event.target.closest('li');
  var submenu = li ? li.querySelector('ul') : null;
  var icon = event.target;
  if (!submenu) return;

  if (submenu.classList.contains('hidden')) {
    submenu.classList.remove('hidden');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    icon.classList.add('flip');
  } else {
    submenu.style.maxHeight = '0';
    icon.classList.remove('flip');
    setTimeout(function () { submenu.classList.add('hidden'); }, 300);
  }
}

/* ---- Share buttons (article pages) ---- */
function openShare(url) {
  window.open(url, '_blank', 'noopener');
}

function shareLinkedin() {
  openShare('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href));
}

function shareFacebook() {
  openShare('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
}

function shareViber() {
  openShare('viber://forward?text=' + encodeURIComponent(window.location.href));
}

function shareWhatsapp() {
  openShare('https://api.whatsapp.com/send?text=' + encodeURIComponent(window.location.href));
}

/* ---- FAQ accordion (old Resursi / pomoc page) ---- */
function toggleAccordion(index) {
  var contents = document.querySelectorAll('.accordion-content');
  var icons = document.querySelectorAll('.fa-plus');
  var buttons = document.querySelectorAll('.accordion-button');
  if (!contents[index]) return;

  contents.forEach(function (content, i) {
    if (i === index) return;
    content.classList.add('max-h-0');
    content.classList.remove('max-h-[1000px]');
    if (icons[i]) icons[i].classList.remove('rotate-45');
    if (buttons[i]) buttons[i].classList.remove('text-white');
  });

  contents[index].classList.toggle('max-h-0');
  contents[index].classList.toggle('max-h-[1000px]');
  if (icons[index]) icons[index].classList.toggle('rotate-45');
  if (buttons[index]) buttons[index].classList.toggle('text-white');
}

/* ---- Login form: show / hide password ---- */
function togglePassword() {
  var passwordInput = HS.byId('password');
  var eyeIcon = HS.byId('eyeIcon');
  if (!passwordInput) return;

  var show = passwordInput.type === 'password';
  passwordInput.type = show ? 'text' : 'password';
  if (eyeIcon) eyeIcon.classList.replace(show ? 'fa-eye-slash' : 'fa-eye', show ? 'fa-eye' : 'fa-eye-slash');
}

/* ---- Login form: simulated login with 5-attempt / 15-minute cooldown ----
   Note: this does not check credentials, it always returns an error message. */
var LOGIN_MAX_ATTEMPTS = 5;
var LOGIN_COOLDOWN_MS = 15 * 60 * 1000;

function getLoginState() {
  var attempts = 0;
  var cooldownTime = 0;
  try {
    attempts = parseInt(localStorage.getItem('loginAttempts'), 10) || 0;
    cooldownTime = parseInt(localStorage.getItem('cooldownTime'), 10) || 0;
  } catch (e) { /* storage blocked: keep defaults */ }
  return { attempts: attempts, cooldownTime: cooldownTime };
}

function setLoginState(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch (e) { /* storage blocked: ignore */ }
}

function handleLogin(event) {
  event.preventDefault();

  var loading = HS.byId('loading');
  var message = HS.byId('messageContainer');
  var state = getLoginState();

  if (loading) loading.classList.remove('hidden');
  if (message) message.innerHTML = '';

  if (state.attempts >= LOGIN_MAX_ATTEMPTS) {
    var now = Date.now();
    if (now < state.cooldownTime) {
      setTimeout(function () {
        var remaining = Math.ceil((state.cooldownTime - now) / 1000);
        if (message) message.innerHTML = 'Pokušajte ponovo za ' + remaining + ' sekundi.';
        if (loading) loading.classList.add('hidden');
      }, 500);
      return;
    }
    setLoginState('loginAttempts', 0);
    setLoginState('cooldownTime', null);
    state.attempts = 0;
  }

  setTimeout(function () {
    if (message) message.innerHTML = 'Uneti podaci nisu ispravni. Pokušajte ponovo.';
    if (loading) loading.classList.add('hidden');

    var attempts = state.attempts + 1;
    setLoginState('loginAttempts', attempts);
    if (attempts >= LOGIN_MAX_ATTEMPTS) {
      setLoginState('cooldownTime', Date.now() + LOGIN_COOLDOWN_MS);
    }
  }, 500);
}

/* Show the cooldown message on page load if the user is still locked out.
   (Previously overwritten by an empty window.onload, so it never ran.) */
window.addEventListener('load', function () {
  var message = HS.byId('messageContainer');
  if (!message) return;

  var state = getLoginState();
  var now = Date.now();
  if (state.attempts >= LOGIN_MAX_ATTEMPTS && now < state.cooldownTime) {
    var remaining = Math.ceil((state.cooldownTime - now) / 1000);
    message.innerHTML = 'Previše neuspešnih pokušaja. Pokušajte ponovo za ' + remaining + ' sekundi.';
  }
});

/* ---- Password reset form: simulated response ---- */
function handleResetPassword(event) {
  event.preventDefault();

  var loading = HS.byId('loadingReset');
  var message = HS.byId('messageContainerReset');

  if (loading) loading.classList.remove('hidden');
  if (message) message.innerHTML = '';

  setTimeout(function () {
    if (message) message.innerHTML = 'Pogrešan ID ili email. Pokušajte ponovo.';
    if (loading) loading.classList.add('hidden');
  }, 500);
}