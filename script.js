const workspace = document.getElementById("workspace");

document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    adicionarComponente(type);
  });
});

function adicionarComponente(tipo) {
  const div = document.createElement("div");
  div.classList.add("component");
  div.style.left = "200px";
  div.style.top = "100px";

  const img = document.createElement("img");
  img.src = `assets/${tipo}.png`;
  img.alt = tipo;

  div.appendChild(img);
  workspace.appendChild(div);

  tornarArrastavel(div);
}

function tornarArrastavel(el) {
  let offsetX = 0;
  let offsetY = 0;
  let arrastando = false;

  el.addEventListener("mousedown", e => {
    arrastando = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", e => {
    if (!arrastando) return;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    arrastando = false;
  });
}
