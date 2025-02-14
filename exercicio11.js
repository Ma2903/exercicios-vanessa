const prompt = require('prompt-sync')();

const peso = parseFloat(prompt("Digite seu peso (kg):"));
const altura2 = parseFloat(prompt("Digite sua altura (m):"));
console.log("IMC:", peso / (altura2 * altura2));