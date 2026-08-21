document.addEventListener("DOMContentLoaded", () => {
  const contacto = document.querySelector("#contacto");

  if (!contacto) {
    console.error("Fry Bros: no existe #contacto en index.html");
    return;
  }

  contacto.innerHTML = `
    <div class="contacto-frybros">

      <span class="contacto-etiqueta">
        HABLEMOS
      </span>

      <h2>
        ¿Tienes un evento en mente?
      </h2>

      <p class="contacto-descripcion">
        Escríbenos y conversemos sobre tu próximo evento.
      </p>

      <div class="contacto-redes">

        <a
          class="contacto-boton contacto-whatsapp"
          href="https://wa.me/56942863211?text=Hola%20Fry%20Bros,%20quiero%20cotizar%20un%20evento."
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contacto-icono">💬</span>

          <span>
            <strong>WhatsApp</strong>
            <small>+56 9 4286 3211</small>
          </span>
        </a>

        <a
          class="contacto-boton"
          href="https://www.instagram.com/fry_bros_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contacto-icono">◎</span>

          <span>
            <strong>Instagram</strong>
            <small>@Fry_Bros_</small>
          </span>
        </a>

        <a
          class="contacto-boton"
          href="mailto:frybroscotizacion@gmail.com?subject=Cotización%20Fry%20Bros"
        >
          <span class="contacto-icono">✉</span>

          <span>
            <strong>Correo</strong>
            <small>frybroscotizacion@gmail.com</small>
          </span>
        </a>

      </div>

      <a href="#cotizar" class="contacto-cotizar">
        Cotizar mi evento
      </a>

    </div>
  `;
});
