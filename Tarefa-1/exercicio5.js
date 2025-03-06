const prompt = require('prompt-sync')();

const raio = parseFloat(prompt("Digite o raio do círculo:"));
console.log("Área do círculo:", Math.PI * raio * raio);