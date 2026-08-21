document.addEventListener("DOMContentLoaded", () => {
  const montaje = document.querySelector("#servicios");

  if (!montaje) {
    console.error("Fry Bros: no existe #servicios en index.html");
    return;
  }

  if (typeof servicios === "undefined") {
    console.error("Fry Bros: no se pudo cargar data/servicios.js");
    return;
  }

  montaje.innerHTML = `
    <section class="servicios-frybros">

      <div class="servicios-encabezado">
        <span class="servicios-etiqueta">
          NUESTROS SERVICIOS
        </span>

        <h2>¿Qué cocinamos?</h2>

        <p>
          Elige entre nuestras opciones preparadas al momento
          para disfrutar junto a tus invitados.
        </p>
      </div>

      <div id="servicios-container"></div>

    </section>
  `;

  const contenedor = montaje.querySelector("#servicios-container");

  servicios.forEach((servicio) => {
    const tarjeta = document.createElement("article");

    tarjeta.className = "servicio-card";

    tarjeta.innerHTML = `
      <a href="${servicio.pagina}" class="servicio-link">

        <div class="servicio-imagen">
          <img
            src="${servicio.imagen}"
            alt="${servicio.nombre}"
            loading="lazy"
          >
        </div>

        <div class="servicio-contenido">

          <h3>${servicio.nombre}</h3>

          <p>
            ${servicio.descripcion}
          </p>

          <span class="servicio-boton">
            Ver servicio →
          </span>

        </div>

      </a>
    `;

    contenedor.appendChild(tarjeta);
  });
});
