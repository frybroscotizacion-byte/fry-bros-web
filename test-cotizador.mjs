import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import { calcularCotizacionServidor, validarPayload } from "./worker.mjs";

const data = fs.readFileSync(new URL("./data/cotizador.js", import.meta.url), "utf8");
const app = fs.readFileSync(new URL("./js/cotizador.js", import.meta.url), "utf8");

const callbacks = {};
const context = {
  console,
  Intl,
  Math,
  document: {
    addEventListener(name, callback) {
      callbacks[name] = callback;
    }
  }
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(data + "\n" + app, context);

const calculator = context.FRY_BROS_COTIZADOR;
assert.ok(calculator, "La calculadora debe quedar disponible");

const tiers = [
  [20, 80000],
  [50, 80000],
  [60, 80000],
  [100, 80000]
];

for (const [people, expected] of tiers) {
  assert.equal(calculator.calcularServicio(people), expected);
}

const potatoExpected = {
  40: 150000, 50: 150000, 60: 150000, 70: 160000, 80: 160000,
  90: 160000, 100: 170000, 110: 170000, 120: 170000,
  130: 170000, 140: 180000, 150: 180000, 160: 190000
};
for (const [people, expected] of Object.entries(potatoExpected)) {
  assert.equal(calculator.calcular("papas", Number(people)).total, expected);
}
for (const people of [41, 57, 99, 137, 159]) {
  const quote = calculator.calcular("papas", people);
  assert.equal(quote.servicioEvento, 80000);
  assert.equal(calcularCotizacionServidor("papas", people).total, quote.total);
}

const limitesPorServicio = {
  hamburguesas: [20, 50],
};

for (const [type, cantidadesValidas] of Object.entries(limitesPorServicio)) {
  for (const people of cantidadesValidas) {
    const quote = calculator.calcular(type, people);
    assert.equal(quote.personas, people);
    assert.equal(quote.servicioEvento, 80000);
    assert.ok(Number.isFinite(quote.total) && quote.total > 0);
    assert.equal(quote.total % 10000, 0);
    assert.equal(
      calcularCotizacionServidor(type, people).total,
      quote.total,
      `El Worker debe recalcular ${type} para ${people} personas`
    );
  }

  for (const productsPerPerson of [1, 1.5, 2, 2.5, 3]) {
    for (const people of [cantidadesValidas[0], cantidadesValidas.at(-1)]) {
      const quote = calculator.calcular(type, people, productsPerPerson);
      const serverQuote = calcularCotizacionServidor(type, people, productsPerPerson);
      assert.equal(quote.cantidadProducto, Math.ceil(people * productsPerPerson));
      assert.equal(serverQuote.cantidadProducto, quote.cantidadProducto);
      assert.equal(serverQuote.productosPorPersona, productsPerPerson);
      assert.equal(serverQuote.total, quote.total);
    }
  }
}

assert.equal(calculator.calcular("hamburguesas", 20).cantidadProducto, 40);
assert.equal(calculator.calcular("hamburguesas", 50).cantidadProducto, 100);
assert.equal(calculator.calcular("hamburguesas", 35, 2).total, 320000);

const payloadValido = validarPayload({
  servicioId: "hamburguesas",
  personas: 50,
  productosPorPersona: 2.5,
  nombre: "Cliente de prueba",
  whatsapp: "+56 9 1234 5678",
  correo: "cliente@example.com",
  tipoEvento: "Cumpleaños",
  fechaEvento: "2099-12-31",
  comuna: "Colina",
  direccion: "Dirección de prueba 123"
});
assert.ok(payloadValido.datos, "El Worker debe aceptar una cotización válida");
assert.equal(payloadValido.datos.productosPorPersona, 2.5);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", personas: 51 }).error);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "churrascos", personas: 51 }).error);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", personas: 37 }).datos);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hotdogs", personas: 100 }).error);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "lomitos", personas: 100 }).error);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "papas", personas: 73 }).datos);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", productosPorPersona: 4 }).error);
assert.ok(calculator.calcular("hamburguesas", 51).error);
assert.ok(calculator.calcular("churrascos", 51).error);
assert.equal(calcularCotizacionServidor("hamburguesas", 51).total, null);
assert.equal(calcularCotizacionServidor("churrascos", 51).total, null);
assert.match(app, /id="cotizador-productos-por-persona"/);
assert.match(app, /productosPorPersona/);
assert.match(app, /type="number"/);

const paginasServicio = [
  ["pages/papas-fritas.html", "papas-fritas"],
  ["pages/hamburguesas.html", "hamburguesas"],
];

for (const [ruta, id] of paginasServicio) {
  const pagina = fs.readFileSync(new URL(`./${ruta}`, import.meta.url), "utf8");
  assert.match(pagina, new RegExp(`data-servicio="${id}"`));
  assert.match(pagina, /detalle-servicio\.css/);
  assert.match(pagina, /detalle-servicio\.js/);
}

const detalleServicio = fs.readFileSync(new URL("./js/detalle-servicio.js", import.meta.url), "utf8");
const eventosData = fs.readFileSync(new URL("./data/eventos.js", import.meta.url), "utf8");

assert.match(detalleServicio, /images\/hamburguesa-evento\.jpg/);
assert.match(detalleServicio, /docs\/menu-hamburguesas\.pdf/);
assert.match(detalleServicio, /American Bacon/);
assert.match(detalleServicio, /Special Fry Bros/);
assert.match(eventosData, /images\/equipo-evento\.jpg/);

for (const ruta of [
  "images/hamburguesa-evento.jpg",
  "images/equipo-evento.jpg",
  "docs/menu-hamburguesas.pdf"
]) {
  assert.ok(fs.statSync(new URL(`./${ruta}`, import.meta.url)).size > 1000, `${ruta} debe existir y tener contenido`);
}

console.log("Pruebas correctas: cotizador seguro, menú de hamburguesas y galería actualizados.");

for (const retired of ["hotdogs", "churrascos", "lomitos"]) {
  assert.ok(calculator.calcular(retired, 30).error);
  assert.equal(calcularCotizacionServidor(retired, 30).total, null);
  assert.ok(validarPayload({ ...payloadValido.datos, servicioId: retired, personas: 30 }).error);
}

// Every supported quote rounds upward by less than $10,000 and agrees with the server.
for (const [type, min, max] of [["papas", 40, 160], ["hamburguesas", 20, 50]]) {
  for (let people = min; people <= max; people++) {
    for (const quantity of (type === "papas" ? [2] : [1, 1.5, 2, 2.5, 3])) {
      const quote = calculator.calcular(type, people, quantity);
      const raw = quote.costoIngredientes + quote.costoUtiles + quote.servicioEvento + quote.transporte;
      assert.equal(quote.total % 10000, 0);
      assert.ok(quote.total >= raw && quote.total - raw < 10000);
      assert.equal(calcularCotizacionServidor(type, people, quantity).total, quote.total);
    }
  }
}
