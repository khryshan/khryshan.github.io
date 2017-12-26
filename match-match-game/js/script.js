class Game {
    constructor(theme, difficulty) {        
        this.theme = theme;
        this.difficulty = difficulty;

        this.gameTime = 0;

        this.arr = [];
        this.size = '';

        this.current;
        this.count = 0;
        this.point = difficulty;
  	}


    choice() {
        switch (this.difficulty) {
            case '8':
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4];
                break;
            case '12':
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6 ];
                break;
            case '16':
                this.arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
                break;
        }

        switch (this.theme) {
            case 'moon':
                this.url = 'moon-skirt';
                break;
            case 'star':
                this.url = 'star-skirt';
                break;
            case 'space-man':
                this.url = 'space-man-skirt';
                break;
            case 'rocket':
                this.url = 'rocket-skirt';
                break;
            case 'galaxy':
                this.url = 'galaxy-skirt';
                break;
        }
    }


    buildCardField () {
        while (this.difficulty > 0) {
            this.value = Math.round(Math.random() * (this.arr.length - 1));
            this.gameField.innerHTML += `<div class="card-container">
            <div class="card" num=${this.arr[this.value]}>
              <div class="${this.url}"></div>
              <div class="front">${this.arr[this.value]}</div>
            </div>
            </div>`;
            this.arr.splice(this.value, 1);
            this.difficulty = this.difficulty - 1;
        }
    }


    renderCards() {
        this.introBlock.style.display = 'none';
        this.gameBlock.style.display = 'block';

    }


    startGameTimer() {
        this.timerBlock.innerHTML = '' + this.gameTime;
        this.gameInterval = setInterval(() => {
            this.timerBlock.innerHTML = '' + ++this.gameTime;
        }, 1000);
    }


    flipCard () {
        this.gameField.addEventListener('click', (event) => {

            let target = event.target;
            while (target !== this.gameField) {
                if (target.classList.contains('card')) {
                    if (this.count === 2) {
                        return false;
                    };

                    target.classList.add('flipped');
                    this.count = this.count + 1;

                    if (this.count === 1) {
                        this.current = target;
                    };

                    if (target === this.current) {
                        this.count = 1;
                    };

                    if (this.count === 2) {
                        if (this.current.getAttribute('num') === target.getAttribute('num')) {
                            setTimeout(() => {
                                this.current.classList.add('hide');
                                target.classList.add('hide');
                                this.point = this.point - 2;
                                this.count = 0;
                                if (this.point === 0) {
                                    this.win();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                this.current.classList.remove('flipped');
                                target.classList.remove('flipped');
                                this.count = 0;
                            }, 1000);
                        }
                    }
                    return;
                }
                target = target.parentNode;
            }
        });

    }


    addEvents() {
        this.menuButton.addEventListener('click', this.menuGameClickedBinded);
        this.newGameButton.addEventListener('click', this.newGameClickedBinded);
    }
    

    menuGameClicked() {
        clearInterval(this.gameInterval);
        this.gameTime = 0;
        if(this.gameField.innerHTML) {
            this.gameField.innerHTML = '';
        }
        
       this.gameBlock.style.display = 'none';
       this.introBlock.style.display = 'block';
    }


    newGameClicked() {
        clearInterval(this.gameInterval);
        this.gameTime = 0;
        if(this.gameField.innerHTML) {
            this.gameField.innerHTML = '';
        }

        this.gameOver.style.display = 'none';
        this.introBlock.style.display = 'block';
    }


    win() {
        this.gameBlock.style.display = 'none';
        this.gameOver.style.display = 'block';
    }


    start() {
  		this.introBlock = document.querySelector('.intro-block');
  		this.gameBlock = document.querySelector('.game-block');
  		this.timerBlock = document.querySelector('.timer-value');
        this.gameField = document.querySelector('.game-field');
        this.gameOver = document.querySelector('.game-over-block');
        this.menuButton = document.querySelector('.menu-btn');
        this.newGameButton = document.querySelector('.new-game-btn');

        this.menuGameClickedBinded = this.menuGameClicked.bind(this);
        this.newGameClickedBinded = this.newGameClicked.bind(this);
        
        this.renderCards();
        this.choice();
        this.buildCardField (); 
        this.startGameTimer();
        this.flipCard();
        this.addEvents();
    }
  
}

//==================================================================================== 

(function () {
    let startButton = document.querySelector('.start-btn');
    
    startButton.addEventListener('click', startGameClicked);

    function startGameClicked() {
        let difficulty = document.querySelector('[name="level"]:checked').value;
        let theme = document.querySelector('[name="card-back"]:checked').value;

        var game = new Game(theme, difficulty);
        game.start();
    }
})()