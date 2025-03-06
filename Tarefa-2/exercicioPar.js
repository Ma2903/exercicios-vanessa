const prompt = require('prompt-sync')();

// Exercício 2: Filtrar números pares
function exibirNumerosPares() {
    let qtd = Number(prompt("Quantos números deseja inserir? "));
    let numeros = [];

    for (let i = 0; i < qtd; i++) {
        let num = Number(prompt(`Digite o número ${i + 1}: `));
        numeros.push(num);
    }

    let pares = numeros.filter(num => num % 2 === 0);
    console.log("\nNúmeros pares:", pares);
}

exibirNumerosPares();