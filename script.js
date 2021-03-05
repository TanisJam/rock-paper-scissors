//get references for buttons of player
const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
playerRock.addEventListener("click", choise);
playerPaper.addEventListener("click", choise);
playerScissors.addEventListener("click", choise);

const btnGo = document.querySelector(".go");
btnGo.addEventListener("click", go);

//reference for computers
const computerRock = document.getElementById("computer-rock");
const computerPaper = document.getElementById("computer-paper");
const computerScissors = document.getElementById("computer-scissors");

// references of scoreboard
const playerScoreDisplay = document.getElementById("score-player");
const computerScoreDisplay = document.getElementById("score-computer");





//global variables
let userSelection = undefined;
let computerSelection = undefined;
let scorePlayer = 0;
let scoreComputer = 0;

// main function that run the game
function go() {

    shakeBody();


    //test user selection against computer selection
    computerPlay();
    let result = playRound(userSelection, computerSelection);
    if (result === undefined) {
        displayMessage("Pick one to play!");
        return;
    }


    switch (result) {
        case 0:
            scorePlayer++;
            displayMessage("Player point!");
            break;

        case 1:
            scoreComputer++;
            displayMessage("Computer point!");
            break;

        case 2:
            displayMessage("Tie!");
            break;
    }

    updateVisuals();

    if (scorePlayer > 4 || scoreComputer > 4) {

        let winner = scorePlayer > scoreComputer ? "PLAYER" : "COMPUTER";
        let bgColor = scorePlayer > scoreComputer ? "green" : "red";
        displayMessage(`${winner} WINS`, "6s", bgColor);
        userSelection = undefined;
        computerSelection = undefined;
        scorePlayer = 0;
        scoreComputer = 0;
        updateVisuals();
    }



}

//set user choise
function choise(e) {
    if (userSelection == e.target["alt"]) {
        userSelection = undefined;
    } else {
        userSelection = e.target["alt"];
    }
    computerSelection = undefined;
    updateVisuals();
}

//randomly return rock, paper or scissors
function computerPlay() {
    const options = ["rock", "paper", "scissors"];
    let selection = Math.floor(Math.random() * 3);
    computerSelection = options[selection];
}



function playRound(playerSelection = "", computerSelection) {

    let userInput = playerSelection;
    let output;

    //determine winner throungth comparing selections
    switch (userInput) {
        case "rock":
            switch (computerSelection) {
                case "rock":
                    tie();
                    break;

                case "paper":
                    loose();
                    break;

                case "scissors":
                    win()
                    break;
            }
            break;

        case "paper":
            switch (computerSelection) {
                case "rock":
                    win();
                    break;

                case "paper":
                    tie();
                    break;

                case "scissors":
                    loose();
                    break;
            }
            break;

        case "scissors":
            switch (computerSelection) {
                case "rock":
                    loose();
                    break;

                case "paper":
                    win();
                    break;

                case "scissors":
                    tie();
                    break;
            }
            break;

        default:
            output = undefined;
    }


    //functions to return final message
    //format [winner, winner-choice, looser-choice]
    //player = 0 //  computer = 1  // tie = 2
    function loose() {
        output = 1;
    }
    function tie() {
        output = 2;
    }
    function win() {
        output = 0;
    }

    //return the ouput
    return output;

}

function updateVisuals() {

    //add selected class to a player selections
    playerRock.className = userSelection == "rock" ? "selected" : "";
    playerPaper.className = userSelection == "paper" ? "selected" : "";
    playerScissors.className = userSelection == "scissors" ? "selected" : "";

    //add selected class to a computer selections
    computerRock.className = computerSelection == "rock" ? "selected" : "";
    computerPaper.className = computerSelection == "paper" ? "selected" : "";
    computerScissors.className = computerSelection == "scissors" ? "selected" : "";

    //update scores
    playerScoreDisplay.innerText = scorePlayer;
    computerScoreDisplay.innerText = scoreComputer;

}

function shakeBody() {
    const body = document.querySelector("main");
    body.className = "shake";

    body.addEventListener("transitionend", () => {
        body.classList.remove("shake");

    })

}

function displayMessage(message, moreTime = ".8s", bgColor = "#9c88ffe1") {
    const messageContainer = document.getElementById("message");
    messageContainer.style.backgroundColor = bgColor;
    messageContainer.innerText = message;
    messageContainer.style.transition = `all ${moreTime}`
    messageContainer.style.opacity = "100"
    messageContainer.addEventListener("transitionend", (e) => {
        e.target.style.opacity = "0";    
    })
}