function ligar() {
  document.getElementById("contator").innerText = "⚙️ Contator ENERGIZADO";
  const motor = document.getElementById("motor");
  motor.innerText = "🌀 Motor LIGADO";
  motor.classList.add("ligado");
}

function desligar() {
  document.getElementById("contator").innerText = "⚙️ Contator DESLIGADO";
  const motor = document.getElementById("motor");
  motor.innerText = "🌀 Motor DESLIGADO";
  motor.classList.remove("ligado");
}
