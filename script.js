const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let dragging = null;
let offsetX = 0;
let offsetY = 0;

let wireStart = null;
let tempLine = null;
const wires = [];

function addComponent(type) {
  const c = document.createElement("div");
  c.className = "component";
  c.style.left = "100px";
  c.style.top = "100px";

  const header = document.createElement("div");
  header.className = "component-header";
  header.innerText = type.toUpperCase();
  c.appendChild(header);

  const terminals = getTerminals(type);
  terminals.forEach(t => {
    const el = document.createElement("div");
    el.className = "terminal";
    el.style.left = t.x + "px";
    el.style.top = t.y + "px";

    const label = document.createElement("span");
    label.innerText = t.name;
    el.appendChild(label);

    el.addEventListener("mousedown", e => {
      e.stopPropagation();
      startWire(el);
    });

    c.appendChild(el);
  });

  c.addEventListener("mousedown", e => {
    dragging = c;
    const rect = c.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  workspace.appendChild(c);
}

document.addEventListener("mousemove", e => {
  if (dragging) {
    dragging.style.left = e.clientX - offsetX - workspace.offsetLeft + "px";
    dragging.style.top = e.clientY - offsetY - workspace.offsetTop + "px";
    updateWires();
  }
  if (tempLine) updateTempLine(e);
});

document.addEventListener("mouseup", () => {
  dragging = null;
});

function startWire(terminal) {
  wireStart = terminal;
  tempLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  tempLine.setAttribute("stroke", "yellow");
  tempLine.setAttribute("stroke-width", "2");
  svg.appendChild(tempLine);
}

workspace.addEventListener("mouseup", e => {
  if (!wireStart || !tempLine) return;

  const target = e.target.closest(".terminal");
  if (target && target !== wireStart) {
    wires.push({ a: wireStart, b: target, line: tempLine });
  } else {
    svg.removeChild(tempLine);
  }

  wireStart = null;
  tempLine = null;
});

function updateTempLine(e) {
  const a = getCenter(wireStart);
  tempLine.setAttribute("x1", a.x);
  tempLine.setAttribute("y1", a.y);
  tempLine.setAttribute("x2", e.clientX - workspace.offsetLeft);
  tempLine.setAttribute("y2", e.clientY - workspace.offsetTop);
}

function updateWires() {
  wires.forEach(w => {
    const a = getCenter(w.a);
    const b = getCenter(w.b);
    w.line.setAttribute("x1", a.x);
    w.line.setAttribute("y1", a.y);
    w.line.setAttribute("x2", b.x);
    w.line.setAttribute("y2", b.y);
  });
}

function getCenter(el) {
  const r = el.getBoundingClientRect();
  const wr = workspace.getBoundingClientRect();
  return {
    x: r.left - wr.left + r.width / 2,
    y: r.top - wr.top + r.height / 2
  };
}

function getTerminals(type) {
  if (type === "contator") return [
    { name: "L1", x: 10, y: 30 }, { name: "L2", x: 40, y: 30 }, { name: "L3", x: 70, y: 30 },
    { name: "13", x: 90, y: 50 }, { name: "14", x: 90, y: 70 },
    { name: "A1", x: 90, y: 90 }, { name: "A2", x: 90, y: 110 },
    { name: "T1", x: 10, y: 130 }, { name: "T2", x: 40, y: 130 }, { name: "T3", x: 70, y: 130 }
  ];

  if (type === "disjuntor") return [
    { name: "L1", x: 10, y: 30 }, { name: "L2", x: 40, y: 30 }, { name: "L3", x: 70, y: 30 },
    { name: "13", x: 90, y: 60 }, { name: "14", x: 90, y: 80 },
    { name: "T1", x: 10, y: 110 }, { name: "T2", x: 40, y: 110 }, { name: "T3", x: 70, y: 110 }
  ];

  if (type === "motor") return [
    { name: "U", x: 10, y: 40 }, { name: "V", x: 40, y: 40 }, { name: "W", x: 70, y: 40 }
  ];

  if (type === "liga") return [
    { name: "13", x: 20, y: 40 }, { name: "14", x: 60, y: 40 }
  ];

  if (type === "desliga") return [
    { name: "21", x: 20, y: 40 }, { name: "22", x: 60, y: 40 }
  ];

  if (type === "emergencia") return [
    { name: "11", x: 20, y: 40 }, { name: "12", x: 60, y: 40 }
  ];

  return [];
}
