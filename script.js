// ===================== VARIÁVEIS GLOBAIS =====================

// SVG onde os fios são desenhados
const svg = document.getElementById("wires");

// Todos os bornes
const bornes = document.querySelectorAll(".borne");

// Linha atual em criação
let linhaAtual = null;

// ===================== FUNÇÕES =====================

// Retorna o centro exato de um borne
// convertendo de HTML → SVG
function getCentroBorne(borne) {
  const b = borne.getBoundingClientRect();
  const s = svg.getBoundingClientRect();

  return {
    x: b.left + b.width / 2 - s.left,
    y: b.top + b.height / 2 - s.top
  };
}

// ===================== EVENTOS DOS BORNES =====================

bornes.forEach(borne => {

  // Quando clica no borne
  borne.addEventListener("mousedown", (e) => {

    const pos = getCentroBorne(borne);

    // Cria uma nova linha SVG
    linhaAtual = document.createElementNS("http://www.w3.org/2000/svg", "line");

    // Linha começa e termina no mesmo ponto
    linhaAtual.setAttribute("x1", pos.x);
    linhaAtual.setAttribute("y1", pos.y);
    linhaAtual.setAttribute("x2", pos.x);
    linhaAtual.setAttribute("y2", pos.y);

    // Estilo do fio
    linhaAtual.setAttribute("stroke", "yellow");
    linhaAtual.setAttribute("stroke-width", "3");

    // Adiciona ao SVG
    svg.appendChild(linhaAtual);
  });
});

// ===================== MOVIMENTO DO MOUSE =====================

document.addEventListener("mousemove", (e) => {
  if (!linhaAtual) return;

  const rect = svg.getBoundingClientRect();

  // CONVERSÃO CORRETA DO MOUSE PARA SVG
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  linhaAtual.setAttribute("x2", x);
  linhaAtual.setAttribute("y2", y);
});

// ===================== SOLTA O MOUSE =====================

document.addEventListener("mouseup", () => {
  linhaAtual = null;
});
