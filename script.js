const workspace = document.getElementById("workspace");

function makeDraggable(el) {
  let offsetX, offsetY;
  el.onmousedown = e => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.onmousemove = ev => {
      el.style.left = ev.pageX - workspace.offsetLeft - offsetX + "px";
      el.style.top = ev.pageY - workspace.offsetTop - offsetY + "px";
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}

function addTerminal(parent, cls, label) {
  const t = document.createElement("div");
  t.className = `terminal ${cls}`;
  const l = document.createElement("div");
  l.className = "label";
  l.innerText = label;
  t.appendChild(l);
  parent.appendChild(t);
}

function addDevice(type) {
  const d = document.createElement("div");
  d.className = `device ${type}`;
  d.style.left = "100px";
  d.style.top = "100px";

  const h = document.createElement("div");
  h.className = "device-header";
  h.innerText = type.toUpperCase();
  d.appendChild(h);

  if (type === "contator") {
    ["L1","L2","L3","T1","T2","T3","A1","A2","c13","c14"]
      .forEach(t => addTerminal(d, t, t.replace("c","")));
  }

  if (type === "disjuntor") {
    ["L1","L2","L3","T1","T2","T3","d13","d14"]
      .forEach(t => addTerminal(d, t, t.replace("d","")));
  }

  if (type === "motor") {
    ["U","V","W"].forEach(t => addTerminal(d, t, t));
  }

  if (type === "liga") {
    d.classList.add("botao");
    addTerminal(d,"t1","13");
    addTerminal(d,"t2","14");
  }

  if (type === "desliga") {
    d.classList.add("botao");
    addTerminal(d,"t1","21");
    addTerminal(d,"t2","22");
  }

  if (type === "emergencia") {
    d.classList.add("botao");
    addTerminal(d,"t1","11");
    addTerminal(d,"t2","12");
  }

  makeDraggable(d);
  workspace.appendChild(d);
}
