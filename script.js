const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const blueShell = document.querySelector('.blueShell');
const clouds = document.querySelector('.clouds');
const divPontuacao = document.querySelector('.pontuacao');
const divMelhorPontuacao = document.querySelector('.melhorPontuacao');
const btnReiniciar = document.querySelector('.btnReiniciar');
const btnComecar = document.querySelector('.btnComecar');
let pontuacao = 0;
let melhorPontuacao = 0;
let loopAddPontosInterrompida = false;

blueShell.classList.remove('blueShellAnimation');
pipe.classList.remove('pipeAnimation');
btnReiniciar.style.display = 'none';

clouds.classList.add('cloudsAnimation');

function checkStorage() {
    var pontuacaoLocal = localStorage.getItem("highscore");
    if (pontuacaoLocal == "" || pontuacaoLocal == null) {
        localStorage.setItem("highscore", 0);
    }
    else if (pontuacaoLocal != "" && pontuacaoLocal != null) {
        // localStorage.setItem("highscore", melhorPontuacao);
        melhorPontuacao = pontuacaoLocal;
        divMelhorPontuacao.textContent = `High Score: ${melhorPontuacao}`;
    }
}

function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}
btnReiniciar.style.display = "none";


function jogo() {
    loopPontuacao();
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const blueShellPosition = blueShell.offsetLeft;
        const marioYPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetRight;

        blueShell.classList.add('blueShellAnimation');
        pipe.classList.add('pipeAnimation');
        btnComecar.style.display = 'none';


        if ((pipePosition <= 120 && pipePosition > 0 && marioYPosition < 80)||(blueShellPosition<=110 && blueShellPosition>0 && marioYPosition<320 && marioYPosition>150)) {
            blueShell.style.animation = 'none';
            blueShell.style.left = `${blueShellPosition}px`;
            
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioYPosition}px`;

            clouds.style.animation = 'none';
            clouds.style.right = `${cloudsPosition}px`;

            mario.src = './imagens/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            btnReiniciar.style.display = 'block';

            loopAddPontosInterrompida = true;

            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao;
                pontuacaoLocal = localStorage.setItem('highscore', melhorPontuacao)
                divMelhorPontuacao.textContent = `High Score: ${pontuacao}`;
            }


            clearInterval(loop);
            clearTimeout(loopPontuacao);
            
            
        }
    }, 10)
}

function addPontuacao() {
    pontuacao++;
}
function loopPontuacao() {
    if (!loopAddPontosInterrompida) {
        addPontuacao();
        divPontuacao.textContent = `${pontuacao}`;
        setTimeout(loopPontuacao, 250)
    }
}

function reset() {
    window.location.reload();
}

document.addEventListener('keydown', function (tecla) {
    if (tecla.keyCode == 32) {
        jump();
    }
});