const prompt = require('prompt-sync')();

const capital = parseFloat(prompt("Digite o capital:"));
const taxa = parseFloat(prompt("Digite a taxa de juros:"));
const periodo = parseFloat(prompt("Digite o período:"));
console.log("Montante com juros compostos:", capital * Math.pow((1 + taxa), periodo));