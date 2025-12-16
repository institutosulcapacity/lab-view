const assets = {
  disjuntor_motor: "disjuntor_motor.png",
  contator_aberto: "contator_aberto.png",
  contator_fechado: "contator_fechado.png",
  rele_termico: "rele_termico_weg.png",
  motor_off: "motor_off.png",
  motor_on: "motor_on.png",
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");
let emergenciaAtiva = false;
let botaoLigaArrastado = false;
let botaoDesligaArrastado = false;

/* BOTÕES LATERAIS */
document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.dataset.type;

    // Criar o componente
    if (tipo) criarComponente(tipo);
  });
});

/* CRIAR COMPONENTES */
function criarComponente(tipo) {
  const comp = document.createElement("div");
  comp.className = `component ${tipo}`;

  const img = document.createElement("img");

  // Verificando os tipos e alterando imagens conforme necessidade
  if (tipo === "contator") {
    img.src = "assets/" + assets.contator_aberto;
    comp.dataset.estado = "aberto";
  }
  else if (tipo === "motor") {
    img.src = "assets/" + assets.motor_off;
    comp.dataset.estado = "off";
  } else {
    img.src = "assets/" + assets[tipo];
  }

  comp.appendChild(img);
  workspace.appendChild(comp);

  comp.style.left = "120px";
  comp.style.top = "120px";

  tornarArrastavel(comp);
}

/* DRAG */
function tornarArrastavel(el) {
  let ox = 0, oy = 0, drag = false;

  el.addEventListener("mousedown", e => {
    drag = true;
    const r = el.getBoundingClientRect();
    ox = e.clientX - r.left;
    oy = e.clientY - r.top;
    el.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", e => {
    if (!drag) return;
    const w = workspace.getBoundingClientRect();
    el.style.left = e.clientX - w.left - ox + "px";
    el.style.top = e.clientY - w.top - oy + "px";
  });

  document.addEventListener("mouseup", () => {
    drag = false;
    el.style.zIndex = "";
  });
}

/* LÓGICA ELÉTRICA */
function ligarSistema() {
  if (emergenciaAtiva) return;

  if (botaoLigaArrastado && botaoDesligaArrastado) {
    document.querySelectorAll(".component.contator").forEach(c => {
      c.dataset.estado = "fechado";
      c.querySelector("img").src = "assets/" + assets.contator_fechado;
    });

    document.querySelectorAll(".component.motor").forEach(m => {
      m.dataset.estado = "on";
      m.querySelector("img").src = "assets/" + assets.motor_on;
    });
  }
}

function desligarSistema() {
  document.querySelectorAll(".component.contator").forEach(c => {
    c.dataset.estado = "aberto";
    c.querySelector("img").src = "assets/" + assets.contator_aberto;
  });

  document.querySelectorAll(".component.motor").forEach(m => {
    m.dataset.estado = "off";
    m.querySelector("img").src = "assets/" + assets.motor_off;
  });
}

function emergencia() {
  emergenciaAtiva = true;
  desligarSistema();
  alert("EMERGÊNCIA ATIVADA – RESET NECESSÁRIO");
}
