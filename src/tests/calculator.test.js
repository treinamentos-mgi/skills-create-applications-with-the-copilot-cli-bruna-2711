const { spawnSync } = require('child_process');
const { addition, subtraction, multiplication, division, modulo, exponentiation, squareRoot } = require('../calculator');

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

  describe('modulo', () => {
    test('resto da divisão', () => expect(modulo(10, 3)).toBe(1));
    test('dividendo negativo', () => expect(modulo(-10, 3)).toBe(-1));
    test('divisor zero lança erro', () => {
      expect(() => modulo(10, 0)).toThrow('Módulo por zero não é permitido.');
    });
  });

  describe('exponentiation', () => {
    test('potência inteira', () => expect(exponentiation(2, 3)).toBe(8));
    test('expoente negativo', () => expect(exponentiation(2, -2)).toBe(0.25));
    test('expoente zero', () => expect(exponentiation(2, 0)).toBe(1));
    test('resultado não real ou infinito lança erro', () => {
      expect(() => exponentiation(-1, 0.5)).toThrow();
      expect(() => exponentiation(0, -1)).toThrow();
      expect(() => exponentiation(1e308, 2)).toThrow();
    });
  });

  describe('squareRoot', () => {
    test('raiz quadrada', () => expect(squareRoot(9)).toBe(3));
    test('raiz de zero', () => expect(squareRoot(0)).toBe(0));
    test('número negativo lança erro', () => {
      expect(() => squareRoot(-1)).toThrow('Raiz quadrada de número negativo não é permitida.');
    });
  });

  describe('CLI', () => {
    function run(...args) {
      return spawnSync(process.execPath, [require.resolve('../calculator'), ...args], { encoding: 'utf8' });
    }

    test.each([
      [['mod', '10', '3'], '1'],
      [['pow', '2', '3'], '8'],
      [['sqrt', '9'], '3'],
      [['add', '2', '3'], '5'],
    ])('%s retorna %s', (args, expected) => {
      const result = run(...args);
      expect(result.status).toBe(0);
      expect(result.stdout.trim()).toBe(expected);
    });

    test.each([
      ['mod', '1', '0'],
      ['pow', '-1', '0.5'],
      ['sqrt', '-1'],
      ['sqrt', '9', '2'],
      ['sqrt'],
      ['sqrt', ''],
      ['mod', '1'],
    ])('%s rejeita argumentos inválidos', (...args) => {
      const result = run(...args);
      expect(result.status).toBe(1);
      expect(result.stderr).toMatch(/Erro:/);
    });
  });
  test('zero dividido por zero lança erro', () => {
    expect(() => division(0, 0)).toThrow();
  });
});
