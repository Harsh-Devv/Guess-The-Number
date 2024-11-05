'use strict';

const number = document.querySelector('.number');
const points = document.querySelector('.score');
const message = document.querySelector('.message');
const body = document.querySelector('body');
const btnCheck = document.querySelector('.check');
const btn = document.querySelector('.btn');
const input = document.querySelector('#num');

let secretNumber;
let score = 20;
let highscore = 0;
let guessed = 0; // to hold previous guess value
let hint = 7

function displayMessage(msg) {
  message.textContent = msg;
}

function randomNumber() {
  secretNumber = Math.trunc(Math.random() * 50) + 1; 
}

function btnDisable() {
  input.disabled = true;
}

function btnEnable() {
  input.disabled = false;
}
randomNumber();

btnCheck.addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  const guessDifference = guess - secretNumber;
  const guessDifference2 = secretNumber - guess;
  const guessGreater = guess > secretNumber;
  if (!guess) {
    console.log(typeof guess);
    console.log(typeof !guess);
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    btnDisable();
    number.textContent = secretNumber;
    number.style.width = '30rem';
    body.style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber && guessed !== guess) {
    if (score > 1) {
      if (guess < 0 || guess > 50) {
        displayMessage('Input number between 1 - 30');
      } else if (guessGreater && guessDifference <= hint) {
        displayMessage('📈 High');
        score--;
      } else if (guessGreater && guessDifference > hint) {
        displayMessage('📈 Too High!');
        score--;
      } else if (!guessGreater && guessDifference2 > hint) {
        displayMessage('📉 Too Low!');
        score--;
      } else if (!guessGreater && guessDifference2 <= hint) {
        displayMessage('📉 Low');
        score--;
      }
      points.textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      body.style.backgroundColor = 'red';
      btnDisable();
      number.textContent = secretNumber;
      number.style.width = '30rem';
      points.textContent = 0;
    }
  }
  guessed = guess;
});

// Reset
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  randomNumber();
  displayMessage('Start guessing...');
  points.textContent = score;
  number.textContent = '?';
  document.querySelector('.guess').value = '';
  btnEnable();
  body.style.backgroundColor = '#222';
  number.style.width = '15rem';
});
