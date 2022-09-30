// add an element .page-header-observer.page-header-observer before .js-page-header if .js-page-header exists
if (document.querySelector('.js-page-header')) {
    let pageHeaderObserver = document.createElement('div');
    pageHeaderObserver.classList.add('page-header-observer');
    pageHeaderObserver.classList.add('js-page-header-observer');
    document.querySelector('.js-page-header').insertAdjacentElement('beforebegin', pageHeaderObserver);
}

// a variable of js-page-header's height in pixels
let pageHeaderHeight = document.querySelector('.js-page-header').offsetHeight.toString() + 'px';
console.log(pageHeaderHeight);

// function that is able to check whether an element is in view and put a class on it with options to set the element, the class and the treshold
function checkInView(element, className, treshold, rootMargin) {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting === false) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        });
    }, {
        threshold: [treshold],
        rootMargin: [rootMargin]
    });
    observer.observe(element);
}

// check if js-article-title exists and if so run checkinView()
if (document.querySelector('.js-article-title')) {
    checkInView(document.querySelector('.js-article-title'), 'title-collides', 0.175, '-' + pageHeaderHeight + ' 0px 0px 0px');
}

// check if js-page-header-observer exists and if so run checkinView()
if (document.querySelector('.js-page-header-observer')) {
    checkInView(document.querySelector('.js-page-header-observer'), 'page-header-observer-collides', 0, '0px');
}