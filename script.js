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

/* Clique nos botões da esquerda */
document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    criarComponente(btn.dataset.type);
  });
});

function criarComponente(tipo) {
  const div = document.createElement("div");
  div.className = "component";
  div.style.position = "absolute";
  div.style.left = "300px";
  div.style.top = "150px";
  div.style.cursor = "grab";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo];
  img.alt = tipo;

  /* 🔽 tamanho reduzido (80%) */
  img.style.width = "120px";
  img.style.height = "auto";

  div.appendChild(img);
  workspace.appendChild(div);

  tornarArrastavel(div);
}

/* ===== ARRASTAR LIVRE ===== */
function tornarArrastavel(el) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  el.addEventListener("mousedown", e => {
    arrastando = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    el.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", e => {
    if (!arrastando) return;
    el.style.left = e.pageX - offsetX + "px";
    el.style.top = e.pageY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    arrastando = false;
    el.style.cursor = "grab";
  });
}
