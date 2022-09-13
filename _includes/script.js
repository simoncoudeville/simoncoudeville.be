// create logo
// let logo = new Zdog.Illustration({
//     element: '.zdog-logo',
//     dragRotate: true
// });

// new Zdog.Shape({
//     addTo: logo,
//     path: [
//         {
//             x: 0,
//             y: -100,
//             z: 100
//         },
//         {
//             arc: [
//                 {
//                     x: -100,
//                     y: -100,
//                     z: 100
//                 }, {
//                     x: -100,
//                     y: -100,
//                     z: 0
//                 }
//             ]
//         },
//         {
//             arc: [
//                 {
//                     x: -100,
//                     y: -100,
//                     z: -100
//                 }, {
//                     x: 0,
//                     y: -100,
//                     z: -100
//                 }
//             ]
//         },
//         {
//             arc: [
//                 {
//                     x: 100,
//                     y: -100,
//                     z: -100
//                 }, {
//                     x: 100,
//                     y: 0,
//                     z: -100
//                 }
//             ]
//         }, {
//             arc: [
//                 {
//                     x: 100,
//                     y: 100,
//                     z: -100
//                 }, {
//                     x: 0,
//                     y: 100,
//                     z: -100
//                 }
//             ]
//         }, {
//             arc: [
//                 {
//                     x: -100,
//                     y: 100,
//                     z: -100
//                 }, {
//                     x: -100,
//                     y: 100,
//                     z: 0
//                 }
//             ]
//         }, {
//             arc: [
//                 {
//                     x: -100,
//                     y: 100,
//                     z: 100
//                 }, {
//                     x: 0,
//                     y: 100,
//                     z: 100
//                 }
//             ]
//         }, {
//             arc: [
//                 {
//                     x: 100,
//                     y: 100,
//                     z: 100
//                 }, {
//                     x: 100,
//                     y: 0,
//                     z: 100
//                 }
//             ]
//         }, {
//             arc: [
//                 {
//                     x: 100,
//                     y: -100,
//                     z: 100
//                 }, {
//                     x: 0,
//                     y: -100,
//                     z: 100
//                 }
//             ]
//         }
//     ],
//     closed: false
// });

// logo.rotate.x = 0.77;
// logo.rotate.y = 0.25;
// logo.updateRenderGraph();

// function animate() {
//     logo.rotate.x += 0.006;
//     logo.rotate.y += 0.009;
//     logo.updateRenderGraph();
//     requestAnimationFrame(animate);
// }

// animate();

// // speed up the animation on scroll
// window.addEventListener('scroll', function () {
//     let speed = window.scrollY / 5000;
//     logo.rotate.y += speed;
//     logo.rotate.z += speed;
//     logo.rotate.x += speed;
//     logo.updateRenderGraph();
// });

// function that checks if js-page-header-observer is in view with intersection observer and sets the class accordingly
function checkHeader() {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting === false) {
                document.querySelector('.js-page-header').classList.add('scrolled');
            } else {
                document.querySelector('.js-page-header').classList.remove('scrolled');
            }
        });
    }, {
        threshold: [0.5]
    });
    observer.observe(document.querySelector('.js-page-header-observer'));
}

// check if js-page-header-observer exists and if so run checkHeader()
if (document.querySelector('.js-page-header-observer')) {
    checkHeader();
}

// function that checks if js-article-title collides with js-page-header and sets the class of js-page-header accordingly
function checkTitle() {
    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting === false) {
                document.querySelector('.js-page-header').classList.add('title-collides');
            } else {
                document.querySelector('.js-page-header').classList.remove('title-collides');
            }
        });
    }, {
        threshold: [.5]
    });
    observer.observe(document.querySelector('.js-article-title'));
}

// check if js-article-title exists and if so run checkTitle()
if (document.querySelector('.js-article-title')) {
    checkTitle();
}
