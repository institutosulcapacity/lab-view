const workspace = document.getElementById('workspace');
let zIndex = 1;

function addDevice(type) {
  const d = document.createElement('div');
  d.className = 'device';
  d.style.left = '100px';
  d.style.top = '100px';
  d.style.zIndex = zIndex++;

  let html = '';

  if (type === 'disjuntor') {
    html = `
      <div class="device-title">DISJUNTOR</div>
      ${terminal('L1', 10, 25)}
      ${terminal('L2', 70, 25)}
      ${terminal('L3', 130, 25)}
      ${terminal('13', 130, 60)}
      ${terminal('14', 130, 80)}
      ${terminal('T1', 10, 100)}
      ${terminal('T2', 70, 100)}
      ${terminal('T3', 130, 100)}
    `;
  }

  if (type === 'contator') {
    html = `
      <div class="device-title">CONTATOR</div>
      ${terminal('L1', 10, 25)}
      ${terminal('L2', 70, 25)}
      ${terminal('L3', 130, 25)}

      ${terminal('A1', 130, 50)}
      ${terminal('13', 130, 70)}
      ${terminal('14', 130, 90)}
      ${terminal('A2', 130, 110)}

      ${terminal('T1', 10, 120)}
      ${terminal('T2', 70, 120)}
      ${terminal('T3', 130, 120)}
    `;
  }

  if (type === 'motor') {
    html = `
      <div class="device-title">MOTOR</div>
      ${terminal('U', 20, 40)}
      ${terminal('V', 70, 40)}
      ${terminal('W', 120, 40)}
    `;
  }

  if (type === 'liga') {
    html = `
      <div class="device-title">LIGA</div>
      ${terminal('13', 40, 40)}
      ${terminal('14', 90, 40)}
    `;
  }

  if (type === 'desliga') {
    html = `
      <div class="device-title">DESLIGA</div>
      ${terminal('21', 40, 40)}
      ${terminal('22', 90, 40)}
    `;
  }

  if (type === 'emergencia') {
    html = `
      <div class="device-title">EMERGÊNCIA</div>
      ${terminal('11', 40, 40)}
      ${terminal('12', 90, 40)}
    `;
  }

  d.innerHTML = html;
  workspace.appendChild(d);
  makeDraggable(d);
}

function terminal(label, x, y) {
  return `
    <div class="terminal" style="left:${x}px; top:${y}px;">
      <span>${label}</span>
    </div>
  `;
}

/* DRAG SEM OFFSET */
function makeDraggable(el) {
  let offsetX = 0, offsetY = 0, dragging = false;

  el.addEventListener('mousedown', e => {
    dragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    el.style.left = (e.clientX - offsetX) + 'px';
    el.style.top = (e.clientY - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    el.style.cursor = 'grab';
  });
}
