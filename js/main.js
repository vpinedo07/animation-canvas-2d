const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// UI
const circleCount = document.getElementById("circleCount");
const countValue = document.getElementById("countValue");

// Dimensiones (tu versión /2)
let window_height = window.innerHeight / 2;
let window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = "#ff8";

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
// Generación de círculos según slider
// ==========================
const maxCircles = 10;
const colors = ["blue", "red", "green", "purple", "orange", "brown", "black", "teal", "magenta", "navy"];

let circles = [];

function generarCirculos(n) {
  // 1) Direcciones únicas: 10 ángulos distintos, barajados
  let angles = Array.from({ length: maxCircles }, (_, i) => (i * (2 * Math.PI)) / maxCircles);
  angles = shuffleArray(angles);

  // 2) Velocidades únicas: 10 valores distintos, barajados
  let speeds = Array.from({ length: maxCircles }, (_, i) => 1.5 + i * 0.5);
  speeds = shuffleArray(speeds);

  const nuevos = [];

  for (let i = 0; i < n; i++) {
    const radius = randInt(30, 80);

    // Posición inicial segura
    const x = Math.random() * (window_width - 2 * radius) + radius;
    const y = Math.random() * (window_height - 2 * radius) + radius;

    const color = colors[i % colors.length];
    const text = String(i + 1);
    const speed = speeds[i];
    const angleRad = angles[i];

    nuevos.push(new Circle(x, y, radius, color, text, speed, angleRad));
  }

  circles = nuevos;
}

// ==========================
// Eventos del slider
// ==========================
function syncUI() {
  const n = parseInt(circleCount.value, 10);
  countValue.textContent = String(n);
  generarCirculos(n);
}

circleCount.addEventListener("input", syncUI);

// Inicial
syncUI();

// ==========================
// Animación
// ==========================
function updateScene() {
  requestAnimationFrame(updateScene);
  ctx.clearRect(0, 0, window_width, window_height);

  for (const c of circles) {
    c.update(ctx);
  }
}

updateScene();
