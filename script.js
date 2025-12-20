const assets = {
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png",
  contator: "contator_aberto.png",
  disjuntor_motor: "disjuntor_motor.png",
  rele_termico: "rele_termico_weg.png",
  motor: "motor_off.png"
};

const bornesPorTipo = {
  botao_liga: ["13", "14"],
  botao_desliga: ["21", "22"],
  emergencia: ["11", "12"],

  contator: ["A1", "A2", "13", "14"],

  disjuntor_motor: ["L1", "L2", "L3", "T1", "T2", "T3", "13", "14"],

  rele_termico: ["95", "96"],

  motor: ["U", "V", "W"]
};

const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let borneSelecionado = null;

/* MENU */
document.querySelectorAll(".tool").forEach(btn => {
  btn.onclick = () => criarComponente(btn.dataset.type);
});

function criarComponente(tipo) {
  const comp = document.createElement("div");
  comp.className = "component " + tipo;

  const img = document.createElement("img");
  img.src = "assets/" + assets[tipo];
  img.draggable = false;

  comp.appendChild(img);
  workspace.appendChild(comp);

  comp.style.left = "80px";
  comp.style.top = "80px";

  criarBornes(comp, tipo);
  tornarArrastavel(comp);
}

function criarBornes(comp, tipo) {
  const bornes = bornesPorTipo[tipo];
  if (!bornes) return;

  bornes.forEach((id, i) => {
    const b = document.createElement("div");
    b.className = "borne";
    b.dataset.id = `${tipo}:${id}`;

    b.style.left = "5px";
    b.style.top = 15 + i * 14 + "px";

    const label = document.createElement("span");
    label.textContent = id;

    b.appendChild(label);
    comp.appendChild(b);

    b.onclick = e => {
      e.stopPropagation();
      clicarBorne(b);
    };
  });
}

function clicarBorne(borne) {
  if (!borneSelecionado) {
    borneSelecionado = borne;
    borne.style.background = "lime";
  } else {
    criarFio(borneSelecionado, borne);
    borneSelecionado.style.background = "red";
    borneSelecionado = null;
  }
}

function criarFio(b1, b2) {
  const r1 = b1.getBoundingClientRect();
  const r2 = b2.getBoundingClientRect();
  const w = workspace.getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.classList.add("wire");

  line.setAttribute("x1", r1.left + 5 - w.left);
  line.setAttribute("y1", r1.top + 5 - w.top);
  line.setAttribute("x2", r2.left + 5 - w.left);
  line.setAttribute("y2", r2.top + 5 - w.top);

  svg.appendChild(line);
}

function tornarArrastavel(el) {
  let ox = 0, oy = 0, drag = false;

  el.onmousedown = e => {
    drag = true;
    ox = e.offsetX;
    oy = e.offsetY;
    el.style.zIndex = 1000;
  };

  document.onmousemove = e => {
    if (!drag) return;
    const r = workspace.getBoundingClientRect();
    el.style.left = e.clientX - r.left - ox + "px";
    el.style.top = e.clientY - r.top - oy + "px";
  };

  document.onmouseup = () => {
    drag = false;
    el.style.zIndex = "";
  };
}
