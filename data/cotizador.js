const CONFIG_COTIZADOR = {
  transporte: 7000,

  // Tarifa de montaje, atención y cocina para todos los servicios
  // excepto Papas Fritas, que conserva su tabla final independiente.
  servicioSandwiches: {
    hasta50: 60000,
    hasta100: 80000
  },

  limitesPersonas: {
    papas: { minimo: 40, maximo: 160 },
    sandwiches: { minimo: 20, maximo: 100 }
  },

  whatsappNegocio: "56942863211",

  // Ruta segura del Worker. Las claves permanecen en Cloudflare y nunca
  // se publican en el JavaScript que recibe el navegador.
  registroEndpoint: "/api/cotizaciones",

  productosPorPersona: {
    predeterminado: 2,
    opciones: [1, 1.5, 2, 2.5, 3]
  },

  // PAPAS FRITAS — cálculo continuo con servicio fijo de $80.000.
  papas: {
    gramosPorPersona: 110,
    bolsa: { precio: 5190, gramos: 2500 },
    sobresPorPersona: 1.5,
    precioSobre: 33.61,
    aceiteEvento: 25100,
    salEvento: 340,
    servilletasEvento: 700,
    gasEvento: 15000,
    ketchupEvento: 2590,
    servicioEvento: 80000
  },

  ingredientes: {
    pan: { precio: 3550, unidades: 8 },
    tomate: { precio: 1500, gramos: 1000 },
    lechuga: { precio: 1300, gramosUtilesEstimados: 250 },
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
    tomate: 25,
    lechuga: 15,
    cebolla: 15,
    ketchup: 10,
    mayonesa: 10,
    mostaza: 5,
    palta: 30,
    barbecue: 5,
    pepinillos: 10,
    cebollaCrispy: 5,
    tomateHotDog: 50,
    paltaHotDog: 50
  }
};
