const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let dragItem = null;
let offsetX = 0;
let offsetY = 0;

let wireStart = null;

/* Criar componentes */
function addComponent(type) {
  const c = document.createElement("div");
  c.className = "component";
  c.style.left = "200px";
  c.style.top = "120px";

  c.innerHTML = getComponentHTML(type);
  workspace.appendChild(c);

  enableDrag(c);
  enableBornes(c);
}

/* HTML de cada componente */
function getComponentHTML(type) {
  if (type === "contator") {
    return `
      <h3>CONTATOR</h3>
      ${borne("L1",10,30)}${borne("L2",45,30)}${borne("L3",80,30)}
      ${borne("13",110,55)}${borne("14",110,80)}
      ${borne("A1",110,105)}${borne("A2",110,130)}
      ${borne("T1",10,155)}${borne("T2",45,155)}${borne("T3",80,155)}
    `;
  }

  if (type === "disjuntor") {
    return `
      <h3>DISJUNTOR</h3>
      ${borne("L1",10,30)}${borne("L2",45,30)}${borne("L3",80,30)}
      ${borne("13",110,55)}${borne("14",110,80)}
      ${borne("T1",10,105)}${borne("T2",45,105)}${borne("T3",80,105)}
    `;
  }

  if (type === "motor") {
    return `
      <h3>MOTOR</h3>
      ${borne("U",20,40)}${borne("V",55,40)}${borne("W",90,40)}
    `;
  }

  if (type === "liga") {
    return `<h3>LIGA</h3>${borne("13",40,40)}${borne("14",70,40)}`;
  }

  if (type === "desliga") {
    return `<h3>DESLIGA</h3>${borne("21",40,40)}${borne("22",70,40)}`;
  }

  if (type === "emergencia") {
    return `<h3>EMERGÊNCIA</h3>${borne("11",40,40)}${borne("12",70,40)}`;
  }
}

/* Criar borne */
function borne(label,x,y) {
  return `<div class="borne" data-label="${label}" style="left:${x}px;top:${y}px">
    <span>${label}</span>
  </div>`;
}

/* Drag correto */
function enableDrag(el) {
  el.addEventListener("mousedown", e => {
    if (e.target.classList.contains("borne")) return;

    dragItem = el;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
}

document.addEventListener("mousemove", e => {
  if (!dragItem) return;
  dragItem.style.left = (e.clientX - offsetX - workspace.offsetLeft) + "px";
  dragItem.style.top = (e.clientY - offsetY - workspace.offsetTop) + "px";
});

document.addEventListener("mouseup", () => dragItem = null);

/* Fiação */
function enableBornes(component) {
  component.querySelectorAll(".borne").forEach(b => {
    b.addEventListener("mousedown", e => {
      e.stopPropagation();
      wireStart = b;
    });

    b.addEventListener("mouseup", e => {
      e.stopPropagation();
      if (!wireStart || wireStart === b) return;
      drawWire(wireStart, b);
      wireStart = null;
    });
  });
}

/* Desenhar fio */
function drawWire(b1, b2) {
  const p1 = b1.getBoundingClientRect();
  const p2 = b2.getBoundingClientRect();
  const ws = workspace.getBoundingClientRect();

  const line = document.createElementNS("http://www.w3.org/2000/svg","line");
  line.setAttribute("x1", p1.left - ws.left + 7);
  line.setAttribute("y1", p1.top - ws.top + 7);
  line.setAttribute("x2", p2.left - ws.left + 7);
  line.setAttribute("y2", p2.top - ws.top + 7);
  line.setAttribute("stroke","yellow");
  line.setAttribute("stroke-width","3");

  svg.appendChild(line);
}
