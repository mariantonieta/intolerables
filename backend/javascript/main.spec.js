//Casos de uso
const { it, expect } = require("@jest/globals");
const CalculadorArea = require("./js");
describe("Calculador de areas", () => {
  const calculadorArea = new CalculadorArea();
  //Calcular el area de un cuadrado
  it("Calcular el area de un cuadrado de 5 * 5 y el resultado debe de ser 25", () => {
    const resultado = calculadorArea.calcularAreaCuadrado(5);
    expect(resultado).toBe(25);
  });
});
