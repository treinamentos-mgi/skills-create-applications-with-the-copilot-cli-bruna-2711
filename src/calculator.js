#!/usr/bin/env node
/**
 * Calculadora CLI
 *
 * Operações suportadas:
 *   add       (adição)        a + b
 *   subtract  (subtração)     a - b
 *   multiply  (multiplicação) a * b
 *   divide    (divisão)       a / b (divisão por zero gera erro)
 *
 * Uso: node src/calculator.js <operação> <número1> <número2>
 *   node src/calculator.js add 2 3        # 5
 *   node src/calculator.js subtract 5 2   # 3
 *   node src/calculator.js multiply 4 3   # 12
 *   node src/calculator.js divide 10 2    # 5
 */

// Adição
function add(a, b) {
  return a + b;
}

// Subtração
function subtract(a, b) {
  return a - b;
}

// Multiplicação
function multiply(a, b) {
  return a * b;
}

// Divisão (lança erro se o divisor for zero)
function divide(a, b) {
  if (b === 0) {
    throw new Error('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = { add, subtract, multiply, divide };

function main(args) {
  const [operation, rawA, rawB] = args;
  const usage = 'Uso: node src/calculator.js <add|subtract|multiply|divide> <número1> <número2>';

  if (args.length !== 3 || !Object.hasOwn(operations, operation)) {
    console.error(`Erro: operação ou argumentos inválidos.\n${usage}`);
    return 1;
  }

  const a = Number(rawA);
  const b = Number(rawB);
  if (rawA.trim() === '' || rawB.trim() === '' || !Number.isFinite(a) || !Number.isFinite(b)) {
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

module.exports = { add, subtract, multiply, divide };
