let conexoes = {
  disjuntor: false,
  contator: false,
  temporizador: false
};

function toggleConexao(nome) {
  conexoes[nome] = !conexoes[nome];
  const elem = document.getElementById(nome);
  elem.classList.toggle("ligado", conexoes[nome]);
  atualizarCabos(nome);
  atualizarMotor();
}

function atualizarCabos(nome) {
  const cabo = document.getElementById(`cabo${Object.keys(conexoes).indexOf(nome) + 1}`);
  cabo.style.background = conexoes[nome] ? '#2ecc71' : '#555'; // verde para ligado
}

function atualizarMotor() {
  const motor = document.getElementById
