let objOfCategories = {
  jobs: ["doctor", "engineer", "softwareprogramming", "policeman", "pilot"],
  foods: ["salad", "rice", "botato", "chicken", "meet"],
  countries: ["egypt", "saudiarabia", "england", "ameriac", "yemen", "sudan"],
  herocharcters: ["superman", "batman", "spiderman", "haluk"],
};

let allSections = Object.keys(objOfCategories); // arr of all sections

let categorySpan = document.querySelector(".section .category");

let randomSection = allSections[Math.floor(Math.random() * allSections.length)]; // random section(key of object)

let wordGuess = document.querySelector(".word-guess");
let arrOfCategory = objOfCategories[randomSection];
let randomWord =
  arrOfCategory[Math.floor(Math.random() * arrOfCategory.length)]; // random word of section
console.log(randomWord);

// function set random section on loading the page
window.onload = function () {
  categorySpan.innerHTML = randomSection;
};

let allChar = "abcdefghijklmnopqrstuvwxyz";
let arrOfAllChar = Array.from(allChar);
let contentCharsDiv = document.querySelector(".content-chars");
function generateSpanOfChar() {
  for (let i = 0; i < arrOfAllChar.length; i++) {
    let charSpan = document.createElement("span");
    let spanText = document.createTextNode(arrOfAllChar[i]);
    charSpan.appendChild(spanText);
    contentCharsDiv.appendChild(charSpan);
  }
}
generateSpanOfChar();

// function that generate random word

function generateRandomWord() {
  for (let i = 0; i < randomWord.length; i++) {
    let charLi = document.createElement("li");
    charLi.className = "char-guess";
    let mySpan = document.createElement("span");
    mySpan.innerHTML = randomWord[i];
    charLi.appendChild(mySpan);
    mySpan.style.display = "none";
    wordGuess.appendChild(charLi);
  }
}
generateRandomWord();

// function that compare char the user enter with the random word
let spanChar = Array.from(document.querySelectorAll(".content-chars span"));
let charGuess = [...document.querySelectorAll(".char-guess")];
let charGuessSpan = Array.from(document.querySelectorAll(".char-guess span"));
let overlayDiv = document.querySelector(".overlay");
let hangManDiv = document.querySelectorAll(".hangman div");

function checkChar() {
  let wrongTrialCount = 0;
  let rightTrialCount = 0;
  spanChar.forEach((ele) => {
    let eleContent = ele.innerHTML;
    ele.onclick = function (e) {
      ele.classList.add("clicked");

      for (let i = 0; i < charGuessSpan.length; i++) {
        if (charGuessSpan[i].innerHTML === eleContent) {
          charGuessSpan[i].style.display = "block";
          rightTrialCount++;
          if (rightTrialCount === charGuessSpan.length) {
            overlayDiv.innerHTML = "congratulation you have win";
            overlayDiv.style.display = "flex";
            overlayDiv.style.color = "blue";
          }
        }
      }

      if (randomWord.indexOf(eleContent) === -1) {
        document.getElementById("fail").play();
        hangManDiv[wrongTrialCount].style.display = "block";
        wrongTrialCount++;

        if (wrongTrialCount === 7) {
          overlayDiv.innerHTML = "game over";
          overlayDiv.style.display = "flex";
        }
      } else {
        document.getElementById("success").play();
      }
    };
  });
}
checkChar();
