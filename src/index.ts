const palavrasListaPossibilidades: string[] = ["PROGRAMACAO", "JAVASCRIPT", "DESENVOLVIMENTO", "INTERFACE"];

let palavraEscolhida: string;
let letrasCertas: string[];
let letrasIdentificadas: boolean[];
let tentativasMaximas: number;
let tentativasRestantes: number;
let letrasTentadas: string[];

function selecionarPalavraAleatória(listaPalavrasAleatórias: string[]): void {
    palavraEscolhida = listaPalavrasAleatórias[Math.floor(Math.random() * listaPalavrasAleatórias.length)];
}

function inicializarVariaveis(): void {
    selecionarPalavraAleatória(palavrasListaPossibilidades);
    letrasCertas = [];
    letrasIdentificadas = [];
    tentativasMaximas = 6;
    tentativasRestantes = tentativasMaximas;
    letrasTentadas = [];
}

inicializarVariaveis();

function atualizarImagemForcaConformeQuantidadeErros(erros: number): void {
    const imagemForca = document.getElementById('forcaImagem') as HTMLImageElement;
        imagemForca.src = `assets/forca${erros}.png`;
    
}

function pegaLetraDigitada(): string {
    const letraInput = document.getElementById('letraInput') as HTMLInputElement;
    const letra = letraInput.value.toUpperCase();
    letraInput.value = '';
    return letra;
}

function isLetraValida(letra: string): boolean {
    return letra.length !== 0 && !letrasTentadas.includes(letra);
}

function atualizarTela_LetrasTentadas(letrasTentadas: string[]): void {
    const letrasTentadasElement = document.getElementById('letrasTentadas');
    if (letrasTentadasElement) {
        letrasTentadasElement.textContent = `Letras já tentadas: ${letrasTentadas.join(', ')}`;
    }
}

function TestaLetraDigitada(letra: string): boolean {
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

function VerificaVitoriaOuDerrota(): void {
    if (tentativasRestantes === 0) {
        document.getElementById('mensagem')!.textContent = `Fim do jogo! Você perdeu. A palavra era: ${palavraEscolhida}`;
        document.getElementById('botaoJogarDeNovo')!.style.display = 'block';
        document.getElementById('btnAdivinhar')!.style.display = 'none';
        document.getElementById('letraInput')!.style.display = 'none';
        
    } else if (!letrasCertas.includes('_')) {
        document.getElementById('mensagem')!.textContent = "Parabéns! Você ganhou!";
        document.getElementById('botaoJogarDeNovo')!.style.display = 'block';
        document.getElementById('btnAdivinhar')!.style.display = 'none';
        document.getElementById('letraInput')!.style.display = 'none';
    } else {
        // Atualiza as tentativas restantes
        document.getElementById('tentativasRestantes')!.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    }
}

function adivinharLetra(): void {
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

function jogarDeNovo(): void {
    location.reload();     
}

function main(): void {
    inicializarVariaveis();
    letrasCertas = Array(palavraEscolhida.length).fill('_');
    letrasIdentificadas = Array(palavraEscolhida.length).fill(false);

    //const botaoJogarDeNovoElement = document.getElementById('botaoJogarDeNovo');
    //const palavraElement = document.getElementById('palavra');
    const tentativasRestantesElement = document.getElementById('tentativasRestantes');
    document.getElementById('botaoJogarDeNovo')!.style.display = 'none';
    document.getElementById('palavra')!.textContent = letrasCertas.join(' ');
    //if (botaoJogarDeNovoElement) botaoJogarDeNovoElement.style.display = 'none';
    //if (palavraElement) palavraElement.textContent = letrasCertas.join(' ');
    if (tentativasRestantesElement) {
        tentativasRestantesElement.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    }
    
    atualizarImagemForcaConformeQuantidadeErros(0);
}

document.getElementById('botaoJogarDeNovo')?.addEventListener('click', jogarDeNovo);
document.getElementById('letraInput')?.addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        adivinharLetra();
    }
});

main();
