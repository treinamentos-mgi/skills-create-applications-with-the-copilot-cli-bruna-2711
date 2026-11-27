const { addition, subtraction, multiplication, division, modulo, power, squareRoot } = require('../calculator');

describe('addition', () => {
  test('2 + 3 = 5', () => expect(addition(2, 3)).toBe(5));
  test('números negativos', () => expect(addition(-2, -3)).toBe(-5));
  test('positivo + negativo', () => expect(addition(5, -8)).toBe(-3));
  test('zero é elemento neutro', () => expect(addition(7, 0)).toBe(7));
  test('decimais', () => expect(addition(0.1, 0.2)).toBeCloseTo(0.3));
  test('números grandes', () => expect(addition(1e15, 1e15)).toBe(2e15));
});

describe('subtraction', () => {
  test('10 - 4 = 6', () => expect(subtraction(10, 4)).toBe(6));
  test('resultado negativo', () => expect(subtraction(4, 10)).toBe(-6));
  test('número negativo', () => expect(subtraction(5, -3)).toBe(8));
  test('subtrair zero', () => expect(subtraction(9, 0)).toBe(9));
  test('decimais', () => expect(subtraction(0.3, 0.1)).toBeCloseTo(0.2));
});

describe('multiplication', () => {
  test('45 * 2 = 90', () => expect(multiplication(45, 2)).toBe(90));
  test('multiplicar por zero', () => expect(multiplication(123, 0)).toBe(0));
  test('multiplicar por um', () => expect(multiplication(8, 1)).toBe(8));
  test('sinais diferentes', () => expect(multiplication(-4, 3)).toBe(-12));
  test('dois negativos', () => expect(multiplication(-4, -3)).toBe(12));
  test('decimais', () => expect(multiplication(0.5, 0.5)).toBeCloseTo(0.25));
});

describe('division', () => {
  test('20 / 5 = 4', () => expect(division(20, 5)).toBe(4));
  test('resultado decimal', () => expect(division(1, 4)).toBe(0.25));
  test('numerador negativo', () => expect(division(-10, 2)).toBe(-5));
  test('dois negativos', () => expect(division(-10, -2)).toBe(5));
  test('zero dividido por número', () => expect(division(0, 5)).toBe(0));
  test('divisão por zero lança erro', () => {
    expect(() => division(10, 0)).toThrow('Divisão por zero não é permitida.');
  });
  test('zero dividido por zero lança erro', () => {
    expect(() => division(0, 0)).toThrow();
  });
});

describe('modulo', () => {
  test('5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('divisão exata retorna 0', () => expect(modulo(10, 5)).toBe(0));
  test('dividendo menor que divisor', () => expect(modulo(2, 5)).toBe(2));
  test('dividendo negativo mantém o sinal', () => expect(modulo(-5, 2)).toBe(-1));
  test('decimais', () => expect(modulo(5.5, 2)).toBeCloseTo(1.5));
  test('zero módulo número', () => expect(modulo(0, 3)).toBe(0));
  test('módulo por zero lança erro', () => {
    expect(() => modulo(5, 0)).toThrow('Módulo por zero não é permitido.');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('expoente zero', () => expect(power(5, 0)).toBe(1));
  test('expoente um', () => expect(power(7, 1)).toBe(7));
  test('expoente negativo', () => expect(power(2, -2)).toBe(0.25));
  test('base negativa com expoente ímpar', () => expect(power(-2, 3)).toBe(-8));
  test('base negativa com expoente par', () => expect(power(-2, 2)).toBe(4));
  test('expoente fracionário', () => expect(power(9, 0.5)).toBe(3));
  test('zero elevado a zero', () => expect(power(0, 0)).toBe(1));
});

describe('squareRoot', () => {
  test('√16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('√0 = 0', () => expect(squareRoot(0)).toBe(0));
  test('√1 = 1', () => expect(squareRoot(1)).toBe(1));
  test('resultado decimal', () => expect(squareRoot(2)).toBeCloseTo(1.41421356));
  test('número decimal', () => expect(squareRoot(0.25)).toBe(0.5));
  test('número grande', () => expect(squareRoot(1e20)).toBe(1e10));
  test('número negativo lança erro', () => {
    expect(() => squareRoot(-1)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
  });
  test('negativo decimal lança erro', () => {
    expect(() => squareRoot(-0.01)).toThrow();
  });
});
