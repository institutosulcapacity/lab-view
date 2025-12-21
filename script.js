const workspace = document.getElementById("workspace");

function addComponent(type) {
  const comp = document.createElement("div");
  comp.className = "component";
  comp.style.left = "200px";
  comp.style.top = "100px";

  let html = "";

  if (type === "disjuntor") {
    html = `
      <h3>DISJUNTOR</h3>
      <div class="terminals">
        ${makeTerminal("L1")}${makeTerminal("L2")}${makeTerminal("L3")}
        ${makeTerminal("13")}${makeTerminal("14")}${makeTerminal("")}
        ${makeTerminal("T1")}${makeTerminal("T2")}${makeTerminal("T3")}
      </div>`;
  }

  if (type === "contator") {
    html = `
      <h3>CONTATOR</h3>
      <div class="terminals">
        ${makeTerminal("L1")}${makeTerminal("L2")}${makeTerminal("L3")}
        ${makeTerminal("13")}${makeTerminal("14")}${makeTerminal("A1")}
        ${makeTerminal("T1")}${makeTerminal("T2")}${makeTerminal("T3")}
        ${makeTerminal("")}${makeTerminal("")}${makeTerminal("A2")}
      </div>`;
  }

  if (type === "motor") {
    html = `
      <h3>MOTOR</h3>
      <div class="terminals">
        ${makeTerminal("U")}${makeTerminal("V")}${makeTerminal("W")}
      </div>`;
  }

  if (type === "liga") {
    html = `
      <h3>LIGA</h3>
      <div class="terminals">
        ${makeTerminal("13")}${makeTerminal("14")}
      </div>`;
  }

  if (type === "desliga") {
    html = `
      <h3>DESLIGA</h3>
      <div class="terminals">
        ${makeTerminal("21")}${makeTerminal("22")}
      </div>`;
  }

  if (type === "emergencia") {
    html = `
      <h3>EMERGÊNCIA</h3>
      <div class="terminals">
        ${makeTerminal("11")}${makeTerminal("12")}
      </div>`;
  }

  comp.innerHTML = html;
  workspace.appendChild(comp);
  makeDraggable(comp);
}

function makeTerminal(label) {
  if (!label) return `<div></div>`;
  return `
    <div class="terminal">
      <div class="dot"></div>
      ${label}
    </div>`;
}

function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, dragging = false;

  el.addEventListener("mousedown", e => {
    dragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!dragging) return;
    el.style.left = (e.pageX - offsetX) + "px";
    el.style.top = (e.pageY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => dragging = false);
}
