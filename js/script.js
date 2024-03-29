"use strict";

(function () {
  let userNumber,
    playerName,
    guesses = 1,
    maxRange = 5,
    randomNumber = getRandom(1, maxRange),
    playerHighScore = 0,
    score = 0,
    currentLevel = 1;

  console.log(randomNumber);

  /**
   * Get Username
   */
  function getUserName() {
    let name = prompt("What is your name?");
    playerName = name.charAt(0).toUpperCase() + name.slice(1);
    checkName();
  }
  getUserName();

  /**
   * Check Name
   */
  function checkName() {
    if (!playerName) {
      alert("Please enter a valid name");
      getUserName();
    } else {
      alert(
        `Welcome to the game, ${playerName}!  Every time you guess the correct number, the range will increase by 5 per level and you will score 10 times the level you are on. for example, if you are on level 3, you will score 30 points.  You have 4 guesses per level.  Good luck!`
      );
      playGame();
    }
  }

  /**
   * Play Game
   */
  function playGame() {
    userNumber = parseInt(
      prompt(`
      Level: ${currentLevel}
      Current Score: ${score}
      High Score: ${playerHighScore}
      ${playerName}, enter a number between 1 and ${maxRange}

      Enter guess #${guesses}
      `)
    );

    if (userNumber === randomNumber) {
      score += currentLevel * 10;
      alert(`
        Congratulations! You guessed the correct number: ${randomNumber}. 
        The next level is ${currentLevel + 1}!  Good luck!`);
      resetGame();
    } else {
      if (userNumber > randomNumber) {
        alert("Your guess is too high");
      } else if (userNumber < randomNumber) {
        alert("Your guess is too low");
      } else {
        alert("Please enter a valid number");
      }
      guesses++;
      if (guesses < 5) {
        playGame();
      } else {
        alert(`You have run out of guesses. The correct number was ${randomNumber}`);
        currentLevel = 1;
        gameOver();
      }
    }
  }

  /**
   * Game Over
   */
  function gameOver() {
    alert(
      `Game Over, ${playerName}! Your final score is: ${score}\nHigh Score: ${score > playerHighScore ? score : playerHighScore}\n\n${
        score > playerHighScore ? `Congratulations! You have a new high score of ${score}!` : ""
      }`
    );

    if (score > playerHighScore) {
      playerHighScore = score;
    }

    let playAgain = prompt(`${playerName}, would you want to play again? Y/N`);

    if ((playAgain && playAgain.toLowerCase() === "y") || (playAgain && playAgain.toLowerCase() === "yes")) {
      resetGame();
    } else if ((playAgain && playAgain.toLowerCase() === "n") || (playAgain && playAgain.toLowerCase() === "no")) {
      alert("Thanks for playing!");
    } else {
      alert("Please enter a valid response Y or N");
      gameOver();
    }
  }

  /**
   * Reset Game
   */
  function resetGame() {
    if (guesses === 5) {
      score = 0;
      maxRange = 5;
    } else if (guesses < 5) {
      maxRange += 5;
      currentLevel += 1;
    }
    guesses = 1;
    randomNumber = getRandom(1, maxRange);
    console.log(randomNumber);
    playGame();
  }

  /**
   * Get Random Number
   */
  function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
  }
})();
