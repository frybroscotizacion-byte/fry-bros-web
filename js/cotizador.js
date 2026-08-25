globalThis.FRY_BROS_COTIZADOR = (() => {
  const costoUnidad = (precio, unidades) => precio / unidades;
  const costoGramo = (precio, gramos) => precio / gramos;
  const redondearPrecio = (numero) => Math.ceil(numero / 1000) * 1000;

  function calcularServicio(personas) {
    const tramos = CONFIG_COTIZADOR.servicioSandwiches;

    if (personas <= 50) return tramos.hasta50;
    if (personas < 150) return tramos.hasta149;
    if (personas < 200) return tramos.hasta199;
    return tramos.desde200;
  }

  function calcularPapas(personas) {
    const total = CONFIG_COTIZADOR.papas[personas];
    if (!total) {
      return { error: "Las Papas Fritas se cotizan entre 40 y 160 personas, en intervalos de 10." };
    }
    return {
      servicio: "Papas Fritas",
      personas,
      cantidadProducto: null,
      costoIngredientes: null,
      costoUtiles: null,
      servicioEvento: null,
      transporte: null,
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

  function calcularHamburguesas(personas) {
    const cantidad = Math.ceil(personas * CONFIG_COTIZADOR.personasPorSandwich);
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

  function calcularChurrasco(personas, nombre) {
    const cantidad = Math.ceil(personas * CONFIG_COTIZADOR.personasPorSandwich);
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

  function calcularHotDogs(personas) {
    const cantidad = Math.ceil(personas * CONFIG_COTIZADOR.hotDogsPorPersona);
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

  function calcular(tipo, personas) {
    if (tipo === "papas") return calcularPapas(personas);
    if (tipo === "hamburguesas") return calcularHamburguesas(personas);
    if (tipo === "hotdogs") return calcularHotDogs(personas);
    if (tipo === "churrascos") return calcularChurrasco(personas, "Churrascos");
    if (tipo === "lomitos") return calcularChurrasco(personas, "Lomitos");
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
          <select id="cotizador-personas" disabled>
            <option value="">Primero selecciona un servicio</option>
          </select>
        </div>

        <button id="calcular-cotizacion" type="button">Calcular cotización</button>
        <div id="resultado-cotizador" class="resultado-cotizador" hidden></div>
      </div>
    </section>
  `;

  const servicioSelect = document.querySelector("#cotizador-servicio");
  const personasSelect = document.querySelector("#cotizador-personas");
  const boton = document.querySelector("#calcular-cotizacion");
  const resultado = document.querySelector("#resultado-cotizador");

  servicioSelect.addEventListener("change", () => {
    const servicio = servicioSelect.value;
    personasSelect.innerHTML = "";

    if (!servicio) {
      personasSelect.disabled = true;
      personasSelect.innerHTML = "<option>Primero selecciona un servicio</option>";
      return;
    }

    personasSelect.disabled = false;
    const primeraOpcion = document.createElement("option");
    primeraOpcion.value = "";
    primeraOpcion.textContent = "Selecciona cantidad";
    personasSelect.appendChild(primeraOpcion);

    const inicio = servicio === "papas" ? 40 : 20;
    const fin = servicio === "papas" ? 160 : 200;

    for (let personas = inicio; personas <= fin; personas += 10) {
      const opcion = document.createElement("option");
      opcion.value = personas;
      opcion.textContent = `${personas} personas`;
      personasSelect.appendChild(opcion);
    }
  });

  boton.addEventListener("click", () => {
    const servicio = servicioSelect.value;
    const personas = Number(personasSelect.value);

    if (!servicio || !personas) {
      resultado.hidden = false;
      resultado.innerHTML =
        '<p class="resultado-error">Selecciona un servicio y una cantidad de personas.</p>';
      return;
    }

    const cotizacion = FRY_BROS_COTIZADOR.calcular(servicio, personas);
    resultado.hidden = false;

    if (cotizacion.error) {
      resultado.innerHTML = `<p class="resultado-error">${cotizacion.error}</p>`;
      return;
    }

    resultado.innerHTML = `
      <span class="resultado-label">COTIZACIÓN ESTIMADA</span>
      <h3>${CLP.format(cotizacion.total)}</h3>
      <p class="resultado-resumen">
        Servicio de <strong>${cotizacion.servicio}</strong> para
        <strong>${cotizacion.personas} personas</strong>.
      </p>

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

      <a href="#contacto" class="resultado-contactar">Continuar cotización</a>
    `;
  });
});
