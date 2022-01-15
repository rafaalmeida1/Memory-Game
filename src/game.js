let game = {

    cards: null,
    lockMode: false,
    firstCard: null,
    secondCard: null,

    games: [
        'assassins',
        'fortnite',
        'godOfWar',
        'mine',
        'residentEvil',
        'rockstar',
        'spider',
        'theWitcher',
        'zelda',
        'mario'
    ],

    setCard: function(id){
        let card = this.cards.filter(card => card.id === id)[0]; // vou filtrar a carta que foi clicada
        if(card.flipped || this.lockMode){ // vou verificar se a carta já foi virada ou se o modo de lock está ativo
            return false; // se a carta já foi virada ou o modo de lock está ativo, retorno false
        }
        if(!this.firstCard){ // vou verificar se a primeira carta não foi clicada
            this.firstCard = card; // se não foi clicada, vou colocar a carta clicada como primeira carta
            this.firstCard.flipped = true; // vou colocar a carta clicada como virada
            return true; // conseguimos selecionar a primeira carta
        }else{
            this.secondCard = card; // se foi clicada, vou colocar a carta clicada como segunda carta
            this.secondCard.flipped = true; // vou colocar a carta clicada como virada
            this.lockMode = true; // o modo de lock está ativo
            return true;
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){ // vou verificar se as duas cartas foram selecionadas
            return false; // se não foram selecionadas, retorno false
        }
        return this.firstCard.icon === this.secondCard.icon; // vou verificar se as cartas são iguais
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards: function(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
        return this.cards.filter(card=>!card.flipped).length === 0; // vou verificar se todas as cartas foram viradas, e vai me retornar um array com todas as cartas que não foram viradas, se o array tiver 0 elementos, significa que todas as cartas foram viradas(true).
    },

    createCardsFromGames: function (){
        this.cards = []; // chamo o this, pois são as cartas desse objeto, e isso serve para todas as funções que eu criar dentro do objeto
        this.games.forEach((game) => { // vou pegar cada game da lista de games
            this.cards.push(this.createPairFromGame(game)); // vou criar um par de cartas para cada game
        })
    
        // maneira de utilizar esse for, seria:
        // games.forEach((game) => {
        //     cards.push(createPairFromGame(game));
        // })
    
        this.cards = this.cards.flatMap(pair => pair); // vou desmembrar o array de pares de cartas e colocar no array principal
        //flat map retorna um array com todos os elementos de um array de arrays, se cada um dos elementos do array de arrays for um array, ele vai retornar um array com todos os elementos de cada array, ele só desmembra o array de um array maior
        //flat map ele separa os itens daquele array, e retorna pro array principal
        //cards.map(pair=>pair[0].icon) para cada par de cartas, vou pegar o primeiro elemento e pegar o icon dele
        this.shuffleCards(); // vou embaralhar as cartas
        return this.cards;
    },
    
    createPairFromGame: function(game){ // vou criar um par de cartas para cada game
        return [{ // vou criar um array de objetos
            id: this.createIdWithGame(game),
            icon: game,
            flipped: false,
        }, {
            id: this.createIdWithGame(game),
            icon: game,
            flipped: false,
        }]
    },
    
    createIdWithGame: function(game){ // vou criar um id para cada carta, e vou colocar o id do game dentro do id da carta
        return game + parseInt(Math.random() * 1000); // vou criar um id aleatorio, e vou colocar o id do game dentro do id da carta
    },

    // vou pegar minha ultima carta e escolher uma aleatoria, e depois com a penultima, e assim vai
    shuffleCards: function(cards){ // vou embaralhar as cartas
     let currentIndex = this.cards.length; // vou pegar o tamanho do array de cartas
     let randomIndex = 0; // vou criar um indice aleatorio

     while(currentIndex !== 0){ // vou fazer um loop enquanto o indice for diferente de 0
         randomIndex = Math.floor(Math.random() * currentIndex); // vou pegar um numero aleatorio de 0 ao tamanho do array, não vou pegar o ultimo elemento pois se ele foi trocado, eu não quero que ele seja escolhido novamente
         currentIndex--; // vou diminuir o tamanho do array

         [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]; // vou trocar os elementos do array, ele inverte os elementos, uma das maneiras de inverter valores.
     }
    }
}
