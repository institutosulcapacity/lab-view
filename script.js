const components = {
    disjuntor_motor: ["disjuntor_motor.png"],
    contator: ["contator_aberto.png", "contator_fechado.png"],
    rele_termico: ["rele_termico_weg.png"],
    motor: ["motor_off.png", "motor_on.png"],
    botao_liga: ["botao_liga.png"],
    botao_desliga: ["botao_desliga.png"],
    emergencia: ["emergencia.png"]
};

const workspace = document.getElementById("workspace");

/* Criar componente */
document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = `component ${tipo}`;
    comp.dataset.type = tipo;
    comp.dataset.state = 0;

    const img = document.createElement("img");
    img.src = "assets/" + components[tipo][0];
    comp.appendChild(img);

    workspace.appendChild(comp);

    // posição inicial
    comp.style.left = "50px";
    comp.style.top = "50px";

    tornarArrastavel(comp);

    // alternar estado APENAS por duplo clique (temporário)
    if (components[tipo].length > 1) {
        comp.addEventListener("dblclick", () => {
            comp.dataset.state =
                comp.dataset.state === "0" ? "1" : "0";
            img.src =
                "assets/" + components[tipo][comp.dataset.state];
        });
    }
}

/* DRAG */
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
        el.style.left = (e.clientX - wsRect.left - offsetX) + "px";
        el.style.top = (e.clientY - wsRect.top - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.zIndex = "";
    });
}
