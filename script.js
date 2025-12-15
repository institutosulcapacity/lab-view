const components = {
    disjuntor_motor: "disjuntor_motor.png",
    contator: "contator_weg.png",
    rele_termico: "rele_termico_weg.png",
    motor: "motor_weg.png",
    botao_liga: "botao_liga.png",
    botao_desliga: "botao_desliga.png",
    emergencia: "emergencia.png"
};

const workspace = document.getElementById("workspace");

/* BOTÕES */
document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
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

    // posição inicial central
    const wsRect = workspace.getBoundingClientRect();
    comp.style.left = (wsRect.width / 2 - 60) + "px";
    comp.style.top = (wsRect.height / 2 - 60) + "px";

    tornarArrastavel(comp);
}

/* DRAG */
function tornarArrastavel(el) {
    let offsetX = 0;
    let offsetY = 0;
    let arrastando = false;

    el.addEventListener("mousedown", e => {
        arrastando = true;
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!arrastando) return;

        const wsRect = workspace.getBoundingClientRect();
        el.style.left = (e.clientX - wsRect.left - offsetX) + "px";
        el.style.top = (e.clientY - wsRect.top - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        arrastando = false;
        el.style.zIndex = "";
    });
}
