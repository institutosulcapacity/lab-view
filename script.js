/* Posição inicial automática */
let posX = 200;
let posY = 80;
const espacamentoY = 130;

/* Mapa de componentes (MAPA = lista chave → imagem) */
const componentes = {
  disjuntor_motor: "disjuntor_motor.png",
  contator: "contator_weg.png",
  rele_termico: "rele_termico_weg.png",
  temporizador: "temporizador.png", // se não existir, pode remover
  motor: "motor_weg.png",
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");

/* Clique nos botões da esquerda */
document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.type;
    adicionarComponente(tipo);
  });
});

function adicionarComponente(tipo) {
  if (!componentes[tipo]) return;

  const div = document.createElement("div");
  div.classList.add("componente");
  div.style.left = posX + "px";
  div.style.top = posY + "px";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo];
  img.alt = tipo;

  div.appendChild(img);
  workspace.appendChild(div);

  tornarArrastavel(div);

  /* Posicionamento automático em grade */
  posY += espacamentoY;
  if (posY > window.innerHeight - 150) {
    posY = 80;
    posX += 160;
  }
}

/* Arrastar componentes */
function tornarArrastavel(el) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  el.addEventListener("mousedown", e => {
    arrastando = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!arrastando) return;
    el.style.left = (e.pageX - offsetX) + "px";
    el.style.top = (e.pageY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    arrastando = false;
  });
}
