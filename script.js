/* Posição inicial automática */
let posX = 260;
let posY = 120;
const espacamentoY = 140;

/* MAPA DE COMPONENTES
   (mapa = relação nome → imagem) */
const componentes = {
  disjuntor_motor: "disjuntor_motor.png",
  contator: "contator_weg.png",
  rele_termico: "rele_termico_weg.png",
  motor: "motor_weg.png",
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");

/* Clique nos botões da barra lateral */
document.querySelectorAll(".tool").forEach(botao => {
  botao.addEventListener("click", () => {
    const tipo = botao.dataset.type;
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

  /* Organização automática em grade */
  posY += espacamentoY;
  if (posY > window.innerHeight - 180) {
    posY = 120;
    posX += 160;
  }
}

/* Arrastar com o mouse */
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
