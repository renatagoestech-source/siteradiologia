// =============================================
// SITE DE RADIOLOGIA
// JAVASCRIPT PRINCIPAL
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("JavaScript carregado com sucesso!");

    // =============================================
    // 1. MENU MOBILE
    // =============================================

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", function () {

            navMenu.classList.toggle("active");

        });

    }


    // =============================================
    // 2. ROLAGEM SUAVE DO MENU
    // =============================================

    const menuLinks = document.querySelectorAll("a[href^='#']");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const destino = link.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const elemento = document.querySelector(destino);

            if (elemento) {

                event.preventDefault();

                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Fecha menu mobile
                if (navMenu) {
                    navMenu.classList.remove("active");
                }

            }

        });

    });


    // =============================================
    // 3. BOTÃO VOLTAR AO TOPO
    // =============================================

    const voltarTopo = document.getElementById("voltarTopo");

    if (voltarTopo) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {

                voltarTopo.classList.add("mostrar");

            } else {

                voltarTopo.classList.remove("mostrar");

            }

        });


        voltarTopo.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =============================================
    // 4. MODO ESCURO
    // =============================================

    const botaoTema = document.getElementById("botaoTema");

    if (botaoTema) {

        // Recupera configuração salva
        const temaSalvo = localStorage.getItem("tema");

        if (temaSalvo === "escuro") {

            document.body.classList.add("modo-escuro");

            botaoTema.textContent = "☀️";

        }


        botaoTema.addEventListener("click", function () {

            document.body.classList.toggle("modo-escuro");

            if (
                document.body.classList.contains("modo-escuro")
            ) {

                localStorage.setItem("tema", "escuro");

                botaoTema.textContent = "☀️";

            } else {

                localStorage.setItem("tema", "claro");

                botaoTema.textContent = "🌙";

            }

        });

    }


    // =============================================
    // 5. ANIMAÇÃO AO ROLAR A PÁGINA
    // =============================================

    const elementosAnimados =
        document.querySelectorAll(".animar");

    if (elementosAnimados.length > 0) {

        const observador =
            new IntersectionObserver(function (entradas) {

                entradas.forEach(function (entrada) {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("visivel");

                    }

                });

            }, {
                threshold: 0.15
            });


        elementosAnimados.forEach(function (elemento) {

            observador.observe(elemento);

        });

    }


    // =============================================
    // 6. MODAL DOS EXAMES
    // =============================================

    const modal = document.getElementById("modalExame");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");
    const modalImagem = document.getElementById("modalImagem");
    const fecharModal = document.getElementById("fecharModal");

    const botoesExames =
        document.querySelectorAll(".botao-exame");


    botoesExames.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const titulo =
                botao.getAttribute("data-titulo");

            const texto =
                botao.getAttribute("data-texto");

            const imagem =
                botao.getAttribute("data-imagem");


            if (modalTitulo) {
                modalTitulo.textContent =
                    titulo || "Exame radiológico";
            }


            if (modalTexto) {
                modalTexto.textContent =
                    texto || "Informações sobre o exame.";
            }


            if (modalImagem && imagem) {

                modalImagem.src = imagem;

                modalImagem.alt =
                    titulo || "Radiografia";

            }


            if (modal) {

                modal.classList.add("aberto");

                document.body.style.overflow = "hidden";

            }

        });

    });


    // Fechar modal pelo X

    if (fecharModal) {

        fecharModal.addEventListener("click", function () {

            fecharJanelaExame();

        });

    }


    // Fechar modal clicando fora

    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {

                fecharJanelaExame();

            }

        });

    }


    // Fechar modal apertando ESC

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            fecharJanelaExame();

        }

    });


    function fecharJanelaExame() {

        if (modal) {

            modal.classList.remove("aberto");

            document.body.style.overflow = "";

        }

    }


    // =============================================
    // 7. FILTRO / PESQUISA DE EXAMES
    // =============================================

    const campoPesquisa =
        document.getElementById("pesquisaExame");

    const cardsExames =
        document.querySelectorAll(".exame-card");


    if (campoPesquisa) {

        campoPesquisa.addEventListener("input", function () {

            const pesquisa =
                campoPesquisa.value.toLowerCase().trim();


            cardsExames.forEach(function (card) {

                const texto =
                    card.textContent.toLowerCase();


                if (texto.includes(pesquisa)) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }


    // =============================================
    // 8. FAQ / PERGUNTAS FREQUENTES
    // =============================================

    const perguntas =
        document.querySelectorAll(".pergunta");


    perguntas.forEach(function (pergunta) {

        pergunta.addEventListener("click", function () {

            const resposta =
                pergunta.nextElementSibling;


            pergunta.classList.toggle("ativa");


            if (resposta) {

                if (resposta.style.display === "block") {

                    resposta.style.display = "none";

                } else {

                    resposta.style.display = "block";

                }

            }

        });

    });


    // =============================================
    // 9. ANO AUTOMÁTICO DO RODAPÉ
    // =============================================

    const ano =
        document.getElementById("anoAtual");


    if (ano) {

        ano.textContent =
            new Date().getFullYear();

    }


    // =============================================
    // 10. BOTÃO IMPRIMIR
    // =============================================

    const imprimir =
        document.getElementById("imprimir");


    if (imprimir) {

        imprimir.addEventListener("click", function () {

            window.print();

        });

    }


});
