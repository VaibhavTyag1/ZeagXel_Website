document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const elements = document.querySelectorAll(
        `
        .philosophy-card,
        .identity-node,
        .difference-side,
        .future-card,
        .founder-content
        `
    );


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "about-reveal",
                        "revealed"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elements.forEach((element) => {

        element.classList.add("about-reveal");

        observer.observe(element);

    });



    /* =====================================================
       HERO ORBIT ANIMATION
       ===================================================== */

    const orbitOne =
        document.querySelector(".orbit-one");

    const orbitTwo =
        document.querySelector(".orbit-two");

    const orbitThree =
        document.querySelector(".orbit-three");


    let rotation = 0;


    function animateOrbits() {

        rotation += 0.08;


        if (orbitOne) {

            orbitOne.style.transform =
                `
                translate(-50%,-50%)
                rotate(${rotation}deg)
                `;

        }


        if (orbitTwo) {

            orbitTwo.style.transform =
                `
                translate(-50%,-50%)
                rotate(${-rotation * .7}deg)
                `;

        }


        if (orbitThree) {

            orbitThree.style.transform =
                `
                translate(-50%,-50%)
                rotate(${rotation * .45}deg)
                `;

        }


        requestAnimationFrame(animateOrbits);

    }


    animateOrbits();



    /* =====================================================
       HERO MARK PARALLAX
       ===================================================== */

    const heroMark =
        document.querySelector(".about-hero-mark");


    if (heroMark) {

        window.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5) * 2;


                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5) * 2;


                heroMark.style.transform =
                    `
                    translateY(-50%)
                    translate(
                        ${x * 8}px,
                        ${y * 8}px
                    )
                    `;

            }
        );

    }



    /* =====================================================
       IDENTITY NODES
       ===================================================== */

    const nodes =
        document.querySelectorAll(
            ".identity-node"
        );


    nodes.forEach((node, index) => {

        node.style.transitionDelay =
            `${index * 120}ms`;

    });



    /* =====================================================
       SMOOTH INTERNAL LINKS
       ===================================================== */

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });

});