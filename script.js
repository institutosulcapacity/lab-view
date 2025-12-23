const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let currentLine = null;
let startTerminal = null;

function addComponent(type) {
  const comp = document.createElement("div");
  comp.className = "component";
  comp.style.left = "300px";
  comp.style.top = "150px";

  comp.innerHTML = `<h4>${type.toUpperCase()}</h4>`;
  workspace.appendChild(comp);

  createTerminals(comp, type);
  makeDraggable(comp);
}

function createTerminals(comp, type) {
  const layouts = {
    disjuntor: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 100, 55], ["14", 100, 75],
      ["T1", 10, 100], ["T2", 40, 100], ["T3", 70, 100]
    ],
    contator: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 100, 50], ["14", 100, 70],
      ["A1", 100, 90], ["A2", 100, 110],
      ["T1", 10, 120], ["T2", 40, 120], ["T3", 70, 120]
    ],
    motor: [
      ["U", 20, 40], ["V", 50, 40], ["W", 80, 40]
    ],
    liga: [
      ["13", 20, 40], ["14", 60, 40]
    ],
    desliga: [
      ["21", 20, 40], ["22", 60, 40]
    ],
    emergencia: [
      ["11", 20, 40], ["12", 60, 40]
    ]
  };

  layouts[type].forEach(([label, x, y]) => {
    const t = document.createElement("div");
    t.className = "terminal";
    t.style.left = x + "px";
    t.style.top = y + "px";
    t.title = label;

    t.addEventListener("mousedown", e => startWire(e, t));
    t.addEventListener("mouseup", e => endWire(e, t));

    comp.appendChild(t);
  });
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0;

  el.addEventListener("mousedown", e => {
    if (e.target.classList.contains("terminal")) return;

    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.onmousemove = ev => {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
      updateLines();
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}

function startWire(e, terminal) {
  e.stopPropagation();

  const p = getCenter(terminal);
  startTerminal = terminal;

  currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  currentLine.setAttribute("x1", p.x);
  currentLine.setAttribute("y1", p.y);
  currentLine.setAttribute("x2", p.x);
  currentLine.setAttribute("y2", p.y);

  svg.appendChild(currentLine);

  document.onmousemove = ev => {
    currentLine.setAttribute("x2", ev.pageX);
    currentLine.setAttribute("y2", ev.pageY);
  };
}

function endWire(e, terminal) {
  if (!currentLine) return;

  const p = getCenter(terminal);
  currentLine.setAttribute("x2", p.x);
  currentLine.setAttribute("y2", p.y);

  currentLine = null;
  startTerminal = null;
  document.onmousemove = null;
}

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2
  };
}

function updateLines() {
  // base estável para evolução futura
}
