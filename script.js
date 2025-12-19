const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let borneSelecionado = null;
const fios = [];

document.querySelector(".tool").addEventListener("click", criarContator);

function criarContator() {
  const contator = document.createElement("div");
  contator.className = "contator";
  contator.style.left = "100px";
  contator.style.top = "100px";

  contator.innerHTML = `
    <div class="contator-header">CONTATOR</div>

    <div class="borne a1" data-id="A1"><span>A1</span></div>
    <div class="borne a2" data-id="A2"><span>A2</span></div>

    <div class="borne b13" data-id="13"><span>13</span></div>
    <div class="borne b14" data-id="14"><span>14</span></div>
  `;

  contator.querySelectorAll(".borne").forEach(b => {
    b.addEventListener("click", e => {
      e.stopPropagation();
      clicarBorne(b);
    });
  });

  workspace.appendChild(contator);
  tornarArrastavel(contator);
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
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke", "#ffcc00");
  line.setAttribute("stroke-width", "3");

  svg.appendChild(line);

  fios.push({ b1, b2, line });
  atualizarFios();
}

function atualizarFios() {
  fios.forEach(f => {
    const r1 = f.b1.getBoundingClientRect();
    const r2 = f.b2.getBoundingClientRect();
    const w = workspace.getBoundingClientRect();

    f.line.setAttribute("x1", r1.left + r1.width / 2 - w.left);
    f.line.setAttribute("y1", r1.top + r1.height / 2 - w.top);
    f.line.setAttribute("x2", r2.left + r2.width / 2 - w.left);
    f.line.setAttribute("y2", r2.top + r2.height / 2 - w.top);
  });
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
    const w = workspace.getBoundingClientRect();
    el.style.left = e.clientX - w.left - ox + "px";
    el.style.top = e.clientY - w.top - oy + "px";
    atualizarFios();
  });

  document.addEventListener("mouseup", () => {
    drag = false;
  });
}
