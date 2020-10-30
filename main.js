const buttonInitGame = document.querySelector(".btn-init-game");
const buttonEasy = document.querySelector(".easy");
const buttonNormal = document.querySelector(".normal");
const buttonHard = document.querySelector(".hard");
let levelOfDifficulty = 0;
const levelNotSelectedWarning = document.createElement ("span");
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
}

const pointsShower = document.createElement ("p");
header.appendChild (pointsShower);

function showPoints (points) {
  pointsShower.textContent = "seus pontos: " + points;
  pointsShower.style.color = "white";
  console.log (pointsShower);
}


function removeBalloon(element) {
  const boomSound = new Audio("./assets/boom.mpeg");
  boomSound.play();
  boomSound.volume = 0.1;
  element.remove();
  let pointsPerBaloon;
  switch (levelOfDifficulty) {

    case 1:
     pointsPerBaloon = 1;
     break; 
     
     case 2:
      pointsPerBaloon = 3;
       break; 
     
     case 3:
      pointsPerBaloon = 6;
       break;  

 }
  points += pointsPerBaloon;
  showPoints (points);
}
