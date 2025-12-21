const workspace = document.getElementById('workspace');

function addComponent(type) {
  const comp = document.createElement('div');
  comp.className = 'component';
  comp.style.left = '50px';
  comp.style.top = '50px';

  let html = '';

  if (type === 'contator') {
    html = `
      <h3>CONTATOR</h3>

      <div class="terminal top-row left"></div><span class="label" style="top:22px;left:10px;">L1</span>
      <div class="terminal top-row center"></div><span class="label" style="top:22px;left:70px;">L2</span>
      <div class="terminal top-row right"></div><span class="label" style="top:22px;right:5px;">L3</span>

      <div class="terminal side-right" style="top:55px;"></div><span class="label" style="top:50px;right:20px;">A1</span>
      <div class="terminal side-right" style="top:80px;"></div><span class="label" style="top:75px;right:20px;">13</span>
      <div class="terminal side-right" style="top:105px;"></div><span class="label" style="top:100px;right:20px;">14</span>
      <div class="terminal side-right" style="top:130px;"></div><span class="label" style="top:125px;right:20px;">A2</span>

      <div class="terminal bottom-row left"></div><span class="label" style="bottom:8px;left:10px;">T1</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:70px;">T2</span>
      <div class="terminal bottom-row right"></div><span class="label" style="bottom:8px;right:5px;">T3</span>
    `;
  }

  if (type === 'disjuntor') {
    html = `
      <h3>DISJUNTOR</h3>

      <div class="terminal top-row left"></div><span class="label" style="top:22px;left:10px;">L1</span>
      <div class="terminal top-row center"></div><span class="label" style="top:22px;left:70px;">L2</span>
      <div class="terminal top-row right"></div><span class="label" style="top:22px;right:5px;">L3</span>

      <div class="terminal side-right" style="top:80px;"></div><span class="label" style="top:75px;right:20px;">13</span>
      <div class="terminal side-right" style="top:105px;"></div><span class="label" style="top:100px;right:20px;">14</span>

      <div class="terminal bottom-row left"></div><span class="label" style="bottom:8px;left:10px;">T1</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:70px;">T2</span>
      <div class="terminal bottom-row right"></div><span class="label" style="bottom:8px;right:5px;">T3</span>
    `;
  }

  if (type === 'motor') {
    html = `
      <h3>MOTOR</h3>
      <div class="terminal bottom-row left"></div><span class="label" style="bottom:8px;left:15px;">U</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:75px;">V</span>
      <div class="terminal bottom-row right"></div><span class="label" style="bottom:8px;right:10px;">W</span>
    `;
  }

  if (type === 'liga') {
    comp.classList.add('small');
    html = `
      <h3>LIGA</h3>
      <div class="terminal top-row center"></div><span class="label" style="top:22px;left:50px;">13</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:50px;">14</span>
    `;
  }

  if (type === 'desliga') {
    comp.classList.add('small');
    html = `
      <h3>DESLIGA</h3>
      <div class="terminal top-row center"></div><span class="label" style="top:22px;left:50px;">21</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:50px;">22</span>
    `;
  }

  if (type === 'emergencia') {
    comp.classList.add('small');
    html = `
      <h3>EMERGÊNCIA</h3>
      <div class="terminal top-row center"></div><span class="label" style="top:22px;left:50px;">11</span>
      <div class="terminal bottom-row center"></div><span class="label" style="bottom:8px;left:50px;">12</span>
    `;
  }

  comp.innerHTML = html;
  makeDraggable(comp);
  workspace.appendChild(comp);
}

function makeDraggable(el) {
  let offsetX, offsetY, dragging = false;

  el.addEventListener('mousedown', e => {
    dragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    el.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    el.style.left = (e.pageX - workspace.offsetLeft - offsetX) + 'px';
    el.style.top = (e.pageY - workspace.offsetTop - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    dragging = false;
    el.style.cursor = 'grab';
  });
}
