const svg = document.getElementById("wires");
let startBorne = null;
let currentLine = null;

document.querySelectorAll(".borne").forEach(borne => {
  borne.addEventListener("mousedown", e => {
    e.stopPropagation();
    startBorne = borne;

    const rect = borne.getBoundingClientRect();

    currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    currentLine.setAttribute("x1", rect.left + rect.width / 2);
    currentLine.setAttribute("y1", rect.top + rect.height / 2);
    currentLine.setAttribute("x2", rect.left + rect.width / 2);
    currentLine.setAttribute("y2", rect.top + rect.height / 2);
    currentLine.setAttribute("stroke", "yellow");
    currentLine.setAttribute("stroke-width", "3");

    svg.appendChild(currentLine);
  });
});

document.addEventListener("mousemove", e => {
  if (!currentLine) return;

  currentLine.setAttribute("x2", e.clientX);
  currentLine.setAttribute("y2", e.clientY);
});

document.addEventListener("mouseup", () => {
  startBorne = null;
  currentLine = null;
});
