const workspace = document.getElementById("workspace");
const addContatorBtn = document.getElementById("addContator");

addContatorBtn.addEventListener("click", criarContator);

function criarContator() {
    const contator = document.createElement("div");
    contator.className = "contator";
    contator.style.left = "100px";
    contator.style.top = "100px";

    contator.innerHTML = `
        <div class="contator-header">CONTATOR</div>

        <div class="borne L1"><span>L1</span></div>
        <div class="borne L2"><span>L2</span></div>
        <div class="borne L3"><span>L3</span></div>

        <div class="borne T1"><span>T1</span></div>
        <div class="borne T2"><span>T2</span></div>
        <div class="borne T3"><span>T3</span></div>

        <div class="borne A1"><span>A1</span></div>
        <div class="borne A2"><span>A2</span></div>

        <div class="borne c13"><span>13</span></div>
        <div class="borne c14"><span>14</span></div>
    `;

    tornarArrastavel(contator);
    workspace.appendChild(contator);
}

function tornarArrastavel(elemento) {
    let offsetX = 0, offsetY = 0, dragging = false;

    elemento.addEventListener("mousedown", e => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        elemento.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", e => {
        if (!dragging) return;
        elemento.style.left = (e.pageX - offsetX) + "px";
        elemento.style.top = (e.pageY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        elemento.style.cursor = "grab";
    });
}
