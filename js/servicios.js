document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#servicios-container");

  // Si todavía no existe el contenedor en index.html,
  // simplemente no hacemos nada.
  if (!contenedor) return;

  if (typeof servicios === "undefined") {
    console.error("No se pudo cargar data/servicios.js");
    return;
  }

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
            Ver servicio
          </span>
        </div>

      </a>
    `;

    contenedor.appendChild(tarjeta);
  });
});
