const buttonInitGame = document.querySelector(".btn-init-game");
const buttonEasy = document.querySelector(".easy");
const buttonNormal = document.querySelector(".normal");
const buttonHard = document.querySelector(".hard");
let levelOfDifficulty = 0;
const levelNotSelectedWarning = document.createElement ("span");

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

function removeBalloon(element) {
  const boomSound = new Audio("./assets/boom.mpeg");
  boomSound.play();
  boomSound.volume = 0.1;
  element.remove();
}
