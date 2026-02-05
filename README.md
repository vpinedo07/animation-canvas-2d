# Animación de Círculos en HTML5 Canvas con OOP y Bootstrap 5

Aplicación web interactiva desarrollada con **HTML5 Canvas**, **JavaScript (Programación Orientada a Objetos)** y **Bootstrap 5**, que permite generar y animar círculos con direcciones y velocidades únicas dentro de un canvas configurable.

---

## 📌 Descripción general

Esta aplicación permite:

- Generar dinámicamente **hasta 10 círculos animados**.
- Controlar el **número de círculos** mediante un control deslizante.
- Ajustar el **ancho y alto del canvas** en tiempo real.
- Restringir el tamaño del canvas a **máximo 75% del tamaño de la pantalla**.
- Visualizar cada círculo con:
  - Texto centrado (1, 2, 3, …).
  - Dirección inicial distinta.
  - Velocidad distinta.
- Animación fluida usando `requestAnimationFrame`.
- Rebotes realistas sin que los círculos se queden “atorados” en los márgenes.

La interfaz está construida con **Bootstrap 5**, utilizando **Navbar, Cards y Footer**, para ofrecer una experiencia moderna y agradable.

---

## 🧩 Tecnologías utilizadas

- **HTML5**
- **Canvas API (2D)**
- **JavaScript ES6+**
- **Programación Orientada a Objetos (OOP)**
- **Bootstrap 5**
- **requestAnimationFrame**

---

## 📂 Estructura del proyecto

/canvas-circulos-oop
│
├── index.html # Interfaz (Bootstrap 5)
├── app.js # Lógica, animación y OOP
└── README.md # Documentación del proyecto


---

## ▶️ Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en cualquier navegador moderno.
3. (Opcional) Usa **Live Server** en VSCode para una mejor experiencia.

No se requieren dependencias adicionales.

---

## 🎛️ Controles de la aplicación

### 🔹 Número de círculos
- Rango: **1 – 10**
- Cada círculo:
  - Tiene un número centrado.
  - Inicia con dirección única.
  - Inicia con velocidad única.

### 🔹 Ancho y alto del canvas
- Controlados mediante sliders.
- Tamaño mínimo: **100 px**
- Tamaño máximo: **75% del tamaño de la ventana**
- Al modificar el tamaño:
  - El canvas se redimensiona.
  - Los círculos se regeneran para evitar salirse del área visible.

---

## 🧠 Funcionamiento interno

### ✔ Clase `Circle`
Cada círculo es un objeto que encapsula:

- Posición (`posX`, `posY`)
- Radio
- Color
- Texto
- Velocidad
- Dirección (vector `dx`, `dy`)

Incluye los métodos:
- `draw(context)` → Dibuja el círculo y su texto.
- `update(context)` → Actualiza posición y gestiona rebotes.

---

### ✔ Movimiento y rebote

- El movimiento se basa en vectores de velocidad.
- El rebote invierte la dirección al detectar colisiones con los límites.
- Se **corrige la posición** tras el impacto para evitar bloqueos en los bordes.

---

### ✔ Direcciones y velocidades únicas

- Las direcciones iniciales se generan a partir de **ángulos distribuidos uniformemente (0–360°)**.
- Las velocidades se asignan desde un conjunto de valores distintos.
- Ambos conjuntos se barajan aleatoriamente para asegurar variedad.

---

## 🎨 Interfaz (UI)

La aplicación utiliza:

- **Navbar** para navegación.
- **Cards** para:
  - Panel de controles.
  - Zona del canvas.
- **Footer** con datos del programador.

El diseño es responsivo, limpio y adecuado para fines educativos.

---

## 👨‍💻 Datos del programador

> Personaliza esta sección en el archivo `index.html`

- **Nombre:** _(Tu nombre aquí)_
- **Institución:** _(Tu institución aquí)_
- **Materia:** _(Programación Web / Graficación / Estructura de Datos, etc.)_

---

## 🎓 Aplicación académica

Este proyecto es ideal para reforzar conceptos de:

- Gráficación 2D
- Programación Orientada a Objetos
- Animaciones en la Web
- Física básica (movimiento y rebote)
- Desarrollo Web moderno con Bootstrap

---

## 📜 Licencia

Proyecto desarrollado con fines educativos.  
Puedes agregar una licencia MIT, GPL u otra según tus necesidades.

---
