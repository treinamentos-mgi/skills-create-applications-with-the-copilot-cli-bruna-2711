#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   add       (adição)        a + b
 *   subtract  (subtração)     a - b
 *   multiply  (multiplicação) a * b
 *   divide    (divisão)       a / b (divisão por zero gera erro)
 *   mod       (módulo)        resto de a / b
 *   pow       (exponenciação) a elevado a b
 *   sqrt      (raiz quadrada) raiz quadrada de a
 *
 * Uso: node src/calculator.js <operação> <número1> <número2>
 *      node src/calculator.js sqrt <número>
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 3   # 12
 *   node src/calculator.js divide 10 2    # 5
 *   node src/calculator.js mod 10 3       # 1
 *   node src/calculator.js pow 2 3        # 8
 *   node src/calculator.js sqrt 9         # 3
 */

// Adição
function addition(a, b) {
  return a + b;
}

// Subtração
function subtraction(a, b) {
  return a - b;
}

// Multiplicação
function multiplication(a, b) {
  return a * b;
}

// Divisão (lança erro se o divisor for zero)
function division(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Módulo por zero não é permitido.');
  }
  return a % b;
}

function exponentiation(a, b) {
  const result = a ** b;
  if (!Number.isFinite(result)) {
    throw new Error('Resultado da exponenciação não é um número finito.');
  }
  return result;
}

function squareRoot(a) {
  if (a < 0) {
    throw new Error('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(a);
}

const operations = { add: addition, subtract: subtraction, multiply: multiplication, divide: division, mod: modulo, pow: exponentiation, sqrt: squareRoot };

function main(args) {
  const [operation, rawA, rawB] = args;
  const usage = 'Uso: node src/calculator.js <add|subtract|multiply|divide|mod|pow> <número1> <número2>\n' +
    '     node src/calculator.js sqrt <número>';

  if (!Object.hasOwn(operations, operation) || args.length !== (operation === 'sqrt' ? 2 : 3)) {
    console.error(`Erro: operação ou argumentos inválidos.\n${usage}`);
    return 1;
  }

  const a = Number(rawA);
  const b = operation === 'sqrt' ? undefined : Number(rawB);
  if (rawA.trim() === '' || !Number.isFinite(a) ||
      (operation !== 'sqrt' && (rawB.trim() === '' || !Number.isFinite(b)))) {
    console.error(`Erro: os operandos devem ser números válidos.\n${usage}`);
    return 1;
  }

  try {
    console.log(operations[operation](a, b));
    return 0;
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = { addition, subtraction, multiplication, division, modulo, exponentiation, squareRoot };
