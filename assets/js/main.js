/**
* Template Name: Elevate
* Template URL: https://bootstrapmade.com/elevate-bootstrap-landing-page-template/
* Updated: Oct 24 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Product Detail Modal Dynamic Population
   */
  const productDetailModal = document.getElementById('productDetailModal');
  if (productDetailModal) {
    productDetailModal.addEventListener('show.bs.modal', function(event) {
      const triggerBtn = event.relatedTarget;
      if (!triggerBtn) return;

      const title = triggerBtn.getAttribute('data-title') || '';
      const sku = triggerBtn.getAttribute('data-sku') || '';
      const category = triggerBtn.getAttribute('data-category') || 'Souvenir Elevate';
      const badge = triggerBtn.getAttribute('data-badge') || '';
      const img = triggerBtn.getAttribute('data-img') || '';
      const price = triggerBtn.getAttribute('data-price') || '';
      const unit = triggerBtn.getAttribute('data-unit') || '/pcs';
      const moq = triggerBtn.getAttribute('data-moq') || '-';
      const leadtime = triggerBtn.getAttribute('data-leadtime') || '5 - 7 Hari Kerja';
      const desc = triggerBtn.getAttribute('data-desc') || '';
      const wa = triggerBtn.getAttribute('data-wa') || '#';

      const elTitle = document.getElementById('modalProductTitle');
      const elSku = document.getElementById('modalSkuBadge');
      const elCat = document.getElementById('modalCategoryBadge');
      const elImg = document.getElementById('modalProductImg');
      const elFloatBadge = document.getElementById('modalFloatingBadge');
      const elPrice = document.getElementById('modalProductPrice');
      const elUnit = document.getElementById('modalProductUnit');
      const elMoq = document.getElementById('modalProductMoq');
      const elLeadtime = document.getElementById('modalProductLeadtime');
      const elDesc = document.getElementById('modalProductDesc');
      const elWa = document.getElementById('modalWaBtn');
      const elTable = document.getElementById('modalSpecsTableBody');

      if (elTitle) elTitle.textContent = title;
      if (elSku) elSku.textContent = sku;
      if (elCat) elCat.textContent = category;
      if (elImg) {
        elImg.src = img;
        elImg.alt = title;
      }
      if (elFloatBadge) {
        if (badge) {
          elFloatBadge.textContent = badge;
          elFloatBadge.style.display = 'inline-block';
        } else {
          elFloatBadge.style.display = 'none';
        }
      }
      if (elPrice) elPrice.textContent = price;
      if (elUnit) elUnit.textContent = unit;
      if (elMoq) elMoq.textContent = moq;
      if (elLeadtime) elLeadtime.textContent = leadtime;
      if (elDesc) elDesc.textContent = desc;
      if (elWa) elWa.href = wa;

      // Populate Technical Specs Table
      if (elTable) {
        elTable.innerHTML = '';
        const specsAttr = triggerBtn.getAttribute('data-specs');
        if (specsAttr) {
          try {
            const specs = JSON.parse(specsAttr);
            let rowsHtml = '';
            specs.forEach(s => {
              rowsHtml += `<tr>
                <td class="spec-label"><i class="bi bi-check2 text-primary me-2"></i>${s.label}</td>
                <td class="spec-val">${s.val}</td>
              </tr>`;
            });
            elTable.innerHTML = rowsHtml;
          } catch(err) {
            console.error('Error parsing product specs:', err);
          }
        }
      }
    });

    // Make Card Thumbnails and Titles Clickable for Quick Detail View
    document.querySelectorAll('.category-prod-card').forEach(card => {
      const thumb = card.querySelector('.category-prod-thumb');
      const title = card.querySelector('h3');
      const detailBtn = card.querySelector('.btn-detail');
      if (detailBtn) {
        if (thumb) {
          thumb.style.cursor = 'pointer';
          thumb.setAttribute('title', 'Klik untuk melihat detail produk');
          thumb.addEventListener('click', (e) => {
            if (!e.target.closest('a')) detailBtn.click();
          });
        }
        if (title) {
          title.style.cursor = 'pointer';
          title.setAttribute('title', 'Klik untuk melihat detail produk');
          title.addEventListener('click', (e) => {
            if (!e.target.closest('a')) detailBtn.click();
          });
        }
      }
    });
  }

  /**
   * Package Filter Functionality (paket.html)
   */
  const packageFilterBtns = document.querySelectorAll('.package-filter-btn');
  const packageCards = document.querySelectorAll('.package-filter-item');
  if (packageFilterBtns.length > 0 && packageCards.length > 0) {
    packageFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        packageFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterVal = this.getAttribute('data-filter');

        packageCards.forEach(card => {
          if (filterVal === 'all' || card.getAttribute('data-package-category') === filterVal) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();