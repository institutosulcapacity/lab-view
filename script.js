let conexoes = {
  disjuntor: false,
  contator: false,
  temporizador: false
};

let tempoRestante = 0;
let temporizadorAtivo = false;

function toggle(nome) {
  conexoes[nome] = !conexoes[nome];
  const elem = document.getElementById(nome);
  elem.classList.toggle("ligado", conexoes[nome]);
  atualizar();
}

function atualizar() {
  const motor = document.getElementById("motor");
  const disjuntor = conexoes.disjuntor;
  const contator = conexoes.contator;
  const temporizador = conexoes.temporizador;

  if (disjuntor && contator && temporizador && tempoRestante <= 0) {
    motor.classList.add("ligado");
  } else {
    motor.classList.remove("ligado");
  }
}

function ligar() {
  if (conexoes.disjuntor && conexoes.contator && conexoes.temporizador) {
    tempoRestante = parseInt(document.getElementById("tempo").value) * 60;
    temporizadorAtivo = true;
    const interval = setInterval(() => {
      if (tempoRestante > 0) {
        tempoRestante--;
        atualizar();  // Atualiza o motor
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
}

function desligar() {
  temporizadorAtivo = false;
  tempoRestante = 0;
  atualizar();
}

function resetar() {
  conexoes.disjuntor = false;
  conexoes.contator = false;
  conexoes.temporizador = false;
  document.querySelectorAll(".ligado").forEach(e => e.classList.remove("ligado"));
  atualizar();
}
