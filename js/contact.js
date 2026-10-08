document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const enquiryLinks =
        document.querySelectorAll(
            'a[href="#enquiry"]'
        );


    enquiryLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target =
                document.querySelector("#enquiry");

            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".contact-option, .direct-card, .enquiry-intro, .google-form-wrapper"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });



    /* =====================================================
       FORM
    ====================================================== */

    const form =
        document.querySelector("#zeagxel-form");

    const submitButton =
        document.querySelector("#submit-button");

    const errorMessage =
        document.querySelector("#form-error");

    const successScreen =
        document.querySelector("#form-success");

    const newEnquiryButton =
        document.querySelector("#new-enquiry");


    if (!form) return;



    /* =====================================================
       SUBMIT
    ====================================================== */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            errorMessage.textContent = "";


            submitButton.classList.add(
                "loading"
            );


            submitButton.querySelector(
                "span"
            ).textContent =
                "SENDING ENQUIRY...";


            try {

                const formData =
                    new FormData(form);


                const response =
                    await fetch(
                        form.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    form.style.display =
                        "none";


                    successScreen.classList.add(
                        "show"
                    );


                    successScreen.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    form.reset();


                } else {

                    const data =
                        await response.json()
                        .catch(() => null);


                    if (
                        data &&
                        data.errors &&
                        data.errors.length
                    ) {

                        errorMessage.textContent =
                            data.errors
                                .map(
                                    error =>
                                        error.message
                                )
                                .join(" ");

                    } else {

                        errorMessage.textContent =
                            "Something went wrong. Please try again.";

                    }

                }


            } catch (error) {

                console.error(
                    "Form submission error:",
                    error
                );


                errorMessage.textContent =
                    "Unable to send your enquiry right now. Please try again.";

            }


            submitButton.classList.remove(
                "loading"
            );


            submitButton.querySelector(
                "span"
            ).textContent =
                "SEND ENQUIRY";

        }
    );



    /* =====================================================
       SEND ANOTHER ENQUIRY
    ====================================================== */

    if (newEnquiryButton) {

        newEnquiryButton.addEventListener(
            "click",
            () => {

                successScreen.classList.remove(
                    "show"
                );


                form.style.display =
                    "block";


                form.reset();


                form.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );

    }


});