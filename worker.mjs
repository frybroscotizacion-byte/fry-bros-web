const CONFIG = {
  transporte: 7000,
  tarifa: { hasta50: 60000, hasta100: 80000 },
  hamburguesasPorPersona: 2,
  churrascosLomitosPorPersona: 2.5,
  hotDogsPorPersona: 2,
  papas: {
    40: 103127, 50: 108821, 60: 109325, 70: 125019,
    80: 125523, 90: 126027, 100: 141722, 110: 142226,
    120: 147920, 130: 168424, 140: 174118, 150: 174622,
    160: 180316
  },
  ingredientes: {
    pan: { precio: 3550, unidades: 8 },
    tomate: { precio: 1500, gramos: 1000 },
    lechuga: { precio: 1300, gramos: 250 },
    cebolla: { precio: 2000, gramos: 1000 },
    ketchup: { precio: 2590, gramos: 900 },
    mayonesa: { precio: 3700, gramos: 1000 },
    mostaza: { precio: 2700, gramos: 1000 }
  },
  hamburguesas: {
    carne: { precio: 10910, unidades: 10 },
    queso: { precio: 2000, unidades: 8 },
    barbecue: { precio: 7000, gramos: 1000 },
    pepinillos: { precio: 8000, gramos: 1000 },
    cebollaCrispy: { precio: 1710, gramos: 10 }
  },
  churrascos: {
    carne: { precio: 16300, unidades: 24 },
    palta: { precio: 6000, gramos: 1000 }
  },
  hotDogs: {
    salchichas: { precio: 8461, unidades: 20 },
    pan: { precio: 1890, unidades: 8 },
    palta: { precio: 4490, gramos: 1000 },
    tomate: { precio: 1990, gramos: 1000 },
    mayonesaEvento: 2880,
    ketchupEvento: 2990,
    salEvento: 340,
    despachoBase: 3000,
    despacho20Personas: 3800,
    despachoDesde100: 5000
  },
  utiles: {
    servilletas: { precio: 700, unidades: 300 },
    guantes: { precio: 5000, unidades: 100, usoEvento: 10 },
    platos: { precio: 1560, unidades: 12 },
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

const unidad = (precio, unidades) => precio / unidades;
const gramo = (precio, gramos) => precio / gramos;
const redondear = (numero) => Math.ceil(numero / 1000) * 1000;

function calcularUtiles(personas) {
  const u = CONFIG.utiles;
  return Math.ceil(personas / u.servilletas.unidades) * u.servilletas.precio +
    Math.ceil(personas / u.platos.unidades) * u.platos.precio +
    unidad(u.guantes.precio, u.guantes.unidades) * u.guantes.usoEvento +
    u.papelMetalico + u.gas;
}

function totalSandwich(personas, cantidad, costoPorUnidad, extras = 0) {
  const ingredientes = cantidad * costoPorUnidad + extras;
  const tarifa = personas <= 50 ? CONFIG.tarifa.hasta50 : CONFIG.tarifa.hasta100;
  return redondear(ingredientes + calcularUtiles(personas) + tarifa + CONFIG.transporte);
}

function calcularCotizacionServidor(tipo, personas) {
  if (tipo === "papas") {
    return { servicio: NOMBRES_SERVICIO[tipo], total: CONFIG.papas[personas] || null };
  }

  const g = CONFIG.ingredientes;
  const p = CONFIG.porciones;

  if (tipo === "hamburguesas") {
    const h = CONFIG.hamburguesas;
    const cantidad = Math.ceil(personas * CONFIG.hamburguesasPorPersona);
    const costo = unidad(h.carne.precio, h.carne.unidades) +
      unidad(g.pan.precio, g.pan.unidades) +
      unidad(h.queso.precio, h.queso.unidades) +
      gramo(g.tomate.precio, g.tomate.gramos) * p.tomate +
      gramo(g.lechuga.precio, g.lechuga.gramos) * p.lechuga +
      gramo(g.cebolla.precio, g.cebolla.gramos) * p.cebolla +
      gramo(g.ketchup.precio, g.ketchup.gramos) * p.ketchup +
      gramo(g.mayonesa.precio, g.mayonesa.gramos) * p.mayonesa +
      gramo(g.mostaza.precio, g.mostaza.gramos) * p.mostaza +
      gramo(h.barbecue.precio, h.barbecue.gramos) * p.barbecue +
      gramo(h.pepinillos.precio, h.pepinillos.gramos) * p.pepinillos +
      gramo(h.cebollaCrispy.precio, h.cebollaCrispy.gramos) * p.cebollaCrispy;
    return { servicio: NOMBRES_SERVICIO[tipo], total: totalSandwich(personas, cantidad, costo) };
  }

  if (tipo === "churrascos" || tipo === "lomitos") {
    const c = CONFIG.churrascos;
    const cantidad = Math.ceil(personas * CONFIG.churrascosLomitosPorPersona);
    const costo = unidad(c.carne.precio, c.carne.unidades) +
      unidad(g.pan.precio, g.pan.unidades) +
      gramo(g.tomate.precio, g.tomate.gramos) * p.tomate +
      gramo(g.lechuga.precio, g.lechuga.gramos) * p.lechuga +
      gramo(g.cebolla.precio, g.cebolla.gramos) * p.cebolla +
      gramo(c.palta.precio, c.palta.gramos) * p.palta +
      gramo(g.ketchup.precio, g.ketchup.gramos) * p.ketchup +
      gramo(g.mayonesa.precio, g.mayonesa.gramos) * p.mayonesa +
      gramo(g.mostaza.precio, g.mostaza.gramos) * p.mostaza;
    return { servicio: NOMBRES_SERVICIO[tipo], total: totalSandwich(personas, cantidad, costo) };
  }

  if (tipo === "hotdogs") {
    const h = CONFIG.hotDogs;
    const cantidad = Math.ceil(personas * CONFIG.hotDogsPorPersona);
    const costo = unidad(h.salchichas.precio, h.salchichas.unidades) +
      unidad(h.pan.precio, h.pan.unidades) +
      gramo(h.palta.precio, h.palta.gramos) * p.paltaHotDog +
      gramo(h.tomate.precio, h.tomate.gramos) * p.tomateHotDog;
    const despacho = personas === 20
      ? h.despacho20Personas
      : personas >= 100 ? h.despachoDesde100 : h.despachoBase;
    const extras = h.mayonesaEvento + h.ketchupEvento + h.salEvento + despacho;
    return { servicio: NOMBRES_SERVICIO[tipo], total: totalSandwich(personas, cantidad, costo, extras) };
  }

  return { servicio: null, total: null };
}

function texto(value, maximo) {
  return typeof value === "string" ? value.trim().slice(0, maximo) : "";
}

function textoSeguroParaSheets(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function fechaMinimaChile() {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Santiago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const valor = Object.fromEntries(partes.map((parte) => [parte.type, parte.value]));
  const fecha = new Date(Date.UTC(Number(valor.year), Number(valor.month) - 1, Number(valor.day), 12));
  fecha.setUTCDate(fecha.getUTCDate() + 7);
  return fecha.toISOString().slice(0, 10);
}

function validarPayload(entrada) {
  const tipo = texto(entrada.servicioId || entrada.servicio, 30).toLowerCase();
  const personas = Number(entrada.personas);
  const nombre = texto(entrada.nombre, 100);
  const whatsapp = texto(entrada.whatsapp, 30);
  const correo = texto(entrada.correo, 120);
  const tipoEvento = texto(entrada.tipoEvento, 60);
  const fechaEvento = texto(entrada.fechaEvento, 10);
  const comuna = texto(entrada.comuna, 80);
  const direccion = texto(entrada.direccion, 180);

  if (!NOMBRES_SERVICIO[tipo]) return { error: "Servicio inválido." };
  const rangoCorrecto = tipo === "papas"
    ? personas >= 40 && personas <= 160
    : personas >= 20 && personas <= 100;
  if (!Number.isInteger(personas) || personas % 10 !== 0 || !rangoCorrecto) {
    return { error: "Cantidad de personas inválida." };
  }
  if (!nombre || !whatsapp || !TIPOS_EVENTO.has(tipoEvento) || !comuna || !direccion) {
    return { error: "Faltan datos obligatorios." };
  }
  if (!/^[+0-9()\s-]{8,30}$/.test(whatsapp)) return { error: "WhatsApp inválido." };
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return { error: "Correo inválido." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaEvento) || fechaEvento < fechaMinimaChile()) {
    return { error: "La fecha debe tener al menos 7 días de anticipación." };
  }

  return {
    datos: { tipo, personas, nombre, whatsapp, correo, tipoEvento, fechaEvento, comuna, direccion }
  };
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

async function registrar(request, env) {
  if (request.method !== "POST") return json({ success: false, error: "Método no permitido." }, 405);
  const origen = request.headers.get("Origin");
  if (origen && origen !== new URL(request.url).origin) {
    return json({ success: false, error: "Origen no permitido." }, 403);
  }
  const sheetsWebhookUrl = env.GOOGLE_SHEETS_WEBHOOK_URL || env.GOOGLE_SHEETS_WEBHOOK;
  if (!sheetsWebhookUrl || !env.FRY_BROS_SECRET) {
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

  const validacion = validarPayload(entrada);
  if (validacion.error) return json({ success: false, error: validacion.error }, 400);

  const d = validacion.datos;
  const cotizacion = calcularCotizacionServidor(d.tipo, d.personas);
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
    // El Apps Script actual escribe `comuna` en la columna LUGAR. Se envía
    // la ubicación completa para conservar también la dirección del evento.
    comuna: textoSeguroParaSheets(`${d.direccion}, ${d.comuna}`),
    direccion: textoSeguroParaSheets(d.direccion),
    ubicacion: textoSeguroParaSheets(`${d.direccion}, ${d.comuna}`),
    servicio: cotizacion.servicio,
    cotizacion: cotizacion.total,
    estado: "Nueva"
  };

  try {
    const respuesta = await fetch(sheetsWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow"
    });
    const resultado = await respuesta.json().catch(() => null);
    if (!respuesta.ok || !resultado?.success) throw new Error("apps-script");
    return json({ success: true, cotizacion: cotizacion.total });
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

export { calcularCotizacionServidor, validarPayload };
