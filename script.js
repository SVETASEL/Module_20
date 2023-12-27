const minValue = parseInt(prompt('Минимальное значение числа для игры', '0')) || 0;
const maxValue = parseInt(prompt('Максимальное значение числа для игры', '100')) || 100;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

let orderNumber = 1;
let gameRun = true;
let minValueValidated = (minValue < -999) ? -999 : (minValue > 999) ? 999 : minValue;
let maxValueValidated = (maxValue < -999) ? -999 : (maxValue > 999) ? 999 : maxValue;

if (isNaN(minValueValidated)) {
  minValueValidated = 0;
}

if (isNaN(maxValueValidated)) {
  maxValueValidated = 100;
}

let answerNumber = Math.floor((minValueValidated + maxValueValidated) / 2);

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${numberToText(answerNumber)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
  const newMinValue = parseInt(prompt('Минимальное значение числа для игры', '0')) || 0;
  const newMaxValue = parseInt(prompt('Максимальное значение числа для игры', '100')) || 100;

  minValueValidated = (newMinValue < -999) ? -999 : (newMinValue > 999) ? 999 : newMinValue;
  maxValueValidated = (newMaxValue < -999) ? -999 : (newMaxValue > 999) ? 999 : newMaxValue;

  orderNumber = 1;
  answerNumber = Math.floor((minValueValidated + maxValueValidated) / 2);
  gameRun = true;

  orderNumberField.innerText = orderNumber;
  answerField.innerText = `Вы загадали число ${numberToText(answerNumber)}?`;
});

document.getElementById('btnOver').addEventListener('click', function () {
  if (gameRun) {
    if (minValueValidated === maxValueValidated) {
      const answerPhrase = `Не могу определить число!\n\u{1F914}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      minValueValidated = answerNumber + 1;
      answerNumber = Math.floor((minValueValidated + maxValueValidated) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;

      const phraseRandom = Math.floor(Math.random() * 3);
      let answerPhrase = getAnswerPhrase(phraseRandom, answerNumber);
      answerField.innerText = answerPhrase;
    }
  }
});

document.getElementById('btnLess').addEventListener('click', function () {
  if (gameRun) {
    if (minValueValidated > maxValueValidated) {
      const answerPhrase = `Я сдаюсь!\n\u{1F914}`;
      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      maxValueValidated = answerNumber - 1;
      if (minValueValidated > maxValueValidated) {
        const answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
        answerField.innerText = answerPhrase;
        gameRun = false;
      } else {
        answerNumber = Math.floor((minValueValidated + maxValueValidated) / 2);
        orderNumber++;
        orderNumberField.innerText = orderNumber;

        const phraseRandom = Math.floor(Math.random() * 3);
        let answerPhrase = getAnswerPhrase(phraseRandom, answerNumber);
        answerField.innerText = answerPhrase;
      }
    }
  }
});

document.getElementById('btnEqual').addEventListener('click', function () {
  if (gameRun) {
    const phraseRandom = Math.floor(Math.random() * 3);
    let answerPhrase = getAnswerPhrase(phraseRandom, answerNumber);
    answerField.innerText = answerPhrase;
    gameRun = false;
  }
});

function getAnswerPhrase(phraseRandom, answerNumber) {
  switch (phraseRandom) {
    case 0:
      return `Легко! Это число ${numberToText(answerNumber)}?`;
    case 1:
      return `Может быть, число ${numberToText(answerNumber)}?`;
    case 2:
      return `Думаю, это число ${numberToText(answerNumber)}.`;
    default:
      return '';
  }
}

function numberToText(num) {
  const units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  const tens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

  if (num === 0) {
    return 'ноль';
  }

  if (num < 0 && num >= -999) {
    return 'минус ' + numberToText(Math.abs(num));
  }

  if (num < 20) {
    return units[num];
  }

  if (num < 100) {
    const tensText = tens[Math.floor(num / 10)];
    const unitsText = units[num % 10];
    return (tensText + ' ' + unitsText).trim();
  }

  if (num < 1000) {
    const hundredsText = hundreds[Math.floor(num / 100)];
    const remainderText = numberToText(num % 100);
    return (hundredsText + ' ' + remainderText).trim();
  }

  return num.toString();
}

