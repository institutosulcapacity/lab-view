const components = {
    disjuntor_motor: "disjuntor_motor.png",
    contator: "contator_aberto.png",
    rele_termico: "rele_termico_weg.png",
    motor: "motor_off.png",
    botao_liga: "botao_liga.png",
    botao_desliga: "botao_desliga.png",
    emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");

/* BOTÕES DO MENU */
document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        const tipo = btn.dataset.type;

        if (tipo === "botao_liga") {
            acionarSistema();
            return;
        }

        if (tipo === "botao_desliga" || tipo === "emergencia") {
            pararSistema();
            return;
        }

        criarComponente(tipo);
    });
});

/* CRIA COMPONENTE */
function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = "component " + tipo;

    const img = document.createElement("img");
    img.src = "assets/" + components[tipo];
    img.alt = tipo;

    comp.appendChild(img);
    workspace.appendChild(comp);

    /* ESTADOS INICIAIS */
    if (tipo === "motor") {
        comp.dataset.estado = "desligado";
    }

    if (tipo === "contator") {
        comp.dataset.estado = "aberto";
    }

    /* POSIÇÃO INICIAL */
    const rect = workspace.getBoundingClientRect();
    comp.style.left = rect.width / 2 - 60 + "px";
    comp.style.top = rect.height / 2 - 60 + "px";

    tornarArrastavel(comp);
}

/* DRAG & DROP */
function tornarArrastavel(el) {
    let offsetX = 0;
    let offsetY = 0;
    let ativo = false;

    el.addEventListener("mousedown", e => {
        ativo = true;
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!ativo) return;

        const wsRect = workspace.getBoundingClientRect();
        el.style.left = e.clientX - wsRect.left - offsetX + "px";
        el.style.top = e.clientY - wsRect.top - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        ativo = false;
        el.style.zIndex = "";
    });
}

/* SISTEMA */
function acionarSistema() {
    const contator = document.querySelector(".component.contator");
    const motor = document.querySelector(".component.motor");

    if (contator) {
        contator.dataset.estado = "fechado";
        contator.querySelector("img").src = "assets/contator_fechado.png";
    }

    if (motor) {
        motor.dataset.estado = "ligado";
        motor.querySelector("img").src = "assets/motor_on.png";
    }
}

function pararSistema() {
    const contator = document.querySelector(".component.contator");
    const motor = document.querySelector(".component.motor");

    if (contator) {
        contator.dataset.estado = "aberto";
        contator.querySelector("img").src = "assets/contator_aberto.png";
    }

    if (motor) {
        motor.dataset.estado = "desligado";
        motor.querySelector("img").src = "assets/motor_off.png";
    }
}
