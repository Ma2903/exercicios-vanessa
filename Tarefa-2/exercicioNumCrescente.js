const prompt = require('prompt-sync')();

// Exercício 5: Ordenar números crescente e decrescente
function ordenarNumeros() {
    let qtd = Number(prompt("Quantos números deseja inserir? "));
    let numeros = [];

    for (let i = 0; i < qtd; i++) {
        let num = Number(prompt(`Digite o número ${i + 1}: `));
        numeros.push(num);
    }

    console.log("\nOrdem crescente:", [...numeros].sort((a, b) => a - b));
    console.log("Ordem decrescente:", [...numeros].sort((a, b) => b - a));
}

ordenarNumeros();