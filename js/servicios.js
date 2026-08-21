document.addEventListener("DOMContentLoaded", () => {
  if (typeof servicios === "undefined") {
    console.error("Fry Bros: no se pudo cargar data/servicios.js");
    return;
  }

  // Evita crear la sección dos veces.
  if (document.querySelector("#servicios-frybros")) return;

  const seccion = document.createElement("section");
  seccion.id = "servicios-frybros";
  seccion.className = "servicios-frybros";

  seccion.innerHTML = `
    <div class="servicios-encabezado">
      <span class="servicios-etiqueta">NUESTROS SERVICIOS</span>

      <h2>¿Qué cocinamos?</h2>

      <p>
        Elige el servicio que mejor se adapte a tu evento.
        Nosotros nos encargamos de preparar todo al momento.
      </p>
    </div>

    <div id="servicios-container"></div>
  `;

  const footer = document.querySelector("footer");
  const main = document.querySelector("main");

  if (footer) {
    footer.parentNode.insertBefore(seccion, footer);
  } else if (main) {
    main.appendChild(seccion);
  } else {
    document.body.appendChild(seccion);
  }

  const contenedor = seccion.querySelector("#servicios-container");

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

          <p>${servicio.descripcion}</p>

          <span class="servicio-boton">
            Ver servicio →
          </span>
        </div>

      </a>
    `;

    contenedor.appendChild(tarjeta);
  });
});
