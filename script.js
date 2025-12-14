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
    adicionarComponente(btn.dataset.type);
  });
});

function adicionarComponente(tipo) {
  const div = document.createElement("div");
  div.className = "component";
  div.style.left = "40px";
  div.style.top = "40px";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo];

  div.appendChild(img);
  workspace.appendChild(div);

  tornarArrastavel(div);
}

function tornarArrastavel(el) {
  let offsetX = 0;
  let offsetY = 0;
  let ativo = false;

  el.addEventListener("mousedown", e => {
    ativo = true;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", e => {
    if (!ativo) return;

    const area = workspace.getBoundingClientRect();

    el.style.left = (e.clientX - area.left - offsetX) + "px";
    el.style.top  = (e.clientY - area.top  - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    ativo = false;
  });
}
