const workspace = document.getElementById("workspace");
const addContatorBtn = document.getElementById("addContator");

addContatorBtn.addEventListener("click", () => {
    createContator(100, 100);
});

function createContator(x, y) {
    const contator = document.createElement("div");
    contator.className = "contator";
    contator.style.left = x + "px";
    contator.style.top = y + "px";

    contator.innerHTML = `
        <div class="contator-header">CONTATOR</div>

        <!-- POTÊNCIA -->
        <div class="borne L1"></div><div class="borne-label label-L1">L1</div>
        <div class="borne L2"></div><div class="borne-label label-L2">L2</div>
        <div class="borne L3"></div><div class="borne-label label-L3">L3</div>

        <!-- MOTOR -->
        <div class="borne T1"></div><div class="borne-label label-T1">T1</div>
        <div class="borne T2"></div><div class="borne-label label-T2">T2</div>
        <div class="borne T3"></div><div class="borne-label label-T3">T3</div>

        <!-- BOBINA -->
        <div class="borne A1"></div><div class="borne-label label-A1">A1</div>
        <div class="borne A2"></div><div class="borne-label label-A2">A2</div>

        <!-- SELO -->
        <div class="borne _13"></div><div class="borne-label label-13">13</div>
        <div class="borne _14"></div><div class="borne-label label-14">14</div>
    `;

    enableDrag(contator);
    workspace.appendChild(contator);
}

function enableDrag(el) {
    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    el.addEventListener("mousedown", (e) => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        el.style.left = (e.pageX - workspace.offsetLeft - offsetX) + "px";
        el.style.top = (e.pageY - workspace.offsetTop - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
    });
}
