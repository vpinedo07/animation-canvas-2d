const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual (tu versión /2)
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

// ==========================
// Utilidades
// ==========================
function shuffleArray(arr) {
  // Fisher–Yates shuffle
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
// Clase Circle (OOP)
// ==========================
class Circle {
  constructor(x, y, radius, color, text, speed, angleRad) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    // Dirección inicial basada en ángulo (única por círculo)
    this.dx = Math.cos(angleRad) * this.speed;
    this.dy = Math.sin(angleRad) * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;

    // Texto centrado
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillText(this.text, this.posX, this.posY);

    // Círculo
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // Rebote con CORRECCIÓN DE POSICIÓN (evita "atorados")
    // Derecha
    if (this.posX + this.radius > window_width) {
      this.posX = window_width - this.radius;
      this.dx = -this.dx;
    }

    // Izquierda
    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
    }

    // Arriba
    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy;
    }

    // Abajo
    if (this.posY + this.radius > window_height) {
      this.posY = window_height - this.radius;
      this.dy = -this.dy;
    }

    // Avance
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// ==========================
// Generación aleatoria de hasta 10 círculos
// ==========================
const maxCircles = 10;
const numCircles = randInt(1, maxCircles); // 1..10 (máximo 10)

// 1) Direcciones únicas: 10 ángulos distintos (36° cada uno), luego mezclamos
let angles = Array.from({ length: maxCircles }, (_, i) => (i * (2 * Math.PI)) / maxCircles);
angles = shuffleArray(angles);

// 2) Velocidades únicas: 10 valores distintos, luego mezclamos
// (Escala suave para que no se vuelen: 1.5..6.0 aprox)
let speeds = Array.from({ length: maxCircles }, (_, i) => 1.5 + i * 0.5);
speeds = shuffleArray(speeds);

const colors = ["blue", "red", "green", "purple", "orange", "brown", "black", "teal", "magenta", "navy"];

const circles = [];

for (let i = 0; i < numCircles; i++) {
  const radius = randInt(30, 80);

  // Posición inicial SEGURA (no nace en márgenes)
  const x = Math.random() * (window_width - 2 * radius) + radius;
  const y = Math.random() * (window_height - 2 * radius) + radius;

  const color = colors[i % colors.length];
  const text = String(i + 1);            // "1", "2", "3", ...
  const speed = speeds[i];               // única por círculo
  const angleRad = angles[i];            // única por círculo

  circles.push(new Circle(x, y, radius, color, text, speed, angleRad));
}

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
