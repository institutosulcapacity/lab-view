const workspace = document.getElementById("workspace");

function addDevice(type) {
    const d = document.createElement("div");
    d.className = "device";
    d.style.left = "50px";
    d.style.top = "50px";

    let html = "";

    if (type === "contator") {
        html = `
        <h3>CONTATOR</h3>

        ${borne("L1", 10, 30)}
        ${borne("L2", 60, 30)}
        ${borne("L3", 110, 30)}

        ${borne("A1", 110, 55)}
        ${borne("13", 110, 75)}
        ${borne("14", 110, 95)}
        ${borne("A2", 110, 120)}

        ${borne("T1", 10, 130)}
        ${borne("T2", 60, 130)}
        ${borne("T3", 110, 130)}
        `;
    }

    if (type === "disjuntor") {
        html = `
        <h3>DISJUNTOR</h3>

        ${borne("L1", 10, 30)}
        ${borne("L2", 60, 30)}
        ${borne("L3", 110, 30)}

        ${borne("13", 110, 70)}
        ${borne("14", 110, 90)}

        ${borne("T1", 10, 130)}
        ${borne("T2", 60, 130)}
        ${borne("T3", 110, 130)}
        `;
    }

    if (type === "motor") {
        html = `
        <h3>MOTOR</h3>
        ${borne("U", 20, 80)}
        ${borne("V", 60, 80)}
        ${borne("W", 100, 80)}
        `;
    }

    if (type === "liga") {
        html = `
        <h3>LIGA</h3>
        ${borne("13", 50, 60)}
        ${borne("14", 50, 90)}
        `;
    }

    if (type === "desliga") {
        html = `
        <h3>DESLIGA</h3>
        ${borne("21", 50, 60)}
        ${borne("22", 50, 90)}
        `;
    }

    if (type === "emergencia") {
        html = `
        <h3>EMERGÊNCIA</h3>
        ${borne("11", 50, 60)}
        ${borne("12", 50, 90)}
        `;
    }

    d.innerHTML = html;
    makeDraggable(d);
    workspace.appendChild(d);
}

/* ===== BORNE ===== */
function borne(label, x, y) {
    return `
    <div class="borne" style="left:${x}px; top:${y}px;">
        <span>${label}</span>
    </div>`;
}

/* ===== DRAG ===== */
function makeDraggable(el) {
    let offsetX, offsetY;

    el.onmousedown = e => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        document.onmousemove = ev => {
            el.style.left = ev.pageX - offsetX - workspace.offsetLeft + "px";
            el.style.top = ev.pageY - offsetY - workspace.offsetTop + "px";
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };
}
