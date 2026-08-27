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
  [20, 60000],
  [50, 60000],
  [60, 80000],
  [100, 80000]
];

for (const [people, expected] of tiers) {
  assert.equal(calculator.calcularServicio(people), expected);
}

const potatoExpected = {
  40: 143127, 50: 148821, 60: 149325, 70: 155019, 80: 155523,
  90: 156027, 100: 161722, 110: 162226, 120: 167920,
  130: 168424, 140: 174118, 150: 174622, 160: 180316
};
for (const [people, expected] of Object.entries(potatoExpected)) {
  assert.equal(calculator.calcular("papas", Number(people)).total, expected);
}
for (const people of [41, 57, 99, 137, 159]) {
  const quote = calculator.calcular("papas", people);
  assert.equal(quote.servicioEvento, 80000);
  assert.equal(calcularCotizacionServidor("papas", people).total, quote.total);
}

for (const type of ["hamburguesas", "hotdogs", "churrascos", "lomitos"]) {
  for (const people of [20, 50, 60, 100]) {
    const quote = calculator.calcular(type, people);
    assert.equal(quote.personas, people);
    assert.ok(Number.isFinite(quote.total) && quote.total > 0);
    assert.equal(quote.total % 1000, 0);
    assert.equal(
      calcularCotizacionServidor(type, people).total,
      quote.total,
      `El Worker debe recalcular ${type} para ${people} personas`
    );
  }

  for (const productsPerPerson of [1, 1.5, 2, 2.5, 3]) {
    for (const people of [20, 100]) {
      const quote = calculator.calcular(type, people, productsPerPerson);
      const serverQuote = calcularCotizacionServidor(type, people, productsPerPerson);
      assert.equal(quote.cantidadProducto, Math.ceil(people * productsPerPerson));
      assert.equal(serverQuote.cantidadProducto, quote.cantidadProducto);
      assert.equal(serverQuote.productosPorPersona, productsPerPerson);
      assert.equal(serverQuote.total, quote.total);
    }
  }
}

assert.equal(
  calculator.calcular("churrascos", 100).total,
  calculator.calcular("lomitos", 100).total
);
assert.equal(calculator.calcular("hamburguesas", 20).cantidadProducto, 40);
assert.equal(calculator.calcular("hamburguesas", 100).cantidadProducto, 200);
assert.equal(calculator.calcular("churrascos", 20).cantidadProducto, 40);
assert.equal(calculator.calcular("lomitos", 100).cantidadProducto, 200);
assert.equal(calculator.calcular("hotdogs", 20).cantidadProducto, 40);
assert.equal(calculator.calcular("hotdogs", 100).cantidadProducto, 200);

const payloadValido = validarPayload({
  servicioId: "hamburguesas",
  personas: 100,
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
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", personas: 110 }).error);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", personas: 37 }).datos);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "papas", personas: 73 }).datos);
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", productosPorPersona: 4 }).error);
assert.match(app, /id="cotizador-productos-por-persona"/);
assert.match(app, /productosPorPersona/);
assert.match(app, /type="number"/);

const paginasServicio = [
  ["pages/papas-fritas.html", "papas-fritas"],
  ["pages/hamburguesas.html", "hamburguesas"],
  ["pages/hot-dogs.html", "hot-dogs"],
  ["pages/lomitos.html", "lomitos"],
  ["pages/churrascos.html", "churrascos"]
];

for (const [ruta, id] of paginasServicio) {
  const pagina = fs.readFileSync(new URL(`./${ruta}`, import.meta.url), "utf8");
  assert.match(pagina, new RegExp(`data-servicio="${id}"`));
  assert.match(pagina, /detalle-servicio\.css/);
  assert.match(pagina, /detalle-servicio\.js/);
}

console.log("Pruebas correctas: cantidades variables, tramos, papas, hot dogs y sándwiches.");
