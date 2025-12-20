const workspace = document.getElementById("workspace");

document.querySelectorAll(".tool").forEach(btn => {
    btn.addEventListener("click", () => {
        criarComponente(btn.dataset.type);
    });
});

function criarComponente(tipo) {
    const comp = document.createElement("div");
    comp.classList.add("component", tipo);

    const header = document.createElement("div");
    header.className = "component-header";
    header.innerText = tipo.toUpperCase();
    comp.appendChild(header);

    workspace.appendChild(comp);

    comp.style.left = "100px";
    comp.style.top = "100px";

    switch (tipo) {
        case "contator":
            layoutContator(comp);
            break;
        case "disjuntor":
            layoutDisjuntor(comp);
            break;
        case "motor":
            layoutMotor(comp);
            break;
        case "liga":
            layoutBotao(comp, "LIGA", [["13", "14"]]);
            break;
        case "desliga":
            layoutBotao(comp, "DESLIGA", [["21", "22"]]);
            break;
        case "emergencia":
            layoutBotao(comp, "EMERGÊNCIA", [["11", "12"]]);
            break;
    }

    tornarArrastavel(comp);
}

/* ===== LAYOUTS ===== */

function layoutContator(c) {
    c.classList.add("contator");

    addTerminal(c, "L1", 20, 30);
    addTerminal(c, "L2", 70, 30);
    addTerminal(c, "L3", 120, 30);

    addTerminal(c, "T1", 20, 160);
    addTerminal(c, "T2", 70, 160);
    addTerminal(c, "T3", 120, 160);

    addTerminal(c, "A1", 140, 60);
    addTerminal(c, "13", 140, 90);
    addTerminal(c, "14", 140, 115);
    addTerminal(c, "A2", 140, 145);
}

function layoutDisjuntor(c) {
    c.classList.add("disjuntor");

    addTerminal(c, "L1", 20, 30);
    addTerminal(c, "L2", 70, 30);
    addTerminal(c, "L3", 120, 30);

    addTerminal(c, "T1", 20, 160);
    addTerminal(c, "T2", 70, 160);
    addTerminal(c, "T3", 120, 160);

    addTerminal(c, "13", 140, 90);
    addTerminal(c, "14", 140, 115);
}

function layoutMotor(c) {
    c.classList.add("motor");

    addTerminal(c, "U", 40, 160);
    addTerminal(c, "V", 80, 160);
    addTerminal(c, "W", 120, 160);
}

function layoutBotao(c, nome, pares) {
    c.classList.add("botao");
    c.querySelector(".component-header").innerText = nome;

    let y = 40;
    pares[0].forEach(num => {
        addTerminal(c, num, 45, y);
        y += 30;
    });
}

/* ===== UTIL ===== */

function addTerminal(comp, label, x, y) {
    const t = document.createElement("div");
    t.className = "terminal";
    t.style.left = x + "px";
    t.style.top = y + "px";

    const l = document.createElement("div");
    l.className = "label";
    l.innerText = label;
    l.style.left = (x + 14) + "px";
    l.style.top = (y - 2) + "px";

    comp.appendChild(t);
    comp.appendChild(l);
}

function tornarArrastavel(el) {
    let offsetX, offsetY, dragging = false;

    el.addEventListener("mousedown", e => {
        dragging = true;
        const r = el.getBoundingClientRect();
        offsetX = e.clientX - r.left;
        offsetY = e.clientY - r.top;
        el.style.zIndex = 1000;
    });

    document.addEventListener("mousemove", e => {
        if (!dragging) return;
        const ws = workspace.getBoundingClientRect();
        el.style.left = (e.clientX - ws.left - offsetX) + "px";
        el.style.top = (e.clientY - ws.top - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        el.style.zIndex = "";
    });
}
