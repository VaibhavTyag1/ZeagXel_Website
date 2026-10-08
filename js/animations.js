/* =====================================================
   ZEAGXEL
   SECTION ANIMATIONS
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const lightingControl = document.querySelector(".lighting-control");

        const productClock = document.querySelector(".product-clock");
        if (productClock) {
            const clockFormatter = new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });

            const updateProductClock = function () {
                const now = new Date();
                productClock.textContent = clockFormatter.format(now);
                productClock.dateTime = now.toISOString();
            };

            updateProductClock();
            window.setInterval(updateProductClock, 1000);
        }

        if (lightingControl) {
            lightingControl.addEventListener("click", function () {
                const lightsOn = lightingControl.getAttribute("aria-pressed") !== "true";
                lightingControl.setAttribute("aria-pressed", String(lightsOn));
                document.body.classList.toggle("lights-on", lightsOn);

                const status = lightingControl.querySelector("small");
                if (status) status.textContent = lightsOn ? "4 ON" : "4 OFF";
            });
        }

        const climateControl = document.querySelector(".climate-control");
        let snowfall = null;

        if (climateControl) {
            climateControl.addEventListener("click", function () {
                const climateOn = climateControl.getAttribute("aria-pressed") !== "true";
                climateControl.setAttribute("aria-pressed", String(climateOn));
                const status = climateControl.querySelector("small");

                if (climateOn) {
                    snowfall = document.createElement("div");
                    snowfall.className = "climate-snowfall";
                    snowfall.setAttribute("aria-hidden", "true");

                    for (let i = 0; i < 42; i += 1) {
                        const flake = document.createElement("span");
                        flake.className = "climate-snowflake";
                        flake.textContent = Math.random() > 0.5 ? "❄" : "✻";
                        flake.style.setProperty("--snow-x", Math.random() * 100 + "vw");
                        flake.style.setProperty("--snow-size", 10 + Math.random() * 15 + "px");
                        flake.style.setProperty("--snow-duration", 7 + Math.random() * 9 + "s");
                        flake.style.setProperty("--snow-delay", -Math.random() * 12 + "s");
                        flake.style.setProperty("--snow-drift", -70 + Math.random() * 140 + "px");
                        snowfall.appendChild(flake);
                    }

                    document.body.appendChild(snowfall);
                    if (status) status.textContent = "SNOWING";
                } else {
                    if (snowfall) snowfall.remove();
                    snowfall = null;
                    if (status) status.textContent = "24°C";
                }
            });
        }

        const securityControl = document.querySelector(".security-control");
        if (securityControl) {
            let hasDeniedAccess = false;
            let accessGranted = false;
            let securityBusy = false;
            let securityAlert = null;

            const showSecurityAlert = function (granted) {
                if (securityAlert) securityAlert.remove();
                securityAlert = document.createElement("div");
                securityAlert.className = "security-alert" + (granted ? " granted" : "");
                securityAlert.setAttribute("role", "status");
                securityAlert.setAttribute("aria-live", "assertive");

                const panel = document.createElement("div");
                panel.className = "security-alert-panel";
                panel.textContent = granted ? "ACCESS GRANTED" : "ACCESS DENIED";
                securityAlert.appendChild(panel);
                document.body.appendChild(securityAlert);
            };

            securityControl.addEventListener("click", function () {
                if (securityBusy) return;

                const status = securityControl.querySelector("small");
                if (accessGranted) {
                    accessGranted = false;
                    hasDeniedAccess = false;
                    securityControl.setAttribute("aria-pressed", "false");
                    if (status) status.textContent = "ARMED";
                    return;
                }

                const granted = hasDeniedAccess;
                hasDeniedAccess = true;
                securityBusy = true;
                if (granted) {
                    accessGranted = true;
                    securityControl.setAttribute("aria-pressed", "true");
                    if (status) status.textContent = "ACCESS GRANTED";
                } else if (status) {
                    status.textContent = "ACCESS DENIED";
                }

                showSecurityAlert(granted);
                window.setTimeout(function () {
                    if (securityAlert) securityAlert.remove();
                    securityAlert = null;
                    securityBusy = false;
                    if (!accessGranted && status) status.textContent = "ARMED";
                }, 3000);
            });
        }

        /* =================================================
           SCROLL REVEAL
        ================================================= */

        const revealSelectors = [

            ".intelligence-section .section-eyebrow",

            ".intelligence-section h2",

            ".intelligence-section .section-line",

            ".intelligence-pillar",

            ".how-intro .section-eyebrow",

            ".how-intro h2",

            ".how-intro p",

            ".system-step",

            ".how-closing"

        ];


        const revealElements = [];


        revealSelectors.forEach(
            function (selector) {

                document
                    .querySelectorAll(selector)
                    .forEach(
                        function (element) {

                            revealElements.push(
                                element
                            );

                        }
                    );

            }
        );


        /* =================================================
           INTERSECTION OBSERVER
        ================================================= */

        if (
            "IntersectionObserver"
            in window
        ) {


            const observer =
                new IntersectionObserver(
                    function (
                        entries,
                        observerInstance
                    ) {


                        entries.forEach(
                            function (entry) {


                                if (
                                    entry.isIntersecting
                                ) {


                                    entry.target.classList.add(
                                        "is-visible"
                                    );


                                    observerInstance.unobserve(
                                        entry.target
                                    );


                                }


                            }
                        );


                    },
                    {
                        threshold: 0.12,

                        rootMargin:
                            "0px 0px -40px 0px"

                    }
                );


            revealElements.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );


        }
        else {


            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );


        }

        // Carry the homepage's hero entrance and scroll reveal motion to inner pages.
        if (!document.querySelector(".hero")) {
            const pageHero = document.querySelector("main > section:first-child");
            if (pageHero) {
                pageHero.querySelectorAll("h1, p, .gold-button, .hero-scroll, .technology-scroll")
                    .forEach(function (element, index) {
                        element.classList.add("site-hero-entrance");
                        element.style.setProperty("--entrance-delay", (index * 110) + "ms");
                    });
            }

            const pageRevealElements = document.querySelectorAll(
                "main > section:not(:first-child) h2, " +
                "main > section:not(:first-child) .section-eyebrow, " +
                "main > section:not(:first-child) .section-label, " +
                ".about-reveal, .builder-reveal, .technology-reveal, .reveal"
            );

            if ("IntersectionObserver" in window) {
                const pageRevealObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add("site-scroll-reveal", "is-visible");
                        observer.unobserve(entry.target);
                    });
                }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

                pageRevealElements.forEach(function (element, index) {
                    element.classList.add("site-scroll-reveal");
                    if (index % 2 === 1) element.classList.add("site-scroll-reveal-reverse");
                    pageRevealObserver.observe(element);
                });
            } else {
                pageRevealElements.forEach(function (element) {
                    element.classList.add("site-scroll-reveal", "is-visible");
                });
            }
        }


        /* =================================================
           SMOOTH INTERNAL LINKS
        ================================================= */

        const internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        internalLinks.forEach(
            function (link) {


                link.addEventListener(
                    "click",
                    function (event) {


                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            target
                        ) {


                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "start"

                                }
                            );


                        }


                    }
                );


            }
        );


        /* =================================================
           SYSTEM VISUAL INTERACTION
        ================================================= */

        const intelligenceCore =
            document.querySelector(
                ".intelligence-core"
            );


        const experienceOrbit =
            document.querySelector(
                ".experience-orbit"
            );


        if (
            intelligenceCore
        ) {

            intelligenceCore.addEventListener(
                "mouseenter",
                function () {

                    intelligenceCore.style.transform =
                        "scale(1.04)";

                }
            );


            intelligenceCore.addEventListener(
                "mouseleave",
                function () {

                    intelligenceCore.style.transform =
                        "scale(1)";

                }
            );

        }


        if (
            experienceOrbit
        ) {

            experienceOrbit.addEventListener(
                "mouseenter",
                function () {

                    experienceOrbit.style.transform =
                        "scale(1.04)";

                }
            );


            experienceOrbit.addEventListener(
                "mouseleave",
                function () {

                    experienceOrbit.style.transform =
                        "scale(1)";

                }
            );

        }


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        if (
            prefersReducedMotion.matches
        ) {

            document
                .querySelectorAll(
                    ".intelligence-section *, .how-section *"
                )
                .forEach(
                    function (element) {

                        element.classList.add(
                            "is-visible"
                        );

                    }
                );

        }


    }
);
