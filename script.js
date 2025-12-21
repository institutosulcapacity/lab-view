const workspace = document.getElementById('workspace');
const wiresSVG = document.getElementById('wires');

let currentWire = null;
let startBorne = null;

function addComponent(type) {
  const c = document.createElement('div');
  c.className = 'component';
  c.style.left = '200px';
  c.style.top = '100px';

  const title = document.createElement('div');
  title.className = 'component-title';
  title.innerText = type.toUpperCase();
  c.appendChild(title);

  const bornes = getBornes(type);
  bornes.forEach(b => {
    const dot = document.createElement('div');
    dot.className = 'borne';
    dot.style.left = b.x + 'px';
    dot.style.top = b.y + 'px';
    dot.dataset.name = b.name;

    const label = document.createElement('div');
    label.className = 'borne-label';
    label.style.left = (b.x + 14) + 'px';
    label.style.top = (b.y - 4) + 'px';
    label.innerText = b.name;

    dot.onclick = e => startOrEndWire(dot);
    c.appendChild(dot);
    c.appendChild(label);
  });

  makeDraggable(c);
  workspace.appendChild(c);
}

function getBornes(type) {
  if (type === 'contator') {
    return [
      { name:'L1', x:10, y:30 }, { name:'L2', x:40, y:30 }, { name:'L3', x:70, y:30 },
      { name:'13', x:90, y:55 }, { name:'14', x:90, y:75 },
      { name:'A1', x:90, y:95 }, { name:'A2', x:90, y:115 },
      { name:'T1', x:10, y:130 }, { name:'T2', x:40, y:130 }, { name:'T3', x:70, y:130 }
    ];
  }

  if (type === 'disjuntor') {
    return [
      { name:'L1', x:10, y:30 }, { name:'L2', x:40, y:30 }, { name:'L3', x:70, y:30 },
      { name:'13', x:90, y:55 }, { name:'14', x:90, y:75 },
      { name:'T1', x:10, y:100 }, { name:'T2', x:40, y:100 }, { name:'T3', x:70, y:100 }
    ];
  }

  if (type === 'motor') {
    return [
      { name:'U', x:20, y:40 }, { name:'V', x:50, y:40 }, { name:'W', x:80, y:40 }
    ];
  }

  if (type === 'liga') return [{ name:'13', x:30, y:40 }, { name:'14', x:60, y:40 }];
  if (type === 'desliga') return [{ name:'21', x:30, y:40 }, { name:'22', x:60, y:40 }];
  if (type === 'emergencia') return [{ name:'11', x:30, y:40 }, { name:'12', x:60, y:40 }];

  return [];
}

function makeDraggable(el) {
  let offsetX, offsetY, dragging = false;

  el.onmousedown = e => {
    dragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
  };

  document.onmousemove = e => {
    if (!dragging) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
    updateWires();
  };

  document.onmouseup = () => dragging = false;
}

function startOrEndWire(borne) {
  const rect = borne.getBoundingClientRect();
  const ws = workspace.getBoundingClientRect();
  const x = rect.left - ws.left + 6;
  const y = rect.top - ws.top + 6;

  if (!startBorne) {
    startBorne = { x, y };
    currentWire = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    currentWire.setAttribute('x1', x);
    currentWire.setAttribute('y1', y);
    currentWire.setAttribute('x2', x);
    currentWire.setAttribute('y2', y);
    currentWire.setAttribute('stroke', 'yellow');
    currentWire.setAttribute('stroke-width', '2');
    wiresSVG.appendChild(currentWire);
  } else {
    currentWire.setAttribute('x2', x);
    currentWire.setAttribute('y2', y);
    startBorne = null;
    currentWire = null;
  }
}

function updateWires() {
  // expansão futura: recalcular fios conectados
}
