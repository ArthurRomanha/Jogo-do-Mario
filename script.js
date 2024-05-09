const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const divPontuacao = document.querySelector('.pontuacao');
const divMelhorPontuacao = document.querySelector('.melhorPontuacao');
const btnReiniciar = document.querySelector('.btnReiniciar');
let pontuacao = 0;
let melhorPontuacao = getCookie("melhorPontuacao") || 0;
let loopAddPontosInterrompida = false;

    
btnReiniciar.style.display = 'none'

const jump = () => {
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
            clearTimeout(loopAddPontos);
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
    // Função para definir um cookie com o nome, valor e expiração
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    // Função para obter o valor de um cookie pelo nome
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    

document.addEventListener('keydown', jump);