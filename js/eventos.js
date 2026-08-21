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

      <div id="eventos-container"></div>
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
});
