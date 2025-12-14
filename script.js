function ligar() {
  document.getElementById("motor").classList.remove("desligado");
  document.getElementById("motor").classList.add("ligado");
  document.getElementById("motor").innerText = "MOTOR LIGADO";

  document.getElementById("contator").classList.remove("desligado");
  document.getElementById("contator").classList.add("ligado");
  document.getElementById("contator").innerText = "CONTATOR ENERGIZADO";
}

function desligar() {
  document.getElementById("motor").classList.remove("ligado");
  document.getElementById("motor").classList.add("desligado");
  document.getElementById("motor").innerText = "MOTOR DESLIGADO";

  document.getElementById("contator").classList.remove("ligado");
  document.getElementById("contator").classList.add("desligado");
  document.getElementById("contator").innerText = "CONTATOR DESLIGADO";
}

function emergencia() {
  document.getElementById("motor").classList.remove("ligado");
  document.getElementById("motor").classList.add("desligado");
  document.getElementById("motor").innerText = "PARADA DE EMERGÊNCIA";

  document.getElementById("contator").classList.remove("ligado");
  document.getElementById("contator").classList.add("desligado");
  document.getElementById("contator").innerText = "CONTATOR DESLIGADO";
}

function resetar() {
  document.getElementById("motor").classList.remove("ligado");
  document.getElementById("motor").classList.add("desligado");
  document.getElementById("motor").innerText = "MOTOR DESLIGADO";

  document.getElementById("contator").classList.remove("ligado");
  document.getElementById("contator").classList.add("desligado");
  document.getElementById("contator").innerText = "CONTATOR DESLIGADO";
}
