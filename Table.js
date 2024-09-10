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
            let row = [this.movesList[i]];
            for (let j = 0; j < this.movesList.length; j++) {
                switch(this.rules.getWinner(i + 1, j + 1)) {
                    case 0:
                        row.push("Draw");
                        break;

                    case 1:
                        row.push("Win");
                        break;

                    case 2: 
                        row.push("Lose");
                        break;
                    
                    default:
                        row.push("-");
                        break;
                }
            }
            this.table.addRow(row);
        }
    }

    printTable() {
        console.log(this.table.toString());
    }
};

export default Table;