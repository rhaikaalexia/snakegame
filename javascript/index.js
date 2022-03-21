const musicaFundo = new Audio("music/music.mp3");
const gameOver = new Audio("music/gameover.mp3");
const musicaMover = new Audio("music/move.mp3");
const musicaComer = new Audio("music/food.mp3");

var direcao = { x: 0, y: 1};

var cobrinha = [{ x: 5, y: 5}]
var fruta = {
    x: Math.floor(Math.random() * 18), 
    y: Math.floor(Math.random() * 18) 
}

var pontos = 0;

var ultimaVezAtualizado = 0 
var velocidade = 2;

function principal (tempoAtual){
window.requestAnimationFrame(principal);
if((tempoAtual - ultimaVezAtualizado) / 1000 < (1 / velocidade)){
   return;
       }
   ultimaVezAtualizado = tempoAtual
   atualizaGame();
    }

    function verificaColisao(){
        for(var  i = 1; i < cobrinha.length; i++){
            if(cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y){
                return true;
            }
        }
   
        if(cobrinha[0].x >= 18 || cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0){
            return true
        }
    }

    function verificaComeuFrutinha(){
        if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
            musicaComer.play();
            pontos = pontos + 10;
            pontuacao.innerHTML = pontos + "pontos";
            cobrinha.unshift(
                {x: cobrinha[0].x + direcao.x,
                y: cobrinha[0].y + direcao.y})
                fruta.x = Math.floor(Math.random() * 18)
                fruta.y = Math.floor(Math.random() * 18)
                velocidade = velocidade + 0.5
        }
    }

   function atualizaGame(){


    var colidiu = verificaColisao()
    if (colidiu == true){
        musicaFundo.pause();
        gameOver.play();
        alert("game over")
        cobrinha = [{x: 5, y: 5}]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
    }
    
    verificaComeuFrutinha();
    

       for(var i = cobrinha.length -2; i >=0; i--){
           cobrinha[i + 1] = {...cobrinha[i]}
          
       }
       cobrinha[0].y += direcao.y;
       cobrinha[0].x += direcao.x;

   board.innerHTML ="";
   for(var i = 0; i < cobrinha.length; i++){
       var parteCobrinha = document.createElement('div');
       parteCobrinha.style.gridRowStart = cobrinha[i].y;
       parteCobrinha.style.gridColumnStart = cobrinha[i].x;

       if(i == 0){
           parteCobrinha.classList.add("head")
       } else {
           parteCobrinha.classList.add("snake");
       }
       board.appendChild(parteCobrinha);
  }

  var frutinha = document.createElement("div");
  frutinha.style.gridColumnStart = fruta.x;
  frutinha.style.gridRowStart = fruta.y;
  frutinha.classList.add("fruta");
  board.appendChild(frutinha)

}
function verificarClickTeclado (e){
 
   musicaMover.play()
    switch(e.code){
        case"KeyW":
        case"ArrowUp":
        direcao.x = 0;
        direcao.y = -1;
        break;
        case "KeyA":
        direcao.x = -1
        direcao.y = 0;
        break;
        case"KeyS":
        direcao.x = 0
        direcao.y = 1;
        break;
        case"KeyD":
        direcao.x = 1
        direcao.y = 0;
        break;
        case "Enter":
            direcao.x = 1
            direcao.y = 0;
            musicaFundo.play();

    }

}
window.addEventListener("keydown", (e) => verificarClickTeclado (e))
principal();