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
  40: 103127, 50: 108821, 60: 109325, 70: 125019, 80: 125523,
  90: 126027, 100: 141722, 110: 142226, 120: 147920,
  130: 168424, 140: 174118, 150: 174622, 160: 180316
};
for (const [people, expected] of Object.entries(potatoExpected)) {
  assert.equal(calculator.calcular("papas", Number(people)).total, expected);
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
}

assert.equal(
  calculator.calcular("churrascos", 100).total,
  calculator.calcular("lomitos", 100).total
);
assert.equal(calculator.calcular("hotdogs", 20).cantidadProducto, 40);
assert.equal(calculator.calcular("hotdogs", 100).cantidadProducto, 200);

const payloadValido = validarPayload({
  servicioId: "hamburguesas",
  personas: 100,
  nombre: "Cliente de prueba",
  whatsapp: "+56 9 1234 5678",
  correo: "cliente@example.com",
  tipoEvento: "Cumpleaños",
  fechaEvento: "2099-12-31",
  comuna: "Colina",
  direccion: "Dirección de prueba 123"
});
assert.ok(payloadValido.datos, "El Worker debe aceptar una cotización válida");
assert.ok(validarPayload({ ...payloadValido.datos, servicioId: "hamburguesas", personas: 110 }).error);

console.log("Pruebas correctas: tramos, papas, hot dogs y sándwiches.");
