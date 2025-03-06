const prompt = require('prompt-sync')();

const largura = parseFloat(prompt("Digite a largura do retângulo:"));
const altura = parseFloat(prompt("Digite a altura do retângulo:"));
console.log("Área do retângulo:", largura * altura);