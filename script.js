const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let borneSelecionado = null;

/* MENU */
document.querySelector(".tool").addEventListener("click", () => {
  criarContator();
});

/* CRIAR CONTATOR */
function criarContator() {
  const comp = document.createElement("div");
  comp.className = "component contator";

  const img = document.createElement("img");
  img.src = "assets/contator_aberto.png";
  img.draggable = false;

  comp.appendChild(img);

  // BORNES
  criarBorne(comp, "A1", "a1");
  criarBorne(comp, "A2", "a2");
  criarBorne(comp, "13", "b13");
  criarBorne(comp, "14", "b14");

  workspace.appendChild(comp);

  comp.style.left = "100px";
  comp.style.top = "100px";

  tornarArrastavel(comp);
}

/* CRIA BORNE */
function criarBorne(comp, texto, classe) {
  const b = document.createElement("div");
  b.className = "borne " + classe;
  b.dataset.id = "contator:" + texto;

  const label = document.createElement("div");
  label.className = "borne-label";
  label.innerText = texto;

  b.appendChild(label);

  b.addEventListener("click", e => {
    e.stopPropagation();
    clicarBorne(b);
  });

  comp.appendChild(b);
}

/* CLIQUE EM BORNE */
function clicarBorne(borne) {
  if (!borneSelecionado) {
    borneSelecionado = borne;
    borne.style.background = "lime";
  } else {
    criarFio(borneSelecionado, borne);
    borneSelecionado.style.background = "#ff4444";
    borneSelecionado = null;
  }
}

/* CRIAR FIO */
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
}

/* DRAG CONTATOR (BORNES JUNTO) */
function tornarArrastavel(el) {
  let ox = 0, oy = 0, drag = false;

  el.addEventListener("mousedown", e => {
    drag = true;
    ox = e.offsetX;
    oy = e.offsetY;
    el.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", e => {
    if (!drag) return;
    const r = workspace.getBoundingClientRect();
    el.style.left = e.clientX - r.left - ox + "px";
    el.style.top = e.clientY - r.top - oy + "px";
  });

  document.addEventListener("mouseup", () => {
    drag = false;
    el.style.zIndex = "";
  });
}
