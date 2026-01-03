const svg = document.getElementById("wires");
let startBorne = null;
let currentLine = null;

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2
  };
}

document.querySelectorAll(".borne").forEach(borne => {

  borne.addEventListener("mousedown", e => {
    e.stopPropagation();

    startBorne = borne;
    const p = getCenter(borne);

    currentLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    currentLine.setAttribute("x1", p.x);
    currentLine.setAttribute("y1", p.y);
    currentLine.setAttribute("x2", p.x);
    currentLine.setAttribute("y2", p.y);
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

document.addEventListener("mouseup", e => {
  if (!currentLine) return;

  const target = document.elementFromPoint(e.clientX, e.clientY);

  if (target && target.classList.contains("borne")) {
    const p = getCenter(target);
    currentLine.setAttribute("x2", p.x);
    currentLine.setAttribute("y2", p.y);
  } else {
    currentLine.remove();
  }

  currentLine = null;
  startBorne = null;
});
