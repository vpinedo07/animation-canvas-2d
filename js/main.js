const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// UI
const circleCount = document.getElementById("circleCount");
const countValue = document.getElementById("countValue");

const canvasWidth = document.getElementById("canvasWidth");
const canvasHeight = document.getElementById("canvasHeight");
const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");

// Límite máximo del canvas: 75% de la pantalla
let maxCanvasW = Math.floor(window.innerWidth * 0.75);
let maxCanvasH = Math.floor(window.innerHeight * 0.75);

// Dimensiones actuales del canvas
let window_width = 0;
let window_height = 0;

// ==========================
// Utilidades
// ==========================
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ==========================
// Clase Circle
// ==========================
class Circle {
  constructor(x, y, radius, color, text, speed, angleRad) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    // Dirección única (ángulo)
    this.dx = Math.cos(angleRad) * this.speed;
    this.dy = Math.sin(angleRad) * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.lineWidth = 2;

    // Texto centrado
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillText(this.text, this.posX, this.posY);

    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote con corrección de posición (evita atorados)
    if (this.posX + this.radius > window_width) {
      this.posX = window_width - this.radius;
      this.dx = -this.dx;
    }
    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
    }
    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy;
    }
    if (this.posY + this.radius > window_height) {
      this.posY = window_height - this.radius;
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// ==========================
// Generación / Estado
// ==========================
const maxCircles = 10;
const colors = ["blue", "red", "green", "purple", "orange", "brown", "black", "teal", "magenta", "navy"];
let circles = [];

// Aplica tamaño al canvas, respetando límite 75% y mínimo 100px
function aplicarDimensionesCanvas(w, h) {
  const newW = clamp(w, 100, maxCanvasW);
  const newH = clamp(h, 100, maxCanvasH);

  canvas.width = newW;
  canvas.height = newH;

  window_width = newW;
  window_height = newH;

  // Refleja valores en UI
  canvasWidth.value = String(newW);
  canvasHeight.value = String(newH);
  widthValue.textContent = String(newW);
  heightValue.textContent = String(newH);
}

function generarCirculos(n) {
  // Direcciones únicas: 10 ángulos diferentes, barajados
  let angles = Array.from({ length: maxCircles }, (_, i) => (i * (2 * Math.PI)) / maxCircles);
  angles = shuffleArray(angles);

  // Velocidades únicas: 10 velocidades diferentes, barajadas
  let speeds = Array.from({ length: maxCircles }, (_, i) => 1.5 + i * 0.5);
  speeds = shuffleArray(speeds);

  const nuevos = [];

  for (let i = 0; i < n; i++) {
    const rawRadius = randInt(30, 80);

    // Si canvas es pequeño, ajustamos radio para garantizar que quepa
    const maxAllowedRadius = Math.max(10, Math.floor(Math.min(window_width, window_height) / 4));
    const radius = Math.min(rawRadius, maxAllowedRadius);

    // Posición segura (no nace en márgenes)
    const x = Math.random() * (window_width - 2 * radius) + radius;
    const y = Math.random() * (window_height - 2 * radius) + radius;

    nuevos.push(
      new Circle(
        x,
        y,
        radius,
        colors[i % colors.length],
        String(i + 1),
        speeds[i],
        angles[i]
      )
    );
  }

  circles = nuevos;
}

// ==========================
// UI Sync
// ==========================
function syncCirclesUI() {
  const n = parseInt(circleCount.value, 10);
  countValue.textContent = String(n);
  generarCirculos(n);
}

function syncCanvasUI() {
  const w = parseInt(canvasWidth.value, 10);
  const h = parseInt(canvasHeight.value, 10);
  aplicarDimensionesCanvas(w, h);

  // Regenerar para que ningún círculo quede fuera tras el cambio de tamaño
  syncCirclesUI();
}

function initCanvasControls() {
  maxCanvasW = Math.floor(window.innerWidth * 0.75);
  maxCanvasH = Math.floor(window.innerHeight * 0.75);

  canvasWidth.max = String(maxCanvasW);
  canvasHeight.max = String(maxCanvasH);

  // Valores iniciales seguros
  const initialW = clamp(parseInt(canvasWidth.value || "520", 10), 100, maxCanvasW);
  const initialH = clamp(parseInt(canvasHeight.value || "360", 10), 100, maxCanvasH);

  aplicarDimensionesCanvas(initialW, initialH);
}

// Eventos
circleCount.addEventListener("input", syncCirclesUI);
canvasWidth.addEventListener("input", syncCanvasUI);
canvasHeight.addEventListener("input", syncCanvasUI);

window.addEventListener("resize", () => {
  initCanvasControls();
  syncCirclesUI();
});

// Inicial
initCanvasControls();
syncCirclesUI();

// ==========================
// Animación
// ==========================
function updateScene() {
  requestAnimationFrame(updateScene);
  ctx.clearRect(0, 0, window_width, window_height);

  for (const c of circles) c.update(ctx);
}

updateScene();
