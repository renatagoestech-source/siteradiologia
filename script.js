// ==========================================
// MENU MOBILE
// ==========================================

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }
    });

    // Fecha o menu ao clicar em algum link
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuButton.textContent = "☰";
        });
    });
}


// ==========================================
// ANO AUTOMÁTICO DO FOOTER
// ==========================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==========================================
// MODAL DAS IMAGENS DE RAIO-X
// ==========================================

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

const imageButtons = document.querySelectorAll(".image-button");

imageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const image = button.getAttribute("data-image");
        const title = button.getAttribute("data-title");

        if (!modal || !modalImage) return;

        modalImage.src = image;
        modalImage.alt = title;

        if (modalTitle) {
            modalTitle.textContent = title;
        }

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    });

});


// ==========================================
// FUNÇÃO PARA FECHAR MODAL
// ==========================================

function closeModal() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    if (modalImage) {
        modalImage.src = "";
    }
}


// Botão X

if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeModal
    );
}


// Clique fora da imagem

if (modal) {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });

}


// Tecla ESC

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
    ) {

        closeModal();

    }

});


// ==========================================
// ANIMAÇÃO DOS ELEMENTOS
// ==========================================

const animatedElements = document.querySelectorAll(
    ".concept-card, " +
    ".projection, " +
    ".anatomy-card, " +
    ".gallery-card, " +
    ".check-item"
);


const animationObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                animationObserver.unobserve(
                    entry.target
                );

            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    animationObserver.observe(element);

});


// ==========================================
// HEADER AO ROLAR A PÁGINA
// ==========================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

backToTop.setAttribute(
    "aria-label",
    "Voltar ao topo"
);

document.body.appendChild(backToTop);


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

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


// ==========================================
// FILTRO DAS INCIDÊNCIAS
// ==========================================

const projectionItems =
    document.querySelectorAll(".projection");


function filterProjections(searchTerm) {

    projectionItems.forEach((item) => {

        const text =
            item.textContent.toLowerCase();

        const search =
            searchTerm.toLowerCase();

        if (text.includes(search)) {

            item.style.display = "grid";

        } else {

            item.style.display = "none";

        }

    });

}


// ==========================================
// CRIAR CAMPO DE BUSCA
// ==========================================

const projectionSection =
    document.querySelector(".projections-section");


if (projectionSection) {

    const searchContainer =
        document.createElement("div");

    searchContainer.className =
        "projection-search";


    const searchInput =
        document.createElement("input");

    searchInput.type = "text";

    searchInput.placeholder =
        "Pesquisar incidência...";

    searchInput.setAttribute(
        "aria-label",
        "Pesquisar incidência"
    );


    searchContainer.appendChild(
        searchInput
    );


    const heading =
        projectionSection.querySelector(
            ".section-heading"
        );


    if (heading) {

        heading.after(
            searchContainer
        );

    }


    searchInput.addEventListener(
        "input",
        (event) => {

            filterProjections(
                event.target.value
            );

        }
    );

}


// ==========================================
// DESTAQUE DO MENU ATIVO
// ==========================================

const sections =
    document.querySelectorAll("section[id]");

const menuLinks =
    document.querySelectorAll(".nav a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

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


    menuLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ==========================================
// EFEITO DE DIGITAÇÃO NO HERO
// ==========================================

const heroStrong =
    document.querySelector(".hero h1 strong");


if (heroStrong) {

    const originalText =
        heroStrong.textContent.trim();

    heroStrong.textContent = "";

    let index = 0;


    function typeEffect() {

        if (index < originalText.length) {

            heroStrong.textContent +=
                originalText.charAt(index);

            index++;

            setTimeout(
                typeEffect,
                80
            );

        }

    }


    setTimeout(
        typeEffect,
        600
    );

}


// ==========================================
// CONTADOR DOS CONCEITOS
// ==========================================

const conceptCards =
    document.querySelectorAll(".concept-card");


conceptCards.forEach((card, index) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-6px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});


// ==========================================
// MENSAGEM NO CONSOLE
// ==========================================

console.log(
    "Radiologia | Guia de Estudos carregado com sucesso."
);

console.log(
    "Site desenvolvido para fins educacionais."
);
