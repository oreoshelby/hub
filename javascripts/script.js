
(() => {
    "use strict";

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 50) {
                selectHeader.classList.add('scrolled')
            } else {
                selectHeader.classList.remove('scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active')
            }
            scrollto(this.hash)
        }
    }, true)

    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });


    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });


    window.addEventListener('load', () => {
        let galleryContainer = select('.gallery-container');
        if (galleryContainer) {
            let galleryIsotope = new Isotope(galleryContainer, {
                itemSelector: '.gallery-item',
            });
        }

    });

    const glightbox = GLightbox({
        selector: '.glightbox'
    });

    const theglightbox = GLightbox({
        selector: '.viebox'
    });

    let gallerynIsotope = document.querySelector('.gallery-isotope');

    if (gallerynIsotope) {

        let galleryFilter = gallerynIsotope.getAttribute('data-gallery-filter') ? gallerynIsotope.getAttribute('data-gallery-filter') : '*';
        let galleryLayout = gallerynIsotope.getAttribute('data-gallery-layout') ? gallerynIsotope.getAttribute('data-gallery-layout') : 'masonry';
        let gallerySort = gallerynIsotope.getAttribute('data-gallery-sort') ? gallerynIsotope.getAttribute('data-gallery-sort') : 'original-order';

        window.addEventListener('load', () => {
            let galleryIsotope = new Isotope(document.querySelector('.gallery-container'), {
                itemSelector: '.gallery-item',
                layoutMode: galleryLayout,
                filter: galleryFilter,
                sortBy: gallerySort
            });

            let menuFilters = document.querySelectorAll('.gallery-isotope .gallery-flters li');
            menuFilters.forEach(function (el) {
                el.addEventListener('click', function () {
                    document.querySelector('.gallery-isotope .gallery-flters .filter-active').classList.remove('filter-active');
                    this.classList.add('filter-active');
                    galleryIsotope.arrange({
                        filter: this.getAttribute('data-filter')
                    });
                    if (typeof aos_init === 'function') {
                        aos_init();
                    }
                }, false);
            });

        });

    }

})()



$(document).ready(() => {

    $("#harmburger").click(function () {
        $("#navbar").toggleClass('active')
    });

    feather.replace();

    $('.carousel').carousel({
        interval: 2000
    });

});