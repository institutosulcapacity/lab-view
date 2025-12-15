const components = {
    disjuntor_motor: "disjuntor_motor.png",
    contator: "contator_weg.png",
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

document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = "component " + tipo;

    const img = document.createElement("img");

    if (tipo === "motor") {
        img.src = "assets/" + components.motor.off;
        comp.dataset.estado = "off";
    } else {
        img.src = "assets/" + components[tipo];
    }

    comp.appendChild(img);
    workspace.appendChild(comp);

    const rect = workspace.getBoundingClientRect();
    comp.style.left = rect.width / 2 - 50 + "px";
    comp.style.top = rect.height / 2 - 50 + "px";

    tornarArrastavel(comp);

    // Clique para testar motor ON/OFF
    if (tipo === "motor") {
        comp.addEventListener("dblclick", () => {
            alternarMotor(comp);
        });
    }
}

function alternarMotor(motor) {
    const img = motor.querySelector("img");

    if (motor.dataset.estado === "off") {
        img.src = "assets/" + components.motor.on;
        motor.dataset.estado = "on";
    } else {
        img.src = "assets/" + components.motor.off;
        motor.dataset.estado = "off";
    }
}

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
        el.style.left = e.clientX - wsRect.left - offsetX + "px";
        el.style.top = e.clientY - wsRect.top - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.zIndex = "";
    });
}
