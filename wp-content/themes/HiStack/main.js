/*!
 * HiStack Auto-Gen Platform - Custom JS
 * Author: HiStack Corporation
 * Version: 1.0.0
 * Description: Custom JavaScript functionalities for the platform.
 * License: HiStack Secure License (HSL)
 * Contact: https://histack.rs/
 */


window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    preloader.classList.add('opacity-0', 'pointer-events-none');

    setTimeout(() => {
      preloader.remove();
    }, 500);
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView();
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }
});

document.addEventListener('click', function(e) {
  const target = e.target.closest('a');
  if (!target) return;

  const href = target.getAttribute('href');
  if (!href || !href.startsWith('#')) return;

  const id = href.substring(1);
  if (!document.getElementById(id)) return;

  setTimeout(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, 10);
});

const hoverElements = document.querySelectorAll('.hoverElement');
const overlay = document.getElementById('header-black-overlay-on-hover');
const header = document.querySelector('header');

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-70', 'pointer-events-auto');

    header.classList.remove('bg-opacity-70');
    header.classList.add('bg-opacity-100');
  });

  el.addEventListener('mouseleave', () => {
    overlay.classList.remove('opacity-70', 'pointer-events-auto');
    overlay.classList.add('opacity-0', 'pointer-events-none');

    header.classList.remove('bg-opacity-100');
    header.classList.add('bg-opacity-70');
  });
});


document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});


var swiper = new Swiper(".multiple-slide-carousel", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: ".multiple-slide-carousel .swiper-button-next",
      prevEl: ".multiple-slide-carousel .swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.05,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 1.15,
        spaceBetween: 0
      },
      1280: {
        slidesPerView: 1.7,
        spaceBetween: 30
      }
    }
});

var swiper2 = new Swiper(".multiple-slide-carousel-2", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10, 
    navigation: {
      nextEl: ".multiple-slide-carousel-2 .swiper-button-next",
      prevEl: ".multiple-slide-carousel-2 .swiper-button-prev",
    },
    breakpoints: {
      320: { slidesPerView: 1.15, spaceBetween: 10 },
      650: { slidesPerView: 1.5, spaceBetween: 20 },
      900: { slidesPerView: 2, spaceBetween: 10 },
      1280: { slidesPerView: 2, spaceBetween: 15 },
      1535: { slidesPerView: 2, spaceBetween: 30 }
    }
});


var mybutton = document.getElementById("scroll-to-top-button");

window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.classList.remove("opacity-0", "pointer-events-none");
    mybutton.classList.add("opacity-100", "pointer-events-auto");
  } else {
    mybutton.classList.remove("opacity-100", "pointer-events-auto");
    mybutton.classList.add("opacity-0", "pointer-events-none");
  }
};

mybutton.onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function() {
    const paginationItems = document.querySelectorAll("#pagination li");
  
    const slides = document.querySelectorAll(".slider-image");
    const comments = document.querySelectorAll("#comment-section p");
    const authors = document.querySelectorAll("[id^='author-info-']");
    
    paginationItems.forEach(function(item, index) {
      item.addEventListener("click", function() {
        slides.forEach(slide => {
          slide.classList.remove("active");
          slide.classList.add("hidden");
        });
        comments.forEach(comment => {
          comment.classList.remove("active");
          comment.classList.add("hidden");
        });
        authors.forEach(author => {
          author.classList.remove("active");
          author.classList.add("hidden");
        });
  
        const currentSlide = document.getElementById(`slide-${index + 1}`);
        const currentComment = document.getElementById(`comment-${index + 1}`);
        const currentAuthor = document.getElementById(`author-info-${index + 1}`);
  
        currentSlide.classList.remove("hidden");
        currentSlide.classList.add("active");
        currentComment.classList.remove("hidden");
        currentComment.classList.add("active");
        currentAuthor.classList.remove("hidden");
        currentAuthor.classList.add("active");
  
        paginationItems.forEach(item => item.classList.remove("active"));
        item.classList.add("active");
      });
    });
});

function toggleMenu(event) {
  event.preventDefault();
  const submenu = event.target.closest('li').querySelector('ul');
  const icon = event.target;

  if (submenu.classList.contains('hidden')) {
    submenu.classList.remove('hidden');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';  
    icon.classList.add('flip'); 
  } else {
    submenu.style.maxHeight = '0';  
    icon.classList.remove('flip');

    setTimeout(() => {
      submenu.classList.add('hidden');
    }, 300);
  }
}

document.getElementById("mobileMenu-iconOpen").addEventListener("click", function() {
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenu.classList.remove("hidden");
  setTimeout(() => {
    mobileMenu.classList.add("open"); 
  }, 10);  

  document.body.classList.add("no-scroll");
});

document.getElementById("mobileMenu-iconClose").addEventListener("click", function() {
  const mobileMenu = document.getElementById("mobileMenu");

  
  mobileMenu.classList.remove("open");
  document.body.classList.remove("no-scroll");

 
  setTimeout(function() {
    mobileMenu.classList.add("hidden");
  }, 300);  
});

const searchPopup = document.getElementById("searchPopup");
const openBtn = document.getElementById("searchPopup-btnOpen");
const closeBtn = document.getElementById("searchPopup-btnClose");

openBtn.addEventListener("click", function() {
  searchPopup.classList.remove("hidden");
  setTimeout(() => {
    searchPopup.classList.add("open");
  }, 10);
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function() {
  searchPopup.classList.remove("open");
  setTimeout(() => {
    searchPopup.classList.add("hidden");
  }, 300);
  document.body.style.overflow = "auto";
});

const dummyItemsSR = [
  { name: "Naše usluge", url: "nase-usluge.html" },
  { name: "Cene i paketi", url: "cene-i-paketi.html" },
  { name: "O nama", url: "o-nama.html" },
  { name: "Naši projekti", url: "nasi-projekti.html" },
  { name: "Centar za podršku", url: "pomoc.html" },
  { name: "Blog", url: "blog.html" },
  { name: "Kontakt", url: "kontakt.html" },
  { name: "Uslovi korišćenja", url: "uslovi-koriscenja.html" },
  { name: "Politika privatnosti", url: "politika-privatnosti.html" },
  { name: "Kolačići", url: "kolacici.html" },
  { name: "Pravne informacije", url: "pravne-informacije.html" },
  { name: "HiStack fondacija", url: "histack-fondacija.html" },
  { name: "HiStack vodič: Marketing", url: "vodic-za-marketing.html" },
  { name: "HiStack vodič: Dizajn", url: "vodic-za-dizajn.html" },
  { name: "HiStack vodič: Uputstvo za saradnju", url: "uputstvo-za-saradnju.html" },
  { name: "HiStack vodič: Priprema materijala", url: "priprema-materijala.html" },
  { name: "Vodič za korišćenje platforme", url: "vodic-za-koriscenje-platforme.html" },
  { name: "Web dizajn i razvoj", url: "web-dizajn-razvoj.html" },
  { name: "Wordpress razvoj", url: "wordpress-razvoj.html" },
  { name: "E-Commerce rešenja", url: "e-commerce-resenja.html" },
  { name: "SEO & SMM: Digitalni marketing", url: "seo-digitalni-marketing.html" }
];

const dummyItemsEN = [
  { name: "Our services", url: "our-services.html" },
  { name: "Prices and packages", url: "prices-and-packages.html" },
  { name: "About us", url: "about-us.html" },
  { name: "Our projects", url: "our-projects.html" },
  { name: "Support center", url: "support.html" },
  { name: "Blog", url: "blog.html" },
  { name: "Contact", url: "contact.html" },
  { name: "Terms of use", url: "terms-of-use.html" },
  { name: "Privacy policy", url: "privacy-policy.html" },
  { name: "Cookies", url: "cookies.html" },
  { name: "Legal information", url: "legal-information.html" },
  { name: "HiStack foundation", url: "histack-foundation.html" },
  { name: "HiStack guide: Marketing", url: "marketing-guide.html" },
  { name: "HiStack guide: Design", url: "design-guide.html" },
  { name: "HiStack guide: Cooperation instructions", url: "collaboration-guide.html" },
  { name: "HiStack guide: Material preparation", url: "preparing-materials.html" },
  { name: "Platform user guide", url: "platform-user-guide.html" },
  { name: "Web design & development", url: "web-design-development.html" },
  { name: "WordPress development", url: "wordpress-development.html" },
  { name: "E-Commerce solutions", url: "ecommerce-solutions.html" },
  { name: "SEO & digital marketing", url: "seo-digital-marketing.html" }
];

const isEnglish = window.location.pathname.startsWith('/en/');

const dummyItems = isEnglish ? dummyItemsEN : dummyItemsSR;

function displaySearchResults(query) {
  const searchResultsDiv = document.getElementById('searchResults');
  
  if (query === '') {
    searchResultsDiv.innerHTML = '';
    return;
  }

  const filteredResults = dummyItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  searchResultsDiv.innerHTML = '';

  filteredResults.forEach(item => {
    const a = document.createElement('a');
    a.href = isEnglish ? '/en/' + item.url : item.url;
    a.classList.add('p-5', 'w-full', 'border-b', 'border-[#333333]', 'bg-transparent', 'hover:bg-gray-500', 'hover:bg-opacity-20', 'text-gray-400', 'text-base', 'lg:text-[20px]', 'rounded', 'transition-all', 'duration-100');
    a.textContent = item.name;
    searchResultsDiv.appendChild(a);
  });

  if (filteredResults.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.classList.add('py-2', 'text-white');
    noResultsMessage.textContent = isEnglish ? 'No results found' : 'Nema rezultata';
    searchResultsDiv.appendChild(noResultsMessage);
  }
}

document.getElementById('search').addEventListener('input', function() {
  displaySearchResults(this.value);
});

const selectMenus = document.querySelectorAll('#price-select-dropdown-menu, #service-select-dropdown-menu');

selectMenus.forEach((menu) => {
  const icon = menu.nextElementSibling.querySelector('i');

  menu.addEventListener('focus', () => {
    icon.style.transform = 'rotate(180deg)';
  });

  menu.addEventListener('blur', () => {
    icon.style.transform = 'rotate(0deg)';
  });

  menu.addEventListener('change', () => {
    menu.blur(); 
  });
});

const searchInput = document.getElementById('searchInput-ulList');
const listItems = document.querySelectorAll('#custom-scrollbar li');

searchInput.addEventListener('input', function() {
  const filter = searchInput.value.toLowerCase(); 

  listItems.forEach(function(item) {
    const text = item.textContent || item.innerText;
    if (text.toLowerCase().includes(filter)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    passwordInput.type = 'password';
    eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
  }
}

function handleLogin(event) {
  event.preventDefault();

  let attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
  let cooldownTime = parseInt(localStorage.getItem('cooldownTime')) || 0;

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('messageContainer').innerHTML = "";

  if (attempts >= 5) {
    const currentTime = new Date().getTime();
    if (currentTime < cooldownTime) {
      setTimeout(() => {
        const remainingTime = Math.ceil((cooldownTime - currentTime) / 1000);
        document.getElementById('messageContainer').innerHTML = `Pokušajte ponovo za ${remainingTime} sekundi.`;
        document.getElementById('loading').classList.add('hidden');
      }, 500);
      return;
    } else {
      localStorage.setItem('loginAttempts', 0);
      localStorage.removeItem('cooldownTime');
    }
  }

  setTimeout(() => {
    document.getElementById('messageContainer').innerHTML = "Uneti podaci nisu ispravni. Pokušajte ponovo.";
    document.getElementById('loading').classList.add('hidden');

    attempts++;
    localStorage.setItem('loginAttempts', attempts);

    if (attempts >= 5) {
      const cooldownEnd = new Date().getTime() + 15 * 60 * 1000;
      localStorage.setItem('cooldownTime', cooldownEnd);
    }
  }, 500);
}

window.onload = function() {
  let attempts = parseInt(localStorage.getItem('loginAttempts')) || 0;
  let cooldownTime = parseInt(localStorage.getItem('cooldownTime')) || 0;
  const currentTime = new Date().getTime();

  if (attempts >= 5 && currentTime < cooldownTime) {
    const remainingTime = Math.ceil((cooldownTime - currentTime) / 1000);
    document.getElementById('messageContainer').innerHTML = `Previše neuspešnih pokušaja. Pokušajte ponovo za ${remainingTime} sekundi.`;
  }
}

function handleResetPassword(event) {
  event.preventDefault();

  document.getElementById('loadingReset').classList.remove('hidden');
  document.getElementById('messageContainerReset').innerHTML = "";

  setTimeout(() => {
    document.getElementById('messageContainerReset').innerHTML = "Pogrešan ID ili email. Pokušajte ponovo.";

    document.getElementById('loadingReset').classList.add('hidden');
  }, 500);
}

window.onload = function() {
}

function shareLinkedin() {
  const currentUrl = window.location.href;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  window.open(linkedinUrl, '_blank');
}

function shareFacebook() {
  const currentUrl = window.location.href;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  window.open(facebookUrl, '_blank');
}

function shareViber() {
  const currentUrl = window.location.href;
  const viberUrl = `viber://forward?text=${encodeURIComponent(currentUrl)}`;
  window.open(viberUrl, '_blank');
}

function shareWhatsapp() {
  const currentUrl = window.location.href;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
  window.open(whatsappUrl, '_blank');
}

function toggleAccordion(index) {
  const contents = document.querySelectorAll('.accordion-content');
  const icons = document.querySelectorAll('.fa-plus');
  const buttons = document.querySelectorAll('.accordion-button'); 

  contents.forEach((content, i) => {
    if (i !== index) {
      content.classList.add('max-h-0');
      content.classList.remove('max-h-[1000px]');
      icons[i].classList.remove('rotate-45'); 
      buttons[i].classList.remove('text-white'); 
    }
  });

  const content = contents[index];
  const icon = icons[index];
  const button = buttons[index];

  content.classList.toggle('max-h-0');
  content.classList.toggle('max-h-[1000px]');
  icon.classList.toggle('rotate-45');
  button.classList.toggle('text-white'); 
}