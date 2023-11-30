// DOM Element Selection
const mainScreen = document.querySelector(".main-screen");
const PCScore = document.querySelector(".PCscore");
const playerScore = document.querySelector(".playerScore");
const gameZone = document.querySelector(".gameZone");
const gestures = document.querySelectorAll(".signs");
const userRock = document.querySelector("#user-rock");
const pcRock = document.querySelector("#pc-rock");
const userPaper = document.querySelector("#user-paper");
const pcPaper = document.querySelector("#pc-paper");
const userScissor = document.querySelector("#user-scissor");
const pcScissor = document.querySelector("#pc-scissor");
const resultZone = document.querySelector(".resultZone");
const winningText = document.querySelector("#winning-text");
const loosingText = document.querySelector("#loosing-text");
const tiedText = document.querySelector("#tied-text");
const subText = document.querySelector(".sub-text");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const userIcon = document.querySelector(".user-side-icon");
const pcIcon = document.querySelector(".pc-side-icon");
const nextBtn = document.querySelector(".nextBtn");
const rulesBtn = document.querySelector(".rulesBtn");
const winningScreen = document.querySelector(".winning-screen");
const winnerPlayAgainBtn = document.querySelector(".winnerPlayAgainBtn");
const rulesDisplay = document.querySelector(".rules");
const crossBtn = document.querySelector(".cross");
const gameOptions = Array.from(gestures);


// Retrieves scores from local storage and updates the display
function updateScoreDisplay() {
  const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };

  PCScore.innerText = scores.computer;
  playerScore.innerText = scores.user;
}
updateScoreDisplay();

console.log(gameOptions);


// Function to map key names to numerical values (rock: 1, paper: 2, scissor: 3)
const valueOfKey = (name) => {
  const keyValues = { rock: 1, paper: 2, scissor: 3 };
  console.log(name);
  return keyValues[name] || 0;
};

// Function to generate a random number between 1 and 3 (inclusive) for rock, paper, or scissor
const getRandomNumber = () => Math.floor(Math.random() * 3) + 1;


// Determine the result of a Rock-Paper-Scissors game based on user and computer choices
const playRockPaperScissors = (userChoice, compChoice) => {
  const resultMatrix = [
    /* userChoice: 1, 2, 3 */
    /* compChoice: */
    /* 1 */["tie", "comp", "user"],
    /* 2 */["user", "tie", "comp"],
    /* 3 */["comp", "user", "tie"],
  ];

  return resultMatrix[userChoice - 1][compChoice - 1];
};


// Updates the scores in local storage based on the game result
const updateScores = (result) => {
  // Retrieve the current scores from local storage
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  // Increment the corresponding score based on the result
  result === "user" ? scores.user++ : result === "comp" ? scores.computer++ : null;

  // Save the updated scores back to local storage
  localStorage.setItem("scores", JSON.stringify(scores));

  // Update the displayed scores
  updateScoreDisplay();
};

// Updates the displayed icons based on user and computer choices
const updateResultSides = (userChoice, compChoice) => {
  const displayStyle = (element, show) => (element.style.display = show ? "flex" : "none");

  // Setting user icon
  displayStyle(userRock, userChoice === 1);
  displayStyle(userPaper, userChoice === 2);
  displayStyle(userScissor, userChoice === 3);

  // Setting computer icon
  displayStyle(pcRock, compChoice === 1);
  displayStyle(pcPaper, compChoice === 2);
  displayStyle(pcScissor, compChoice === 3);
};

// Updates the result zone based on the game result
const updateResultZone = (result, userChoice, compChoice) => {
  // Toggling visibility between playing and result screens
  gameZone.style.display = "none";
  resultZone.style.display = "flex";

  // Hiding all text and buttons initially
  [tiedText, winningText, loosingText, subText, playAgainBtn, nextBtn, replayBtn].forEach((element) => {
    element.style.display = "none";
  });

  // Displaying the appropriate text and buttons based on the result
  if (result === "tie") {
    tiedText.style.display = "block";
    replayBtn.style.display = "block";
    updateResultSides(userChoice, compChoice);
    userIcon.classList.remove("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "user") {
    winningText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    nextBtn.style.display = "inline";
    updateResultSides(userChoice, compChoice);
    userIcon.classList.add("green-background");
    pcIcon.classList.remove("green-background");
  } else if (result === "comp") {
    loosingText.style.display = "block";
    subText.style.display = "block";
    playAgainBtn.style.display = "block";
    updateResultSides(userChoice, compChoice);
    userIcon.classList.remove("green-background");
    pcIcon.classList.add("green-background");
  }
};

// Handles the click event on the game keys
const keyClickHander = (event) => {
  const clickedElement = event.target.closest(".signs");

  if (clickedElement) {
    const userChoice = valueOfKey(clickedElement.id);
    console.log("User Choice:", userChoice);

    const compChoice = getRandomNumber();
    console.log("Computer Choice:", compChoice);

    const result = playRockPaperScissors(userChoice, compChoice);
    console.log("Result:", result);

    updateScores(result);
    updateResultZone(result, userChoice, compChoice);
  }
};


// Handles the click event to play again
const playAgainHandler = () => {
  // Show the playing screen and hide the result and winning screens
  gameZone.style.display = "flex";
  resultZone.style.display = "none";
  mainScreen.style.display = "block";
  winningScreen.style.display = "none";
};


const showWinnerScreen = () => {
  mainScreen.style.display = "none";
  winningScreen.style.display = "flex";
  nextBtn.style.display = "none";
};


const showRules = () => {
  console.log("Inside showRulesHandler");
  crossBtn.style.display = "flex";
  rulesDisplay.style.display = "flex";
};

const removeRulesHandler = () => {
  // remove rules and cross
  crossBtn.style.display = "none";
  rulesDisplay.style.display = "none";
};


//  Event Listeners---

gameOptions.forEach((key) => key.addEventListener("click", keyClickHander));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", showWinnerScreen);
winnerPlayAgainBtn.addEventListener("click", playAgainHandler);
rulesBtn.addEventListener("click", showRules);
crossBtn.addEventListener("click", removeRulesHandler);