const workspace = document.getElementById("workspace");

function makeDraggable(el) {
  let offsetX, offsetY;

  el.onmousedown = e => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.onmousemove = ev => {
      el.style.left = ev.pageX - offsetX + "px";
      el.style.top = ev.pageY - offsetY + "px";
    };

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  };
}

function borne(el, x, y, label) {
  const b = document.createElement("div");
  b.className = "borne";
  b.style.left = x + "px";
  b.style.top = y + "px";

  const l = document.createElement("div");
  l.className = "label";
  l.style.left = x + "px";
  l.style.top = y + "px";
  l.innerText = label;

  el.appendChild(b);
  el.appendChild(l);
}

/* DISPOSITIVOS */

function addContator() {
  const c = document.createElement("div");
  c.className = "component";
  c.style.left = "300px";
  c.style.top = "100px";
  c.innerHTML = "<h3>CONTATOR</h3>";

  ["L1","L2","L3"].forEach((t,i)=>borne(c,30+i*50,30,t));
  ["T1","T2","T3"].forEach((t,i)=>borne(c,30+i*50,120,t));

  borne(c,140,60,"13");
  borne(c,140,85,"14");

  borne(c,165,30,"A1");
  borne(c,165,120,"A2");

  workspace.appendChild(c);
  makeDraggable(c);
}

function addDisjuntor() {
  const d = document.createElement("div");
  d.className = "component";
  d.style.left = "300px";
  d.style.top = "30px";
  d.innerHTML = "<h3>DISJUNTOR</h3>";

  ["L1","L2","L3"].forEach((t,i)=>borne(d,30+i*50,30,t));
  ["T1","T2","T3"].forEach((t,i)=>borne(d,30+i*50,120,t));

  borne(d,140,60,"13");
  borne(d,140,85,"14");

  workspace.appendChild(d);
  makeDraggable(d);
}

function addMotor() {
  const m = document.createElement("div");
  m.className = "component";
  m.style.left = "300px";
  m.style.top = "250px";
  m.innerHTML = "<h3>MOTOR</h3>";

  ["U","V","W"].forEach((t,i)=>borne(m,40+i*45,80,t));

  workspace.appendChild(m);
  makeDraggable(m);
}

function addLiga() {
  addBotao("LIGA", ["13","14"], 550, 100);
}

function addDesliga() {
  addBotao("DESLIGA", ["21","22"], 550, 170);
}

function addEmergencia() {
  addBotao("EMERGÊNCIA", ["11","12"], 550, 240);
}

function addBotao(nome, bornes, x, y) {
  const b = document.createElement("div");
  b.className = "component";
  b.style.width = "120px";
  b.style.left = x + "px";
  b.style.top = y + "px";
  b.innerHTML = `<h3>${nome}</h3>`;

  bornes.forEach((t,i)=>borne(b,30+i*50,60,t));

  workspace.appendChild(b);
  makeDraggable(b);
}
