const prompt = require('prompt-sync')();

const km = parseFloat(prompt("Digite o valor em quilômetros:"));
console.log("Em milhas:", km * 0.621371);