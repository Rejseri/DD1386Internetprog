function createChocolateBar(rows, columns) {
  return undefined;
}

function printChocolateBar(gameboard) {
  const gameboardHolder = document.getElementById("gameboardHolder");

  const square = document.createElement("div");
  square.classList.add("row");
  square.innerText = "11";
  gameboardHolder.appendChild(square);
}

const gameboard = createChocolateBar(6, 7);
let turn = 0;
let player = ["first", "second"];

printChocolateBar(gameboard);

document.getElementById("message").innerText = `The ${
  player[turn % 2]
} player turn to select!`;
