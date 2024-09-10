import AsciiTable from 'ascii-table';

class Table {
    constructor(movesList, rules) {
        this.rules = rules;
        this.movesList = movesList;
        this.table = new AsciiTable();
        this.generateTable();
    };

    generateTable() {
        this.table.setHeading(`v PC\\User >`, ...this.movesList);

        for (let i = 0; i < this.movesList.length; i++) {
            let results = this.movesList.map((_, j) => {
                switch(this.rules.getWinner(i, j)) {
                    case 0:
                        return"Draw";

                    case -1:
                        return "Win";

                    case 1: 
                        return "Lose";
                    
                    default:
                        return "-";
                }
            });
            let row = [this.movesList[i], ...results];
            this.table.addRow(row);
        }
    }

    printTable() {
        console.log(this.table.toString());
    }
};

export default Table;