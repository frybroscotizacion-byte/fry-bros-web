const CONFIG_COTIZADOR = {
  transporte: 7000,

  servicioSandwiches: 60000,

  personasPorSandwich: 2.5,

  // ----------------------------------------------------
  // PAPAS FRITAS
  // Tabla final entregada por Fry Bros
  // ----------------------------------------------------

  papas: {
    40: 103127,
    50: 108821,
    60: 109325,
    70: 125019,
    80: 125523,
    90: 126027,
    100: 141722,
    110: 142226,
    120: 147920,
    130: 168424,
    140: 174118,
    150: 174622,
    160: 180316
  },

  // ----------------------------------------------------
  // PRECIOS GENERALES
  // ----------------------------------------------------

  ingredientes: {
    pan: {
      precio: 3550,
      unidades: 8
    },

    tomate: {
      precio: 1500,
      gramos: 1000
    },

    lechuga: {
      precio: 1300,
      gramosUtilesEstimados: 250
    },

    cebolla: {
      precio: 2000,
      gramos: 1000
    },

    ketchup: {
      precio: 2590,
      gramos: 900
    },

    mayonesa: {
      precio: 3700,
      gramos: 1000
    },

    mostaza: {
      precio: 2700,
      gramos: 1000
    }
  },

  // ----------------------------------------------------
  // HAMBURGUESAS
  // ----------------------------------------------------

  hamburguesas: {
    carne: {
      precio: 10910,
      unidades: 10
    },

    queso: {
      precio: 2000,
      unidades: 8
    },

    barbecue: {
      precio: 7000,
      gramos: 1000
    },

    pepinillos: {
      precio: 8000,
      gramos: 1000
    },

    cebollaCrispy: {
      precio: 1710,
      gramos: 10
    }
  },

  // ----------------------------------------------------
  // CHURRASCOS / LOMITOS
  // ----------------------------------------------------

  churrascos: {
    carne: {
      precio: 16300,
      unidades: 24
    },

    palta: {
      precio: 6000,
      gramos: 1000
    }
  },

  // ----------------------------------------------------
  // ÚTILES
  // ----------------------------------------------------

  utiles: {
    servilletas: {
      precio: 700,
      unidades: 300
    },

    guantes: {
      precio: 5000,
      unidades: 100,
      usoEvento: 10
    },

    platos: {
      precio: 1560,
      unidades: 12
    },

    papelMetalico: 1400,

    gas: 15000
  },

  // ----------------------------------------------------
  // PORCIONES ESTIMADAS POR SANDWICH
  //
  // Estas cantidades son fáciles de modificar después.
  // ----------------------------------------------------

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
    cebollaCrispy: 5
  }
};
