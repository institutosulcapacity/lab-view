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

// controle de empilhamento inicial
let spawnOffset = 0;

document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = "component " + tipo;

    const img = document.createElement("img");
    img.src = "assets/" + components[tipo];
    img.alt = tipo;

    comp.appendChild(img);
    workspace.appendChild(comp);

    // posição inicial: TOPO DIREITO
    const wsRect = workspace.getBoundingClientRect();

    comp.style.left = (wsRect.width - 120) + "px";
    comp.style.top = (20 + spawnOffset) + "px";

    spawnOffset += 20;
    if (spawnOffset > 200) spawnOffset = 0;

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
