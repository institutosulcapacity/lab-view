let posX = 200;
let posY = 100;
const espacamentoY = 180;

let posX = 200;
let posY = 100;
const espacamentoY = 180;

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

document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    adicionarComponente(type);
  });
});

function adicionarComponente(tipo) {
  const div = document.createElement("div");
  div.classList.add("componente");
  div.style.position = "absolute";
  div.style.left = posX + "px";
  div.style.top = posY + "px";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo]; // 🔴 ISSO FALTAVA
  img.alt = tipo;

  div.appendChild(img);
  workspace.appendChild(div);

  posY += espacamentoY; // move para baixo

  if (posY > 700) {     // quebra de coluna
    posY = 100;
    posX += 220;
  }
}

}

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
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    arrastando = false;
  });
}
