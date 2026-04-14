// cache elements (may be null if removed from DOM)
let navbar = document.querySelector('.header .navbar');
let searchForm = document.querySelector('.header .search-form');
let loginForm = document.querySelector('.header .login-form');
let contactInfo = document.querySelector('.contact-info');

// Helper to safely remove class if element exists
const safeRemove = (el, cls) => { if (el && el.classList) el.classList.remove(cls); };

// menu button
const menuBtn = document.querySelector('#menu-btn');
if (menuBtn) {
   menuBtn.addEventListener('click', () => {
      if (navbar) navbar.classList.toggle('active');
      safeRemove(searchForm, 'active');
      safeRemove(loginForm, 'active');
   });
}

// search button (may have been removed)
const searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
   searchBtn.addEventListener('click', () => {
      if (searchForm) searchForm.classList.toggle('active');
      safeRemove(navbar, 'active');
      safeRemove(loginForm, 'active');
   });
}

// login button (may have been removed)
const loginBtn = document.querySelector('#login-btn');
if (loginBtn) {
   loginBtn.addEventListener('click', () => {
      if (loginForm) loginForm.classList.toggle('active');
      safeRemove(navbar, 'active');
      safeRemove(searchForm, 'active');
   });
}

// info button -> open contact info panel
const infoBtn = document.querySelector('#info-btn');
if (infoBtn && contactInfo) {
   infoBtn.addEventListener('click', () => {
      contactInfo.classList.add('active');
   });
}

// close contact info
const closeContact = document.querySelector('#close-contact-info');
if (closeContact && contactInfo) {
   closeContact.addEventListener('click', () => {
      contactInfo.classList.remove('active');
   });
}

// on scroll hide panels if they exist
window.onscroll = () =>{
    safeRemove(navbar, 'active');
    safeRemove(searchForm, 'active');
    safeRemove(loginForm, 'active');
    safeRemove(contactInfo, 'active');
}

var swiper = new Swiper(".home-slider", {
   loop:true,
   grabCursor:true,
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
});

var swiper = new Swiper(".reviews-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".blogs-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
   },
});

var swiper = new Swiper(".logo-slider", {
   loop:true,
   grabCursor:true,
   spaceBetween: 20,
   breakpoints: {
      450: {
         slidesPerView: 2,
       },
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 5,
      },
   },
});

// ---------------- Portfolio gallery + filters ----------------
// initialize lightGallery on the projects container and provide a helper to re-init after filtering
let projectsContainer = document.querySelector('.projects .box-container');
let lgInstance = null;
const initGallery = () => {
   try {
      if (lgInstance && typeof lgInstance.destroy === 'function') lgInstance.destroy();
   } catch (e) {
      // ignore if destroy isn't available
   }
   if (projectsContainer && typeof lightGallery === 'function') {
      lgInstance = lightGallery(projectsContainer, { selector: 'a' });
   }
};
initGallery();

// filtering
const filterButtons = document.querySelectorAll('.projects-filters .filter-btn');
if (filterButtons && projectsContainer) {
   filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
         const filter = btn.dataset.filter;
         filterButtons.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
         const items = projectsContainer.querySelectorAll('.box');
         items.forEach(item => {
            const cat = item.dataset.category || '';
            if (filter === 'all' || cat === filter) {
               item.style.display = '';
            } else {
               item.style.display = 'none';
            }
         });
         // re-init gallery so only visible items are bound
         initGallery();
      });
   });
}