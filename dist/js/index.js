"use strict";
var _a, _b;
const palavrasListaPossibilidades = ["PROGRAMACAO", "JAVASCRIPT", "DESENVOLVIMENTO", "INTERFACE"];
let palavraEscolhida;
let letrasCertas;
let letrasIdentificadas;
let tentativasMaximas;
let tentativasRestantes;
let letrasTentadas;
function selecionarPalavraAleatória(listaPalavrasAleatórias) {
    palavraEscolhida = listaPalavrasAleatórias[Math.floor(Math.random() * listaPalavrasAleatórias.length)];
}
function inicializarVariaveis() {
    selecionarPalavraAleatória(palavrasListaPossibilidades);
    letrasCertas = [];
    letrasIdentificadas = [];
    tentativasMaximas = 6;
    tentativasRestantes = tentativasMaximas;
    letrasTentadas = [];
}
inicializarVariaveis();
function atualizarImagemForcaConformeQuantidadeErros(erros) {
    const imagemForca = document.getElementById('forcaImagem');
    imagemForca.src = `assets/forca${erros}.png`;
}
function pegaLetraDigitada() {
    const letraInput = document.getElementById('letraInput');
    const letra = letraInput.value.toUpperCase();
    letraInput.value = '';
    return letra;
}
function isLetraValida(letra) {
    return letra.length !== 0 && !letrasTentadas.includes(letra);
}
function atualizarTela_LetrasTentadas(letrasTentadas) {
    const letrasTentadasElement = document.getElementById('letrasTentadas');
    if (letrasTentadasElement) {
        letrasTentadasElement.textContent = `Letras já tentadas: ${letrasTentadas.join(', ')}`;
    }
}
function TestaLetraDigitada(letra) {
    let letraCerta = false;
    for (let i = 0; i < palavraEscolhida.length; i++) {
        if (palavraEscolhida[i] === letra) {
            letrasCertas[i] = letra;
            letrasIdentificadas[i] = true;
            letraCerta = true;
        }
    }
    return letraCerta;
}
function VerificaVitoriaOuDerrota() {
    if (tentativasRestantes === 0) {
        document.getElementById('mensagem').textContent = `Fim do jogo! Você perdeu. A palavra era: ${palavraEscolhida}`;
        document.getElementById('botaoJogarDeNovo').style.display = 'block';
        document.getElementById('btnAdivinhar').style.display = 'none';
        document.getElementById('letraInput').style.display = 'none';
    }
    else if (!letrasCertas.includes('_')) {
        document.getElementById('mensagem').textContent = "Parabéns! Você ganhou!";
        document.getElementById('botaoJogarDeNovo').style.display = 'block';
        document.getElementById('btnAdivinhar').style.display = 'none';
        document.getElementById('letraInput').style.display = 'none';
    }
    else {
        // Atualiza as tentativas restantes
        document.getElementById('tentativasRestantes').textContent = `Tentativas restantes: ${tentativasRestantes}`;
    }
}
function adivinharLetra() {
    const letra = pegaLetraDigitada();
    if (!isLetraValida(letra)) {
        return;
    }
    letrasTentadas.push(letra);
    atualizarTela_LetrasTentadas(letrasTentadas);
    const letraCerta = TestaLetraDigitada(letra);
    if (!letraCerta) {
        tentativasRestantes--;
    }
    atualizarImagemForcaConformeQuantidadeErros(tentativasMaximas - tentativasRestantes);
    const palavraElement = document.getElementById('palavra');
    if (palavraElement) {
        palavraElement.textContent = letrasCertas.join(' ');
    }
    VerificaVitoriaOuDerrota();
}
function jogarDeNovo() {
    location.reload();
}
function main() {
    inicializarVariaveis();
    letrasCertas = Array(palavraEscolhida.length).fill('_');
    letrasIdentificadas = Array(palavraEscolhida.length).fill(false);
    //const botaoJogarDeNovoElement = document.getElementById('botaoJogarDeNovo');
    //const palavraElement = document.getElementById('palavra');
    const tentativasRestantesElement = document.getElementById('tentativasRestantes');
    document.getElementById('botaoJogarDeNovo').style.display = 'none';
    document.getElementById('palavra').textContent = letrasCertas.join(' ');
    //if (botaoJogarDeNovoElement) botaoJogarDeNovoElement.style.display = 'none';
    //if (palavraElement) palavraElement.textContent = letrasCertas.join(' ');
    if (tentativasRestantesElement) {
        tentativasRestantesElement.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    }
    atualizarImagemForcaConformeQuantidadeErros(0);
}
(_a = document.getElementById('botaoJogarDeNovo')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', jogarDeNovo);
(_b = document.getElementById('letraInput')) === null || _b === void 0 ? void 0 : _b.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        adivinharLetra();
    }
});
main();
