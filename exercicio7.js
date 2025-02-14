const prompt = require('prompt-sync')();

const raio = parseFloat(prompt("Digite o raio do círculo:"));
console.log("Perímetro do círculo:", 2 * Math.PI * raio);