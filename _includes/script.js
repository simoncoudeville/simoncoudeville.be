// create logo
let logo = new Zdog.Illustration({ // set canvas with selector
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
logo.updateRenderGraph();
function animate() {
    logo.rotate.x += 0.006;
    logo.rotate.y += 0.009;
    // logo.rotate.z += 0.01;
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
});