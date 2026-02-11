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
