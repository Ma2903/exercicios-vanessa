const prompt = require('prompt-sync')();

// Exercício 1: Cadastrar nomes e exibi-los ordenados
function armazenarNomes() {
    let qtd = Number(prompt("Quantos nomes deseja cadastrar? "));
    let nomes = [];

    for (let i = 0; i < qtd; i++) {
        let nome = prompt(`Digite o nome ${i + 1}: `);
        nomes.push(nome);
    }

    console.log("\nNomes cadastrados em ordem alfabética:");
    console.log(nomes.sort());
}

armazenarNomes();