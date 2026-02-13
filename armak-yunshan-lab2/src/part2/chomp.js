// samma som del 1
function createChocolateBar(rows, cols) {
  if (rows <= 0 || cols <= 0) {
  return undefined; 
  }
    
  const gameboard = [];

  for (let r = 1; r <= rows; r+=1) {
    const row = [];
    for (let c = 1; c <= cols; c+=1) {
      row.push(String(r) + String(c));
    }
    gameboard.push(row);
  }  
  gameboard[0][0] = "P";

  return gameboard; 
}

// ny logik 
function printChocolateBar(gameboard) {
  const gameboardHolder = document.getElementById("gameboardHolder");
  
  document.getElementById("gameboardHolder").innerHTML = "";
  

  for (let r = 0; r < gameboard.length; r +=1) {

    const rowDiv = document.createElement("div")
    rowDiv.classList.add("row");

    for (let c = 0; c < gameboard[r].length; c+=1) {
      const button = document.createElement("Button");
      button.innerText = gameboard[r][c];
      button.addEventListener("click", function() {selectBlock(gameboard, r, c)}); 
      rowDiv.appendChild(button);
    }
    gameboardHolder.appendChild(rowDiv);
  }
  
}

// samma som del 1
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

// samma som del 1
function checkWinner(ChompedBoard){
  // om brädet bara har 1 rad och rad 0 bara har en col 
  if (ChompedBoard.length === 1 && ChompedBoard[0].length === 1){
    return true;
  }
  return false 
}

// ny logik
function selectBlock(gameboard, row, col){
  if (!gameisON){
    return;
  }

  if (gameboard[row][col] === "P"){
    document.getElementById("message").innerText = ` Press a valid button... The ${
    player[turn % 2]} player turn to select!`;
    return
  }
  
  gameboard = chomp(gameboard, row, col);
  printChocolateBar(gameboard);
  
  if (checkWinner(gameboard)) {
    document.getElementById("message").innerText = `The winner is the ${player[turn % 2]} player`;
    gameisON = false;
    return;
  }
  turn +=1
  document.getElementById("message").innerText = `The ${
  player[turn % 2]} player turn to select!`;
    
}


const gameboard = createChocolateBar(6, 7);
let turn = 0;
let player = ["first", "second"];
let gameisON = true;
printChocolateBar(gameboard);

document.getElementById("message").innerText = `The ${
  player[turn % 2]
} player turn to select!`;
