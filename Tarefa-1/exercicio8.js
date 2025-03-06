const prompt = require('prompt-sync')();

const base = parseFloat(prompt("Digite a base:"));
const expoente = parseFloat(prompt("Digite o expoente:"));
console.log("Resultado:", Math.pow(base, expoente));