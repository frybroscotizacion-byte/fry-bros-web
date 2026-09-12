document.addEventListener("DOMContentLoaded", () => {
  const montaje = document.querySelector("#eventos");

  if (!montaje) {
    console.error("Fry Bros: no existe #eventos en index.html");
    return;
  }

  if (typeof eventos === "undefined") {
    console.error("Fry Bros: no se pudo cargar data/eventos.js");
    return;
  }

  montaje.innerHTML = `
    <section class="eventos-frybros">
      <div class="eventos-encabezado">
        <span class="eventos-etiqueta">
          FRY BROS EN ACCIÓN
        </span>

        <h2>Eventos destacados</h2>

        <p>
          Algunos momentos de Fry Bros preparando y compartiendo
          en distintos eventos.
        </p>
      </div>

      <div class="eventos-carrusel">
        <div
          id="eventos-container"
          tabindex="0"
          aria-label="Galería de eventos destacados"
        ></div>

        <div class="eventos-controles" aria-label="Controles de galería">
          <button class="evento-flecha" type="button" data-direccion="anterior" aria-label="Ver fotos anteriores">←</button>
          <button class="evento-flecha" type="button" data-direccion="siguiente" aria-label="Ver más fotos">→</button>
        </div>
      </div>
    </section>
  `;

  const contenedor = montaje.querySelector("#eventos-container");

  eventos.forEach((evento) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "evento-card";

    tarjeta.innerHTML = `
      <div class="evento-imagen">
        <img
          src="${evento.imagen}"
          alt="${evento.titulo}"
          loading="lazy"
        >
      </div>

      <div class="evento-contenido">
        <h3>${evento.titulo}</h3>
        <p>${evento.descripcion}</p>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });

  const desplazarGaleria = (direccion) => {
    const tarjeta = contenedor.querySelector(".evento-card");
    const distancia = tarjeta ? tarjeta.getBoundingClientRect().width + 20 : 320;

    contenedor.scrollBy({
      left: direccion === "siguiente" ? distancia : -distancia,
      behavior: "smooth"
    });
  };

  montaje.querySelectorAll(".evento-flecha").forEach((boton) => {
    boton.addEventListener("click", () => desplazarGaleria(boton.dataset.direccion));
  });

  let inicioX = 0;
  let desplazamientoInicial = 0;

  contenedor.addEventListener("pointerdown", (evento) => {
    inicioX = evento.clientX;
    desplazamientoInicial = contenedor.scrollLeft;
    contenedor.classList.add("arrastrando");
    contenedor.setPointerCapture(evento.pointerId);
  });

  contenedor.addEventListener("pointermove", (evento) => {
    if (!contenedor.classList.contains("arrastrando")) return;
    contenedor.scrollLeft = desplazamientoInicial - (evento.clientX - inicioX);
  });

  const terminarArrastre = () => contenedor.classList.remove("arrastrando");
  contenedor.addEventListener("pointerup", terminarArrastre);
  contenedor.addEventListener("pointercancel", terminarArrastre);
});
