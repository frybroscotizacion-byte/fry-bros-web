globalThis.FRY_BROS_COTIZADOR = (() => {
  const costoUnidad = (precio, unidades) => precio / unidades;
  const costoGramo = (precio, gramos) => precio / gramos;
  const redondearPrecio = (numero) => Math.ceil(numero / 1000) * 1000;

  function normalizarProductosPorPersona(valor) {
    const configuracion = CONFIG_COTIZADOR.productosPorPersona;
    const numero = valor === undefined ? configuracion.predeterminado : Number(valor);
    return configuracion.opciones.includes(numero) ? numero : null;
  }

  function calcularServicio(personas) {
    const tramos = CONFIG_COTIZADOR.servicioSandwiches;

    return personas <= 50 ? tramos.hasta50 : tramos.hasta100;
  }

  function calcularPapas(personas) {
    const limites = CONFIG_COTIZADOR.limitesPersonas.papas;
    if (!Number.isInteger(personas) || personas < limites.minimo || personas > limites.maximo) {
      return { error: "Las Papas Fritas se cotizan entre 40 y 160 personas." };
    }
    const papas = CONFIG_COTIZADOR.papas;
    const bolsas = Math.ceil(personas * papas.gramosPorPersona / papas.bolsa.gramos);
    const costoIngredientes = bolsas * papas.bolsa.precio;
    const costoUtiles = personas * papas.sobresPorPersona * papas.precioSobre +
      papas.aceiteEvento + papas.salEvento + papas.servilletasEvento +
      papas.gasEvento + papas.ketchupEvento;
    const servicioEvento = papas.servicioEvento;
    const transporte = CONFIG_COTIZADOR.transporte;
    const total = Math.round(costoIngredientes + costoUtiles + servicioEvento + transporte);
    return {
      servicio: "Papas Fritas",
      personas,
      cantidadProducto: null,
      costoIngredientes,
      costoUtiles,
      servicioEvento,
      transporte,
      total,
      presentacion: "Papas fritas servidas en sobres individuales."
    };
  }

  function calcularUtiles(personas) {
    const utiles = CONFIG_COTIZADOR.utiles;
    const costoServilletas =
      Math.ceil(personas / utiles.servilletas.unidades) * utiles.servilletas.precio;
    const costoPlatos =
      Math.ceil(personas / utiles.platos.unidades) * utiles.platos.precio;
    const costoGuantes =
      costoUnidad(utiles.guantes.precio, utiles.guantes.unidades) * utiles.guantes.usoEvento;

    return costoServilletas + costoPlatos + costoGuantes +
      utiles.papelMetalico + utiles.gas;
  }

  function baseSandwich(personas, nombre, cantidad, costoPorUnidad, extras = 0) {
    const costoIngredientes = costoPorUnidad * cantidad + extras;
    const costoUtiles = calcularUtiles(personas);
    const servicioEvento = calcularServicio(personas);
    const transporte = CONFIG_COTIZADOR.transporte;
    const total = redondearPrecio(
      costoIngredientes + costoUtiles + servicioEvento + transporte
    );

    return {
      servicio: nombre,
      personas,
      cantidadProducto: cantidad,
      costoIngredientes,
      costoUtiles,
      servicioEvento,
      transporte,
      total,
      presentacion: "Sándwiches servidos en platos."
    };
  }

  function calcularHamburguesas(personas, productosPorPersona) {
    const cantidad = Math.ceil(personas * productosPorPersona);
    const g = CONFIG_COTIZADOR.ingredientes;
    const h = CONFIG_COTIZADOR.hamburguesas;
    const p = CONFIG_COTIZADOR.porciones;

    const costoPorUnidad =
      costoUnidad(h.carne.precio, h.carne.unidades) +
      costoUnidad(g.pan.precio, g.pan.unidades) +
      costoUnidad(h.queso.precio, h.queso.unidades) +
      costoGramo(g.tomate.precio, g.tomate.gramos) * p.tomate +
      costoGramo(g.lechuga.precio, g.lechuga.gramosUtilesEstimados) * p.lechuga +
      costoGramo(g.cebolla.precio, g.cebolla.gramos) * p.cebolla +
      costoGramo(g.ketchup.precio, g.ketchup.gramos) * p.ketchup +
      costoGramo(g.mayonesa.precio, g.mayonesa.gramos) * p.mayonesa +
      costoGramo(g.mostaza.precio, g.mostaza.gramos) * p.mostaza +
      costoGramo(h.barbecue.precio, h.barbecue.gramos) * p.barbecue +
      costoGramo(h.pepinillos.precio, h.pepinillos.gramos) * p.pepinillos +
      costoGramo(h.cebollaCrispy.precio, h.cebollaCrispy.gramos) * p.cebollaCrispy;

    return baseSandwich(personas, "Hamburguesas", cantidad, costoPorUnidad);
  }

  function calcularChurrasco(personas, nombre, productosPorPersona) {
    const cantidad = Math.ceil(personas * productosPorPersona);
    const g = CONFIG_COTIZADOR.ingredientes;
    const c = CONFIG_COTIZADOR.churrascos;
    const p = CONFIG_COTIZADOR.porciones;

    const costoPorUnidad =
      costoUnidad(c.carne.precio, c.carne.unidades) +
      costoUnidad(g.pan.precio, g.pan.unidades) +
      costoGramo(g.tomate.precio, g.tomate.gramos) * p.tomate +
      costoGramo(g.lechuga.precio, g.lechuga.gramosUtilesEstimados) * p.lechuga +
      costoGramo(g.cebolla.precio, g.cebolla.gramos) * p.cebolla +
      costoGramo(c.palta.precio, c.palta.gramos) * p.palta +
      costoGramo(g.ketchup.precio, g.ketchup.gramos) * p.ketchup +
      costoGramo(g.mayonesa.precio, g.mayonesa.gramos) * p.mayonesa +
      costoGramo(g.mostaza.precio, g.mostaza.gramos) * p.mostaza;

    return baseSandwich(personas, nombre, cantidad, costoPorUnidad);
  }

  function calcularHotDogs(personas, productosPorPersona) {
    const cantidad = Math.ceil(personas * productosPorPersona);
    const h = CONFIG_COTIZADOR.hotDogs;
    const p = CONFIG_COTIZADOR.porciones;

    const costoPorUnidad =
      costoUnidad(h.salchichas.precio, h.salchichas.unidades) +
      costoUnidad(h.pan.precio, h.pan.unidades) +
      costoGramo(h.palta.precio, h.palta.gramos) * p.paltaHotDog +
      costoGramo(h.tomate.precio, h.tomate.gramos) * p.tomateHotDog;

    const despacho =
      personas === 20
        ? h.despacho20Personas
        : personas >= 100
          ? h.despachoDesde100
          : h.despachoBase;

    const extras =
      h.mayonesaEvento + h.ketchupEvento + h.salEvento + despacho;

    return baseSandwich(personas, "Hot Dogs", cantidad, costoPorUnidad, extras);
  }

  function calcular(tipo, personas, valorProductosPorPersona) {
    if (tipo === "papas") return calcularPapas(personas);
    const productosPorPersona = normalizarProductosPorPersona(valorProductosPorPersona);
    if (!productosPorPersona) {
      return { error: "Selecciona una cantidad válida de sándwiches o completos por persona." };
    }
    if (tipo === "hamburguesas") return calcularHamburguesas(personas, productosPorPersona);
    if (tipo === "hotdogs") return calcularHotDogs(personas, productosPorPersona);
    if (tipo === "churrascos") return calcularChurrasco(personas, "Churrascos", productosPorPersona);
    if (tipo === "lomitos") return calcularChurrasco(personas, "Lomitos", productosPorPersona);
    return { error: "Selecciona un servicio válido." };
  }

  return { calcular, calcularServicio };
})();

document.addEventListener("DOMContentLoaded", () => {
  const montaje = document.querySelector("#cotizar");
  if (!montaje) {
    console.error("Fry Bros: falta #cotizar en index.html");
    return;
  }

  const CLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });

  const FECHA_CL = new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  function fechaMinimaEvento() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toISOString().split("T")[0];
  }

  function fechaEnPalabras(fechaISO) {
    return FECHA_CL.format(new Date(`${fechaISO}T12:00:00`));
  }

  function obtenerDetalleProductos(cotizacion) {
    const nombres = {
      Hamburguesas: "hamburguesas",
      Churrascos: "churrascos",
      Lomitos: "lomitos",
      "Hot Dogs": "hot dogs"
    };
    const producto = nombres[cotizacion.servicio];

    if (!producto || !Number.isFinite(cotizacion.cantidadProducto)) return null;

    return {
      producto,
      cantidad: cotizacion.cantidadProducto.toLocaleString("es-CL"),
      porPersona: (cotizacion.cantidadProducto / cotizacion.personas).toLocaleString("es-CL", {
        maximumFractionDigits: 1
      })
    };
  }

  async function registrarCotizacion(payload) {
    const endpoint = CONFIG_COTIZADOR.registroEndpoint;
    if (!endpoint) throw new Error("Falta configurar el registro");

    const respuesta = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const datos = await respuesta.json().catch(() => ({}));
    if (!respuesta.ok || !datos.success) {
      throw new Error(datos.error || "No se pudo registrar la cotización");
    }
    return datos;
  }

  montaje.innerHTML = `
    <section class="cotizador-frybros">
      <div class="cotizador-encabezado">
        <span class="cotizador-etiqueta">COTIZA TU EVENTO</span>
        <h2>Una experiencia preparada para ti</h2>
        <p>
          Elige tu servicio y la cantidad de invitados. Nosotros nos encargamos
          del montaje, la cocina y cada detalle de la atención.
        </p>
      </div>

      <div class="cotizador-panel">
        <div class="campo-cotizador">
          <label for="cotizador-servicio">Servicio</label>
          <select id="cotizador-servicio">
            <option value="">Selecciona un servicio</option>
            <option value="papas">Papas Fritas</option>
            <option value="hamburguesas">Hamburguesas</option>
            <option value="hotdogs">Hot Dogs</option>
            <option value="churrascos">Churrascos</option>
            <option value="lomitos">Lomitos</option>
          </select>
        </div>

        <div class="campo-cotizador">
          <label for="cotizador-personas">Cantidad de personas</label>
          <input id="cotizador-personas" type="number" inputmode="numeric"
            step="1" disabled placeholder="Primero selecciona un servicio">
          <small id="ayuda-cotizador-personas" class="campo-ayuda">
            Selecciona un servicio para ver el rango permitido.
          </small>
        </div>

        <div class="campo-cotizador" id="campo-productos-por-persona">
          <label for="cotizador-productos-por-persona">Cantidad por persona</label>
          <select id="cotizador-productos-por-persona" disabled>
            <option value="">Primero selecciona un servicio</option>
          </select>
          <small class="campo-ayuda">
            Elige cuántos sándwiches o completos recibirá cada persona. El precio se ajusta automáticamente.
          </small>
        </div>

        <div class="cotizador-datos">
          <div class="campo-cotizador">
            <label for="cotizador-nombre">Nombre y apellido</label>
            <input id="cotizador-nombre" type="text" autocomplete="name" required
              placeholder="Ej: Camila González">
          </div>

          <div class="campo-cotizador">
            <label for="cotizador-whatsapp">Tu WhatsApp</label>
            <input id="cotizador-whatsapp" type="tel" autocomplete="tel" required
              placeholder="Ej: +56 9 1234 5678">
          </div>

          <div class="campo-cotizador">
            <label for="cotizador-correo">Correo electrónico</label>
            <input id="cotizador-correo" type="email" autocomplete="email"
              placeholder="Ej: nombre@correo.cl">
          </div>

          <div class="campo-cotizador">
            <label for="cotizador-tipo-evento">Tipo de evento</label>
            <select id="cotizador-tipo-evento" required>
              <option value="">Selecciona el tipo de evento</option>
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Evento de empresa">Evento de empresa</option>
              <option value="Evento de colegio">Evento de colegio</option>
              <option value="Matrimonio o celebración">Matrimonio o celebración</option>
              <option value="Otro evento">Otro evento</option>
            </select>
          </div>

          <div class="campo-cotizador">
            <label for="cotizador-fecha">Fecha del evento</label>
            <input id="cotizador-fecha" type="date" required>
            <small class="campo-ayuda">Reserva con un mínimo de 7 días de anticipación.</small>
          </div>

          <div class="campo-cotizador">
            <label for="cotizador-comuna">Comuna</label>
            <input id="cotizador-comuna" type="text" autocomplete="address-level2"
              required placeholder="Ej: Colina">
          </div>

          <div class="campo-cotizador campo-cotizador-ancho">
            <label for="cotizador-direccion">Dirección del evento</label>
            <input id="cotizador-direccion" type="text" autocomplete="street-address"
              required placeholder="Calle, número y referencia">
          </div>
        </div>

        <button id="calcular-cotizacion" type="button">Calcular cotización</button>
        <div id="resultado-cotizador" class="resultado-cotizador" hidden></div>
      </div>
    </section>
  `;

  const servicioSelect = document.querySelector("#cotizador-servicio");
  const personasInput = document.querySelector("#cotizador-personas");
  const ayudaPersonas = document.querySelector("#ayuda-cotizador-personas");
  const productosPorPersonaSelect = document.querySelector("#cotizador-productos-por-persona");
  const boton = document.querySelector("#calcular-cotizacion");
  const resultado = document.querySelector("#resultado-cotizador");
  const nombreInput = document.querySelector("#cotizador-nombre");
  const whatsappInput = document.querySelector("#cotizador-whatsapp");
  const correoInput = document.querySelector("#cotizador-correo");
  const tipoEventoSelect = document.querySelector("#cotizador-tipo-evento");
  const fechaInput = document.querySelector("#cotizador-fecha");
  const comunaInput = document.querySelector("#cotizador-comuna");
  const direccionInput = document.querySelector("#cotizador-direccion");

  fechaInput.min = fechaMinimaEvento();

  servicioSelect.addEventListener("change", () => {
    const servicio = servicioSelect.value;
    personasInput.value = "";
    productosPorPersonaSelect.innerHTML = "";

    if (!servicio) {
      personasInput.disabled = true;
      personasInput.removeAttribute("min");
      personasInput.removeAttribute("max");
      personasInput.placeholder = "Primero selecciona un servicio";
      ayudaPersonas.textContent = "Selecciona un servicio para ver el rango permitido.";
      productosPorPersonaSelect.disabled = true;
      productosPorPersonaSelect.innerHTML = "<option>Primero selecciona un servicio</option>";
      return;
    }

    if (servicio === "papas") {
      productosPorPersonaSelect.disabled = true;
      productosPorPersonaSelect.innerHTML = "<option value=\"\">No aplica para Papas Fritas</option>";
    } else {
      productosPorPersonaSelect.disabled = false;
      for (const cantidad of CONFIG_COTIZADOR.productosPorPersona.opciones) {
        const opcion = document.createElement("option");
        opcion.value = cantidad;
        opcion.textContent = `${cantidad.toLocaleString("es-CL")} por persona${cantidad === 2 ? " (recomendado)" : ""}`;
        opcion.selected = cantidad === CONFIG_COTIZADOR.productosPorPersona.predeterminado;
        productosPorPersonaSelect.appendChild(opcion);
      }
    }

    const limites = servicio === "papas"
      ? CONFIG_COTIZADOR.limitesPersonas.papas
      : CONFIG_COTIZADOR.limitesPersonas.sandwiches;
    personasInput.disabled = false;
    personasInput.min = limites.minimo;
    personasInput.max = limites.maximo;
    personasInput.placeholder = `Ej: ${limites.minimo + 15}`;
    ayudaPersonas.textContent = `Ingresa un número exacto entre ${limites.minimo} y ${limites.maximo} personas.`;
  });

  const servicioSolicitado = new URLSearchParams(window.location.search).get("servicio");
  const serviciosValidos = ["papas", "hamburguesas", "hotdogs", "churrascos", "lomitos"];
  if (serviciosValidos.includes(servicioSolicitado)) {
    servicioSelect.value = servicioSolicitado;
    servicioSelect.dispatchEvent(new Event("change"));
  }

  boton.addEventListener("click", async () => {
    const servicio = servicioSelect.value;
    const personas = Number(personasInput.value);
    const productosPorPersona = servicio === "papas"
      ? null
      : Number(productosPorPersonaSelect.value);
    const nombre = nombreInput.value.trim();
    const whatsapp = whatsappInput.value.trim();
    const correo = correoInput.value.trim();
    const tipoEvento = tipoEventoSelect.value;
    const fechaEvento = fechaInput.value;
    const comuna = comunaInput.value.trim();
    const direccion = direccionInput.value.trim();

    if (
      !servicio || !personas || (servicio !== "papas" && !productosPorPersona) ||
      !nombre || !whatsapp || !tipoEvento ||
      !fechaEvento || !comuna || !direccion
    ) {
      resultado.hidden = false;
      resultado.innerHTML =
        '<p class="resultado-error">Completa todos los campos obligatorios para calcular tu cotización.</p>';
      return;
    }

    const limites = servicio === "papas"
      ? CONFIG_COTIZADOR.limitesPersonas.papas
      : CONFIG_COTIZADOR.limitesPersonas.sandwiches;
    if (!Number.isInteger(personas) || personas < limites.minimo || personas > limites.maximo) {
      resultado.hidden = false;
      resultado.innerHTML = `<p class="resultado-error">La cantidad debe ser un número entero entre ${limites.minimo} y ${limites.maximo} personas para este servicio.</p>`;
      personasInput.focus();
      return;
    }

    if (fechaEvento < fechaInput.min) {
      resultado.hidden = false;
      resultado.innerHTML =
        '<p class="resultado-error">La fecha debe tener al menos 7 días de anticipación.</p>';
      return;
    }

    const cotizacion = FRY_BROS_COTIZADOR.calcular(servicio, personas, productosPorPersona);
    resultado.hidden = false;

    if (cotizacion.error) {
      resultado.innerHTML = `<p class="resultado-error">${cotizacion.error}</p>`;
      return;
    }

    const detalleProductos = obtenerDetalleProductos(cotizacion);

    const datosCotizacion = {
      fechaRegistro: new Date().toISOString(),
      nombre,
      whatsapp,
      correo,
      fechaEvento,
      tipoEvento,
      personas,
      comuna,
      direccion,
      servicioId: servicio,
      servicio: cotizacion.servicio,
      productosPorPersona,
      cantidadProducto: cotizacion.cantidadProducto,
      cotizacion: cotizacion.total,
      estado: "Nueva"
    };

    const textoBoton = boton.textContent;
    boton.disabled = true;
    boton.textContent = "Registrando cotización...";
    let registroCorrecto = false;

    try {
      await registrarCotizacion(datosCotizacion);
      registroCorrecto = true;
    } catch (error) {
      console.error("Fry Bros: no se pudo registrar la cotización", error);
    } finally {
      boton.disabled = false;
      boton.textContent = textoBoton;
    }

    const mensajeWhatsApp = [
      "Hola Fry Bros, quiero completar la cotización de",
      `${cotizacion.servicio} para ${cotizacion.personas} personas,`,
      detalleProductos
        ? `considerando ${detalleProductos.cantidad} ${detalleProductos.producto} en total (${detalleProductos.porPersona} por persona),`
        : "",
      `el día ${fechaEnPalabras(fechaEvento)},`,
      `en ${direccion}, comuna de ${comuna}.`,
      `Mi nombre es ${nombre} y mi WhatsApp es ${whatsapp}.`,
      `El valor estimado fue de ${CLP.format(cotizacion.total)}.`
    ].filter(Boolean).join(" ");

    const enlaceWhatsApp =
      `https://wa.me/${CONFIG_COTIZADOR.whatsappNegocio}?text=${encodeURIComponent(mensajeWhatsApp)}`;

    resultado.innerHTML = `
      <span class="resultado-label">COTIZACIÓN ESTIMADA</span>
      <h3>${CLP.format(cotizacion.total)}</h3>
      <p class="resultado-resumen">
        Servicio de <strong>${cotizacion.servicio}</strong> para
        <strong>${cotizacion.personas} personas</strong>, el
        <strong>${fechaEnPalabras(fechaEvento)}</strong> en
        <strong>${comuna}</strong>.
      </p>

      ${detalleProductos ? `
        <p class="resultado-cantidad">
          Se están cotizando <strong>${detalleProductos.cantidad} ${detalleProductos.producto}</strong>
          en total: <strong>${detalleProductos.porPersona} por persona</strong>.
        </p>
      ` : ""}

      <div class="resultado-incluye">
        <h4>Tu servicio Fry Bros incluye</h4>
        <ul>
          <li>Instalación del carro Fry Bros y una mesa de apoyo.</li>
          <li>Equipo de dos o más cocineros, según el tamaño del evento.</li>
          <li>Llegada anticipada para realizar el montaje con tranquilidad.</li>
          <li>Preparación al momento durante el evento.</li>
          <li>${cotizacion.presentacion}</li>
          <li>Servilletas y una selección de aderezos.</li>
        </ul>
      </div>

      <small>
        Valor estimado sujeto a la ubicación y a los detalles finales del evento.
      </small>

      <p class="resultado-registro ${registroCorrecto ? "registro-ok" : "registro-aviso"}">
        ${registroCorrecto
          ? "Recibimos tus datos. Ahora puedes completar la solicitud por WhatsApp."
          : "La cotización está lista, pero no pudimos registrarla. Envíala por WhatsApp para no perderla."}
      </p>

      <a
        href="${enlaceWhatsApp}"
        class="resultado-contactar"
        target="_blank"
        rel="noopener noreferrer"
      >
        Completar por WhatsApp
      </a>
    `;
  });
});
