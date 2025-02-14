const prompt = require('prompt-sync')();

const celsius = parseFloat(prompt("Digite a temperatura em Celsius:"));
const fahrenheit = (celsius * 9/5) + 32;
console.log("Temperatura em Fahrenheit:", fahrenheit);