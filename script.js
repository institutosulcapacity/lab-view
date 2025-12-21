const workspace = document.getElementById("workspace");

function addDevice(type) {
  const d = document.createElement("div");
  d.className = "device";
  d.style.left = "100px";
  d.style.top = "100px";

  let html = "";

  if (type === "contator") {
    html = `
      <h4>CONTATOR</h4>
      ${t("L1")} ${t("L2")} ${t("L3")} ${t("A1")}
      <br>${t("13")} ${t("14")}
      <br>${t("T1")} ${t("T2")} ${t("T3")} ${t("A2")}
    `;
  }

  if (type === "motor") {
    html = `<h4>MOTOR</h4>${t("U")} ${t("V")} ${t("W")}`;
  }

  if (type === "liga") {
    html = `<h4>LIGA</h4>${t("13")} ${t("14")}`;
  }

  if (type === "desliga") {
    html = `<h4>DESLIGA</h4>${t("21")} ${t("22")}`;
  }

  if (type === "emergencia") {
    html = `<h4>EMERGÊNCIA</h4>${t("11")} ${t("12")}`;
  }

  d.innerHTML = html;
  drag(d);
  workspace.appendChild(d);
}

function t(label) {
  return `<div class="terminal"><span>${label}</span></div>`;
}

function drag(el) {
  let x, y;
  el.onmousedown = e => {
    x = e.offsetX;
    y = e.offsetY;
    document.onmousemove = m => {
      el.style.left = m.pageX - x + "px";
      el.style.top = m.pageY - y + "px";
    };
    document.onmouseup = () => document.onmousemove = null;
  };
}
