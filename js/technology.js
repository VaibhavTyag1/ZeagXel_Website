/* =========================================================
   ZEAGXEL TECHNOLOGY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".architecture-card, .core-card, .flow-item, .principle"
    );


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("technology-reveal");

        revealObserver.observe(element);

    });



    /* =====================================================
       SYSTEM BOARD PARALLAX
       ===================================================== */

    const board = document.querySelector(".system-board");


    if (board) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 2;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 2;


            board.style.transform =
                `rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;

        });

    }



    /* =====================================================
       BOARD DEVICE ANIMATION
       ===================================================== */

    const devices =
        document.querySelectorAll(".board-device");


    if (devices.length) {

        let activeIndex = 0;


        setInterval(() => {

            devices.forEach((device) => {

                device.classList.remove("active");

            });


            devices[activeIndex].classList.add("active");


            activeIndex++;

            if (activeIndex >= devices.length) {

                activeIndex = 0;

            }

        }, 1800);

    }



    /* =====================================================
       SMOOTH INTERNAL LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (!targetId || targetId === "#") {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


});