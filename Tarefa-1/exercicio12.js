const prompt = require('prompt-sync')();

const preco = parseFloat(prompt("Digite o preço:"));
const desconto = parseFloat(prompt("Digite o percentual de desconto:"));
console.log("Preço com desconto:", preco - (preco * desconto / 100));