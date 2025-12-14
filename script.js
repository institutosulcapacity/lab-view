const componentes = {
  disjuntor_motor: "disjuntor_motor.png",
  contator: "contator_weg.png",
  rele_termico: "rele_termico_weg.png",
  motor: "motor_weg.png",
  botao_liga: "botao_liga.png",
  botao_desliga: "botao_desliga.png",
  emergencia: "emergencia.png"
};

const trilho = document.getElementById("din-rail");

document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => {
    adicionarNoTrilho(btn.dataset.type);
  });
});

function adicionarNoTrilho(tipo) {
  const div = document.createElement("div");
  div.className = "component";

  const img = document.createElement("img");
  img.src = "assets/" + componentes[tipo];
  img.alt = tipo;

  div.appendChild(img);
  trilho.appendChild(div);
}
