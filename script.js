const workspace = document.getElementById("workspace");

/* DRAG */
function makeDraggable(el) {
    let offsetX, offsetY;
    el.onmousedown = e => {
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        document.onmousemove = ev => {
            el.style.left = ev.pageX - workspace.offsetLeft - offsetX + "px";
            el.style.top = ev.pageY - workspace.offsetTop - offsetY + "px";
        };
        document.onmouseup = () => document.onmousemove = null;
    };
}

/* CONTATOR */
function addContator() {
    const c = document.createElement("div");
    c.className = "component";
    c.style.left = "50px";
    c.style.top = "50px";

    c.innerHTML = `
        <div class="component-header">CONTATOR</div>

        <div class="borne top-row left"><span>L1</span></div>
        <div class="borne top-row center"><span>L2</span></div>
        <div class="borne top-row right"><span>L3</span></div>

        <div class="borne bottom-row left"><span>T1</span></div>
        <div class="borne bottom-row center"><span>T2</span></div>
        <div class="borne bottom-row right"><span>T3</span></div>

        <div class="borne col-right" style="top:70px"><span>A1</span></div>
        <div class="borne col-right" style="top:100px"><span>13</span></div>
        <div class="borne col-right" style="top:130px"><span>14</span></div>
        <div class="borne col-right" style="top:160px"><span>A2</span></div>
    `;

    workspace.appendChild(c);
    makeDraggable(c);
}

/* DISJUNTOR MOTOR */
function addDisjuntor() {
    const d = document.createElement("div");
    d.className = "component";
    d.style.left = "300px";
    d.style.top = "50px";

    d.innerHTML = `
        <div class="component-header">DISJUNTOR</div>

        <div class="borne top-row left"><span>L1</span></div>
        <div class="borne top-row center"><span>L2</span></div>
        <div class="borne top-row right"><span>L3</span></div>

        <div class="borne bottom-row left"><span>T1</span></div>
        <div class="borne bottom-row center"><span>T2</span></div>
        <div class="borne bottom-row right"><span>T3</span></div>

        <div class="borne col-right" style="top:120px"><span>13</span></div>
        <div class="borne col-right" style="top:150px"><span>14</span></div>
    `;

    workspace.appendChild(d);
    makeDraggable(d);
}

/* RELÉ TÉRMICO */
function addReleTermico() {
    const r = document.createElement("div");
    r.className = "component";
    r.style.left = "550px";
    r.style.top = "50px";

    r.innerHTML = `
        <div class="component-header">RELÉ TÉRMICO</div>

        <div class="borne top-row left"><span>L1</span></div>
        <div class="borne top-row center"><span>L2</span></div>
        <div class="borne top-row right"><span>L3</span></div>

        <div class="borne bottom-row left"><span>T1</span></div>
        <div class="borne bottom-row center"><span>T2</span></div>
        <div class="borne bottom-row right"><span>T3</span></div>

        <div class="borne col-right" style="top:120px"><span>95</span></div>
        <div class="borne col-right" style="top:150px"><span>96</span></div>
    `;

    workspace.appendChild(r);
    makeDraggable(r);
}

/* MOTOR */
function addMotor() {
    const m = document.createElement("div");
    m.className = "component";
    m.style.left = "800px";
    m.style.top = "50px";

    m.innerHTML = `
        <div class="component-header">MOTOR</div>

        <div class="borne bottom-row left"><span>U</span></div>
        <div class="borne bottom-row center"><span>V</span></div>
        <div class="borne bottom-row right"><span>W</span></div>
    `;

    workspace.appendChild(m);
    makeDraggable(m);
}

/* BOTÕES */
function addBotao(tipo) {
    const b = document.createElement("div");
    b.className = "component";
    b.style.width = "140px";
    b.style.height = "160px";
    b.style.left = "50px";
    b.style.top = "350px";

    let titulo = tipo.toUpperCase();
    let bornes = "";

    if (tipo === "liga") bornes = `<span>13</span><span style="top:60px">14</span>`;
    if (tipo === "desliga") bornes = `<span>21</span><span style="top:60px">22</span>`;
    if (tipo === "emergencia") bornes = `<span>11</span><span style="top:60px">12</span>`;

    b.innerHTML = `
        <div class="component-header">${titulo}</div>
        <div class="borne col-left" style="top:40px">${bornes}</div>
    `;

    workspace.appendChild(b);
    makeDraggable(b);
}
