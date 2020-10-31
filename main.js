const buttonInitGame = document.querySelector(".btn-init-game");
const buttonEasy = document.querySelector(".easy");
const buttonNormal = document.querySelector(".normal");
const buttonHard = document.querySelector(".hard");
const levelNotSelectedWarning = document.createElement ("span");
const pointsShower = document.createElement ("p");
const body = document.querySelector ("body");
let ballonsOnScreen = 0;
let levelOfDifficulty = 0;
let points = 0;

function difficultySelector () {
  buttonEasy.addEventListener ("click", function () {
      levelOfDifficulty = 1;   
  })

  buttonNormal.addEventListener ("click", function () {
    levelOfDifficulty = 2;   
})

buttonHard.addEventListener ("click", function () {
  levelOfDifficulty = 3;   
})

}
difficultySelector();

const header = document.querySelector ("header");

buttonInitGame.addEventListener("click", function () {
  

  if (levelOfDifficulty === 0) {
    levelNotSelectedWarning.textContent = "*selecione um nivel de dificuldade para começar o game*";
    levelNotSelectedWarning.style.color = "white";
    levelNotSelectedWarning.style.margin = "20px";
    levelNotSelectedWarning.style.textAlign = "center";
    header.appendChild (levelNotSelectedWarning);
  
  } else{
    levelNotSelectedWarning.remove();
    buttonInitGame.remove();
    buttonEasy.remove();
    buttonNormal.remove();
    buttonHard.remove();
    initGame();
  }
});

function initGame() {
  let spawnFrequency;
  switch (levelOfDifficulty) {

     case 1:
      spawnFrequency = 1000;
      break; 
      
      case 2:
        spawnFrequency = 800;
        break; 
      
      case 3:
        spawnFrequency = 400;
        break;  

  }
  setInterval(createBalloon, spawnFrequency);
}

const balloonsContainer = document.querySelector(".container-balloons");

function createBalloon() {
  const elementImg = document.createElement("img");

  elementImg.setAttribute("src", "./assets/baloon.png");
  elementImg.setAttribute("class", "balloon");

  const positionLeft = Math.round(Math.random() * 90);
  const positionTop = Math.round(Math.random() * 90);

  elementImg.style.left = positionLeft + "vw";
  elementImg.style.top = positionTop + "vh";

  elementImg.addEventListener("click", function () {
    removeBalloon(this);
  });

  balloonsContainer.appendChild(elementImg);
  ballonsOnScreen +=1;
  if (ballonsOnScreen === 5) {
    gameOver ();
  }
}

function restart (restartButton) {
  restartButton.addEventListener ("click", function () {
  location.reload();
})
}


function gameOver () {
  const gameOverContainer = document.createElement ("section");
  gameOverContainer.setAttribute("class", "game-over");
  const GameOverAlert = document.createElement ("p");
  GameOverAlert.setAttribute("class", "game-over-alert");
  const score = document.createElement ("p");
  score.setAttribute("class", "score");
  GameOverAlert.textContent = "Game Over";
  score.textContent = "sua pontuação foi: " + points;
  const restartBtn = document.createElement ("button");
  restartBtn.setAttribute("class", "restart-btn");
  restartBtn.textContent = "Restart";
  gameOverContainer.appendChild (GameOverAlert);
  gameOverContainer.appendChild (score);
  gameOverContainer.appendChild (restartBtn);
  body.appendChild (gameOverContainer);
  restart (restartBtn);
}

header.appendChild (pointsShower);

function showPoints (points) {
  pointsShower.textContent = "seus pontos: " + points;
  pointsShower.style.color = "white";
  console.log (pointsShower);
}


function removeBalloon(element) {
  if (ballonsOnScreen < 5) {
    const boomSound = new Audio("./assets/boom.mpeg");
    boomSound.play();
    boomSound.volume = 0.1;
    element.remove();
    let pointsPerBaloon;
    switch (levelOfDifficulty) {

      case 1:
      pointsPerBaloon = 2;
      break; 
     
      case 2:
        pointsPerBaloon = 3;
        break; 
     
      case 3:
        pointsPerBaloon = 6;
        break;  

  }
    points += pointsPerBaloon;
    ballonsOnScreen -=1;
    showPoints (points);
}
}
