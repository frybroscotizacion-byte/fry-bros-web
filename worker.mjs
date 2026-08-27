const CONFIG = {
  transporte: 7000,
  tarifa: { hasta50: 60000, hasta100: 80000 },
  limites: {
    papas: { minimo: 40, maximo: 160 },
    sandwiches: { minimo: 20, maximo: 100 }
  },
  redondeo: 1000,
  productosPorPersona: {
    predeterminado: 2,
    opciones: [1, 1.5, 2, 2.5, 3]
  },
  papas: {
    gramosPorPersona: 110,
    bolsa: { precio: 5190, gramos: 2500 },
    sobresPorPersona: 1.5,
    precioSobre: 33.61,
    aceiteEvento: 25100,
    salEvento: 340,
    ketchupEvento: 2590,
    servicio: { hasta69: 40000, hasta99: 50000, hasta129: 60000, hasta160: 80000 }
  },
  ingredientes: {
    pan: { precio: 3550, contenido: 8 },
    tomate: { precio: 1500, contenido: 1000 },
    lechuga: { precio: 1300, contenido: 250 },
    cebolla: { precio: 2000, contenido: 1000 },
    ketchup: { precio: 2590, contenido: 900 },
    mayonesa: { precio: 3700, contenido: 1000 },
    mostaza: { precio: 2700, contenido: 1000 }
  },
  hamburguesas: {
    carne: { precio: 10910, contenido: 10 },
    queso: { precio: 2000, contenido: 8 },
    barbecue: { precio: 7000, contenido: 1000 },
    pepinillos: { precio: 8000, contenido: 1000 },
    cebollaCrispy: { precio: 1710, contenido: 10 }
  },
  churrascos: {
    carne: { precio: 16300, contenido: 24 },
    palta: { precio: 6000, contenido: 1000 }
  },
  lomitos: {
    carne: { precio: 16300, contenido: 24 },
    palta: { precio: 6000, contenido: 1000 }
  },
  hotDogs: {
    salchichas: { precio: 8461, contenido: 20 },
    pan: { precio: 1890, contenido: 8 },
    palta: { precio: 4490, contenido: 1000 },
    tomate: { precio: 1990, contenido: 1000 },
    mayonesaEvento: 2880,
    ketchupEvento: 2990,
    salEvento: 340,
    despachoBase: 3000,
    despacho20Personas: 3800,
    despachoDesde100: 5000
  },
  utiles: {
    servilletas: { precio: 700, contenido: 300 },
    platos: { precio: 1560, contenido: 12 },
    guantesEvento: 500,
    papelMetalico: 1400,
    gas: 15000
  },
  porciones: {
    tomate: 25, lechuga: 15, cebolla: 15, ketchup: 10,
    mayonesa: 10, mostaza: 5, palta: 30, barbecue: 5,
    pepinillos: 10, cebollaCrispy: 5, tomateHotDog: 50,
    paltaHotDog: 50
  }
};

const NOMBRES_SERVICIO = {
  papas: "Papas Fritas",
  hamburguesas: "Hamburguesas",
  hotdogs: "Hot Dogs",
  churrascos: "Churrascos",
  lomitos: "Lomitos"
};

const TIPOS_EVENTO = new Set([
  "Cumpleaños",
  "Evento de empresa",
  "Evento de colegio",
  "Matrimonio o celebración",
  "Otro evento"
]);

const costoUnitario = (item) => item.precio / item.contenido;
const redondear = (numero, tramo) => Math.ceil(numero / tramo) * tramo;

function numero(valor, nombre, permitirCero = true) {
  const resultado = Number(valor);
  if (!Number.isFinite(resultado) || resultado < 0 || (!permitirCero && resultado === 0)) {
    throw new Error(`Valor inválido: ${nombre}`);
  }
  return resultado;
}

function insumo(datos, id) {
  const item = datos.insumos?.[id];
  if (!item) throw new Error(`Falta el insumo ${id}`);
  return {
    precio: numero(item.precio, `${id}.precio`),
    contenido: numero(item.contenido, `${id}.contenido`, false)
  };
}

function costoFijo(datos, id) {
  const item = datos.utiles?.[id];
  if (!item) throw new Error(`Falta el útil ${id}`);
  return numero(item.costoFijoBase, `${id}.costoFijoBase`);
}

function parametro(datos, id, permitirCero = true) {
  if (!Object.prototype.hasOwnProperty.call(datos.parametros || {}, id)) {
    throw new Error(`Falta el parámetro ${id}`);
  }
  return numero(datos.parametros[id], id, permitirCero);
}

function construirConfigDesdeSheets(datos) {
  if (!datos?.success) throw new Error("Respuesta de precios inválida");
  const servilletas = datos.utiles?.servilletas;
  const platos = datos.utiles?.platos;
  const sobrePapas = datos.utiles?.sobre_papas;
  if (!servilletas || !platos || !sobrePapas) throw new Error("Faltan útiles variables");

  return {
    transporte: parametro(datos, "TRANSPORTE"),
    tarifa: {
      hasta50: parametro(datos, "SERVICIO_20_50"),
      hasta100: parametro(datos, "SERVICIO_51_100")
    },
    limites: {
      papas: {
        minimo: parametro(datos, "MIN_PAPAS", false),
        maximo: parametro(datos, "MAX_PAPAS", false)
      },
      sandwiches: {
        minimo: parametro(datos, "MIN_SANDWICH", false),
        maximo: parametro(datos, "MAX_SANDWICH", false)
      }
    },
    redondeo: parametro(datos, "REDONDEO", false),
    productosPorPersona: CONFIG.productosPorPersona,
    papas: {
      gramosPorPersona: parametro(datos, "GRAMOS_PAPAS_PERSONA", false),
      bolsa: (() => {
        const papa = insumo(datos, "papa_prefrita");
        return { precio: papa.precio, gramos: papa.contenido };
      })(),
      sobresPorPersona: parametro(datos, "SOBRES_PAPAS_PERSONA"),
      precioSobre: numero(sobrePapas.precio, "sobre_papas.precio"),
      aceiteEvento: costoFijo(datos, "aceite"),
      salEvento: costoFijo(datos, "sal"),
      ketchupEvento: costoFijo(datos, "ketchup_papas"),
      servicio: {
        hasta69: parametro(datos, "PAPAS_SERVICIO_40_69"),
        hasta99: parametro(datos, "PAPAS_SERVICIO_70_99"),
        hasta129: parametro(datos, "PAPAS_SERVICIO_100_129"),
        hasta160: parametro(datos, "PAPAS_SERVICIO_130_160")
      }
    },
    ingredientes: {
      pan: insumo(datos, "pan_sandwich"),
      tomate: insumo(datos, "tomate_sandwich"),
      lechuga: insumo(datos, "lechuga"),
      cebolla: insumo(datos, "cebolla"),
      ketchup: insumo(datos, "ketchup"),
      mayonesa: insumo(datos, "mayonesa"),
      mostaza: insumo(datos, "mostaza")
    },
    hamburguesas: {
      carne: insumo(datos, "carne_hamb"),
      queso: insumo(datos, "queso_cheddar"),
      barbecue: insumo(datos, "barbecue"),
      pepinillos: insumo(datos, "pepinillos"),
      cebollaCrispy: insumo(datos, "cebolla_crispy")
    },
    churrascos: {
      carne: insumo(datos, "carne_churrasco"),
      palta: insumo(datos, "palta_churrasco")
    },
    lomitos: {
      carne: insumo(datos, "carne_lomito"),
      palta: insumo(datos, "palta_churrasco")
    },
    hotDogs: {
      salchichas: insumo(datos, "salchicha_hd"),
      pan: insumo(datos, "pan_hd"),
      palta: insumo(datos, "palta_hd"),
      tomate: insumo(datos, "tomate_hd"),
      mayonesaEvento: costoFijo(datos, "mayo_hd"),
      ketchupEvento: costoFijo(datos, "ketchup_hd"),
      salEvento: costoFijo(datos, "sal"),
      despachoBase: parametro(datos, "DESPACHO_HD_30_90"),
      despacho20Personas: parametro(datos, "DESPACHO_HD_20"),
      despachoDesde100: parametro(datos, "DESPACHO_HD_100")
    },
    utiles: {
      servilletas: {
        precio: numero(servilletas.precio, "servilletas.precio"),
        contenido: numero(servilletas.contenido, "servilletas.contenido", false)
      },
      platos: {
        precio: numero(platos.precio, "platos.precio"),
        contenido: numero(platos.contenido, "platos.contenido", false)
      },
      guantesEvento: costoFijo(datos, "guantes"),
      papelMetalico: costoFijo(datos, "papel"),
      gas: costoFijo(datos, "gas")
    },
    porciones: CONFIG.porciones
  };
}

function calcularUtiles(personas, config = CONFIG, incluirPlatos = true) {
  const u = config.utiles;
  const servilletas = Math.ceil(personas / u.servilletas.contenido) * u.servilletas.precio;
  const platos = incluirPlatos
    ? Math.ceil(personas / u.platos.contenido) * u.platos.precio
    : 0;
  return servilletas + platos + u.guantesEvento + u.papelMetalico + u.gas;
}

function servicioPapas(personas, config) {
  const s = config.papas.servicio;
  if (personas >= 130) return s.hasta160;
  if (personas >= 100) return s.hasta129;
  if (personas >= 70) return s.hasta99;
  return s.hasta69;
}

function totalSandwich(personas, cantidad, costoPorUnidad, extras, config) {
  const ingredientes = cantidad * costoPorUnidad + extras;
  const utiles = calcularUtiles(personas, config, true);
  const servicio = personas <= 50 ? config.tarifa.hasta50 : config.tarifa.hasta100;
  return {
    ingredientes,
    utiles,
    servicio,
    total: redondear(ingredientes + utiles + servicio + config.transporte, config.redondeo)
  };
}

function calcularCotizacionServidor(tipo, personas, valorProductosPorPersona, config = CONFIG) {
  if (tipo === "papas") {
    const papas = config.papas;
    const bolsas = Math.ceil(personas * papas.gramosPorPersona / papas.bolsa.gramos);
    const ingredientes = bolsas * papas.bolsa.precio +
      papas.aceiteEvento + papas.salEvento + papas.ketchupEvento;
    const utiles = calcularUtiles(personas, config, false) +
      personas * papas.sobresPorPersona * papas.precioSobre;
    const servicio = servicioPapas(personas, config);
    return {
      servicio: NOMBRES_SERVICIO[tipo],
      total: ingredientes + utiles + servicio + config.transporte,
      costoIngredientes: ingredientes,
      costoUtiles: utiles,
      servicioEvento: servicio,
      transporte: config.transporte,
      productosPorPersona: null,
      cantidadProducto: null
    };
  }

  const productosPorPersona = valorProductosPorPersona === undefined
    ? config.productosPorPersona.predeterminado
    : Number(valorProductosPorPersona);
  if (!config.productosPorPersona.opciones.includes(productosPorPersona)) {
    return { servicio: NOMBRES_SERVICIO[tipo] || null, total: null };
  }

  const g = config.ingredientes;
  const p = config.porciones;
  const cantidad = Math.ceil(personas * productosPorPersona);
  let costo = 0;
  let extras = 0;

  if (tipo === "hamburguesas") {
    const h = config.hamburguesas;
    costo = costoUnitario(h.carne) + costoUnitario(g.pan) + costoUnitario(h.queso) +
      costoUnitario(g.tomate) * p.tomate + costoUnitario(g.lechuga) * p.lechuga +
      costoUnitario(g.cebolla) * p.cebolla + costoUnitario(g.ketchup) * p.ketchup +
      costoUnitario(g.mayonesa) * p.mayonesa + costoUnitario(g.mostaza) * p.mostaza +
      costoUnitario(h.barbecue) * p.barbecue + costoUnitario(h.pepinillos) * p.pepinillos +
      costoUnitario(h.cebollaCrispy) * p.cebollaCrispy;
  } else if (tipo === "churrascos" || tipo === "lomitos") {
    const c = tipo === "lomitos" ? config.lomitos : config.churrascos;
    costo = costoUnitario(c.carne) + costoUnitario(g.pan) +
      costoUnitario(g.tomate) * p.tomate + costoUnitario(g.lechuga) * p.lechuga +
      costoUnitario(g.cebolla) * p.cebolla + costoUnitario(c.palta) * p.palta +
      costoUnitario(g.ketchup) * p.ketchup + costoUnitario(g.mayonesa) * p.mayonesa +
      costoUnitario(g.mostaza) * p.mostaza;
  } else if (tipo === "hotdogs") {
    const h = config.hotDogs;
    costo = costoUnitario(h.salchichas) + costoUnitario(h.pan) +
      costoUnitario(h.palta) * p.paltaHotDog + costoUnitario(h.tomate) * p.tomateHotDog;
    const despacho = personas === 20
      ? h.despacho20Personas
      : personas >= 100 ? h.despachoDesde100 : h.despachoBase;
    extras = h.mayonesaEvento + h.ketchupEvento + h.salEvento + despacho;
  } else {
    return { servicio: null, total: null };
  }

  const desglose = totalSandwich(personas, cantidad, costo, extras, config);
  return {
    servicio: NOMBRES_SERVICIO[tipo],
    total: desglose.total,
    costoIngredientes: desglose.ingredientes,
    costoUtiles: desglose.utiles,
    servicioEvento: desglose.servicio,
    transporte: config.transporte,
    productosPorPersona,
    cantidadProducto: cantidad
  };
}

function texto(value, maximo) {
  return typeof value === "string" ? value.trim().slice(0, maximo) : "";
}

function textoSeguroParaSheets(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function fechaMinimaChile() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const valor = Object.fromEntries(partes.map((parte) => [parte.type, parte.value]));
  const fecha = new Date(Date.UTC(Number(valor.year), Number(valor.month) - 1, Number(valor.day), 12));
  fecha.setUTCDate(fecha.getUTCDate() + 7);
  return fecha.toISOString().slice(0, 10);
}

function validarPayload(entrada, config = CONFIG) {
  const tipo = texto(entrada.servicioId || entrada.servicio, 30).toLowerCase();
  const personas = Number(entrada.personas);
  const nombre = texto(entrada.nombre, 100);
  const whatsapp = texto(entrada.whatsapp, 30);
  const correo = texto(entrada.correo, 120);
  const tipoEvento = texto(entrada.tipoEvento, 60);
  const fechaEvento = texto(entrada.fechaEvento, 10);
  const comuna = texto(entrada.comuna, 80);
  const direccion = texto(entrada.direccion, 180);
  const productosPorPersona = tipo === "papas"
    ? null
    : Number(entrada.productosPorPersona ?? config.productosPorPersona.predeterminado);

  if (!NOMBRES_SERVICIO[tipo]) return { error: "Servicio inválido." };
  const limites = tipo === "papas" ? config.limites.papas : config.limites.sandwiches;
  if (!Number.isInteger(personas) || personas < limites.minimo || personas > limites.maximo) {
    return { error: "Cantidad de personas inválida." };
  }
  if (tipo !== "papas" && !config.productosPorPersona.opciones.includes(productosPorPersona)) {
    return { error: "Cantidad por persona inválida." };
  }
  if (!nombre || !whatsapp || !TIPOS_EVENTO.has(tipoEvento) || !comuna || !direccion) {
    return { error: "Faltan datos obligatorios." };
  }
  if (!/^[+0-9()\s-]{8,30}$/.test(whatsapp)) return { error: "WhatsApp inválido." };
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return { error: "Correo inválido." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaEvento) || fechaEvento < fechaMinimaChile()) {
    return { error: "La fecha debe tener al menos 7 días de anticipación." };
  }

  return { datos: { tipo, personas, productosPorPersona, nombre, whatsapp, correo,
    tipoEvento, fechaEvento, comuna, direccion } };
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function urlSheets(env) {
  return env.GOOGLE_SHEETS_WEBHOOK_URL || env.GOOGLE_SHEETS_WEBHOOK;
}

async function obtenerConfiguracion(env) {
  const endpoint = urlSheets(env);
  if (!endpoint || !env.FRY_BROS_SECRET) throw new Error("Falta configurar Sheets");
  const separador = endpoint.includes("?") ? "&" : "?";
  const respuesta = await fetch(
    `${endpoint}${separador}secret=${encodeURIComponent(env.FRY_BROS_SECRET)}`,
    { method: "GET", headers: { Accept: "application/json" }, redirect: "follow" }
  );
  const datos = await respuesta.json().catch(() => null);
  if (!respuesta.ok || !datos?.success) throw new Error("Precios no disponibles");
  return construirConfigDesdeSheets(datos);
}

async function registrar(request, env) {
  if (request.method !== "POST") return json({ success: false, error: "Método no permitido." }, 405);
  const origen = request.headers.get("Origin");
  if (origen && origen !== new URL(request.url).origin) {
    return json({ success: false, error: "Origen no permitido." }, 403);
  }
  const endpoint = urlSheets(env);
  if (!endpoint || !env.FRY_BROS_SECRET) {
    return json({ success: false, error: "Registro temporalmente no disponible." }, 503);
  }

  const largo = Number(request.headers.get("Content-Length") || 0);
  if (largo > 12000) return json({ success: false, error: "Solicitud demasiado grande." }, 413);
  let entrada;
  try {
    const crudo = await request.text();
    if (crudo.length > 12000) throw new Error("payload");
    entrada = JSON.parse(crudo);
  } catch {
    return json({ success: false, error: "Datos inválidos." }, 400);
  }

  let config;
  try {
    config = await obtenerConfiguracion(env);
  } catch {
    return json({ success: false, error: "No pudimos consultar los precios actualizados." }, 503);
  }

  const validacion = validarPayload(entrada, config);
  if (validacion.error) return json({ success: false, error: validacion.error }, 400);
  const d = validacion.datos;
  const cotizacion = calcularCotizacionServidor(d.tipo, d.personas, d.productosPorPersona, config);
  if (!cotizacion.total) return json({ success: false, error: "No se pudo calcular la cotización." }, 400);

  const payload = {
    secret: env.FRY_BROS_SECRET,
    fechaRegistro: new Date().toISOString(),
    nombre: textoSeguroParaSheets(d.nombre),
    whatsapp: textoSeguroParaSheets(d.whatsapp),
    correo: textoSeguroParaSheets(d.correo),
    fechaEvento: d.fechaEvento,
    tipoEvento: d.tipoEvento,
    personas: d.personas,
    comuna: textoSeguroParaSheets(`${d.direccion}, ${d.comuna}`),
    direccion: textoSeguroParaSheets(d.direccion),
    ubicacion: textoSeguroParaSheets(`${d.direccion}, ${d.comuna}`),
    servicio: cotizacion.servicio,
    productosPorPersona: cotizacion.productosPorPersona,
    cantidadProducto: cotizacion.cantidadProducto,
    cotizacion: cotizacion.total,
    estado: "Nueva"
  };

  try {
    const respuesta = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow"
    });
    const resultado = await respuesta.json().catch(() => null);
    if (!respuesta.ok || !resultado?.success) throw new Error("apps-script");
    return json({
      success: true,
      cotizacion: cotizacion.total,
      productosPorPersona: cotizacion.productosPorPersona,
      cantidadProducto: cotizacion.cantidadProducto
    });
  } catch {
    return json({ success: false, error: "No se pudo guardar la cotización." }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/cotizaciones") return registrar(request, env);
    return env.ASSETS.fetch(request);
  }
};

export { CONFIG, calcularCotizacionServidor, construirConfigDesdeSheets, validarPayload };
