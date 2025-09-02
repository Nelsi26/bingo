const totalBalls = 75;
let availableBalls = Array.from({ length: totalBalls }, (_, i) => i + 1);
const historyList = document.getElementById("history-list");
const currentBall = document.getElementById("current-ball");
const spinner = document.getElementById("spinner");
const drawBtn = document.getElementById("draw-btn");
const resetBtn = document.getElementById("reset-btn");

// Función para obtener posición aleatoria dentro de un círculo
function getRandomPositionInCircle(radius) {
  const angle = Math.random() * 2 * Math.PI;
  const r = radius * Math.sqrt(Math.random());
  const x = r * Math.cos(angle);
  const y = r * Math.sin(angle);
  return { x, y };
}

// Crear bolitas numeradas dentro del bombo, distribuidas aleatoriamente
function generateSpinnerBalls() {
  spinner.innerHTML = ""; // Limpiar anteriores si hay
  const decorativeNumbers = [...Array(totalBalls).keys()].map(i => i + 1);
  for (let i = 0; i < totalBalls; i++) {
    const number = decorativeNumbers.splice(
      Math.floor(Math.random() * decorativeNumbers.length), 1
    )[0];

    const ball = document.createElement("div");
    ball.className = "ball";
    ball.textContent = number;

    const { x, y } = getRandomPositionInCircle(200);
    ball.style.left = `${225 + x - 11}px`;
    ball.style.top = `${225 + y - 11}px`;

    spinner.appendChild(ball);
  }
}

generateSpinnerBalls();

// Función para sacar una bolita aleatoria
function drawBall() {
  if (availableBalls.length === 0) {
    alert("¡Ya no quedan bolitas!");
    return;
  }

  // Acelera el giro temporalmente
  spinner.style.animationDuration = "0.5s";
  setTimeout(() => {
    spinner.style.animationDuration = "10s";
  }, 1000);

  // Elegir número aleatorio y sacarlo del array disponible
  const index = Math.floor(Math.random() * availableBalls.length);
  const number = availableBalls.splice(index, 1)[0];

  // Mostrar el número en la bolita grande
  currentBall.textContent = number;

  // Añadir número al historial (al principio)
  const li = document.createElement("li");
  li.textContent = number;
  historyList.prepend(li);

  // Anunciar número con voz
  setTimeout(() => {
    const utterance = new SpeechSynthesisUtterance(`${number}`);
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

