const DETALLES_SERVICIOS = {
  "papas-fritas": {
    nombre: "Papas Fritas",
    cotizador: "papas",
    imagen: "../images/Papasfritas.jpeg",
    bajada: "Una estación de papas doradas, crujientes y recién preparadas para acompañar tu evento con un clásico que siempre funciona.",
    tituloCarta: "El clásico que reúne a todos",
    parrafos: [
      "Nuestro servicio de papas fritas está pensado para entregar algo simple, rico y bien presentado. Llegamos con anticipación, instalamos el carro Fry Bros y preparamos cada tanda durante el evento para servirlas calientes.",
      "Las papas se entregan en sobres individuales, lo que permite que cada invitado las disfrute con comodidad mientras comparte, conversa o continúa participando en la celebración.",
      "Nos ocupamos del montaje, la preparación y la atención para que tú puedas concentrarte en disfrutar el evento."
    ],
    presentacion: "Papas servidas en sobres individuales.",
    rango: "Disponible para eventos de 40 a 160 personas",
    destacados: [
      ["Recién preparadas", "Cocinamos durante el evento para mantener el sabor, la temperatura y esa textura irresistible."],
      ["Servicio cómodo", "Los sobres individuales hacen que repartir y disfrutar las papas sea rápido, limpio y ordenado."],
      ["Estación Fry Bros", "El carro, la mesa de apoyo y nuestro equipo transforman la preparación en parte de la experiencia."]
    ]
  },
  hamburguesas: {
    nombre: "Hamburguesas",
    cotizador: "hamburguesas",
    imagen: "../images/hamburguesa-evento.jpg",
    posicionHero: "center 52%",
    bajada: "Hamburguesas abundantes y preparadas al momento, con ingredientes frescos y una estación que se convierte en parte del evento.",
    tituloCarta: "Sabor recién salido de la plancha",
    parrafos: [
      "La experiencia comienza con el aroma de la plancha y termina con una hamburguesa caliente servida directamente a cada invitado. Nuestro equipo prepara el servicio durante el evento para que cada porción llegue en su mejor momento.",
      "Trabajamos con pan, carne, queso y acompañamientos seleccionados para lograr una hamburguesa sabrosa, completa y con una presentación cuidada.",
      "Instalamos el carro Fry Bros, organizamos la mesa de apoyo y atendemos el flujo de invitados para que el servicio se sienta ágil, entretenido y bien coordinado."
    ],
    presentacion: "Hamburguesas servidas en platos individuales.",
    rango: "Disponible para eventos de 20 a 50 personas",
    destacados: [
      ["A la plancha", "Cada hamburguesa se prepara al momento para aprovechar el calor, el aroma y todo su sabor."],
      ["Montaje completo", "Llegamos antes, instalamos nuestra estación y dejamos todo listo para comenzar a la hora acordada."],
      ["Atención ordenada", "Nuestro equipo organiza la preparación y entrega para que tus invitados solo tengan que disfrutar."]
    ],
    menu: {
      documento: "../docs/menu-hamburguesas.pdf",
      opciones: [
        {
          nombre: "American Bacon",
          ingredientes: "Carne de hamburguesa, queso cheddar, tocino, salsa BBQ y cebolla caramelizada."
        },
        {
          nombre: "Italiana",
          ingredientes: "Carne de hamburguesa, queso cheddar, tomate, lechuga, pepinillos y mayonesa Fry Bros."
        },
        {
          nombre: "Special Fry Bros",
          ingredientes: "Carne de hamburguesa, queso cheddar, tocino, cebolla caramelizada, tomate, lechuga y mayonesa Fry Bros."
        }
      ]
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const montaje = document.querySelector("#detalle-servicio");
  const id = document.body.dataset.servicio;
  const servicio = DETALLES_SERVICIOS[id];

  if (!montaje || !servicio) {
    window.location.replace("../index.html#servicios");
    return;
  }

  document.title = `${servicio.nombre} | Fry Bros Eventos`;
  const consulta = encodeURIComponent(
    `Hola Fry Bros, quiero consultar por el servicio de ${servicio.nombre} para un evento.`
  );

  const destacados = servicio.destacados.map((destacado, indice) => `
    <article class="detalle-destacado">
      <span class="detalle-numero">0${indice + 1}</span>
      <h3>${destacado[0]}</h3>
      <p>${destacado[1]}</p>
    </article>
  `).join("");

  const tieneMenu = Array.isArray(servicio.menu?.opciones) && servicio.menu.opciones.length > 0;
  const enlaceMenuHero = tieneMenu ? `
    <a class="detalle-boton detalle-boton-secundario" href="#menu">
      Ver menú
    </a>
  ` : "";
  const enlaceMenuNav = tieneMenu ? '<a href="#menu">Menú</a>' : "";

  const seccionMenu = tieneMenu ? `
    <section class="burger-menu" id="menu" aria-labelledby="menu-title">
      <header class="burger-menu-heading"><p>LA CARTA</p><h2 id="menu-title">HAMBURGUESAS<br>FRY BROS</h2><span>PREPARADAS AL MOMENTO · PARA TU EVENTO</span></header>
      <div class="burger-options">
        ${servicio.menu.opciones.map((opcion) => `
          <article class="burger-option">
            <div class="burger-copy"><h3>${opcion.nombre}</h3><p>${opcion.ingredientes}</p></div>
            <div class="burger-missing" role="img" aria-label="Foto de ${opcion.nombre} no disponible">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M25 5H7v30h26V15M25 5v10h8L25 5Z" stroke="currentColor" stroke-width="2"/><path d="m10 29 7-8 5 5 4-3 4 6M15 13h.01" stroke="currentColor" stroke-width="2"/></svg><span>Imagen no disponible</span>
            </div>
          </article>`).join("")}
      </div>
      <footer class="burger-menu-bottom"><p>Papas fritas y hamburguesas para eventos.<br><strong>Nosotros cocinamos. Tú disfrutas.</strong></p>
        <a class="burger-pill" href="../index.html?servicio=hamburguesas#cotizar">Cotizar mi evento</a>
        <div class="burger-downloads"><a href="${servicio.menu.documento}" target="_blank" rel="noopener noreferrer">Ver carta en PDF</a><a href="${servicio.menu.documento}" download="Menu-Fry-Bros-Hamburguesas.pdf">Descargar carta</a></div>
      </footer>
    </section>
  ` : "";

  montaje.innerHTML = `
    <header class="detalle-nav">
      <a class="detalle-marca" href="../index.html#inicio">
        FRY BROS
        <small>EVENTOS</small>
      </a>
      <nav aria-label="Navegación principal">
        <a href="../index.html#inicio">Inicio</a>
        <a href="../index.html#servicios">Servicios</a>
        ${enlaceMenuNav}
        <a href="../index.html?servicio=${servicio.cotizador}#cotizar">Cotizar</a>
      </nav>
    </header>

    <main>
      <section class="detalle-hero" style="--hero-image: url('${servicio.imagen}'); --hero-position: ${servicio.posicionHero || "center"}">
        <div class="detalle-hero-contenido">
          <a class="detalle-volver" href="../index.html#servicios">← Volver a servicios</a>
          <span class="detalle-etiqueta">SERVICIO FRY BROS</span>
          <h1>${servicio.nombre}</h1>
          <p class="detalle-hero-bajada">${servicio.bajada}</p>
          <div class="detalle-acciones">
            <a class="detalle-boton" href="../index.html?servicio=${servicio.cotizador}#cotizar">
              Cotizar este servicio
            </a>
            ${enlaceMenuHero}
            <a class="detalle-boton detalle-boton-secundario"
               href="https://wa.me/56942863211?text=${consulta}"
               target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      ${seccionMenu}

      <section class="detalle-carta">
        <div class="detalle-contenedor detalle-carta-grid">
          <article class="detalle-panel">
            <span class="detalle-etiqueta">NUESTRA PROPUESTA</span>
            <h2>${servicio.tituloCarta}</h2>
            ${servicio.parrafos.map((parrafo) => `<p>${parrafo}</p>`).join("")}
          </article>

          <aside class="detalle-panel detalle-panel-oscuro">
            <h3>Tu servicio incluye</h3>
            <ul class="detalle-lista">
              <li>Instalación del carro Fry Bros y mesa de apoyo.</li>
              <li>Dos o más cocineros, según el tamaño del evento.</li>
              <li>Llegada anticipada para realizar el montaje.</li>
              <li>Preparación durante el evento.</li>
              <li>${servicio.presentacion}</li>
              <li>Servilletas y una selección de aderezos.</li>
            </ul>
            <span class="detalle-rango">${servicio.rango}</span>
          </aside>
        </div>
      </section>

      <section class="detalle-destacados">
        <div class="detalle-contenedor">
          <span class="detalle-etiqueta">MÁS QUE COMIDA</span>
          <h2>Una experiencia preparada para compartir</h2>
          <div class="detalle-destacados-grid">${destacados}</div>
        </div>
      </section>

      <section class="detalle-cta">
        <div class="detalle-contenedor">
          <span class="detalle-etiqueta">TU EVENTO, A TU MANERA</span>
          <h2>Nosotros cocinamos. Tú disfrutas.</h2>
          <p>
            Cuéntanos la fecha, la cantidad de invitados y el lugar. Te entregaremos
            una estimación y luego coordinaremos contigo todos los detalles.
          </p>
          <div class="detalle-acciones">
            <a class="detalle-boton" href="../index.html?servicio=${servicio.cotizador}#cotizar">
              Cotizar ${servicio.nombre}
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="detalle-footer">
      <strong>FRY BROS · EVENTOS</strong>
      <span>© <span id="detalle-year"></span> Fry Bros</span>
    </footer>
  `;

  document.querySelector("#detalle-year").textContent = new Date().getFullYear();
});
