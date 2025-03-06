const prompt = require('prompt-sync')();

const fahrenheit2 = parseFloat(prompt("Digite a temperatura em Fahrenheit:"));
const celsius2 = (fahrenheit2 - 32) * 5/9;
console.log("Temperatura em Celsius:", celsius2);