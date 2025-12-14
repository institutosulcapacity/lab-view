const estado = {
  disjuntor:false,
  contator:false,
  temporizador:false
};

function toggle(nome){
  estado[nome] = !estado[nome];
  document.getElementById(nome).classList.toggle("ligado", estado[nome]);
  atualizar();
}

function atualizar(){
  document.getElementById("c1").classList.toggle("ativo", estado.disjuntor);
  document.getElementById("c2").classList.toggle("ativo", estado.disjuntor && estado.contator);
  document.getElementById("c3").classList.toggle("ativo", estado.disjuntor && estado.contator && estado.temporizador);

  const motor = document.getElementById("motor");
  if(estado.disjuntor && estado.contator && estado.temporizador){
    motor.classList.add("ligado");
  } else {
    motor.classList.remove("ligado");
  }
}

function resetar(){
  for(let k in estado){ estado[k]=false; }
  document.querySelectorAll(".ligado").forEach(e=>e.classList.remove("ligado"));
  document.querySelectorAll(".ativo").forEach(e=>e.classList.remove("ativo"));
}
