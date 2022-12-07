// add an element .page-header-observer.page-header-observer before .js-page-header if .js-page-header exists
if (document.querySelector('.js-page-header')) {
    let pageHeaderObserver = document.createElement('div');
    pageHeaderObserver.classList.add('page-header-observer');
    pageHeaderObserver.classList.add('js-page-header-observer');
    document.querySelector('.js-page-header').insertAdjacentElement('beforebegin', pageHeaderObserver);
}

// a variable of js-page-header's height in pixels
let pageHeaderHeight = document.querySelector('.js-page-header').offsetHeight.toString() + 'px';

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

// make a const clampform with id clamp
const clampform = document.getElementById('clamp');
const zoomform = document.getElementById('zoom');
const clampMinWidth = document.getElementById('clamp-min-width');
const clampMaxWidth = document.getElementById('clamp-max-width');
const clampBrowserWidth = document.getElementById('clamp-browser-width');
const clampMinFontSize = document.getElementById('clamp-min-font-size');
const clampMaxFontSize = document.getElementById('clamp-max-font-size');
const clampFormula = document.getElementById('clamp-formula');
const clampFormulaExplanation = document.getElementById('clamp-formula-explanation');
const clampCalculateVw = document.getElementById('clamp-calculate-vw');
const clampCalculateRem = document.getElementById('clamp-calculate-rem');
const clampOutput = document.getElementById('clamp-output');
const zoomOutput = document.getElementById('zoom-output');
const clampZoomLevel = document.getElementById('clamp-zoom-level');

function round(value, precision = 0, addZero = true) {
    const exponent = Math.pow(10, precision);
    if (addZero) {
        return (Math.round(value * exponent) / exponent).toFixed(precision);
    }
    else {
        return Math.round(value * exponent) / exponent;
    }
}

// a function that updates the clamp output
function updateClampOutput() {

    let clampSlope = (clampMaxFontSize.value - clampMinFontSize.value) / (clampMaxWidth.value - clampMinWidth.value);
    let interceptRem = clampMinFontSize.value - (clampSlope * clampMinWidth.value);
    let viewPortWidth = clampBrowserWidth.value / clampZoomLevel.value * 100;
    let originalFontSize = clampMaxFontSize.value;

    let clampFontSize = clampSlope * viewPortWidth + interceptRem;
    let realFontSize = clampFontSize;
    let calculatedFontSize = clampFontSize;
    let calculatedPercentage = calculatedFontSize / originalFontSize * 100;

    // check if viewPortWidth is smaller than clampMaxWidth and if so set clampFontSize to clampMaxFontSize
    if (viewPortWidth < clampMaxWidth.value) {
        calculatedFontSize = clampFontSize * clampZoomLevel.value / 100;
        calculatedPercentage = calculatedFontSize / originalFontSize * 100;
        realFontSize = clampFontSize;
    }
    else {
        calculatedFontSize = clampMaxFontSize.value * clampZoomLevel.value / 100;
        calculatedPercentage = calculatedFontSize / originalFontSize * 100;
        realFontSize = clampMaxFontSize.value;
    }

    // clampCalculateVw.innerHTML = round(clampSlope * 100, 4, false);
    // clampCalculateRem.innerHTML = round(interceptRem / 16, 4, false);

    // clampFormula.innerHTML = '<span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">clamp</span><span class="token punctuation">(</span>' + clampMinFontSize.value / 16 + 'rem<span class="token punctuation">,</span> ' + round(clampSlope * 100, 4, false) + 'vw + ' + round(interceptRem / 16, 4, false) + 'rem<span class="token punctuation">,</span> ' + round(clampMaxFontSize.value / 16, 4, false) + 'rem<span class="token punctuation">)</span><span class="token punctuation">;</span>';
    // write the previous line again but with string template literals
    clampFormula.innerHTML = `<span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">clamp</span><span class="token punctuation">(</span>${clampMinFontSize.value / 16}rem<span class="token punctuation">,</span> <span class="token output output--1">${round(clampSlope * 100, 4, false)}</span>vw + <span class="token output output--2">${round(interceptRem / 16, 4, false)}</span>rem<span class="token punctuation">,</span> ${round(clampMaxFontSize.value / 16, 4, false)}rem<span class="token punctuation">)</span><span class="token punctuation">;</span>`;


    clampOutput.innerHTML =
        `clamp(${clampMinFontSize.value}px, ${round(clampSlope, 4)} &times; ${round(viewPortWidth, 2)}px = ${round(clampSlope * viewPortWidth, 2)}px + ${round(interceptRem, 2)}px = ${round(clampFontSize, 2)}px, ${clampMaxFontSize.value}px)`;
    // `clamp(${clampMinFontSize.value}px, ${round(clampFontSize, 4)}px, ${clampMaxFontSize.value}px)`;
    // take the code above and add a span with a class around clampMaxFontSize.value


    zoomOutput.innerHTML =
        // Math.round(calculatedFontSize) + 'px which is '
        // + Math.round(calculatedPercentage) + '% of '
        // + clampMaxFontSize.value + 'px';
        `${round(realFontSize, 2)}px &times; ${clampZoomLevel.value}% = ${round(calculatedFontSize, 2)}px which is ${Math.round(calculatedPercentage)}% of ${clampMaxFontSize.value}px`;

    // set the min attribute of clampMaxWidth to the value of clampMinWidth + 10
    clampMaxWidth.setAttribute('min', parseInt(clampMinWidth.value) + 10);
    // set the max attribute of clampMinWidth to the value of clampMaxWidth - 10
    clampMinWidth.setAttribute('max', parseInt(clampMaxWidth.value) - 10);
    // set the min attribute of clampMaxFontSize to the value of clampMinFontSize
    clampMaxFontSize.setAttribute('min', parseInt(clampMinFontSize.value) + 1);
    // set the max attribute of clampMinFontSize to the value of clampMaxFontSize
    clampMinFontSize.setAttribute('max', parseInt(clampMaxFontSize.value) - 1);
}

updateClampOutput();


// add an event listener to clampform that checks if something changes and runs updateClampOutput()
// clampform.addEventListener('change', updateClampOutput);

// add an event listener to clampform that checks if something changes and runs updateClampOutput()
clampform.addEventListener('input', updateClampOutput);
zoomform.addEventListener('input', updateClampOutput);

// add an event listener to window resize that logs the divecePixelRatio
window.addEventListener('resize', function () {
    console.log(window.devicePixelRatio);
    // console log the window size
    console.log(window.innerWidth);
});