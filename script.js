const workspace = document.getElementById("workspace");
const svg = document.getElementById("wires");

let currentWire = null;
let offsetX = 0;
let offsetY = 0;

/* ===== COMPONENTES ===== */
const templates = {
    disjuntor: {
        name: "DISJUNTOR",
        terminals: [
            ["L1",10,30],["L2",80,30],["L3",150,30],
            ["13",150,70],["14",150,95],
            ["T1",10,130],["T2",80,130],["T3",150,130]
        ]
    },
    contator: {
        name: "CONTATOR",
        terminals: [
            ["L1",10,30],["L2",80,30],["L3",150,30],
            ["13",150,60],["14",150,85],
            ["A1",150,110],["A2",150,135],
            ["T1",10,160],["T2",80,160],["T3",150,160]
        ]
    },
    motor: {
        name: "MOTOR",
        terminals: [
            ["U",30,60],["V",80,60],["W",130,60]
        ]
    },
    liga: {
        name: "LIGA",
        terminals: [["13",40,50],["14",100,50]]
    },
    desliga: {
        name: "DESLIGA",
        terminals: [["21",40,50],["22",100,50]]
    },
    emergencia: {
        name: "EMERGÊNCIA",
        terminals: [["11",40,50],["12",100,50]]
    }
};

/* ===== CRIAR COMPONENTE ===== */
function addComponent(type) {
    const data = templates[type];
    const comp = document.createElement("div");
    comp.className = "component";
    comp.style.left = "200px";
    comp.style.top = "100px";

    const header = document.createElement("div");
    header.className = "component-header";
    header.textContent = data.name;
    comp.appendChild(header);

    data.terminals.forEach(t => {
        const dot = document.createElement("div");
        dot.className = "terminal";
        dot.style.left = t[1] + "px";
        dot.style.top = t[2] + "px";
        dot.dataset.name = t[0];

        const label = document.createElement("div");
        label.className = "label";
        label.textContent = t[0];
        dot.appendChild(label);

        dot.addEventListener("mousedown", e => startWire(e, dot));
        comp.appendChild(dot);
    });

    enableDrag(comp);
    workspace.appendChild(comp);
}

/* ===== ARRASTE CORRIGIDO ===== */
function enableDrag(el) {
    el.addEventListener("mousedown", e => {
        if (e.target.classList.contains("terminal")) return;

        offsetX = e.offsetX;
        offsetY = e.offsetY;

        function move(ev) {
            el.style.left = ev.pageX - workspace.offsetLeft - offsetX + "px";
            el.style.top  = ev.pageY - workspace.offsetTop - offsetY + "px";
            redrawWires();
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", move);
        }, { once:true });
    });
}

/* ===== FIOS ===== */
function startWire(e, terminal) {
    e.stopPropagation();

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke", "yellow");
    line.setAttribute("stroke-width", "2");

    const pos = getTerminalPos(terminal);
    line.setAttribute("x1", pos.x);
    line.setAttribute("y1", pos.y);
    line.setAttribute("x2", pos.x);
    line.setAttribute("y2", pos.y);

    svg.appendChild(line);
    currentWire = { line, from: terminal };

    function move(ev) {
        line.setAttribute("x2", ev.pageX - workspace.offsetLeft);
        line.setAttribute("y2", ev.pageY - workspace.offsetTop);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", ev => {
        document.removeEventListener("mousemove", move);

        if (ev.target.classList.contains("terminal")) {
            const to = getTerminalPos(ev.target);
            line.setAttribute("x2", to.x);
            line.setAttribute("y2", to.y);
            line.from = terminal;
            line.to = ev.target;
        } else {
            svg.removeChild(line);
        }
        currentWire = null;
    }, { once:true });
}

function getTerminalPos(t) {
    const rect = t.getBoundingClientRect();
    const w = workspace.getBoundingClientRect();
    return {
        x: rect.left - w.left + 6,
        y: rect.top - w.top + 6
    };
}

function redrawWires() {
    [...svg.children].forEach(line => {
        if (!line.from || !line.to) return;
        const a = getTerminalPos(line.from);
        const b = getTerminalPos(line.to);
        line.setAttribute("x1", a.x);
        line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x);
        line.setAttribute("y2", b.y);
    });
}
