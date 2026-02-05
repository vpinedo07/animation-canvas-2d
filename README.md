# Animación de Círculos en HTML5 Canvas (OOP)

Este proyecto implementa una animación en **HTML5 Canvas** utilizando **Programación Orientada a Objetos (OOP)**.  
Se dibujan círculos con texto centrado y se animan rebotando dentro de los límites de la pantalla.

---

## 📌 Descripción general

- El `<canvas>` se ajusta automáticamente al **tamaño de la ventana** del navegador.
- Se define una clase `Circle` que encapsula:
  - Posición (x, y)
  - Radio
  - Color
  - Texto interno
  - Velocidad (controlada por `speed`)
  - Dirección de movimiento (dx, dy)
- Se crean **dos círculos**:
  - `Tec1` (azul) con velocidad 5
  - `Tec2` (rojo) con velocidad 2
- La animación se realiza con `requestAnimationFrame()` y se limpia el canvas en cada frame con `clearRect()`.

---

## 🧩 Tecnologías utilizadas

- **HTML5 Canvas**
- **JavaScript (ES6+)**
- **requestAnimationFrame** (animación eficiente)

---

## 📂 Estructura sugerida del proyecto

> Si tu proyecto ya tiene otra estructura, puedes ajustarlo.

