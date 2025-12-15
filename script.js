const components = {
    disjuntor_motor: "disjuntor_motor.png",
    contator: "contator_weg.png",
    rele_termico: "rele_termico_weg.png",
    botao_liga: "botao_liga.png",
    botao_desliga: "botao_desliga.png",
    emergencia: "emergencia.png",
    motor_off: "motor_off.png",
    motor_on: "motor_on.png"
};

const workspace = document.getElementById("workspace");

document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.className = `component ${tipo}`;

    const img = document.createElement("img");

    if (tipo === "motor") {
        img.src = "assets/" + components.motor_off;
        comp.dataset.estado = "off";

        comp.addEventListener("dblclick", () => {
            alternarMotor(comp);
        });
    } else {
        img.src = "assets/" + components[tipo];
    }

    comp.appendChild(img);
    workspace.appendChild(comp);

    comp.style.left = "100px";
    comp.style.top = "100px";

    tornarArrastavel(comp);
}

function alternarMotor(motor) {
    const img = motor.querySelector("img");

    if (motor.dataset.estado === "off") {
        img.src = "assets/" + components.motor_on;
        motor.dataset.estado = "on";
    } else {
        img.src = "assets/" + components.motor_off;
        motor.dataset.estado = "off";
    }
}

function tornarArrastavel(el) {
    let offsetX = 0, offsetY = 0, dragging = false;

    el.addEventListener("mousedown", e => {
        dragging = true;
        const rect = el.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!dragging) return;
        const ws = workspace.getBoundingClientRect();
        el.style.left = e.clientX - ws.left - offsetX + "px";
        el.style.top = e.clientY - ws.top - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.zIndex = "";
    });
}
