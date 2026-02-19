const API_URL = "https://psicotrading-backend-production.up.railway.app/chat";

const messages = document.getElementById("messages");
const input = document.getElementById("input");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    addMessage(data.reply || "No hay respuesta", "bot");

  } catch (e) {
    addMessage("Error de conexión con el backend", "bot");
  }
}
