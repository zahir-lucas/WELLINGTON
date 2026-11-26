// Wellington Móveis Planejados - comportamentos da página
(function () {
  "use strict";

  // Avisa o CSS que o JavaScript está funcionando.
  // Assim, as animações só escondem elementos se o JS puder mostrá-los depois.
  document.documentElement.classList.add("js");

  // ---------- Ano atual no rodapé ----------
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // ---------- Cabeçalho ganha fundo ao rolar ----------
  var header = document.querySelector(".header");
  function atualizarCabecalho() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  atualizarCabecalho();
  window.addEventListener("scroll", atualizarCabecalho, { passive: true });

  // ---------- Elementos aparecem suavemente ao entrar na tela ----------
  var itens = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observador.unobserve(entrada.target); // anima só uma vez
        }
      });
    }, { threshold: 0.12 });
    itens.forEach(function (el) { observador.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---------- Vídeo do topo: pausa para quem prefere menos movimento ----------
  var video = document.querySelector(".hero__video");
  if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    video.removeAttribute("autoplay");
    video.pause();
  }

  // ---------- Galeria: clicar na foto abre ampliada ----------
  var lightbox = document.getElementById("lightbox");
  if (lightbox && typeof lightbox.showModal === "function") {
    var imgGrande = lightbox.querySelector("img");

    document.querySelectorAll(".gallery__item").forEach(function (botao) {
      botao.addEventListener("click", function () {
        var miniatura = botao.querySelector("img");
        imgGrande.src = botao.dataset.full;
        imgGrande.alt = miniatura.alt;
        lightbox.showModal();
      });
    });

    lightbox.querySelector(".lightbox__close").addEventListener("click", function () {
      lightbox.close();
    });
    // Clicar fora da foto também fecha
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.close();
    });
  }
})();
