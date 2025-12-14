let disjuntorLigado = false;
let contatorLigado = false;
let temporizadorLigado = false;

function toggleDisjuntor() {
  disjuntorLigado = !disjuntorLigado;
  const disjuntor = document.getElementById("disjuntor");
  disjuntor.classList.toggle("ligado", disjuntorLigado);
  disjuntor.innerText = disjuntorLigado ? "DISJUNTOR LIGADO" : "DISJUNTOR DESLIGADO";
  atualizarMotor();
}

function toggleContator() {
  contatorLigado = !contatorLigado;
  const contator = document.getElementById("contator");
  contator.classList.toggle("ligado", contatorLigado);
  contator.innerText = contatorLigado ? "CONTATOR LIGADO" : "CONTATOR DESLIGADO";
  atualizarMotor();
}

function toggleTemporizador() {
  temporizadorLigado = !temporizadorLigado;
  const temp = document.getElementById("temporizador");
  temp.classList.toggle("ligado", temporizadorLigado);
  temp.innerText = temporizadorLigado ? "TEMPORIZADOR LIGADO" : "TEMPORIZADOR DESLIGADO";
  atualizarMotor();
}

function atualizarMotor() {
  const motor = document.getElementById("motor");
  if(disjuntorLigado && contatorLigado && temporizadorLigado){
    motor.classList.add("ligado");
    motor.innerText = "MOTOR LIGADO";
  } else {
    motor.classList.remove("ligado");
    motor.innerText = "MOTOR DESLIGADO";
  }
}

function ligar() {
  disjuntorLigado = true;
  contatorLigado = true;
  temporizadorLigado = true;

  document.getElementById("disjuntor").classList.add("ligado");
  document.getElementById("disjuntor").innerText = "DISJUNTOR LIGADO";

  document.getElementById("contator").classList.add("ligado");
  document.getElementById("contator").innerText = "CONTATOR LIGADO";

  document.getElementById("temporizador").classList.add("ligado");
  document.getElementById("temporizador").innerText = "TEMPORIZADOR LIGADO";

  atualizarMotor();
}

function desligar() {
  disjuntorLigado = false;
  contatorLigado = false;
  temporizadorLigado = false;

  document.getElementById("disjuntor").classList.remove("ligado");
  document.getElementById("disjuntor").innerText = "DISJUNTOR DESLIGADO";

  document.getElementById("contator").classList.remove("ligado");
  document.getElementById("contator").innerText = "CONTATOR DESLIGADO";

  document.getElementById("temporizador").classList.remove("ligado");
  document.getElementById("temporizador").innerText = "TEMPORIZADOR DESLIGADO";

  atualizarMotor();
}

function resetar() {
  desligar();
}
