class Rules {
    constructor(movesList) {
        this.movesList = movesList;
        this.movesNum = movesList.length;
        this.half = Math.floor(this.movesNum / 2);
        this.rules = [];
        this.createRules();
    }

    createRules() {
        for (let i = 0; i < this.movesNum; i++) {
            let row = this.movesList.map((_, j) => this.createRule(i, j));
            this.rules.push(row);
        }
    }

    createRule(move1, move2) {
        return Math.sign((move1 - move2 + this.half + this.movesNum) % this.movesNum - this.half);
    }

    getWinner(move1, move2) {
        return this.rules[move1][move2];
    }

    winnerMessage(result)  {
        switch(result) {
            case 0:
                return "Draw";
            
            case -1:
                return "You win!"

            case 1: 
                return "Computer wins!";

            default:
                return "Error: No result found";
        }
    }

};

export default Rules;