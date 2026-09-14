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
          <span class="contacto-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.46 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.88 11.88 0 0 0 5.8 1.5h.01c6.58 0 11.94-5.36 11.94-11.95 0-3.19-1.24-6.18-3.47-8.43ZM12.05 21.84a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.7.97.99-3.6-.24-.37a9.86 9.86 0 1 1 8.34 4.59Zm5.4-7.39c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.66.15-.2.3-.76.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.49-.5-.66-.5h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z"/></svg>
          </span>

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
          <span class="contacto-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M7.1 2h9.8A5.1 5.1 0 0 1 22 7.1v9.8a5.1 5.1 0 0 1-5.1 5.1H7.1A5.1 5.1 0 0 1 2 16.9V7.1A5.1 5.1 0 0 1 7.1 2Zm-.2 2A2.9 2.9 0 0 0 4 6.9v10.2A2.9 2.9 0 0 0 6.9 20h10.2a2.9 2.9 0 0 0 2.9-2.9V6.9A2.9 2.9 0 0 0 17.1 4H6.9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>
          </span>

          <span>
            <strong>Instagram</strong>
            <small>@Fry_Bros_</small>
          </span>
        </a>

        <a
          class="contacto-boton"
          href="mailto:frybroscotizacion@gmail.com?subject=Cotización%20Fry%20Bros"
        >
          <span class="contacto-icono" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false"><path d="M3.5 5h17A2.5 2.5 0 0 1 23 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 16.5v-9A2.5 2.5 0 0 1 3.5 5Zm0 2a.5.5 0 0 0-.5.5v.18l9 5.75 9-5.75V7.5a.5.5 0 0 0-.5-.5h-17Zm17.5 3.05-8.46 5.4a1 1 0 0 1-1.08 0L3 10.05v6.45c0 .28.22.5.5.5h17a.5.5 0 0 0 .5-.5v-6.45Z"/></svg>
          </span>

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
