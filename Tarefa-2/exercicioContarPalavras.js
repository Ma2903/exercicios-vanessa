const prompt = require('prompt-sync')();

// Exercício 4: Contar palavras em uma frase
function contarPalavras() {
    let frase = prompt("Digite uma frase: ");
    let palavras = frase.split(" ").filter(word => word.trim() !== ""); // Removendo espaços extras
    console.log("\nQuantidade de palavras:", palavras.length);
}

contarPalavras();