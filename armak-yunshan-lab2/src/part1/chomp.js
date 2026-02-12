import readlineSync from "readline-sync";

function input(prompt) {
  return readlineSync.question(prompt);
}

const answer = input("Want to play Chomp? ");
if (answer === "yes") {
  console.log("Let's play!");
} else {
  console.log("Bye!");
}

function createChocolateBar(rows, cols) {
  if (rows <= 0 || cols <= 0) {
  return undefined; 
  }

  const board = [];

  for (let r = 1; r <= rows; r+=1) {
    const row = [];
    for (let c = 1; c <= cols; c+=1) {
      row.push(String(r) + String(c));
    }
    board.push(row);
  }  
  board[0][0] = "P";

  return board; 
}


function printChocolateBar(board) {
  board.forEach(row => console.log(row.join(" ")));
  console.log("\n");
  
}



function chomp(board, row, col) {
  const chompedBoard = [];
  
  for (let r = 0; r < row; r += 1){
    chompedBoard.push(board[r].slice())
  }
  
  for (let r = row; r < board.length; r+=1) {
    chompedBoard.push(board[r].slice(0, col));}

   // Ta bort tomma rader längst ner 
  while (chompedBoard.length > 0 && chompedBoard[chompedBoard.length - 1].length === 0) {
    chompedBoard.pop();
  }

  return chompedBoard;
}


function checkWinner(ChompedBoard){
  // om brädet bara har 1 rad och rad 0 bara har en col 
  if (ChompedBoard.length === 1 && ChompedBoard[0].length === 1){
    return true;
  }
  return false 
}


function askCellNumber(board) {
  
  while (true) {
    const userInput = input("Skriv in en cell: ").trim();

    if (userInput === "11" || userInput === "P") {
      console.log("Skriv in en korrekt cell: ");
    } else {
      for (let r = 0; r < board.length; r += 1) {
        for (let c = 0; c < board[r].length; c += 1) {
          if (board[r][c].trim() === userInput) {
            return [r, c];
          }
        }
      }

      console.log(`Fel val, ruta ${userInput} finns inte i spelplanen, försök igen!`);
    }
  }
}


console.log("Välkommen till spelet Chomp.")
console.log("Instruktioner: I spelet kommer du utmanas om att välja ett blocknummer från spelplanen. Det valda blocket och alla block under och till högre kommer att raderas. Spelet går ut på att undvika välja P, den spelare som väljer P förlorar och den andra spelare vinner.")


const players = ["Första", "Andra"];
const ROWS = 6;
const COLS = 7;

let board = createChocolateBar(ROWS, COLS);
let turn = 0;

while (!checkWinner(board)) {
  printChocolateBar(board);
  console.log(`${players[turn % 2]} spelarens tur` );

  const move = askCellNumber(board);
  const row = move[0];
  const col = move[1];

  board = chomp(board, row, col);

  if (!checkWinner(board)) {
    turn += 1;
  }
}

printChocolateBar(board);
console.log(`Spelet är slut! Vinnare är den ${players[turn%2]} spelaren!`);


