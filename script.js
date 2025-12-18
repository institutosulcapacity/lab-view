const assets = {
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png",
  contator: "contator_aberto.png",
  motor: "motor_off.png",
  disjuntor_motor: "disjuntor_motor.png"
};

const bornesPorTipo = {
  botao_liga: ["13", "14"],
  botao_desliga: ["21", "22"],
  emergencia: ["11", "12"],
  contator: ["A1", "A2", "13", "14"],
  motor: ["U", "V", "W"],
  disjuntor_motor: ["L1","L2","L3","T1","T2","T3","13","14"]
};

const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let borneSelecionado = null;
const ligacoes = [];

document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => criarComponente(btn.dataset.type));
});

function criarComponente(tipo) {
  const comp = document.createElement("div");
  comp.className = "component " + tipo;

  const img = document.createElement("img");
  img.src = "assets/" + assets[tipo];
  img.draggable = false;

  comp.appendChild(img);
  workspace.appendChild(comp);

  comp.style.left = "100px";
  comp.style.top = "100px";

  criarBornes(comp, tipo);
  tornarArrastavel(comp);
}

function criarBornes(comp, tipo) {
  const lista = bornesPorTipo[tipo];
  if (!lista) return;

  lista.forEach((id, i) => {
    const b = document.createElement("div");
    b.className = "borne";
    b.dataset.id = `${tipo}:${id}`;

    b.style.left = "5px";
    b.style.top = 20 + i * 18 + "px";

    b.addEventListener("click", e => {
      e.stopPropagation();
      clicarBorne(b);
    });

    comp.appendChild(b);
  });
}

function clicarBorne(borne) {
  if (!borneSelecionado) {
    borneSelecionado = borne;
    borne.classList.add("selecionado");
  } else {
    criarFio(borneSelecionado, borne);
    borneSelecionado.classList.remove("selecionado");
    borneSelecionado = null;
  }
}

function criarFio(b1, b2) {
  const r1 = b1.getBoundingClientRect();
  const r2 = b2.getBoundingClientRect();
  const w = workspace.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - w.left;
  const y1 = r1.top + r1.height / 2 - w.top;
  const x2 = r2.left + r2.width / 2 - w.left;
  const y2 = r2.top + r2.height / 2 - w.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#ffcc00");
  line.setAttribute("stroke-width", "3");

  svg.appendChild(line);

  ligacoes.push({
    de: b1.dataset.id,
    para: b2.dataset.id
  });

  console.log("Ligações atuais:", ligacoes);
}

function tornarArrastavel(el) {
  let ox = 0, oy = 0, drag = false;

  el.addEventListener("mousedown", e => {
    drag = true;
    ox = e.offsetX;
    oy = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!drag) return;
    const r = workspace.getBoundingClientRect();
    el.style.left = e.clientX - r.left - ox + "px";
    el.style.top = e.clientY - r.top - oy + "px";
  });

  document.addEventListener("mouseup", () => drag = false);
}
