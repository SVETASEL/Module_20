let minValue = getValidInput('Минимальное значение числа для игры', 0, -999, 999);
let maxValue = getValidInput('Максимальное значение числа для игры', 100, -999, 999);

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

let orderNumber = 1;
let gameRun = true;
let answerNumber = Math.floor((minValue + maxValue) / 2);

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${numberToText(answerNumber)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
  retryGame();
});

document.getElementById('btnOver').addEventListener('click', function () {
  guessNumber('over');
});

document.getElementById('btnLess').addEventListener('click', function () {
  guessNumber('less');
});

document.getElementById('btnEqual').addEventListener('click', function () {
  checkEquality();
});

function getValidInput(promptMessage, defaultValue, minValue, maxValue) {
  let value = parseInt(prompt(promptMessage, defaultValue)) || defaultValue;
  return (value < minValue) ? minValue : (value > maxValue) ? maxValue : value;
}

function retryGame() {
  minValue = getValidInput('Минимальное значение числа для игры', 0, -999, 999);
  maxValue = getValidInput('Максимальное значение числа для игры', 100, -999, 999);
  orderNumber = 1;
  answerNumber = Math.floor((minValue + maxValue) / 2);
  gameRun = true;

  orderNumberField.innerText = orderNumber;
  answerField.innerText = `Вы загадали число ${numberToText(answerNumber)}?`;
}

function guessNumber(action) {
  if (gameRun) {
    if (action === 'over') {
      minValue = answerNumber + 1;
    } else if (action === 'less') {
      maxValue = answerNumber - 1;
    }

    if (minValue > maxValue) {
      answerField.innerText = `Вы загадали неправильное число!\n\u{1F914}`;
      gameRun = false;
    } else {
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      answerField.innerText = `Это число ${numberToText(answerNumber)}?`;
    }
  }
}

function checkEquality() {
  if (gameRun) {
    const phrase = getRandomPhrase();
    answerField.innerText = phrase;
    gameRun = false;
  }
}

function getRandomPhrase() {
  const phrases = [
    `Я всегда угадываю! Твое число - ${numberToText(answerNumber)}\n\u{1F60E}`,
    `Это было просто! Загаданное число - ${numberToText(answerNumber)}\n\u{1F643}`,
    `Мне несложно! Ответ - ${numberToText(answerNumber)}.\u{1F601}`
  ];
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

