const prompt = require('prompt-sync')();

function somarNumeros() {
    let qtd = Number(prompt("Quantos números deseja somar? "));
    let numeros = [];

    for (let i = 0; i < qtd; i++) {
        let num = Number(prompt(`Digite o número ${i + 1}: `));
        numeros.push(num);
    }

    let soma = numeros.reduce((acc, num) => acc + num, 0);
    console.log("\nSoma dos números:", soma);
}

somarNumeros();