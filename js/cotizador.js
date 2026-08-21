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


  // =====================================================
  // FUNCIONES GENERALES
  // =====================================================

  function costoUnidad(precio, unidades) {
    return precio / unidades;
  }


  function costoGramo(precio, gramos) {
    return precio / gramos;
  }


  function redondearPrecio(numero) {
    /*
      Redondeamos hacia arriba a $1.000
      para entregar precios comerciales más limpios.

      Ejemplo:
      $183.241 → $184.000
    */

    return Math.ceil(numero / 1000) * 1000;
  }


  function calcularServicio(personas) {

    return CONFIG_COTIZADOR.servicioSandwiches;

  }


  // =====================================================
  // PAPAS FRITAS
  // =====================================================

  function calcularPapas(personas) {

    const tabla = CONFIG_COTIZADOR.papas;

    if (!tabla[personas]) {

      return {
        error:
          "Las Papas Fritas se cotizan entre 40 y 160 personas, en intervalos de 10."
      };

    }

    return {
      servicio: "Papas Fritas",
      personas,
      cantidadProducto: null,
      costoIngredientes: null,
      costoUtiles: null,
      servicioEvento: null,
      transporte: null,

      total: tabla[personas]
    };

  }


  // =====================================================
  // ÚTILES PARA SANDWICHES
  // =====================================================

  function calcularUtiles(personas) {

    const utiles = CONFIG_COTIZADOR.utiles;


    const paquetesServilletas =
      Math.ceil(
        personas /
        utiles.servilletas.unidades
      );


    const costoServilletas =
      paquetesServilletas *
      utiles.servilletas.precio;


    const paquetesPlatos =
      Math.ceil(
        personas /
        utiles.platos.unidades
      );


    const costoPlatos =
      paquetesPlatos *
      utiles.platos.precio;


    const costoGuantes =
      costoUnidad(
        utiles.guantes.precio,
        utiles.guantes.unidades
      ) *
      utiles.guantes.usoEvento;


    return (
      costoServilletas +
      costoPlatos +
      costoGuantes +
      utiles.papelMetalico +
      utiles.gas
    );

  }


  // =====================================================
  // HAMBURGUESAS
  // =====================================================

  function calcularHamburguesas(personas) {

    const cantidad =
      Math.ceil(
        personas *
        CONFIG_COTIZADOR.personasPorSandwich
      );


    const generales =
      CONFIG_COTIZADOR.ingredientes;

    const hamburguesa =
      CONFIG_COTIZADOR.hamburguesas;

    const porcion =
      CONFIG_COTIZADOR.porciones;


    const carne =
      costoUnidad(
        hamburguesa.carne.precio,
        hamburguesa.carne.unidades
      );


    const pan =
      costoUnidad(
        generales.pan.precio,
        generales.pan.unidades
      );


    const queso =
      costoUnidad(
        hamburguesa.queso.precio,
        hamburguesa.queso.unidades
      );


    const tomate =
      costoGramo(
        generales.tomate.precio,
        generales.tomate.gramos
      ) *
      porcion.tomate;


    const lechuga =
      costoGramo(
        generales.lechuga.precio,
        generales.lechuga.gramosUtilesEstimados
      ) *
      porcion.lechuga;


    const cebolla =
      costoGramo(
        generales.cebolla.precio,
        generales.cebolla.gramos
      ) *
      porcion.cebolla;


    const ketchup =
      costoGramo(
        generales.ketchup.precio,
        generales.ketchup.gramos
      ) *
      porcion.ketchup;


    const mayo =
      costoGramo(
        generales.mayonesa.precio,
        generales.mayonesa.gramos
      ) *
      porcion.mayonesa;


    const mostaza =
      costoGramo(
        generales.mostaza.precio,
        generales.mostaza.gramos
      ) *
      porcion.mostaza;


    const barbecue =
      costoGramo(
        hamburguesa.barbecue.precio,
        hamburguesa.barbecue.gramos
      ) *
      porcion.barbecue;


    const pepinillos =
      costoGramo(
        hamburguesa.pepinillos.precio,
        hamburguesa.pepinillos.gramos
      ) *
      porcion.pepinillos;


    const cebollaCrispy =
      costoGramo(
        hamburguesa.cebollaCrispy.precio,
        hamburguesa.cebollaCrispy.gramos
      ) *
      porcion.cebollaCrispy;


    const costoPorHamburguesa =
      carne +
      pan +
      queso +
      tomate +
      lechuga +
      cebolla +
      ketchup +
      mayo +
      mostaza +
      barbecue +
      pepinillos +
      cebollaCrispy;


    const costoIngredientes =
      costoPorHamburguesa *
      cantidad;


    const costoUtiles =
      calcularUtiles(personas);


    const servicio =
      calcularServicio(personas);


    const transporte =
      CONFIG_COTIZADOR.transporte;


    const total =
      redondearPrecio(
        costoIngredientes +
        costoUtiles +
        servicio +
        transporte
      );


    return {

      servicio: "Hamburguesas",

      personas,

      cantidadProducto: cantidad,

      costoIngredientes,

      costoUtiles,

      servicioEvento: servicio,

      transporte,

      total
    };

  }


  // =====================================================
  // CHURRASCOS / LOMITOS
  // =====================================================

  function calcularChurrasco(personas, nombre) {

    const cantidad =
      Math.ceil(
        personas *
        CONFIG_COTIZADOR.personasPorSandwich
      );


    const generales =
      CONFIG_COTIZADOR.ingredientes;

    const churrasco =
      CONFIG_COTIZADOR.churrascos;

    const porcion =
      CONFIG_COTIZADOR.porciones;


    const carne =
      costoUnidad(
        churrasco.carne.precio,
        churrasco.carne.unidades
      );


    const pan =
      costoUnidad(
        generales.pan.precio,
        generales.pan.unidades
      );


    const tomate =
      costoGramo(
        generales.tomate.precio,
        generales.tomate.gramos
      ) *
      porcion.tomate;


    const lechuga =
      costoGramo(
        generales.lechuga.precio,
        generales.lechuga.gramosUtilesEstimados
      ) *
      porcion.lechuga;


    const cebolla =
      costoGramo(
        generales.cebolla.precio,
        generales.cebolla.gramos
      ) *
      porcion.cebolla;


    const palta =
      costoGramo(
        churrasco.palta.precio,
        churrasco.palta.gramos
      ) *
      porcion.palta;


    const ketchup =
      costoGramo(
        generales.ketchup.precio,
        generales.ketchup.gramos
      ) *
      porcion.ketchup;


    const mayo =
      costoGramo(
        generales.mayonesa.precio,
        generales.mayonesa.gramos
      ) *
      porcion.mayonesa;


    const mostaza =
      costoGramo(
        generales.mostaza.precio,
        generales.mostaza.gramos
      ) *
      porcion.mostaza;


    const costoPorSandwich =
      carne +
      pan +
      tomate +
      lechuga +
      cebolla +
      palta +
      ketchup +
      mayo +
      mostaza;


    const costoIngredientes =
      costoPorSandwich *
      cantidad;


    const costoUtiles =
      calcularUtiles(personas);


    const servicio =
      calcularServicio(personas);


    const transporte =
      CONFIG_COTIZADOR.transporte;


    const total =
      redondearPrecio(
        costoIngredientes +
        costoUtiles +
        servicio +
        transporte
      );


    return {

      servicio: nombre,

      personas,

      cantidadProducto: cantidad,

      costoIngredientes,

      costoUtiles,

      servicioEvento: servicio,

      transporte,

      total
    };

  }


  // =====================================================
  // HOT DOGS
  // =====================================================

  function calcularHotDogs(personas) {

    /*
      IMPORTANTE:

      Dejamos el servicio dentro del cotizador,
      pero todavía falta incorporar su tabla exacta
      de ingredientes/precios.

      Así evitamos mostrar al cliente una cifra inventada.
    */

    return {
      error:
        "La cotización automática de Hot Dogs estará disponible próximamente."
    };

  }


  // =====================================================
  // INTERFAZ
  // =====================================================

  montaje.innerHTML = `

    <section class="cotizador-frybros">

      <div class="cotizador-encabezado">

        <span class="cotizador-etiqueta">
          COTIZA TU EVENTO
        </span>

        <h2>
          Calcula tu evento
        </h2>

        <p>
          Selecciona el servicio y la cantidad
          aproximada de invitados.
        </p>

      </div>


      <div class="cotizador-panel">


        <div class="campo-cotizador">

          <label for="cotizador-servicio">
            Servicio
          </label>

          <select id="cotizador-servicio">

            <option value="">
              Selecciona un servicio
            </option>

            <option value="papas">
              Papas Fritas
            </option>

            <option value="hamburguesas">
              Hamburguesas
            </option>

            <option value="hotdogs">
              Hot Dogs
            </option>

            <option value="churrascos">
              Churrascos
            </option>

            <option value="lomitos">
              Lomitos
            </option>

          </select>

        </div>


        <div class="campo-cotizador">

          <label for="cotizador-personas">
            Cantidad de personas
          </label>

          <select
            id="cotizador-personas"
            disabled
          >

            <option value="">
              Primero selecciona un servicio
            </option>

          </select>

        </div>


        <button
          id="calcular-cotizacion"
          type="button"
        >
          Calcular cotización
        </button>


        <div
          id="resultado-cotizador"
          class="resultado-cotizador"
          hidden
        >
        </div>

      </div>

    </section>

  `;


  const servicioSelect =
    document.querySelector(
      "#cotizador-servicio"
    );


  const personasSelect =
    document.querySelector(
      "#cotizador-personas"
    );


  const boton =
    document.querySelector(
      "#calcular-cotizacion"
    );


  const resultado =
    document.querySelector(
      "#resultado-cotizador"
    );


  // =====================================================
  // GENERAR CANTIDADES
  // =====================================================

  servicioSelect.addEventListener(
    "change",
    () => {

      const servicio =
        servicioSelect.value;


      personasSelect.innerHTML = "";


      if (!servicio) {

        personasSelect.disabled = true;

        personasSelect.innerHTML = `
          <option>
            Primero selecciona un servicio
          </option>
        `;

        return;
      }


      personasSelect.disabled = false;


      const primeraOpcion =
        document.createElement("option");


      primeraOpcion.value = "";

      primeraOpcion.textContent =
        "Selecciona cantidad";


      personasSelect.appendChild(
        primeraOpcion
      );


      let inicio = 20;
      let fin = 160;


      if (servicio === "papas") {

        inicio = 40;

      }


      for (
        let personas = inicio;
        personas <= fin;
        personas += 10
      ) {

        const opcion =
          document.createElement("option");


        opcion.value =
          personas;


        opcion.textContent =
          `${personas} personas`;


        personasSelect.appendChild(
          opcion
        );

      }

    }
  );


  // =====================================================
  // CALCULAR
  // =====================================================

  boton.addEventListener(
    "click",
    () => {

      const servicio =
        servicioSelect.value;


      const personas =
        Number(
          personasSelect.value
        );


      if (!servicio || !personas) {

        resultado.hidden = false;

        resultado.innerHTML = `
          <p class="resultado-error">
            Selecciona un servicio y
            una cantidad de personas.
          </p>
        `;

        return;

      }


      let cotizacion;


      if (servicio === "papas") {

        cotizacion =
          calcularPapas(personas);

      }


      if (servicio === "hamburguesas") {

        cotizacion =
          calcularHamburguesas(personas);

      }


      if (servicio === "hotdogs") {

        cotizacion =
          calcularHotDogs(personas);

      }


      if (servicio === "churrascos") {

        cotizacion =
          calcularChurrasco(
            personas,
            "Churrascos"
          );

      }


      if (servicio === "lomitos") {

        cotizacion =
          calcularChurrasco(
            personas,
            "Lomitos"
          );

      }


      resultado.hidden = false;


      if (cotizacion.error) {

        resultado.innerHTML = `
          <p class="resultado-error">
            ${cotizacion.error}
          </p>
        `;

        return;

      }


      resultado.innerHTML = `

        <span class="resultado-label">
          COTIZACIÓN ESTIMADA
        </span>

        <h3>
          ${CLP.format(
            cotizacion.total
          )}
        </h3>

        <p>
          ${cotizacion.servicio}
          para
          ${cotizacion.personas}
          personas.
        </p>

        ${
          cotizacion.cantidadProducto
          ?
          `
            <small>
              Cálculo aproximado:
              ${cotizacion.cantidadProducto}
              unidades.
            </small>
          `
          :
          ""
        }

        <a
          href="#contacto"
          class="resultado-contactar"
        >
          Continuar cotización
        </a>

      `;

    }
  );

});
