// ==========================================
// SITE DE RADIOLOGIA - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MENU MOBILE
    // ==========================================

    const menuButton = document.querySelector(".menu-button");
    const navMenu = document.querySelector(".nav-menu");

    if (menuButton && navMenu) {
        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }
        });

        // Fecha o menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                menuButton.innerHTML = "☰";
            });
        });
    }


    // ==========================================
    // SCROLL SUAVE
    // ==========================================

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // ==========================================
    // BOTÃO VOLTAR AO TOPO
    // ==========================================

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // ==========================================
    // ANIMAÇÃO DOS ELEMENTOS AO APARECEREM
    // ==========================================

    const animatedElements = document.querySelectorAll(
        ".animate, .card, .exam-card, .info-box, .principle"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });


    // ==========================================
    // BOTÕES "SAIBA MAIS"
    // ==========================================

    const buttons = document.querySelectorAll(".btn-saiba-mais");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.getAttribute("data-target");
            const target = document.getElementById(targetId);

            if (target) {

                target.classList.toggle("expanded");

                if (target.classList.contains("expanded")) {
                    button.textContent = "Mostrar menos";
                } else {
                    button.textContent = "Saiba mais";
                }
            }

        });

    });


    // ==========================================
    // MODAL PARA EXAMES
    // ==========================================

    const examCards = document.querySelectorAll(".exam-card");

    const modal = document.querySelector(".exam-modal");
    const modalTitle = document.querySelector(".modal-title");
    const modalDescription = document.querySelector(".modal-description");
    const modalImage = document.querySelector(".modal-image");
    const modalClose = document.querySelector(".modal-close");

    examCards.forEach(card => {

        card.addEventListener("click", () => {

            const title = card.dataset.title;
            const description = card.dataset.description;
            const image = card.dataset.image;

            if (modal) {

                modalTitle.textContent = title || "Exame radiológico";

                modalDescription.textContent =
                    description ||
                    "Informações sobre o exame radiológico.";

                if (image && modalImage) {
                    modalImage.src = image;
                    modalImage.alt = `Radiografia de ${title}`;
                }

                modal.classList.add("active");

                document.body.style.overflow = "hidden";
            }

        });

    });


    // Fechar modal

    if (modalClose) {

        modalClose.addEventListener("click", fecharModal);

    }

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {
                fecharModal();
            }

        });

    }


    function fecharModal() {

        if (modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }

    }


    // Fechar modal com ESC

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            fecharModal();
        }

    });


    // ==========================================
    // FILTRO DE EXAMES
    // ==========================================

    const searchInput = document.querySelector("#examSearch");

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            const search = searchInput.value.toLowerCase().trim();

            examCards.forEach(card => {

                const title =
                    card.dataset.title?.toLowerCase() || "";

                const text =
                    card.textContent.toLowerCase();

                if (
                    title.includes(search) ||
                    text.includes(search)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    // ==========================================
    // MODO ESCURO
    // ==========================================

    const darkModeButton =
        document.querySelector("#darkMode");

    if (darkModeButton) {

        // Verifica preferência salva
        const darkMode =
            localStorage.getItem("darkMode");

        if (darkMode === "enabled") {
            document.body.classList.add("dark-mode");
            darkModeButton.textContent = "☀️";
        }


        darkModeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {

                localStorage.setItem(
                    "darkMode",
                    "enabled"
                );

                darkModeButton.textContent = "☀️";

            } else {

                localStorage.setItem(
                    "darkMode",
                    "disabled"
                );

                darkModeButton.textContent = "🌙";

            }

        });

    }


    // ==========================================
    // INDICADOR DE PROGRESSO DA PÁGINA
    // ==========================================

    const progressBar =
        document.querySelector(".progress-bar");

    if (progressBar) {

        window.addEventListener("scroll", () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percentage =
                (scrollTop / documentHeight) * 100;

            progressBar.style.width =
                `${percentage}%`;

        });

    }


    // ==========================================
    // CONTADOR ANIMADO
    // ==========================================

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.dataset.target
                        );

                    let current = 0;

                    const increment =
                        Math.ceil(target / 100);

                    const updateCounter = () => {

                        current += increment;

                        if (current >= target) {

                            counter.textContent =
                                target;

                        } else {

                            counter.textContent =
                                current;

                            requestAnimationFrame(
                                updateCounter
                            );

                        }

                    };

                    updateCounter();

                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    // ==========================================
    // ABAS DE CONTEÚDO
    // ==========================================

    const tabButtons =
        document.querySelectorAll(".tab-button");

    const tabContents =
        document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target =
                button.dataset.tab;

            tabButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            tabContents.forEach(content => {
                content.classList.remove("active");
            });

            button.classList.add("active");

            const selectedContent =
                document.getElementById(target);

            if (selectedContent) {
                selectedContent.classList.add("active");
            }

        });

    });


    // ==========================================
    // ACCORDION - PERGUNTAS FREQUENTES
    // ==========================================

    const accordionItems =
        document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {

        const question =
            item.querySelector(".accordion-question");

        if (question) {

            question.addEventListener("click", () => {

                const isActive =
                    item.classList.contains("active");

                // Fecha todos
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove("active");
                });

                // Abre o selecionado
                if (!isActive) {
                    item.classList.add("active");
                }

            });

        }

    });


    // ==========================================
    // FORMULÁRIO DE CONTATO
    // ==========================================

    const contactForm =
        document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.querySelector("#name")?.value.trim();

            const email =
                document.querySelector("#email")?.value.trim();

            const message =
                document.querySelector("#message")?.value.trim();

            if (!name || !email || !message) {

                mostrarMensagem(
                    "Preencha todos os campos.",
                    "error"
                );

                return;
            }


            // Verificação simples de e-mail
            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                mostrarMensagem(
                    "Digite um e-mail válido.",
                    "error"
                );

                return;
            }


            mostrarMensagem(
                "Mensagem enviada com sucesso!",
                "success"
            );

            contactForm.reset();

        });

    }


    // ==========================================
    // SISTEMA DE MENSAGENS
    // ==========================================

    function mostrarMensagem(texto, tipo) {

        let messageBox =
            document.querySelector(".message-box");

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "message-box";

            document.body.appendChild(
                messageBox
            );

        }

        messageBox.textContent = texto;

        messageBox.className =
            `message-box ${tipo} show`;

        setTimeout(() => {

            messageBox.classList.remove("show");

        }, 4000);

    }


    // ==========================================
    // EFEITO DE DIGITAÇÃO
    // ==========================================

    const typingElement =
        document.querySelector(".typing");

    if (typingElement) {

        const text =
            typingElement.dataset.text ||
            typingElement.textContent;

        typingElement.textContent = "";

        let index = 0;

        function typeWriter() {

            if (index < text.length) {

                typingElement.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(
                    typeWriter,
                    70
                );

            }

        }

        typeWriter();

    }


    // ==========================================
    // HIGHLIGHT DO MENU CONFORME A SEÇÃO
    // ==========================================

    const sections =
        document.querySelectorAll("section[id]");

    const menuLinks =
        document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        menuLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    });


    // ==========================================
    // EFEITO PARALLAX NO HERO
    // ==========================================

    const hero =
        document.querySelector(".hero");

    if (hero) {

        window.addEventListener("scroll", () => {

            const scroll =
                window.scrollY;

            hero.style.backgroundPosition =
                `center ${scroll * 0.4}px`;

        });

    }


    // ==========================================
    // BOTÃO DE IMPRIMIR
    // ==========================================

    const printButton =
        document.querySelector("#printPage");

    if (printButton) {

        printButton.addEventListener(
            "click",
            () => {
                window.print();
            }
        );

    }


    // ==========================================
    // DATA ATUAL NO RODAPÉ
    // ==========================================

    const yearElement =
        document.querySelector("#currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    // ==========================================
    // EFEITO HOVER NOS CARDS
    // ==========================================

    const cards =
        document.querySelectorAll(".card, .exam-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    console.log(
        "Sistema de Radiologia carregado com sucesso."
    );

});
