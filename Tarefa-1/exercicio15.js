const prompt = require('prompt-sync')();

const dias = parseFloat(prompt("Digite o valor em dias:"));
console.log("Horas:", dias * 24);
console.log("Minutos:", dias * 24 * 60);
console.log("Segundos:", dias * 24 * 60 * 60);