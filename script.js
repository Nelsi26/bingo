const totalBalls = 75;
let availableBalls = Array.from({ length: totalBalls }, (_, i) => i + 1);
const historyList = document.getElementById("history-list");
const currentBall = document.getElementById("current-ball");
const spinner = document.getElementById("spinner");
const drawBtn = document.getElementById("draw-btn");
const resetBtn = document.getElementById("reset-btn");

// Obtener letra correspondiente al número
function getLetterForNumber(number) {
  if (number >= 1 && number <= 15) return "B";
  if (number >= 16 && number <= 30) return "I";
  if (number >= 31 && number <= 45) return "N";
  if (number >= 46 && number <= 60) return "G";
  if (number >= 61 && number <= 75) return "O";
  return "";
}

// Posición aleatoria en círculo
function getRandomPositionInCircle(radius) {
  const angle = Math.random() * 2 * Math.PI;
  const r = radius * Math.sqrt(Math.random());
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  return { x, y };
}

// Crear bolitas decorativas dentro del bombo
function generateSpinnerBalls() {
  spinner.innerHTML = "";
  const decorativeNumbers = [...Array(totalBalls).keys()].map(i => i + 1);
  for (let i = 0; i < totalBalls; i++) {
    const number = decorativeNumbers.splice(Math.floor(Math.random() * decorativeNumbers.length), 1)[0];

    const ball = document.createElement("div");
    ball.className = "ball";

    // OPCIONAL: Mostrar también letra en bolitas pequeñas
    const letter = getLetterForNumber(number);
    ball.textContent = `${letter}${number}`;

    const { x, y } = getRandomPositionInCircle(200);
    ball.style.left = `${225 + x - 11}px`;
    ball.style.top = `${225 + y - 11}px`;

    spinner.appendChild(ball);
  }
}

generateSpinnerBalls();

// Sacar bolita
function drawBall() {
  if (availableBalls.length === 0) {
    alert("¡Ya no quedan bolitas!");
    return;
  }

  // Acelerar animación
  spinner.style.animationDuration = "0.5s";
  setTimeout(() => {
    spinner.style.animationDuration = "10s";
  }, 1000);

  // Elegir número aleatorio y quitarlo del array
  const index = Math.floor(Math.random() * availableBalls.length);
  const number = availableBalls.splice(index, 1)[0];
  const letter = getLetterForNumber(number);
  const labeledNumber = `${letter}${number}`;

  // Mostrar en bolita principal
  currentBall.textContent = labeledNumber;

  // Agregar al historial
  const li = document.createElement("li");
  li.textContent = labeledNumber;
  historyList.prepend(li);

  // Anunciar con voz
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(`${letter} ${number}`);
    utterance.lang = 'es-ES';
    speechSynthesis.speak(utterance);
  }, 200);
}

drawBtn.addEventListener("click", drawBall);

// Reiniciar juego
resetBtn.addEventListener("click", () => {
  availableBalls = Array.from({ length: totalBalls }, (_, i) => i + 1);
  historyList.innerHTML = "";
  currentBall.textContent = "";
  generateSpinnerBalls();

  const utterance = new SpeechSynthesisUtterance("Juego reiniciado");
  utterance.lang = 'es-ES';
  speechSynthesis.speak(utterance);
});



