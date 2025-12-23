const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let currentWire = null;
let startTerminal = null;

/* Layout fixo e correto de cada dispositivo */
const layouts = {
  disjuntor: {
    title: "DISJUNTOR",
    terminals: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 100, 55], ["14", 100, 75],
      ["T1", 10, 100], ["T2", 40, 100], ["T3", 70, 100]
    ]
  },
  contator: {
    title: "CONTATOR",
    terminals: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 100, 50], ["14", 100, 70],
      ["A1", 100, 90], ["A2", 100, 110],
      ["T1", 10, 110], ["T2", 40, 110], ["T3", 70, 110]
    ]
  },
  motor: {
    title: "MOTOR",
    terminals: [
      ["U", 20, 40], ["V", 50, 40], ["W", 80, 40]
    ]
  },
  liga: {
    title: "LIGA",
    terminals: [
      ["13", 20, 40], ["14", 60, 40]
    ]
  },
  desliga: {
    title: "DESLIGA",
    terminals: [
      ["21", 20, 40], ["22", 60, 40]
    ]
  },
  emergencia: {
    title: "EMERGÊNCIA",
    terminals: [
      ["11", 20, 40], ["12", 60, 40]
    ]
  }
};

/* Adiciona componente */
function addComponent(type) {
  const cfg = layouts[type];
  const c = document.createElement("div");
  c.className = "component";
  c.style.left = "300px";
  c.style.top = "120px";

  c.innerHTML = `<h4>${cfg.title}</h4>`;
  workspace.appendChild(c);

  cfg.terminals.forEach(t => {
    const term = document.createElement("div");
    term.className = "terminal";
    term.title = t[0];
    term.style.left = t[1] + "px";
    term.style.top = t[2] + "px";

    term.addEventListener("mousedown", e => startWire(e, term));
    term.addEventListener("mouseup", e => endWire(e, term));

    c.appendChild(term);
  });

  makeDraggable(c);
}

/* Arraste correto (mouse colado no componente) */
function makeDraggable(el) {
  let offsetX, offsetY;

  el.addEventListener("mousedown", e => {
    if (e.target.classList.contains("terminal")) return;
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    function move(ev) {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
      updateWires();
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", move);
    }, { once: true });
  });
}

/* Criação de fio */
function startWire(e, terminal) {
  e.stopPropagation();
  const p = getCenter(terminal);
  startTerminal = terminal;

  currentWire = document.createElementNS("http://www.w3.org/2000/svg", "line");
  currentWire.classList.add("wire");
  currentWire.setAttribute("x1", p.x);
  currentWire.setAttribute("y1", p.y);
  currentWire.setAttribute("x2", p.x);
  currentWire.setAttribute("y2", p.y);

  svg.appendChild(currentWire);

  document.addEventListener("mousemove", drawTempWire);
}

function drawTempWire(e) {
  currentWire.setAttribute("x2", e.pageX);
  currentWire.setAttribute("y2", e.pageY);
}

function endWire(e, terminal) {
  if (!currentWire) return;
  const p = getCenter(terminal);
  currentWire.setAttribute("x2", p.x);
  currentWire.setAttribute("y2", p.y);

  document.removeEventListener("mousemove", drawTempWire);
  currentWire = null;
}

/* Atualiza fios ao mover componentes */
function updateWires() {
  // Base pronta para evolução
}

/* Centro exato do borne */
function getCenter(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
