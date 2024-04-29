const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let correct = false;
let startTime;
let counter = 0;
let userStart = false;

quoteInputElement.addEventListener('input', () => {

  if (!userStart) {
    userStart = true
    startTimer();
  }

  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
      correct = true;
    } else {
      characterSpan.classList.add('incorrect');
      characterSpan.classList.remove('correct');
      correct = false;
    }
  })

  if (correct) {
    if (counter >= 5) {
      window.alert("Congradulations!! You won the game!!" + " Your score is: " + counter);
      counter = 0;
    } else {
      counter++;
      window.alert("Congradulations!!" + " Your score is: " + counter);
    }
    RandomQuote();
    startTimer();
  };
})

async function RandomQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const quote = await response.json();
  const quoteText = quote.content;
  quoteDisplayElement.innerHTML = '';

  quoteText.split('').forEach(character => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  })
  quoteInputElement.value = null;
  timerElement.innerText = 0;
}

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date;
  setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

RandomQuote();