const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let currentWire = null;

function addComponent(type) {
  const c = document.createElement("div");
  c.className = "component";
  c.style.left = "300px";
  c.style.top = "120px";

  c.innerHTML = `<h4>${type.toUpperCase()}</h4>`;
  workspace.appendChild(c);

  createTerminals(c, type);
  makeDraggable(c);
}

function createTerminals(c, type) {
  const layouts = {
    disjuntor: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 110, 50], ["14", 110, 70],
      ["T1", 10, 90], ["T2", 40, 90], ["T3", 70, 90]
    ],
    contator: [
      ["L1", 10, 30], ["L2", 40, 30], ["L3", 70, 30],
      ["13", 110, 50], ["14", 110, 70],
      ["A1", 110, 90], ["A2", 110, 110],
      ["T1", 10, 110], ["T2", 40, 110], ["T3", 70, 110]
    ],
    motor: [["U", 20, 40], ["V", 50, 40], ["W", 80, 40]],
    liga: [["13", 20, 40], ["14", 60, 40]],
    desliga: [["21", 20, 40], ["22", 60, 40]],
    emergencia: [["11", 20, 40], ["12", 60, 40]]
  };

  layouts[type].forEach(t => {
    const term = document.createElement("div");
    term.className = "terminal";
    term.style.left = t[1] + "px";
    term.style.top = t[2] + "px";
    term.title = t[0];

    term.addEventListener("mousedown", e => {
      e.stopPropagation();
      startWire(e, term);
    });

    c.appendChild(term);
  });
}

function startWire(e, terminal) {
  const pos = getCenter(terminal);

  currentWire = document.createElementNS("http://www.w3.org/2000/svg", "line");
  currentWire.setAttribute("x1", pos.x);
  currentWire.setAttribute("y1", pos.y);
  currentWire.setAttribute("x2", pos.x);
  currentWire.setAttribute("y2", pos.y);
  currentWire.setAttribute("stroke", "yellow");
  currentWire.setAttribute("stroke-width", "2");

  svg.appendChild(currentWire);

  document.onmousemove = ev => {
    currentWire.setAttribute("x2", ev.clientX);
    currentWire.setAttribute("y2", ev.clientY);
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    currentWire = null;
  };
}

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function makeDraggable(el) {
  let offsetX, offsetY;

  el.addEventListener("mousedown", e => {
    if (e.target.classList.contains("terminal")) return;

    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.onmousemove = ev => {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
