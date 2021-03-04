function computerPlay() {
    //randomly return rock, paper or scissors
    const options = ["rock", "paper", "scissors"];
    let selection = Math.floor(Math.random() * 3);
    return options[selection];
}

function playRound(playerSelection, computerSelection) {
    //normalize user imput
    let userInput = playerSelection.toLowerCase();
    let output;

    //determine winner throungth comparing selections
    switch (userInput) {
        case "rock":
            switch (computerSelection) {
                case "rock":
                    tie(userInput);
                    break;

                case "paper":
                    loose(computerSelection, userInput);
                    break;

                case "scissors":
                    win(userInput, computerSelection)
                    break;
            }
            break;

        case "paper":
            switch (computerSelection) {
                case "rock":
                    win(userInput, computerSelection);
                    break;

                case "paper":
                    tie(userInput);
                    break;

                case "scissors":
                    loose(computerSelection, userInput);
                    break;
            }
            break;

        case "scissors":
            switch (computerSelection) {
                case "rock":
                    loose(computerSelection, userInput);
                    break;

                case "paper":
                    win(userInput, computerSelection);
                    break;

                case "scissors":
                    tie(userInput);
                    break;
            }
            break;

        default:
            output = "something goes wrong";
    }


    //functions to return final message
    //format [winner, winner-choice, looser-choice]
    //player = 0 //  computer = 1  // tie = 2
    function loose(winnerChoice, looserChoice) {
        output = [1, winnerChoice, looserChoice];
    }
    function tie(choice) {
        output = [2, choice];
    }
    function win(winnerChoice, looserChoice) {
        output = [0, winnerChoice, looserChoice];
    }

    //return the ouput
    return output;

}

function game() {
    let winner;
    let userWins = 0;
    let computerWins = 0;

    for (let round = 1; round <= 5; round++) {
        let userSelection = prompt("Rock, paper or scissors?");

        let result = playRound(userSelection, computerPlay());

        switch (result[0]) {
            case 0:
                userWins++;
                console.log(`You win!, ${result[1]} beats ${result[2]}`);
                break;

            case 1:
                computerWins++;
                console.log(`You loose!, ${result[1]} beats ${result[2]}`)
                break;

            case 2:
                console.log(`You tied, both play ${result[1]}`)
                break;
        }

    }

    if (userWins > computerWins) {
        winner = "Player Wins!";
    } else if (computerWins > userWins) {
        winner = "Computer Wins!";
    } else {
        winner = "Both Wins!"
    }

    console.log(winner);

    return 0;
}
