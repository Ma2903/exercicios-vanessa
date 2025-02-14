const prompt = require('prompt-sync')();

const metros = parseFloat(prompt("Digite o valor em metros:"));
console.log("Em centímetros:", metros * 100);