const workspace = document.getElementById("workspace");
const btnAdd = document.getElementById("addContator");

btnAdd.addEventListener("click", () => {
    const contator = document.createElement("div");
    contator.className = "contator";
    contator.style.left = "100px";
    contator.style.top = "100px";

    contator.innerHTML = `
        <div class="contator-header">CONTATOR</div>

        <div class="borne l1">L1</div>
        <div class="borne l2">L2</div>
        <div class="borne l3">L3</div>

        <div class="borne t1">T1</div>
        <div class="borne t2">T2</div>
        <div class="borne t3">T3</div>

        <div class="borne a1">A1</div>
        <div class="borne a2">A2</div>

        <div class="borne b13">13</div>
        <div class="borne b14">14</div>
    `;

    makeDraggable(contator);
    workspace.appendChild(contator);
});

function makeDraggable(element) {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    element.addEventListener("mousedown", e => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        element.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", e => {
        if (!dragging) return;
        element.style.left = e.pageX - workspace.offsetLeft - offsetX + "px";
        element.style.top = e.pageY - workspace.offsetTop - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        element.style.cursor = "grab";
    });
}
