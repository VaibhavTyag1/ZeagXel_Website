/* =====================================================
   ZEAGXEL
   MAIN JAVASCRIPT
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "ZEAGXEL — SYSTEM ONLINE"
        );


        /* =================================================
           ACTIVE NAVIGATION
        ================================================= */

        const currentPath =
            window.location.pathname;


        const navLinks =
            document.querySelectorAll(
                ".nav-links a"
            );


        navLinks.forEach(
            function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {
                    return;
                }


                if (
                    currentPath.endsWith(
                        href
                    )
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );


        /* =================================================
           HERO MOUSE MOVEMENT
        ================================================= */

        const hero =
            document.querySelector(
                ".hero"
            );


        const product =
            document.querySelector(
                ".hero-product-wrapper"
            );


        if (
            hero &&
            product &&
            window.innerWidth > 1100
        ) {


            let targetX = 0;

            let targetY = 0;

            let currentX = 0;

            let currentY = 0;


            hero.addEventListener(
                "mousemove",
                function (event) {

                    const rect =
                        hero.getBoundingClientRect();


                    const mouseX =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const mouseY =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    targetX =
                        (
                            mouseX -
                            0.5
                        ) * 7;


                    targetY =
                        (
                            mouseY -
                            0.5
                        ) * 5;

                }
            );


            function animateProduct() {


                currentX +=
                    (
                        targetX -
                        currentX
                    ) * 0.035;


                currentY +=
                    (
                        targetY -
                        currentY
                    ) * 0.035;


                product.style.setProperty(
                    "--mouse-x",
                    `${currentX}px`
                );


                product.style.setProperty(
                    "--mouse-y",
                    `${currentY}px`
                );


                requestAnimationFrame(
                    animateProduct
                );

            }


            animateProduct();

        }


    }
);
/* =========================================================
   ZEAGXEL MOVIE MODE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const trailer = document.getElementById("movieTrailer");
    const soundButton = document.getElementById("movieSound");
    const movieContainer = document.querySelector(".movie-trailer");

    if (!trailer || !soundButton || !movieContainer) {
        return;
    }

    let soundEnabled = false;

    soundButton.addEventListener("click", () => {

        if (!soundEnabled) {

            trailer.src =
                "https://www.youtube.com/embed/399Ez7WHK5s?autoplay=1&mute=0&controls=0&loop=1&playlist=399Ez7WHK5s&rel=0&modestbranding=1";

            soundButton.textContent = "SOUND OFF";

            movieContainer.classList.add("is-active");

            soundEnabled = true;

        } else {

            trailer.src =
                "https://www.youtube.com/embed/399Ez7WHK5s?autoplay=1&mute=1&controls=0&loop=1&playlist=399Ez7WHK5s&rel=0&modestbranding=1";

            soundButton.textContent = "SOUND ON";

            movieContainer.classList.remove("is-active");

            soundEnabled = false;
        }

    });

});