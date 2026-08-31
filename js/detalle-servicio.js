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
  },
  "hot-dogs": {
    nombre: "Hot Dogs",
    cotizador: "hotdogs",
    imagen: "../images/Hotdog.jpeg",
    bajada: "Hot dogs frescos, coloridos y preparados frente a tus invitados, ideales para una celebración relajada y llena de sabor.",
    tituloCarta: "Un favorito para celebrar sin complicaciones",
    parrafos: [
      "Los hot dogs Fry Bros combinan pan, salchicha, tomate, palta y aderezos en una opción conocida, abundante y perfecta para eventos con mucha energía.",
      "Preparamos y armamos cada unidad durante el servicio, cuidando el orden de la estación y la presentación para que la experiencia sea tan buena como el sabor.",
      "Es una alternativa ideal para cumpleaños, encuentros de curso, celebraciones familiares y eventos donde se busca comida rica, rápida y preparada en el lugar."
    ],
    presentacion: "Hot dogs servidos en platos individuales.",
    rango: "Disponible para eventos de 20 a 100 personas",
    destacados: [
      ["Ingredientes frescos", "Tomate, palta y aderezos completan una preparación clásica y reconocible para todos."],
      ["Armados al momento", "Organizamos cada tanda durante el evento para servir un producto fresco y bien presentado."],
      ["Perfectos para compartir", "Una propuesta informal y entretenida que funciona muy bien en celebraciones de todas las edades."]
    ]
  },
  lomitos: {
    nombre: "Lomitos",
    cotizador: "lomitos",
    imagen: "../images/lomito.jpeg",
    bajada: "Lomitos calientes, abundantes y preparados durante el evento para quienes buscan un sándwich con más carácter.",
    tituloCarta: "Un sándwich generoso y lleno de sabor",
    parrafos: [
      "Nuestro servicio de lomitos lleva la cocina directamente a tu celebración. Preparamos los sándwiches durante el evento y los acompañamos con ingredientes frescos para lograr una propuesta sabrosa y contundente.",
      "La estación se instala con anticipación e incluye el carro, una mesa de apoyo y el equipo necesario para cocinar y servir de manera organizada.",
      "Es una excelente elección para reuniones familiares, celebraciones juveniles y eventos donde la comida también debe ser uno de los grandes recuerdos de la jornada."
    ],
    presentacion: "Lomitos servidos en platos individuales.",
    rango: "Disponible para eventos de 20 a 100 personas",
    destacados: [
      ["Calientes y abundantes", "Cocinamos durante el evento para entregar un sándwich con buena temperatura y una porción generosa."],
      ["Acompañamientos frescos", "Combinamos la preparación con vegetales y aderezos que aportan frescura y equilibrio."],
      ["Experiencia completa", "Nos encargamos del montaje, la cocina, el servicio y el orden de nuestra estación."]
    ]
  },
  churrascos: {
    nombre: "Churrascos",
    cotizador: "churrascos",
    imagen: "../images/Churasco.jpeg",
    bajada: "Churrascos preparados a la plancha, acompañados con ingredientes frescos y servidos calientes para disfrutar sin apuro.",
    tituloCarta: "El sabor de la plancha en tu evento",
    parrafos: [
      "Los churrascos Fry Bros se preparan durante el evento para que la carne, el pan y los acompañamientos se encuentren justo al momento de servir.",
      "Completamos cada sándwich con tomate, palta, vegetales y aderezos, logrando una alternativa abundante y muy chilena para compartir con tus invitados.",
      "Nuestro equipo llega antes de la hora acordada, instala la estación y coordina la atención para ofrecer un servicio cercano, ordenado y con presencia."
    ],
    presentacion: "Churrascos servidos en platos individuales.",
    rango: "Disponible para eventos de 20 a 50 personas",
    destacados: [
      ["Preparación a la vista", "La plancha y el movimiento del equipo convierten la cocina en parte del ambiente del evento."],
      ["Sabor completo", "Carne, pan, ingredientes frescos y aderezos se combinan en un sándwich abundante."],
      ["Equipo Fry Bros", "Dos o más cocineros se encargan de la preparación y la entrega según el tamaño del evento."]
    ]
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
    <section class="detalle-menu" id="menu">
      <div class="detalle-contenedor">
        <div class="detalle-menu-encabezado">
          <div>
            <span class="detalle-etiqueta">ELIGE TUS FAVORITAS</span>
            <h2>Menú de hamburguesas</h2>
          </div>
          <p>
            Tres opciones preparadas al momento para que elijas la combinación
            que mejor representa tu evento.
          </p>
        </div>

        <div class="detalle-menu-grid">
          ${servicio.menu.opciones.map((opcion, indice) => `
            <article class="detalle-menu-card">
              <span>0${indice + 1}</span>
              <h3>${opcion.nombre}</h3>
              <p>${opcion.ingredientes}</p>
            </article>
          `).join("")}
        </div>

        <div class="detalle-menu-documento">
          <div class="detalle-menu-documento-barra">
            <div>
              <span class="detalle-etiqueta">MENÚ FRY BROS</span>
              <h3>Consulta el documento completo</h3>
            </div>
            <div class="detalle-menu-documento-acciones">
              <a class="detalle-boton" href="${servicio.menu.documento}" target="_blank" rel="noopener noreferrer">
                Abrir menú en PDF
              </a>
              <a class="detalle-boton detalle-boton-claro" href="${servicio.menu.documento}" download="Menu-Fry-Bros-Hamburguesas.pdf">
                Descargar
              </a>
            </div>
          </div>
          <object
            class="detalle-menu-pdf"
            data="${servicio.menu.documento}"
            type="application/pdf"
            aria-label="Menú de hamburguesas Fry Bros"
          >
            <p>
              Tu navegador no puede mostrar el PDF aquí.
              <a href="${servicio.menu.documento}" target="_blank" rel="noopener noreferrer">Abrir menú</a>
            </p>
          </object>
        </div>
      </div>
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

      ${seccionMenu}

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
