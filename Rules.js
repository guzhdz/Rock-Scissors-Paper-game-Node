class Rules {
    constructor(movesList) {
        this.movesNum = movesList.length;
        this.half = (this.movesNum - 1) / 2;
        this.rules = [];
        this.createRules();
    }

    createRules() {
        for (let i = 0; i < this.movesNum; i++) {
            let row = [];
            for (let j = 0; j < this.movesNum; j++) {
                row.push(this.createRule(i + 1, j + 1));
            }
            this.rules.push(row);
        }
    }

    createRule(move1, move2) {
        if(move1 == move2) {
           return 0;
        }

        let max = move1 + this.half;
        let min = max > this.movesNum ? move1 - this.half : move1;
        let mode = max > this.movesNum ? 2 : 1;
        max = max > this.movesNum ? move1 : move1 + this.half;

        if(move2 >= min && move2 <= max) {
            return mode == 1 ? 1 : 2;
        } else {
            return mode == 1 ? 2 : 1;
        }
    }

    getWinner(move1, move2) {
        return this.rules[move1 - 1][move2 - 1];
    }

    winnerMessage(result)  {
        switch(result) {
            case 0:
                return "Draw";
            
            case 1:
                return "You win!"

            case 2: 
                return "Computer wins!";

            default:
                return "Error: No result found";
        }
    }

};

export default Rules;