class Game{
    constructor() {
        this.inProgress = true; //If the game has no winner, and has no tie, than the game is in progress
        this.winner = null; //O or X
        this.currentTurn = Game.O; //O is the starter player
        this.movesMade = 0; //To check if the game ended in draw or not
        this.squares = new Array(9).fill().map(s => new Square()); //this will make 9 new square objects
    }

    makeMove(i){
        if(this.inProgress && !this.squares[i].value){ //if the game is in progress and the actual sqaure we want to mark isn't already marked
            this.squares[i].value = this.currentTurn;
            this.movesMade++;
            this.checkForWinner();
            this.currentTurn = (this.currentTurn === Game.O) ? Game.X : Game.O;
        }
    }

    checkForWinner(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        winningCombinations.forEach((wc) => {
            const[a, b, c] = wc;
            //we need the square object at a, b, c indexes
            const sqA = this.squares[a];
            const sqB = this.squares[b];
            const sqC = this.squares[c];

            if(sqA.value && sqA.value === sqB.value && sqA.value === sqC.value){ //three in a row with the same symbol
                this.inProgress = false;
                this.winner = sqA.value; //X or O
                sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;
            }
        });

        //check for tie
        if(this.movesMade === this.squares.length){ //all squares have values
            this.inProgress = false;
            //this.winner = null;
        }
    }
}

//For setting the values of the squares
Game.O = 'O';
Game.X = 'X'; 

//i is the index of the square we want to move 
