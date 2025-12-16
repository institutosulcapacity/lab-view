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

/* INSERÇÃO DE COMPONENTES */
document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.classList.add("component", tipo);

    const img = document.createElement("img");
    img.src = "assets/" + components[tipo];
    img.draggable = false;

    comp.appendChild(img);
    workspace.appendChild(comp);

    // posição inicial central
    const ws = workspace.getBoundingClientRect();
    comp.style.left = ws.width / 2 - 80 + "px";
    comp.style.top = ws.height / 2 - 80 + "px";

    tornarArrastavel(comp);
}

/* DRAG FUNCIONAL E LIMPO */
function tornarArrastavel(el) {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    el.addEventListener("mousedown", e => {
        dragging = true;
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!dragging) return;

        const wsRect = workspace.getBoundingClientRect();
        let x = e.clientX - wsRect.left - offsetX;
        let y = e.clientY - wsRect.top - offsetY;

        el.style.left = x + "px";
        el.style.top = y + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.zIndex = "";
    });
}
