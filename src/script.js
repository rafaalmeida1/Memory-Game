const FRONT = "cardFront";
const BACK = "cardBack";
const CARD = "card";
const ICON = "icon";
var cron;
let container = document.getElementsByClassName('container')[0];

let start = document.getElementById('start').addEventListener('click', startGame);
let backToHome = document.getElementById('backToHome').addEventListener('click', $backToHome);
let retornar = document.getElementById('return').addEventListener('click', $backToHome);

function startGame(){
    // vou criar um array de cartas com todas as cartas
    // eu só to passando cards nesses métodos, pois tudo no js é referencia, então quando eu passo cards pra ca, é uma referencia, então quando eu modifico o posicionamento, eu acabo modificando o posicionamento dos meus cards mesmo, e não de uma cópia que foi feita dos cards
    // então eu não preciso retornar nada, posso dar um shuffle desse jeito mesmo
    initCards(game.createCardsFromGames());
    container.style.display = 'none';
}

function $backToHome(){
    let gameBoard = document.getElementById('gameBoard');
    let gameOver = document.getElementById('gameOver');
    let back = document.getElementById('return');
    gameBoard.style.display = 'none';
    container.style.display = 'flex';
    gameOver.style.display = 'none';
    back.style.display = 'none';
}

function initCards(cards){
    let gameBoard = document.getElementById('gameBoard');
    let back = document.getElementById('return');
    back.style.display = 'inline-block';
    gameBoard.style.display = 'grid';
    gameBoard.innerHTML = '';

    

    game.cards.forEach(card => {
        let cardElement = document.createElement('div'); // vou criar um elemento div
        cardElement.id = card.id; // vou criar um id para cada carta, e vou colocar o id do game dentro do id da carta
        cardElement.classList.add(CARD); // vou colocar a classe card no elemento criado
        cardElement.dataset.icon = card.icon; // vou colocar o icon do game dentro do dataset do elemento criado

        createCardContent(card, cardElement);   

        cardElement.addEventListener('click', flipCard); // vou adicionar um evento de click no elemento criado
        gameBoard.appendChild(cardElement); // vou colocar o elemento criado dentro do gameBoard
    })


}

function createCardContent(card, cardElement){ // vou criar o conteúdo da carta
    createCardFace(FRONT, card, cardElement); // vou criar a face frontal da carta
    createCardFace(BACK, card, cardElement); // vou criar a face trasiera da carta
}

function createCardFace(face, card, element){ // vou criar a face da carta
    let cardElementFace = document.createElement('div'); // vou criar um elemento div
    cardElementFace.classList.add(face); // vou colocar a classe face no elemento criado
    if(face === FRONT){ // vou verificar se a face é a face frontal
        let iconElement = document.createElement('img'); // vou criar um elemento img
        iconElement.classList.add(ICON); // vou colocar a classe icon no elemento criado
        iconElement.src = "../assets/" + card.icon + ".png"; // vou colocar a imagem do game dentro do src do elemento criado
        cardElementFace.appendChild(iconElement); // vou colocar o elemento criado dentro do elemento criado
    }else{
        cardElementFace.innerHTML = '&lt/&gt'; // vou colocar o texto dentro do elemento criado
    }
    element.appendChild(cardElementFace) // vou colocar o conteudo criado dentro do elemento
}


function flipCard(){ // vou criar a função flipCard

    if(game.setCard(this.id)){ // vou setar a carta que foi clicada
        this.classList.add('flip'); // vou adicionar a classe flipped no elemento que foi clicado
        if(game.secondCard){ // se eu tiver a segunda carta, eu faço isso

            if(game.checkMatch()){ // vou verificar se as cartas foram iguais
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById('gameOver');
                    gameOverLayer.style.display = 'flex';
                };
            }else{
                setTimeout(() => { // vou colocar um tempo de delay para que as cartas não sejam voltadas
                    
                    let firstCardView = document.getElementById(game.firstCard.id); // vou pegar o elemento da primeira carta
                    let secondCardView = document.getElementById(game.secondCard.id); // vou pegar o elemento da segunda carta
                    
                    firstCardView.classList.remove('flip'); // vou remover a classe flipped do elemento da primeira carta
                    secondCardView.classList.remove('flip'); // vou remover a classe flipped do elemento da segunda carta
                    game.unflipCards(); // vou limpar as cartas
                }, 1000);
            }
        }
    }

}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById('gameOver');
    gameOverLayer.style.display = 'none';
}