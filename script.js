function ligar() {
  const motor = document.getElementById("motor");
  motor.classList.remove("desligado");
  motor.classList.add("ligado");
  motor.innerText = "MOTOR LIGADO";
}

function desligar() {
  const motor = document.getElementById("motor");
  motor.classList.remove("ligado");
  motor.classList.add("desligado");
  motor.innerText = "MOTOR DESLIGADO";
}
