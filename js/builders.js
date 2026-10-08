document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    const elements = document.querySelectorAll(
        `
        .builder-value-card,
        .offering-card,
        .package-card,
        .society-package,
        .comparison-row,
        .benefit,
        .deployment-step,
        .partnership-options div
        `
    );


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    elements.forEach((element) => {

        element.classList.add("builder-reveal");

        observer.observe(element);

    });



    /* =====================================================
       BUILDING PARALLAX
       ===================================================== */

    const building =
        document.querySelector(".building-frame");


    if (building) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 2;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 2;


            building.style.transform =
                `
                rotateY(${-x * 4}deg)
                rotateX(${y * 3}deg)
                `;

        });

    }



    /* =====================================================
       BUILDING FLOOR ANIMATION
       ===================================================== */

    const floors =
        document.querySelectorAll(".building-floor");


    if (floors.length) {

        let activeFloor = 0;


        setInterval(() => {

            floors.forEach((floor) => {

                floor.style.borderColor =
                    "#252a2e";

                floor.style.boxShadow =
                    "none";

            });


            floors[activeFloor].style.borderColor =
                "rgba(201,150,54,.5)";


            floors[activeFloor].style.boxShadow =
                "0 0 35px rgba(201,150,54,.06)";


            activeFloor++;


            if (activeFloor >= floors.length) {

                activeFloor = 0;

            }

        }, 1700);

    }



    /* =====================================================
       PACKAGE HOVER
       ===================================================== */

    const packages =
        document.querySelectorAll(".package-card");


    packages.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            packages.forEach((other) => {

                if (other !== card) {

                    other.style.opacity = "0.65";

                }

            });

        });


        card.addEventListener("mouseleave", () => {

            packages.forEach((other) => {

                other.style.opacity = "1";

            });

        });

    });



    /* =====================================================
       SMOOTH LINKS
       ===================================================== */

    const links =
        document.querySelectorAll('a[href^="#"]');


    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const id =
                link.getAttribute("href");


            const target =
                document.querySelector(id);


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



    /* =====================================================
       PRICE GLOW
       ===================================================== */

    const prices =
        document.querySelectorAll(".package-price strong");


    prices.forEach((price) => {

        price.addEventListener("mouseenter", () => {

            price.style.textShadow =
                "0 0 30px rgba(216,163,63,.3)";

        });


        price.addEventListener("mouseleave", () => {

            price.style.textShadow =
                "none";

        });

    });

});