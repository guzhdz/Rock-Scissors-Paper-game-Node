//Imports
import readline from 'readline';
import HMAC from './HMAC.js';
import Rules from './Rules.js';
import Table from './Table.js';

//Get moves
const getMoves = () => {
    const movesList = process.argv.slice(2);

    if(movesList.length % 2 == 0 || movesList.length < 3) {
        console.log("Error: You sould enter an odd number of movements, there sould be at least 3.");
        console.log("(for example, Rock Paper Scissors or Rock Paper Scissors Lizard Spock or 1 2 3 4 5 6 7 8 9)");
        return null;
    } else {
        return movesList;
    }
}

//Computer move
const generateMove = (movesNum) => {
    return Math.floor(Math.random() * movesNum) + 1;
}

//Readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//Menu
const menu = (movesList, hmacObj, computerMove, rules, table) => {
    console.log('Aviable moves:');
    for (let i = 0; i < movesList.length; i++) {
        console.log(`${i + 1} - ${movesList[i]}`);
    }
    console.log(`0 - exit \n? - help`);
    rl.question('Enter your move: ', (input) => {
        switch(input) {
            case '0':
                rl.close();
                break;
            
            case '?':
                table.printTable();
                menu(movesList, hmacObj, computerMove, rules);
                break;
            
            default:
                let move = parseInt(input);
                if(move > movesList.length + 1 || move < 0) {
                    menu(movesList, hmacObj, computerMove, rules);
                } else {
                    results(movesList, computerMove, move, rules, hmacObj.key);
                    rl.close();
                }
                break;
        }
       
    });
}

const results = (movesList, computerMove, move, rules, key) => {
    console.log('Your move: ', movesList[move - 1]);
    console.log('Computer move: ', movesList[computerMove - 1]);
    let result = rules.winnerMessage(rules.getWinner(computerMove, move));
    console.log(result);
    console.log("HMAC key: ", key);
}


const main = () => {
    const movesList = getMoves();
    if(!movesList)
        return;

    const rules = new Rules(movesList);
    const table = new Table(movesList, rules);
    const hmacObj = new HMAC();
    const computerMove = generateMove(movesList.length);
    hmacObj.getHMAC(movesList[computerMove - 1]);

    console.log('HMAC: ', hmacObj.hmac);

    menu(movesList, hmacObj, computerMove, rules, table);
}

main();