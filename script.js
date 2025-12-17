/* =========================
   MAPA DE COMPONENTES
========================= */
const components = {
    disjuntor_motor: "disjuntor_motor.png",

    contator: {
        aberto: "contator_aberto.png",
        fechado: "contator_fechado.png"
    },

    rele_termico: "rele_termico_weg.png",

    motor: {
        off: "motor_off.png",
        on: "motor_on.png"
    },

    botao_liga: "botao_liga.png",
    botao_desliga: "botao_desliga.png",
    emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");

/* =========================
   ESTADOS DO SISTEMA
========================= */
let estado = {
    disjuntor: false,
    contator: false,
    motor: false,
    emergencia: false
};

let refs = {
    contator: null,
    motor: null
};

/* =========================
   CRIA COMPONENTE
========================= */
document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.classList.add("component", tipo);

    const img = document.createElement("img");

    // Componentes com estado
    if (tipo === "motor") {
        img.src = "assets/" + components.motor.off;
        refs.motor = img;
    }
    else if (tipo === "contator") {
        img.src = "assets/" + components.contator.aberto;
        refs.contator = img;
    }
    else {
        img.src = "assets/" + components[tipo];
    }

    img.draggable = false;
    comp.appendChild(img);
    workspace.appendChild(comp);

    // posição inicial
    comp.style.left = "50px";
    comp.style.top = "50px";

    tornarArrastavel(comp);

    // lógica dos botões
    if (tipo === "botao_liga") comp.addEventListener("dblclick", ligar);
    if (tipo === "botao_desliga") comp.addEventListener("dblclick", desligar);
    if (tipo === "emergencia") comp.addEventListener("dblclick", emergencia);
}

/* =========================
   DRAG & DROP REAL
========================= */
function tornarArrastavel(el) {
    let offsetX = 0, offsetY = 0, drag = false;

    el.addEventListener("mousedown", e => {
        drag = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!drag) return;

        const rect = workspace.getBoundingClientRect();
        el.style.left = (e.clientX - rect.left - offsetX) + "px";
        el.style.top  = (e.clientY - rect.top  - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        drag = false;
        el.style.zIndex = "";
    });
}

/* =========================
   LÓGICA ELÉTRICA
========================= */
function ligar() {
    if (estado.emergencia) return;
    estado.contator = true;
    atualizar();
}

function desligar() {
    estado.contator = false;
    estado.motor = false;
    atualizar();
}

function emergencia() {
    estado.emergencia = true;
    estado.contator = false;
    estado.motor = false;
    atualizar();
}

/* =========================
   ATUALIZA IMAGENS
========================= */
function atualizar() {
    if (refs.contator) {
        refs.contator.src =
            "assets/" + (estado.contator
                ? components.contator.fechado
                : components.contator.aberto);
    }

    if (refs.motor) {
        refs.motor.src =
            "assets/" + (estado.contator && !estado.emergencia
                ? components.motor.on
                : components.motor.off);
    }
}
