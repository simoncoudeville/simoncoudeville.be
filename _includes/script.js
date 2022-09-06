// create illo
let illo = new Zdog.Illustration({ // set canvas with selector
    element: '.zdog-canvas',
    dragRotate: true
});
new Zdog.Shape({
    addTo: illo,
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
illo.updateRenderGraph();
function animate() {
    illo.rotate.x += 0.003;
    illo.rotate.y += 0.006;
    illo.rotate.z += 0.009;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}
animate();
// speed up the animation on scroll
window.addEventListener('scroll', function () {
    let speed = window.scrollY / 5000;
    illo.rotate.y += speed;
    illo.rotate.z += speed;
    illo.rotate.x += speed;
    illo.updateRenderGraph();
});