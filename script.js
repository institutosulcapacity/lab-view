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

document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = "component";

    const img = document.createElement("img");
    img.src = "assets/" + components[tipo];
    img.alt = tipo;

    comp.appendChild(img);
    workspace.appendChild(comp);

    // posição inicial central
    const rect = workspace.getBoundingClientRect();
    comp.style.left = (rect.width / 2 - 45) + "px";
    comp.style.top = (rect.height / 2 - 45) + "px";

    tornarArrastavel(comp);
}

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
        let x = e.clientX - wsRect.left - offsetX;
        let y = e.clientY - wsRect.top - offsetY;

        el.style.left = x + "px";
        el.style.top = y + "px";
    });

    document.addEventListener("mouseup", () => {
        arrastando = false;
        el.style.zIndex = "";
    });
}
