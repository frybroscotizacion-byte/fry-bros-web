import fs from "node:fs";
import assert from "node:assert/strict";
import { calcularCotizacionServidor, construirConfigDesdeSheets } from "./worker.mjs";

const i = (precio, contenido) => ({ precio, contenido, costoUnitario: precio / contenido });
const u = (precio, contenido, costoFijoBase = 0) => ({ precio, contenido, costoFijoBase });

const datos = {
  success: true,
  insumos: {
    pan_sandwich: i(3550, 8), tomate_sandwich: i(1500, 1000), lechuga: i(1300, 250),
    cebolla: i(2000, 1000), ketchup: i(2590, 900), mayonesa: i(3700, 1000),
    mostaza: i(2700, 1000), carne_hamb: i(10910, 10), queso_cheddar: i(2000, 8),
    barbecue: i(7000, 1000), pepinillos: i(8000, 1000), cebolla_crispy: i(1710, 10),
    carne_churrasco: i(16300, 24), palta_churrasco: i(6000, 1000),
    carne_lomito: i(16300, 24), salchicha_hd: i(8461, 20), pan_hd: i(1890, 8),
    palta_hd: i(4490, 1000), tomate_hd: i(1990, 1000), papa_prefrita: i(5190, 2500)
  },
  utiles: {
    servilletas: u(700, 300), platos: u(1560, 12), guantes: u(5000, 100, 500),
    papel: u(1400, 1, 1400), gas: u(15000, 1, 15000), aceite: u(12550, 1, 25100),
    sal: u(340, 1, 340), ketchup_papas: u(2590, 1, 2590), sobre_papas: u(33.61, 1),
    mayo_hd: u(2880, 1, 2880), ketchup_hd: u(2990, 1, 2990), despacho_hd: u(3000, 1, 3000)
  },
  parametros: {
    TRANSPORTE: 7000, SERVICIO_20_50: 60000, SERVICIO_51_100: 80000,
    MIN_SANDWICH: 20, MAX_SANDWICH: 100, MIN_PAPAS: 40, MAX_PAPAS: 160,
    GRAMOS_PAPAS_PERSONA: 110, SOBRES_PAPAS_PERSONA: 1.5,
    DESPACHO_HD_20: 3800, DESPACHO_HD_30_90: 3000, DESPACHO_HD_100: 5000,
    REDONDEO: 1000, PAPAS_SERVICIO_40_69: 40000, PAPAS_SERVICIO_70_99: 50000,
    PAPAS_SERVICIO_100_129: 60000, PAPAS_SERVICIO_130_160: 80000
  }
};

const config = construirConfigDesdeSheets(datos);
assert.equal(calcularCotizacionServidor("papas", 40, null, config).total, 105026.6);
assert.equal(calcularCotizacionServidor("papas", 100, null, config).total, 143621.5);
assert.equal(calcularCotizacionServidor("hamburguesas", 20, 2, config).total, 207000);
assert.equal(calcularCotizacionServidor("hotdogs", 20, 2, config).total, 138000);
assert.equal(calcularCotizacionServidor("churrascos", 20, 2, config).total, 149000);
assert.equal(calcularCotizacionServidor("lomitos", 20, 2, config).total, 149000);

const sinPapel = structuredClone(datos);
sinPapel.utiles.papel.costoFijoBase = 0;
const configSinPapel = construirConfigDesdeSheets(sinPapel);
assert.equal(calcularCotizacionServidor("hamburguesas", 20, 2, configSinPapel).total, 206000);

const carneMasCara = structuredClone(datos);
carneMasCara.insumos.carne_hamb.precio = 20000;
const configCarneMasCara = construirConfigDesdeSheets(carneMasCara);
assert.ok(
  calcularCotizacionServidor("hamburguesas", 20, 2, configCarneMasCara).total >
  calcularCotizacionServidor("hamburguesas", 20, 2, config).total
);

console.log("Pruebas correctas: los precios cambian al modificar Sheets.");

const app = fs.readFileSync(new URL("./js/cotizador.js", import.meta.url), "utf8");
assert.match(app, /id="cotizador-productos-por-persona"/);
assert.match(app, /const registro = await registrarCotizacion/);
assert.match(app, /No pudimos consultar los precios actualizados/);

for (const [ruta, id] of [
  ["pages/papas-fritas.html", "papas-fritas"],
  ["pages/hamburguesas.html", "hamburguesas"],
  ["pages/hot-dogs.html", "hot-dogs"],
  ["pages/lomitos.html", "lomitos"],
  ["pages/churrascos.html", "churrascos"]
]) {
  const pagina = fs.readFileSync(new URL(`./${ruta}`, import.meta.url), "utf8");
  assert.match(pagina, new RegExp(`data-servicio="${id}"`));
}
