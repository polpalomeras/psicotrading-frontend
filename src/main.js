const URL_API = "https://psicotrading-backend-production.up.railway.app";

const mensajes = document.getElementById("mensajes");
const aporte = document.getElementById("aporte");

function añadirMensaje(texto, tipo) {
  const div = document.createElement("div");
  div.className = `mensaje ${tipo}`;
  div.textContent = texto;
  mensajes.appendChild(div);
  mensajes.scrollTop = mensajes.scrollHeight;
}

async function enviar() {
  const texto = aporte.value.trim();
  if (!texto) return;

  añadirMensaje(texto, "usuario");
  aporte.value = "";

  try {
    const res = await fetch(`${URL_API}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: texto }),
    });

    const data = await res.json();

    añadirMensaje(
      data.reply || "No hay respuesta del servidor",
      "bot"
    );

  } catch (error) {
    añadirMensaje("Error de conexión con el backend", "bot");
  }
}

// Permitir enviar con Enter
aporte.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enviar();
  }
});
