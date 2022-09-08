// create logo
let logo = new Zdog.Illustration({
    element: '.zdog-logo',
    dragRotate: true
});

new Zdog.Shape({
    addTo: logo,
    path: [
        {
            x: 0,
            y: -100,
            z: 100
        },
        {
            arc: [
                {
                    x: -100,
                    y: -100,
                    z: 100
                }, {
                    x: -100,
                    y: -100,
                    z: 0
                }
            ]
        },
        {
            arc: [
                {
                    x: -100,
                    y: -100,
                    z: -100
                }, {
                    x: 0,
                    y: -100,
                    z: -100
                }
            ]
        },
        {
            arc: [
                {
                    x: 100,
                    y: -100,
                    z: -100
                }, {
                    x: 100,
                    y: 0,
                    z: -100
                }
            ]
        }, {
            arc: [
                {
                    x: 100,
                    y: 100,
                    z: -100
                }, {
                    x: 0,
                    y: 100,
                    z: -100
                }
            ]
        }, {
            arc: [
                {
                    x: -100,
                    y: 100,
                    z: -100
                }, {
                    x: -100,
                    y: 100,
                    z: 0
                }
            ]
        }, {
            arc: [
                {
                    x: -100,
                    y: 100,
                    z: 100
                }, {
                    x: 0,
                    y: 100,
                    z: 100
                }
            ]
        }, {
            arc: [
                {
                    x: 100,
                    y: 100,
                    z: 100
                }, {
                    x: 100,
                    y: 0,
                    z: 100
                }
            ]
        }, {
            arc: [
                {
                    x: 100,
                    y: -100,
                    z: 100
                }, {
                    x: 0,
                    y: -100,
                    z: 100
                }
            ]
        }
    ],
    closed: false
});

logo.rotate.x = 0.77;
logo.rotate.y = 0.25;
logo.updateRenderGraph();

function animate() {
    logo.rotate.x += 0.006;
    logo.rotate.y += 0.009;
    logo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();

// speed up the animation on scroll
window.addEventListener('scroll', function () {
    let speed = window.scrollY / 5000;
    logo.rotate.y += speed;
    logo.rotate.z += speed;
    logo.rotate.x += speed;
    logo.updateRenderGraph();

    // check if the page is scrolled to the top and add a class to the logo if it is not
    // if (window.scrollY > 0) {
    //     document.querySelector('.zdog-logo').classList.add('scrolled');
    // } else {
    //     document.querySelector('.zdog-logo').classList.remove('scrolled');
    // }
});