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
    criarComponente(btn.dataset.type);
  });
});

function criarComponente(tipo) {
  const div = document.createElement("div");
  div.className = "component";
  div.style.left = "50px";
  div.style.top = "50px";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo];
  img.alt = tipo;

  div.appendChild(img);
  workspace.appendChild(div);

  tornarArrastavel(div);
}

function tornarArrastavel(el) {
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  el.addEventListener("mousedown", e => {
    dragging = true;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    el.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;

    const workspaceRect = workspace.getBoundingClientRect();

    el.style.left = (e.clientX - workspaceRect.left - offsetX) + "px";
    el.style.top  = (e.clientY - workspaceRect.top  - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    el.style.cursor = "grab";
  });
}
