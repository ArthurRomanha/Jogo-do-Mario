const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const divPontuacao = document.querySelector('.pontuacao');
const divMelhorPontuacao = document.querySelector('.melhorPontuacao');
const btnReiniciar = document.querySelector('.btnReiniciar');
let pontuacao = 0;
let melhorPontuacao = 0;
let loopAddPontosInterrompida = false;
    
btnReiniciar.style.display = 'none'

function jump() {
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}
btnReiniciar.style.display = "none";


    const loop = setInterval(() => {

        
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudsPosition = clouds.offsetRight;

        if(pipePosition<=120 && pipePosition>0 && marioPosition < 80){

            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            clouds.style.animation = 'none';
            clouds.style.right = `${cloudsPosition}px`;

            mario.src = './imagens/game-over.png'
            mario.style.width = '75px'
            mario.style.marginLeft = '50px'

            btnReiniciar.style.display = 'block';

            loopAddPontosInterrompida = true;

            if(pontuacao>melhorPontuacao){
                melhorPontuacao=pontuacao;
                divMelhorPontuacao.textContent = `High Score: ${pontuacao}`;
            }


            clearInterval(loop);
            clearTimeout(loopPontuacao);
        }
    },10)


    function addPontuacao () {
        pontuacao++;
    }
    function loopPontuacao(){
        if(!loopAddPontosInterrompida){
            addPontuacao();
            divPontuacao.textContent = `${pontuacao}`;
            setTimeout(loopPontuacao, 250)
    }
    }
    loopPontuacao();
    
    function reset(){
        window.location.reload();
    }   

document.addEventListener('keydown', jump());
