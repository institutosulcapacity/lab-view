const svg = document.getElementById("wires");
let wire = null;
let startX = 0;
let startY = 0;

document.querySelectorAll(".borne").forEach(borne => {
  borne.addEventListener("mousedown", e => {
    const rect = borne.getBoundingClientRect();
    startX = rect.left + rect.width / 2;
    startY = rect.top + rect.height / 2;

    wire = document.createElementNS("http://www.w3.org/2000/svg", "line");
    wire.setAttribute("x1", startX);
    wire.setAttribute("y1", startY);
    wire.setAttribute("x2", startX);
    wire.setAttribute("y2", startY);
    wire.setAttribute("stroke", "yellow");
    wire.setAttribute("stroke-width", "2");

    svg.appendChild(wire);
  });
});

document.addEventListener("mousemove", e => {
  if (!wire) return;
  wire.setAttribute("x2", e.clientX);
  wire.setAttribute("y2", e.clientY);
});

document.addEventListener("mouseup", () => {
  wire = null;
});
