// Curiosidades con categoría y explicación
const curiosities = [
  {
    question: "🐙 ¿Sabías que el pulpo tiene tres corazones?",
    explanation: "Tiene dos corazones para bombear sangre a las branquias y uno para el resto del cuerpo. Además, su sangre es azul.",
    category: "Biología"
  },
  {
    question: "🗺️ ¿Sabías que África es el único continente en los hemisferios norte y sur, y este y oeste?",
    explanation: "El continente africano se cruza por la línea del ecuador y el meridiano de Greenwich.",
    category: "Geografía"
  },
  {
    question: "🎵 ¿Sabías que la música afecta el ritmo del corazón?",
    explanation: "Escuchar música puede sincronizar el ritmo cardíaco con el tempo de la canción.",
    category: "Ciencia"
  },
  {
    question: "🌌 ¿Sabías que en el espacio no se puede llorar?",
    explanation: "Las lágrimas no pueden caer debido a la ausencia de gravedad. Se quedan como burbujas en los ojos.",
    category: "Astronomía"
  }
];

// Elementos del DOM
const curiosityBox = document.getElementById("curiosity-box");
const categoryDisplay = document.getElementById("category");
const historyBox = document.getElementById("history-list");
const avatarDisplay = document.getElementById("avatar-display");
const coinsDisplay = document.getElementById("coins");

let currentIndex = -1;
let history = [];
let coins = 0;
let avatar = "🙂";
let accessories = [];

// Mostrar una nueva curiosidad
function showCuriosity() {
  currentIndex = (currentIndex + 1) % curiosities.length;
  const current = curiosities[currentIndex];

  curiosityBox.textContent = `${current.question}\n\n💡 ${current.explanation}`;
  categoryDisplay.textContent = `Categoría: ${current.category}`;
  history.unshift(current);
  updateHistory();
  coins += 10;
  updateCoins();
}

// Mostrar historial de preguntas
function updateHistory() {
  historyBox.innerHTML = "";
  history.slice(0, 5).forEach(c => {
    const item = document.createElement("div");
    item.textContent = `📌 ${c.question} (${c.category})`;
    historyBox.appendChild(item);
  });
}

// Mostrar monedas
function updateCoins() {
  coinsDisplay.textContent = `🪙 Monedas: ${coins}`;
}

// Cambiar avatar (solo caras emoji)
function changeAvatar() {
  const input = prompt("Elige tu nuevo emoji de cara (😊, 😎, 🧐...)");
  if (input && /^[\u{1F600}-\u{1F64F}]$/u.test(input)) {
    avatar = input;
    renderAvatar();
  } else {
    alert("Solo se permiten emojis de cara.");
  }
}

// Comprar accesorio
function buyAccessory(type) {
  if (coins < 20) {
    alert("No tienes suficientes monedas.");
    return;
  }

  if (!accessories.includes(type)) {
    accessories.push(type);
    coins -= 20;
    updateCoins();
    renderAvatar();
  } else {
    alert("Ya tienes ese accesorio.");
  }
}

// Mostrar avatar con accesorios coherentes
function renderAvatar() {
  avatarDisplay.innerHTML = avatar;

  accessories.forEach(item => {
    const span = document.createElement("span");
    span.classList.add("accessory");

    if (item === "gafas") {
      span.classList.add("gafas");
      span.textContent = "🕶️";
    }

    if (item === "sombrero") {
      span.classList.add("sombrero");
      span.textContent = "🎩";
    }

    // Compatibilidad: gafas y sombrero sí, otros no
    if (item !== "gafas" && item !== "sombrero") {
      span.classList.add("incompatible");
    }

    avatarDisplay.appendChild(span);
  });
}

// Inicializar
showCuriosity();
renderAvatar();
updateCoins();

// Botones
document.getElementById("next-btn").onclick = showCuriosity;
document.getElementById("change-emoji").onclick = changeAvatar;
document.getElementById("buy-gafas").onclick = () => buyAccessory("gafas");
document.getElementById("buy-sombrero").onclick = () => buyAccessory("sombrero");
